"use client"

import { useState, useEffect, useRef } from "react"
import { TerminalHeader } from "@/components/terminal-header"
import { TerminalPrompt } from "@/components/terminal-prompt"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

const files = [
  "main.js",
  "app.js",
  "components.js",
  "styles.css",
  "terminal.js",
  "about.js",
  "skills.js",
  "projects.js",
  "contact.js",
  "utils.js",
  "hooks.js",
  "fonts.woff2",
  "images.png",
  "data.json",
  "config.js",
]

export default function Home() {
  const [isBooting, setIsBooting] = useState(true)
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const hasCompletedRef = useRef(false)
  const lineIndexRef = useRef(0)

  useEffect(() => {
    const loadedFiles: string[] = []
    let totalEstimated = 15 // Estimate total resources

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
        // Track JS, CSS, and font files
        if (entry.name.includes('/_next/') || 
            entry.name.includes('.js') || 
            entry.name.includes('.css') || 
            entry.name.includes('.woff')) {
          const fileName = entry.name.split('/').pop()?.split('?')[0] || 'unknown'
          if (!loadedFiles.includes(fileName) && fileName !== 'unknown') {
            loadedFiles.push(fileName)
            const progressText = `Loading ${fileName} (${loadedFiles.length}/${totalEstimated})`
            setLines([progressText])
            setProgress(Math.min((loadedFiles.length / totalEstimated) * 100, 95))
          }
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })

    // Check when page is fully loaded
    const checkComplete = () => {
      if (document.readyState === 'complete') {
        setProgress(100)
        setLines(['Loading complete'])
        setTimeout(() => {
          setIsBooting(false)
        }, 500)
      } else {
        setTimeout(checkComplete, 100)
      }
    }

    checkComplete()

    return () => {
      observer.disconnect()
    }
  }, [])

  if (isBooting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono px-4">
        <div className="w-full max-w-md sm:max-w-2xl space-y-4">
          <div className="text-primary text-xs space-y-1">
            {lines.map((line, i) => (
              <div key={i}>
                <span>{line}</span>
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
          </div>

          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-sm overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Loading portfolio...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden animate-fade-in font-mono">
      {/* Scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]">
        <div className="scanline absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent h-32" />
      </div>

      {/* CRT effect */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />

      {/* Main Content */}
      <div className="relative z-10">
        <TerminalHeader />

        <main className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
          <TerminalPrompt />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  )
}
