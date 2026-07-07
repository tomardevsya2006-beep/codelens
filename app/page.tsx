"use client";
import { GlowCard } from "./components/GlowCard";
import { RetroGrid } from "@/components/ui/retro-grid"; 
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [ctaClicked, setCtaClicked] = useState(false);

  function handleCtaClick() {
    setCtaClicked(true);
    setTimeout(() => setCtaClicked(false), 1200);
  }

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden text-white">
      
      {/* Background Layer: Wrapped in a clean absolute opacity manager container */}
      <div className="fixed inset-0 h-screen w-screen pointer-events-none z-0 overflow-hidden bg-black opacity-30">
        <RetroGrid />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-black/80 backdrop-blur-md border-b border-neutral-800 animate-fade-down">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-neutral-900 flex items-center justify-center font-bold text-white border border-neutral-800">
            CL
          </div>
          <span className="font-headline-md text-headline-md font-bold text-white tracking-tighter">
            CodeLens
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link className="font-label-caps text-label-caps text-blue-400 border-b-2 border-blue-400 pb-1 hover:text-blue-300 transition-colors duration-200" href="/features">Features</Link>
          <Link className="font-label-caps text-label-caps text-neutral-400 hover:text-blue-400 transition-colors duration-200" href="/how-it-works">How It Works</Link>
          <Link className="font-label-caps text-label-caps text-neutral-400 hover:text-blue-400 transition-colors duration-200" href="/pricing">Pricing</Link>
          <Link className="font-label-caps text-label-caps text-neutral-400 hover:text-blue-400 transition-colors duration-200" href="/docs">Docs</Link>
        </div>
        <div className="hidden md:block">
          <Link href="/review">
            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded font-label-caps text-label-caps hover:bg-blue-600 transition-colors active:scale-95">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Main Content */}
        <main className="pt-24 px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col md:flex-row gap-gutter">
          {/* Side icons */}
          <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-20 flex-col items-center py-6 gap-8 bg-neutral-950 border-r border-neutral-900">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="p-3 bg-neutral-900 text-white border border-neutral-800 rounded-lg transition-all duration-300 ease-in-out">
                <span className="text-xs font-bold">{"</>"}</span>
              </div>
              <span className="font-label-caps text-label-caps text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">JS</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-neutral-900 rounded p-2 transition-all duration-300 ease-in-out">
              <span className="text-xs font-bold text-neutral-400">PY</span>
              <span className="font-label-caps text-label-caps text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">PY</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-neutral-900 rounded p-2 transition-all duration-300 ease-in-out">
              <span className="text-xs font-bold text-neutral-400">JV</span>
              <span className="font-label-caps text-label-caps text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">JAVA</span>
            </div>
          </aside>

          {/* Hero Section */}
          <div className="flex-1 lg:pl-24 pt-16 lg:pt-32 pb-32 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-neutral-400">Powered by DevCode</span>
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg leading-[0.95] tracking-tightest mb-8 max-w-4xl animate-fade-up" style={{ animationDelay: "80ms" }}>
              <span className="text-white">Code Review,</span><br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Reimagined with AI
              </span>
            </h1>

            <p className="font-body-base text-neutral-400 mb-10 max-w-2xl text-xl md:text-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
              Paste your code and get instant, deep analysis — time and space complexity, hidden bugs, and smarter approaches. No setup, no API keys, just answers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-up" style={{ animationDelay: "240ms" }}>
              <Link href="/review">
                <button onClick={handleCtaClick} className={`relative overflow-hidden px-8 py-4 rounded font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 active:scale-95 ${ctaClicked ? "bg-green-500 text-white" : "bg-[#3b82f6] text-white hover:bg-blue-600"}`}>
                  <span className="text-lg">{ctaClicked ? "✅" : "🚀"}</span>
                  {ctaClicked ? "Let's go!" : "Start Free Trial"}
                </button>
              </Link>
              <button className="bg-transparent border border-neutral-800 text-white hover:border-neutral-700 px-8 py-4 rounded font-label-caps text-label-caps transition-all flex items-center justify-center gap-2 active:scale-95">
                ▶ View Demo
              </button>
            </div>

            {/* Floating Editor Mockup */}
            <div className="w-full max-w-4xl bg-neutral-900/40 backdrop-blur-2xl border border-neutral-800 rounded-xl overflow-hidden shadow-2xl relative animate-fade-up" style={{ animationDelay: "320ms" }}>
              <div className="bg-neutral-950 p-3 flex items-center gap-2 border-b border-neutral-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-4 font-code-sm text-code-sm text-neutral-500 flex-1 text-center pr-8">src/auth/validate.ts</div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6 font-code-sm text-code-sm overflow-x-auto relative bg-black/40">
                  <div className="flex mb-1 opacity-50">
                    <span className="w-8 text-right pr-4 select-none">12</span>
                    <span><span className="text-blue-400">export const</span> <span className="text-purple-400">validateToken</span> = async (token: <span className="text-green-400">string</span>) =&gt; &#123;</span>
                  </div>
                  <div className="flex mb-1 opacity-50">
                    <span className="w-8 text-right pr-4 select-none">13</span>
                    <span className="pl-4"><span className="text-blue-400">if</span> (!token) <span className="text-blue-400">throw new</span> <span className="text-green-400">Error</span>(&apos;Missing token&apos;);</span>
                  </div>
                  <div className="flex mb-1 bg-red-950/20 border-l-2 border-red-500 relative">
                    <span className="w-8 text-right pr-4 text-red-500/50 select-none">14</span>
                    <span className="pl-4 text-neutral-500 line-through"><span className="text-blue-400">const</span> user = jwt.decode(token);</span>
                  </div>
                  <div className="flex mb-1 bg-green-950/20 border-l-2 border-green-500 relative">
                    <span className="w-8 text-right pr-4 text-green-500/50 select-none">15</span>
                    <span className="pl-4"><span className="text-blue-400">const</span> user = <span className="text-blue-400">await</span> jwt.verify(token, process.env.JWT_SECRET);</span>
                  </div>
                  <div className="flex mb-1 opacity-50">
                    <span className="w-8 text-right pr-4 select-none">16</span>
                    <span className="pl-4"><span className="text-blue-400">return user;</span></span>
                  </div>
                  <div className="flex mb-1 opacity-50">
                    <span className="w-8 text-right pr-4 select-none">17</span>
                    <span>&#125;</span>
                  </div>
                </div>

                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-950/40 p-4 flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 text-sm">✨</span>
                    <span className="font-label-caps text-label-caps text-white">AI Review</span>
                  </div>
                  <div className="bg-neutral-900/60 p-3 rounded border border-red-900/30 relative">
                    <div className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-red-400 bg-red-950 px-2 py-0.5 rounded-full border border-red-900/50">Security Vulnerability</span>
                      <span className="text-[10px] text-neutral-500">Line 14</span>
                    </div>
                    <p className="text-sm text-neutral-400">Using <span className="text-white bg-neutral-800 px-1 rounded">jwt.decode</span> without verification allows potential token forgery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* How it Works Section */}
        <section className="w-full py-24 px-margin-desktop max-w-[1280px] mx-auto flex flex-col items-center gap-12">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="font-headline-md text-headline-md text-white mb-4">How it Works</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <GlowCard glowColor="blue" className="p-8 bg-neutral-900/30 border border-neutral-800 rounded-xl">
              <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">🌳</div>
              <h3 className="text-xl text-white mb-4">1. Code Ingestion</h3>
              <p className="text-neutral-400">Paste your code or connect a repo — CodeLens scans it instantly.</p>
            </GlowCard>
            <GlowCard glowColor="purple" className="p-8 bg-neutral-900/30 border border-neutral-800 rounded-xl">
              <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">🧠</div>
              <h3 className="text-xl text-white mb-4">2. Context Analysis</h3>
              <p className="text-neutral-400">Our models analyze logic, security, and performance patterns.</p>
            </GlowCard>
            <GlowCard glowColor="blue" className="p-8 bg-neutral-900/30 border border-neutral-800 rounded-xl">
              <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">⚡</div>
              <h3 className="text-xl text-white mb-4">3. Feedback</h3>
              <p className="text-neutral-400">Get instant, structured suggestions you can apply directly.</p>
            </GlowCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12 px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6 bg-neutral-950 border-t border-neutral-900">
          <div className="text-white">CodeLens AI</div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link className="text-neutral-400 hover:text-white transition-opacity" href="/privacy">Privacy Policy</Link>
            <Link className="text-neutral-400 hover:text-white transition-opacity" href="/terms">Terms of Service</Link>
          </div>
          <div className="text-neutral-500 text-sm">© 2026 CodeLens AI. Built for the grid.</div>
        </footer>
      </div>
    </div>
  );
}