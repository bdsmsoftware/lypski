"use server"

import { Resend } from "resend"
import { z } from "zod"
import ContactEmail from "@/emails/ContactEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email required"),
    eventType: z.string().min(2, "Event type is required"),
    message: z.string().min(10, "Message is required"),
    company: z.string().optional().default(""), // honeypot
    startedAt: z.string().optional(), // submission timing
})

export type ContactActionState = {
    ok: boolean
    message: string
}

const initialError: ContactActionState = {
    ok: false,
    message: "Please check your details and try again.",
}

export async function sendContact(
    _prevState: ContactActionState | undefined,
    formData: FormData
): Promise<ContactActionState> {
    console.log("[contact] action start")
    const hasKey = Boolean(process.env.RESEND_API_KEY)
    console.log("[contact] env", { RESEND_API_KEY: hasKey ? "present" : "missing" })
    if (!process.env.RESEND_API_KEY) {
        return {
            ok: false,
            message:
                "Email service not configured. Please set RESEND_API_KEY in .env.local and restart the dev server.",
        }
    }
    const raw = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        eventType: String(formData.get("eventType") || ""),
        message: String(formData.get("message") || ""),
        company: String(formData.get("company") || ""),
        startedAt: String(formData.get("startedAt") || ""),
    }
    console.log("[contact] incoming", {
        nameLen: raw.name.length,
        email: raw.email,
        eventType: raw.eventType,
        messageLen: raw.message.length,
        honeypotFilled: Boolean(raw.company),
        startedAt: raw.startedAt,
    })
    const parsed = ContactFormSchema.safeParse(raw)

    if (!parsed.success) {
        console.warn("[contact] validation failed", parsed.error.issues)
        const firstIssue = parsed.error.issues?.[0]
        const message = firstIssue?.message || initialError.message
        return { ok: false, message }
    }

    const { name, email, eventType, message, company, startedAt } = parsed.data

    // Honeypot: if filled, act like success but drop the submission
    if (company && company.trim().length > 0) {
        console.warn("[contact] honeypot triggered")
        return { ok: true, message: "Thanks! We received your message." }
    }

    // Basic time-check anti-spam: reject if submitted too quickly (< 4s)
    if (startedAt) {
        const started = Number(startedAt)
        if (!Number.isNaN(started)) {
            const elapsedMs = Date.now() - started
            if (elapsedMs < 4000) {
                console.warn("[contact] fast-submit flagged", { elapsedMs })
                return { ok: true, message: "Thanks! We received your message." }
            }
            console.log("[contact] submit timing", { elapsedMs })
        }
    }

    const to = process.env.CONTACT_TO_EMAIL || "marcinlypski@gmail.com"
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"
    let effectiveFrom = from
    if (!effectiveFrom.includes("@")) {
        console.warn("[contact] invalid FROM address, falling back to default", { from })
        effectiveFrom = "onboarding@resend.dev"
    }
    const fromHeader = effectiveFrom.includes("<") ? effectiveFrom : `Lypski <${effectiveFrom}>`
    console.log("[contact] sending via Resend", {
        from,
        to,
        subject: `New inquiry from ${name} • ${eventType}`,
    })

    try {
        // Build HTML manually to avoid React renderer issues (renderAsync not available)
        const escape = (s: string) =>
            s
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")

        // Brand-styled HTML email (dark theme, orange→red gradient accents)
        const accent1 = "#f97316" // orange-500
        const accent2 = "#ef4444" // red-500
        const bgDark = "#0b0b0b"
        const cardBg = "#111827" // gray-900/800
        const textPrimary = "#ffffff"
        const textMuted = "#9ca3af"
        const borderColor = "#fb923c33" // orange-400/20

        const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
            `Re: ${name} • ${eventType}`
        )}`

        const html = `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${bgDark};padding:24px 0;">
  <tr>
    <td align="center" style="padding:0 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:${cardBg};border:1px solid ${borderColor};border-radius:12px;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;">
        <tr>
          <td style="padding:24px 24px 16px 24px;">
            <div style="font-size:20px;font-weight:700;color:${textPrimary};">Lypski</div>
            <div style="height:2px;background:linear-gradient(90deg, ${accent1}, ${accent2});margin-top:12px;border-radius:999px;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 24px 0 24px;">
            <div style="font-size:18px;color:${textPrimary};font-weight:600;margin:0 0 8px 0;">New Contact Request</div>
            <div style="font-size:14px;color:${textMuted};margin:0 0 16px 0;">You received a new inquiry from your website.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 0 24px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 8px;">
              <tr>
                <td style="width:140px;color:${textMuted};font-size:12px;">Name</td>
                <td style="color:${textPrimary};font-size:14px;">${escape(name)}</td>
              </tr>
              <tr>
                <td style="width:140px;color:${textMuted};font-size:12px;">Email</td>
                <td style="color:${textPrimary};font-size:14px;">${escape(email)}</td>
              </tr>
              <tr>
                <td style="width:140px;color:${textMuted};font-size:12px;">Event Type</td>
                <td style="color:${textPrimary};font-size:14px;">${escape(eventType)}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 0 24px;">
            <div style="color:${textPrimary};font-size:12px;font-weight:600;margin:0 0 8px 0;">Message</div>
            <div style="color:${textPrimary};font-size:14px;background:#0f172a;padding:12px;border:1px solid ${borderColor};border-radius:8px;white-space:pre-wrap;">${escape(
            message
        )}</div>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:24px;">
            <a href="${mailto}" style="display:inline-block;padding:12px 20px;background:linear-gradient(90deg, ${accent1}, ${accent2});color:#000000;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Reply to ${escape(
            name
        )}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 24px 24px 24px;">
            <div style="height:1px;background:#ffffff1a;margin:8px 0 12px 0;"></div>
            <div style="font-size:12px;color:${textMuted};">You’re receiving this because someone submitted the contact form on lypski.com.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`

        const text = `New Contact Request\nName: ${name}\nEmail: ${email}\nEvent Type: ${eventType}\n\nMessage:\n${message}`

        const result = await resend.emails.send({
            from: fromHeader,
            to,
            subject: `New inquiry from ${name} • ${eventType}`,
            html,
            text,
            // Set Reply-To so you can answer directly to the submitter
            // Docs: https://resend.com/docs/send-with-nextjs (emails.send options)
            // @ts-expect-error - reply_to is supported by Resend API
            reply_to: email,
        })

        // Some versions return { data, error }
        if ((result as any)?.error) {
            try {
                console.error("Resend error:", JSON.stringify((result as any).error))
            } catch { }
            return {
                ok: false,
                message:
                    "Failed to send (provider error). Please email directly at marcinlypski@gmail.com.",
            }
        }

        try {
            console.log("[contact] Resend response", result)
        } catch { }
        return { ok: true, message: "Message sent! I will get back to you soon." }
    } catch (_err) {
        try {
            console.error("Resend send exception:", _err)
        } catch { }
        return {
            ok: false,
            message: "Failed to send. Please email directly at marcinlypski@gmail.com.",
        }
    }
}


