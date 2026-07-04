"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [ctaClicked, setCtaClicked] = useState(false);

  function handleCtaClick() {
    setCtaClicked(true);
    setTimeout(() => setCtaClicked(false), 1200);
  }

  return (
    <>
      {/* Animated background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[100px] animate-float-slower"></div>
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 animate-fade-down">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-primary-container flex items-center justify-center font-bold text-on-primary-container">
            CL
          </div>
          <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter">
            CodeLens
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link
            className="font-label-caps text-label-caps text-primary border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-200"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/docs"
          >
            Docs
          </Link>
        </div>
        <div className="hidden md:block">
          <Link href="/review">
            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded font-label-caps text-label-caps hover:bg-blue-600 transition-colors glow-effect active:scale-95">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col md:flex-row gap-gutter">
        {/* Side icons */}
        <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex-col items-center py-6 gap-8 bg-surface-container-lowest border-r border-outline-variant/10">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="p-3 bg-primary-container text-on-primary-container rounded-lg transition-all duration-300 ease-in-out glow-effect">
              <span className="text-xs font-bold">{"</>"}</span>
            </div>
            <span className="font-label-caps text-label-caps text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              JS
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-surface-variant rounded p-2 transition-all duration-300 ease-in-out">
            <span className="text-xs font-bold text-on-surface-variant">PY</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
              PY
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-surface-variant rounded p-2 transition-all duration-300 ease-in-out">
            <span className="text-xs font-bold text-on-surface-variant">JV</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
              JAVA
            </span>
          </div>
        </aside>

        {/* Hero Section */}
        <div className="flex-1 lg:pl-24 pt-16 lg:pt-32 pb-32 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              Powered by DevCode
            </span>
          </div>

          <h1
            className="font-display-lg-mobile md:font-display-lg leading-[0.95] tracking-tightest mb-8 max-w-4xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-on-surface">Code Review,</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Reimagined with AI
            </span>
          </h1>

          <p
            className="font-body-base text-on-surface-variant mb-10 max-w-2xl text-xl md:text-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Paste your code and get instant, deep analysis — time and space
            complexity, hidden bugs, and smarter approaches. No setup, no API
            keys, just answers.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/review">
              <button
                onClick={handleCtaClick}
                className={`relative overflow-hidden px-8 py-4 rounded font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  ctaClicked
                    ? "bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                    : "bg-[#3b82f6] text-white hover:bg-blue-600 glow-effect hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
                }`}
              >
                <span className="text-lg">{ctaClicked ? "✅" : "🚀"}</span>
                {ctaClicked ? "Let's go!" : "Start Free Trial"}
              </button>
            </Link>
            <button className="bg-transparent border border-[#262626] text-on-surface hover:border-[#404040] hover:text-white px-8 py-4 rounded font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 active:scale-95 hover:-translate-y-0.5">
              ▶ View Demo
            </button>
          </div>

          {/* Floating Editor Mockup */}
          <div
            className="w-full max-w-4xl bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-xl overflow-hidden shadow-2xl relative animate-fade-up transition-transform duration-500 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.06] before:to-transparent before:pointer-events-none"
            style={{ animationDelay: "320ms" }}
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/10 p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="ml-4 font-code-sm text-code-sm text-outline-variant flex-1 text-center pr-8">
                src/auth/validate.ts
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 font-code-sm text-code-sm overflow-x-auto relative bg-[#0d0d0d]/60">
                <div className="flex mb-1 opacity-50">
                  <span className="w-8 text-right pr-4 select-none">12</span>
                  <span>
                    <span className="text-primary-fixed">export const</span>{" "}
                    <span className="text-tertiary">validateToken</span>{" "}
                    <span className="text-on-surface">= async</span> (token:{" "}
                    <span className="text-secondary-fixed">string</span>) =&gt; &#123;
                  </span>
                </div>
                <div className="flex mb-1 opacity-50">
                  <span className="w-8 text-right pr-4 select-none">13</span>
                  <span className="pl-4">
                    <span className="text-primary-fixed">if</span> (!token){" "}
                    <span className="text-primary-fixed">throw new</span>{" "}
                    <span className="text-secondary-fixed">Error</span>(
                    <span className="text-tertiary-fixed-dim">
                      &apos;Missing token&apos;
                    </span>
                    );
                  </span>
                </div>
                <div className="flex mb-1 bg-red-900/10 border-l-2 border-red-500 relative">
                  <span className="w-8 text-right pr-4 text-red-500/50 select-none">
                    14
                  </span>
                  <span className="pl-4 text-on-surface-variant line-through opacity-70">
                    <span className="text-primary-fixed">const</span> user ={" "}
                    <span className="text-on-surface">jwt.decode</span>(token);
                  </span>
                </div>
                <div className="flex mb-1 bg-green-900/10 border-l-2 border-green-500 relative glow-effect">
                  <span className="w-8 text-right pr-4 text-green-500/50 select-none">
                    15
                  </span>
                  <span className="pl-4">
                    <span className="text-primary-fixed">const</span> user ={" "}
                    <span className="text-primary-fixed">await</span>{" "}
                    <span className="text-on-surface">jwt.verify</span>(token,
                    process.env.JWT_SECRET);
                  </span>
                </div>
                <div className="flex mb-1 opacity-50">
                  <span className="w-8 text-right pr-4 select-none">16</span>
                  <span className="pl-4">
                    <span className="text-primary-fixed">return</span> user;
                  </span>
                </div>
                <div className="flex mb-1 opacity-50">
                  <span className="w-8 text-right pr-4 select-none">17</span>
                  <span>&#125;</span>
                </div>
              </div>

              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 bg-[#141414]/60 p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary text-sm">✨</span>
                  <span className="font-label-caps text-label-caps text-on-surface">
                    AI Review
                  </span>
                </div>
                <div className="bg-[#1c1c1c]/80 p-3 rounded border border-red-900/30 relative">
                  <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-caps text-xs text-red-400 bg-red-900/20 px-2 py-0.5 rounded-full border border-red-900/50">
                      Security Vulnerability
                    </span>
                    <span className="font-code-sm text-[10px] text-outline-variant">
                      Line 14
                    </span>
                  </div>
                  <p className="font-body-base text-sm text-on-surface-variant">
                    Using{" "}
                    <span className="font-code-sm text-on-surface bg-surface-variant px-1 rounded">
                      jwt.decode
                    </span>{" "}
                    without verification allows potential token forgery.
                    Replaced with{" "}
                    <span className="font-code-sm text-on-surface bg-surface-variant px-1 rounded">
                      jwt.verify
                    </span>
                    .
                  </p>
                </div>
                <div className="bg-[#1c1c1c]/80 p-3 rounded border border-white/10 relative">
                  <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-caps text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded-full border border-blue-900/50">
                      Optimization
                    </span>
                    <span className="font-code-sm text-[10px] text-outline-variant">
                      Global
                    </span>
                  </div>
                  <p className="font-body-base text-sm text-on-surface-variant">
                    Consider caching verified tokens to reduce CPU load if
                    called frequently in this middleware.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* How it Works */}
      <section className="w-full py-24 px-margin-desktop max-w-[1280px] mx-auto flex flex-col items-center gap-12 z-10 relative">
        <div className="text-center mb-8 animate-fade-up">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            How it Works
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/15 p-8 rounded-xl hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300 group hover:-translate-y-1 animate-fade-up before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent before:pointer-events-none"
            style={{ animationDelay: "0ms" }}
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-6 glow-effect transition-transform group-hover:scale-110 relative z-10">
              🌳
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-4 relative z-10">
              1. Code Ingestion
            </h3>
            <p className="font-body-base text-on-surface-variant relative z-10">
              Paste your code or connect a repo — CodeLens scans it instantly,
              no setup required.
            </p>
          </div>
          <div
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/15 p-8 rounded-xl hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300 group hover:-translate-y-1 animate-fade-up before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent before:pointer-events-none"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-6 glow-effect transition-transform group-hover:scale-110 relative z-10">
              🧠
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-4 relative z-10">
              2. Deep Context Analysis
            </h3>
            <p className="font-body-base text-on-surface-variant relative z-10">
              Our models analyze logic, security, and performance patterns
              using LLM context windows.
            </p>
          </div>
          <div
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/15 p-8 rounded-xl hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300 group hover:-translate-y-1 animate-fade-up before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/[0.05] before:to-transparent before:pointer-events-none"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-6 glow-effect transition-transform group-hover:scale-110 relative z-10">
              ⚡
            </div>
            <h3 className="font-headline-md text-xl text-on-surface mb-4 relative z-10">
              3. Actionable Feedback
            </h3>
            <p className="font-body-base text-on-surface-variant relative z-10">
              Get instant, structured suggestions you can apply directly to
              your code.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 bg-surface-container-low border-t border-outline-variant/20 z-10 relative">
        <div className="font-headline-md text-headline-md text-on-surface">
          CodeLens AI
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          <Link
            className="font-body-base text-body-base text-on-surface-variant hover:text-on-background transition-opacity opacity-80 hover:opacity-100"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-body-base text-body-base text-on-surface-variant hover:text-on-background transition-opacity opacity-80 hover:opacity-100"
            href="/terms"
          >
            Terms of Service
          </Link>
        </div>
        <div className="font-body-base text-body-base text-secondary opacity-60 text-sm">
          © 2026 CodeLens AI. Built for the grid.
        </div>
      </footer>
    </>
  );
}