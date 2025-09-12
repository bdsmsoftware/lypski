import * as React from "react"

type Props = {
    name: string
    email: string
    eventType: string
    message: string
}

export default function ContactEmail({ name, email, eventType, message }: Props) {
    return (
        <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial", lineHeight: 1.6 }}>
            <h2 style={{ margin: 0, marginBottom: 8 }}>New Contact Request</h2>
            <p style={{ margin: 0 }}>
                <strong>Name:</strong> {name}
            </p>
            <p style={{ margin: 0 }}>
                <strong>Email:</strong> {email}
            </p>
            <p style={{ margin: 0 }}>
                <strong>Event Type:</strong> {eventType}
            </p>
            <div style={{ marginTop: 16 }}>
                <strong>Message</strong>
                <div style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 12, borderRadius: 8, marginTop: 8 }}>
                    {message}
                </div>
            </div>
        </div>
    )
}


