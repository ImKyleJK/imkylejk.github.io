"use client"

import { ExternalLink, Loader2 } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useState } from "react"

export function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [loadingProject, setLoadingProject] = useState<string | null>(null)

  const projects = [
    {
      name: "Network Camp",
      description:
        "A comprehensive service monitoring platform that allows developers and teams to monitor their security, performance, and uptime with ease.",
      url: "https://network.camp",
      status: "active",
      tags: ["Full-Stack", "Featured"],
    },
  ]

  const handleProjectClick = (projectName: string, url: string) => {
    setLoadingProject(projectName)
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer")
      setLoadingProject(null)
    }, 800)
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
        <span>PROJECTS</span>
        <span className="flex-1 border-b border-border" />
        <span className="text-xs text-muted-foreground">03</span>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex gap-3">
          <span className="text-primary animate-pulse">▸</span>
          <div className="flex-1 space-y-4">

            {projects.map((project, index) => (
              <button
                key={project.name}
                onClick={() => handleProjectClick(project.name, project.url)}
                disabled={loadingProject === project.name}
                className={`w-full text-left block border border-border bg-secondary p-4 rounded hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300 group ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-primary font-bold group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded animate-pulse">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-accent">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {loadingProject === project.name ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
