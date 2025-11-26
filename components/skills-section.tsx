"use client"

import { useInView } from "@/hooks/use-in-view"
import { useState, useEffect, useRef } from "react"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 10 },
      { name: "Next.js", level: 40 },
      { name: "TypeScript", level: 15 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "API Development", level: 90 },
      { name: "Database Design", level: 50 },
      { name: "Authentication", level: 70 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git/GitHub", level: 60 },
      { name: "VS Code", level: 95 },
      { name: "Railway", level: 80 },
      { name: "Terminal/CLI", level: 60 },
    ],
  },
]

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [loadedSkills, setLoadedSkills] = useState<Record<string, number>>({})
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      skillCategories.forEach((category, catIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          setTimeout(
            () => {
              setLoadedSkills((prev) => ({
                ...prev,
                [skill.name]: skill.level,
              }))
            },
            catIndex * 200 + skillIndex * 100,
          )
        })
      })
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      className={`space-y-4 border border-border bg-card p-6 rounded transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center gap-2 text-primary text-sm border-b border-border pb-2">
        <span>╭─</span>
        <span>SKILLS</span>
        <span className="flex-1 border-b border-border" />
        <span className="text-xs text-muted-foreground">02</span>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex gap-3">
          <span className="text-primary animate-pulse">▸</span>
          <div className="flex-1">
            <p className="text-foreground mb-4">
              <span className="text-accent">NOTE:</span> The level of these skills is determined by my personal experience and proficiency with each technology.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {skillCategories.map((category, catIndex) => (
                <div
                  key={category.title}
                  className={`space-y-3 transition-all duration-500`}
                  style={{ transitionDelay: `${catIndex * 150}ms` }}
                >
                  <div className="text-primary font-bold mb-2 flex items-center gap-2">
                    <span className="text-accent">[</span>
                    {category.title}
                    <span className="text-accent">]</span>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skill.name}
                        className={`space-y-1 transition-all duration-300`}
                        style={{ transitionDelay: `${catIndex * 150 + skillIndex * 50}ms` }}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2">
                            <span className="text-accent">→</span>
                            <span>{skill.name}</span>
                          </span>
                          <span className="text-primary">{loadedSkills[skill.name] || 0}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-sm overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-1000 ease-out"
                            style={{ width: `${loadedSkills[skill.name] || 0}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
