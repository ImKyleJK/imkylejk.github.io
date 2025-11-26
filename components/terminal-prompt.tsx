"use client"

import { useEffect, useState } from "react"

export function TerminalPrompt() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "cat welcome.txt"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary">kyle@portfolio</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-accent">~</span>
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground">{displayedText}</span>
        <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
      </div>
    </div>
  )
}
