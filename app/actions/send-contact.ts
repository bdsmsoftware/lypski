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
    const parsed = ContactFormSchema.safeParse({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        eventType: String(formData.get("eventType") || ""),
        message: String(formData.get("message") || ""),
        company: String(formData.get("company") || ""),
        startedAt: String(formData.get("startedAt") || ""),
    })

    if (!parsed.success) {
        return initialError
    }

    const { name, email, eventType, message, company, startedAt } = parsed.data

    // Honeypot: if filled, act like success but drop the submission
    if (company && company.trim().length > 0) {
        return { ok: true, message: "Thanks! We received your message." }
    }

    // Basic time-check anti-spam: reject if submitted too quickly (< 4s)
    if (startedAt) {
        const started = Number(startedAt)
        if (!Number.isNaN(started)) {
            const elapsedMs = Date.now() - started
            if (elapsedMs < 4000) {
                return { ok: true, message: "Thanks! We received your message." }
            }
        }
    }

    const to = process.env.CONTACT_TO_EMAIL || "marcinlypski@gmail.com"
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"

    try {
        const result = await resend.emails.send({
            from,
            to,
            subject: `New inquiry from ${name} • ${eventType}`,
            react: ContactEmail({ name, email, eventType, message }),
            // Note: Add reply-to once domain is verified and SDK field is confirmed
        })

        // Some versions return { data, error }
        // @ts-expect-error - runtime shape may include error
        if (result?.error) {
            return {
                ok: false,
                message: "Failed to send. Please email directly at marcinlypski@gmail.com.",
            }
        }

        return { ok: true, message: "Message sent! I will get back to you soon." }
    } catch (_err) {
        return {
            ok: false,
            message: "Failed to send. Please email directly at marcinlypski@gmail.com.",
        }
    }
}


