"use client"

import { useInView } from "@/hooks/use-in-view"

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`space-y-4 border border-border bg-card p-6 rounded transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center gap-2 text-primary text-sm border-b border-border pb-2">
        <span className={`transition-all duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}>╭─</span>
        <span className={`transition-all duration-500 delay-100 ${isInView ? "opacity-100" : "opacity-0"}`}>ABOUT</span>
        <span className="flex-1 border-b border-border" />
        <span
          className={`text-xs text-muted-foreground transition-all duration-500 delay-200 ${isInView ? "opacity-100" : "opacity-0"}`}
        >
          01
        </span>
      </div>

      <div className="space-y-4 text-sm leading-relaxed">
        <div className="flex gap-3">
          <span className="text-primary animate-pulse">▸</span>
          <div className="space-y-3">
            <h1
              className={`text-2xl font-bold text-primary transition-all duration-500 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Kyle Kozlowski
            </h1>
            <p
              className={`text-muted-foreground leading-relaxed transition-all duration-500 delay-400 ${isInView ? "opacity-100" : "opacity-0"}`}
            >
              Freelance self-taught full-stack web developer with a passion for building innovative solutions. I
              specialize in creating modern, performant web applications that solve real-world problems. My journey in
              tech has been driven by curiosity and a commitment to continuous learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
