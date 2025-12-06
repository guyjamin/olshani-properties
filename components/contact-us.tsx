"use client"

import React, { useState } from "react"
import { Footer } from "@/components/footer"

export default function ContactUs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [project, setProject] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const whatsappNumber = "254702168686" // international format without + or leading 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !message.trim()) {
      setError("Please provide your name and message.")
      return
    }

    // build message
    const parts = [
      `Name: ${name.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      project.trim() ? `Project: ${project.trim()}` : null,
      "",
      "Message:",
      message.trim(),
    ].filter(Boolean)

    const text = parts.join("\n")
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

    try {
      setSending(true)
      window.open(url, "_blank")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section id="contact" className="w-full py-16 bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4 text-primary">Contact Us</h2>
          <p className="text-muted-foreground mb-6">
            Send us a message and we'll get back to you. Or use the WhatsApp button to contact us directly.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name *"
                className="px-4 py-3 bg-card border border-border rounded-md text-sm"
                required
              />
              <input
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                type="email"
                className="px-4 py-3 bg-card border border-border rounded-md text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                aria-label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="px-4 py-3 bg-card border border-border rounded-md text-sm"
              />
              <input
                aria-label="Project interest"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Project (optional)"
                className="px-4 py-3 bg-card border border-border rounded-md text-sm"
              />
            </div>

            <textarea
              aria-label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message *"
              rows={6}
              className="w-full px-4 py-3 bg-card border border-border rounded-md text-sm"
              required
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition"
              >
                {sending ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-border text-sm hover:bg-muted transition"
              >
                Open WhatsApp
              </a>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              By sending a message you agree to be contacted by Olshani Properties. For immediate response call{" "}
              <a className="text-primary" href="tel:0702168686">
                0702 168 686
              </a>
              .
            </p>
          </form>
        </div>
      </section>

      {/* Footer (same as About page) */}
      <Footer />
    </>
  )
}