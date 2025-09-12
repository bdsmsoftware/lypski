import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET() {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
            { error: "RESEND_API_KEY is missing in environment" },
            { status: 500 }
        )
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const result = await resend.domains.list()

        // @ts-expect-error SDK may return { data, error }
        if (result?.error) {
            // @ts-expect-error SDK error shape is not strictly typed
            const message = typeof result.error === "string" ? result.error : JSON.stringify(result.error)
            return NextResponse.json({ error: message }, { status: 502 })
        }

        // @ts-expect-error data may be on result.data
        const data = (result?.data ?? result) as any
        const domains = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
                ? data.data
                : []

        const sanitized = domains.map((d: any) => ({
            id: d.id,
            name: d.name,
            status: d.status,
            created_at: d.created_at,
            region: d.region,
            records: (d.records || []).map((r: any) => ({
                type: r.type,
                status: r.status,
                name: r.name,
                value: r.value,
            })),
        }))

        return NextResponse.json({ domains: sanitized })
    } catch (err: any) {
        return NextResponse.json(
            { error: "Failed to list domains", details: String(err?.message || err) },
            { status: 500 }
        )
    }
}


