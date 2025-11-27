"use client"

import type React from "react"

import { Github, Instagram, Mail, Send, Loader2, Check } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useState } from "react"

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "failed">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const links = [
    {
      name: "GitHub",
      handle: "@imkylejk",
      url: "https://github.com/imkylejk",
      icon: Github,
    },
    {
      name: "Instagram",
      handle: "@imkylejk",
      url: "https://instagram.com/imkylejk",
      icon: Instagram,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setFormState("failed")
    setTimeout(() => setFormState("idle"), 3000)
  }

  return (
    <section
      ref={ref}
      className={`space-y-4 border border-border bg-card p-6 rounded transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center gap-2 text-primary text-sm border-b border-border pb-2">
        <span>╭─</span>
        <span>CONNECT</span>
        <span className="flex-1 border-b border-border" />
        <span className="text-xs text-muted-foreground">04</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Social Links */}
        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <span className="text-primary animate-pulse">▸</span>
            <div className="flex-1 space-y-4">

              <div className="space-y-3">
                {links.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group hover:translate-x-2 ${
                        isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{link.name}:</span>
                        <span className="group-hover:text-accent transition-colors">{link.handle}</span>
                      </div>
                    </a>
                  )
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-foreground">Open to freelance opportunities</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <span className="text-primary animate-pulse">▸</span>
            <div className="flex-1 space-y-4">
              <p className="text-foreground">
                <span className="text-accent">$</span> ./send_message.sh
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs flex items-center gap-2">
                    <span className="text-accent">→</span> name:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={formState !== "idle"}
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all placeholder:text-muted-foreground/50"
                    placeholder="Enter your name..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs flex items-center gap-2">
                    <span className="text-accent">→</span> email:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={formState !== "idle"}
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all placeholder:text-muted-foreground/50"
                    placeholder="Enter your email..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs flex items-center gap-2">
                    <span className="text-accent">→</span> message:
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={formState !== "idle"}
                    rows={4}
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all resize-none placeholder:text-muted-foreground/50"
                    placeholder="Type your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState !== "idle"}
                  className={`w-full font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    formState === "idle"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                      : formState === "loading"
                      ? "bg-primary text-primary-foreground"
                      : formState === "success"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-destructive text-destructive-foreground animate-pulse hover:bg-destructive/90"
                  }`}
                >
                  {formState === "idle" && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                  {formState === "loading" && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  )}
                  {formState === "success" && (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Message sent successfully!</span>
                    </>
                  )}
                  {formState === "failed" && (
                    <>
                      <span className="text-lg">✗</span>
                      <span>Failed to send message. Try again.</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border text-xs text-muted-foreground">
        <p>
          <span className="text-accent">$</span> echo "Thanks for visiting!" && exit
        </p>
      </div>
    </section>
  )
}
