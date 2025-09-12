"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Youtube, Music } from "lucide-react"


const socialMedia = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/marcin_lypski/",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/watch?v=tDMGNtE2DFg",
  },
  {
    name: "TikTok",
    icon: Music,
    url: "https://www.tiktok.com/@marcin_lypski",
  },
]


import { useActionState, useEffect, useState } from "react"
import { sendContact } from "@/app/actions/send-contact"

export function Contact() {
  const [startedAt] = useState<string>(() => String(Date.now()))
  const [message, action, isPending] = useActionState(sendContact, undefined)

  useEffect(() => {
    if (message?.ok) {
      const form = document.getElementById("contact-form") as HTMLFormElement | null
      try {
        console.log("[contact-client] success", message)
      } catch { }
      form?.reset()
    } else if (message && !message.ok) {
      try {
        console.warn("[contact-client] failure", message)
      } catch { }
    }
  }, [message])

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Book a Performance
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring fire and steel to your event? Let's create something unforgettable together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-400">marcinlypski@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold">Phone / WhatsApp</p>
                  <p className="text-gray-400">+48 505 202 098</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold">Location</p>
                  <p className="text-gray-400">Based in Warsaw, Poland. Available Worldwide</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">Socials</h4>
              <div className="flex space-x-4">
                {socialMedia.map(({ name, icon: Icon, url }) => (
                  <Button
                    key={name}
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black bg-transparent"
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-8">
              <form id="contact-form" action={action} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name</label>
                    <Input
                      name="name"
                      required
                      minLength={2}
                      placeholder="Your name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Event Type</label>
                  <Input
                    name="eventType"
                    required
                    minLength={2}
                    placeholder="Festival, Private Party, Corporate Event, etc."
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <Textarea
                    name="message"
                    required
                    minLength={10}
                    placeholder="Tell me about your event, date, location, and what kind of performance you're looking for..."
                    rows={5}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                  />
                </div>

                {/* Honeypot + timing */}
                <input type="text" name="company" defaultValue="" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />
                <input type="hidden" name="startedAt" value={startedAt} />

                <Button
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3"
                >
                  {isPending ? (console.log("[contact-client] submitting"), "Sending...") : "Send Message"}
                </Button>

                {message && (
                  <p className={`text-center text-sm ${message.ok ? "text-green-400" : "text-red-400"}`}>
                    {message.message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
