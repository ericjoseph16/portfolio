"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 h-14 flex items-center justify-between">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-3 sm:gap-4 text-sm">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
                { id: "thoughts", label: "Thoughts" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`px-3 py-1 rounded-full border border-transparent hover:border-border transition-colors ${
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["home", "about", "experience", "projects", "contact", "thoughts"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="home"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-6 sm:gap-8">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex-shrink-0 rounded-full overflow-hidden border border-border/50">
                    <Image
                      src="/headshot.jpg"
                      alt="Eric Joseph"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-3 sm:space-y-2 flex-1">
                    <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                      Eric
                      <br />
                      <span className="text-muted-foreground">Joseph</span>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Georgia Tech Computer Science student building efficient and scalable software, 
                with interests in
                  <span className="text-foreground"> high-performance computing</span>,<span className="text-foreground"> systems-level design</span>,
                  and
                  <span className="text-foreground"> machine learning</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Atlanta, GA</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Undergraduate Student</div>
                  <div className="text-muted-foreground">@ Georgia Institute of Technology</div>
                  <div className="text-xs text-muted-foreground">August 2023 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Rust", "Python", "C++", "TypeScript", "Next.js", "React", "AWS"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="about"
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-6 sm:space-y-8 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-light">About</h2>
            <p className="text-muted-foreground leading-relaxed">
            Hi! I'm Eric Joseph, a third-year Computer Science student at the Georgia Institute of Technology. 
            I have built a strong technical foundation encompassing full-stack development, AI/Machine Learning applications, 
            and engineering scalable cloud services. I am currently fascinated by low-level systems programming, actively 
            developing a high-performance semantic cache in Rust. I write about my progress on X, which you can view {" "} 
            <a href="https://x.com/eric_joseph16" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/50 hover:decoration-foreground">
              here
            </a>.
            </p>

            <p className="text-muted-foreground leading-relaxed">
            This past summer, I gained hands-on software engineering experience at Narb, where I worked on backend systems 
            and core AI workflows. My contributions included refining database architecture for high-concurrency loads and 
            utilizing frameworks like LangGraph to enhance multi-step agentic processes.
            </p>

            <p className="text-muted-foreground leading-relaxed">
            I am currently seeking Software Engineering Internships for the Fall 2026 term, eager to apply 
            my skills in high-growth environments focused on challenging technical problems in cloud, AI, or core infrastructure.
            </p>

            <p className="text-muted-foreground leading-relaxed">
            Beyond my technical pursuits, I maintain a healthy work-life balance. I enjoy strength training and fitness as a way 
            to stay focused and energized. I also find creative expression through classical piano, where I love immersing 
            myself in the technical and emotional depth of the Romantic repertoire (currently working on{" "}
            <a href="https://www.youtube.com/watch?v=WhLDse5R8dQ" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/50 hover:decoration-foreground">
              Rachmaninoff's Opus 16 No. 4
            </a>
            ).
            </p>
          </div>
        </section>

        <section
          id="experience"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — Present</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  months: "Jun – Aug",
                  year: "2025",
                  role: "Software Engineer Intern",
                  company: "Narb",
                  description:
                    "High-Performance AI Workflow Optimization",
                  tech: ["Convex", "WebSockets", "LangGraph", "Vector DBs", "TypeScript"],
                },
                {
                  months: "Jan – May",
                  year: "2023",
                  role: "Software Engineer Intern",
                  company: "Oeware",
                  description:
                    "Firestore Data Pipeline Optimization & Automation",
                    tech: ["Python", "Firestore", "GCP"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors duration-500 text-left lg:text-center">
                      {job.months && job.year ? (
                        <div className="leading-tight">
                          <div className="text-sm sm:text-base font-mono text-muted-foreground whitespace-nowrap">{job.months}</div>
                          <div className="text-base sm:text-lg font-mono tracking-wide">{job.year}</div>
                        </div>
                      ) : (
                        <div className="font-mono tracking-wide whitespace-pre-line break-words">{job.year}</div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              <article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    {" "} 
                    <a href="https://github.com/ericjoseph16/semantix" target="_blank" rel="noopener noreferrer" className="underline decoration-muted-foreground/50 hover:decoration-foreground">
                      Semantix
                    </a>.
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">In Progress</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">High-performance Semantic Cache for LLMs written in Rust. 
                    Built in Rust to eliminate redundant API costs with sub-millisecond local lookups and zero-copy hashing.</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {["Rust", "Axum", "BLAKE3", "Serde", "DashMap"].map((t) => (
                      <span key={t} className="px-2 py-1 border border-border rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={(el) => { sectionsRef.current[4] = el }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:ericjoseph16@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">ericjoseph16@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href="mailto:ejoseph39@gatech.edu"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">ejoseph39@gatech.edu</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Link href="tel:+14048227769" className="hover:text-foreground transition-colors duration-300">
                      4048227769
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@ericjoseph16", url: "https://github.com/ericjoseph16" },
                  { name: "LinkedIn", handle: "eric-joseph16", url: "https://www.linkedin.com/in/eric-joseph16" },
                  { name: "Twitter", handle: "@eric_joseph16", url: "https://x.com/eric_joseph16" },
                  { name: "Instagram", handle: "@ericjoseph162", url: "https://www.instagram.com/ericjoseph162/" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="thoughts" ref={(el) => { sectionsRef.current[5] = el }} className="min-h-screen py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Current Thoughts</h2>

            <div className="space-y-8 sm:space-y-12 max-w-2xl">
              <article className="group space-y-4">
                <div className="text-sm text-muted-foreground font-mono">Currently Reading</div>
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    The Almanack of Naval Ravikant
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Exploring Naval's philosophy on wealth creation, happiness, and building systems over goals. 
                    The emphasis on leverage and specific knowledge is reshaping how I think about career and productivity.
                  </p>
                </div>
              </article>

              <article className="group space-y-4">
                <div className="text-sm text-muted-foreground font-mono">Thinking About</div>
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                    Productivity & Writing on Twitter
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reflecting on how to be more productive with my writing on Twitter. How can I create more value 
                    while maintaining authenticity? What's the balance between consistency and quality?
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              {/* <div className="text-sm text-muted-foreground">© 2025 Eric Joseph. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev by Eric Joseph</div> */}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
