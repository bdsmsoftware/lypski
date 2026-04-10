"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

const socialMedia = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/marcin_lypski/",
  },
  {
    name: "YouTube",
    icon: YoutubeIcon,
    url: "https://www.youtube.com/watch?v=tDMGNtE2DFg",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
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
