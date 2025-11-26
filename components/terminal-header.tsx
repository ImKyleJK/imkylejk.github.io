"use client"

import { useState, useEffect } from "react"

export function TerminalHeader() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="border-b border-border bg-card">
      <div className="container max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <span className="text-muted-foreground ml-2">kyle@portfolio:~$</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-4">
            <span>{time}</span>
            <span>●</span>
            <span>SSH Connected</span>
          </div>
        </div>
      </div>
    </header>
  )
}
