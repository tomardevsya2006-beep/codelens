"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type ErrorItem = {
  line: number;
  severity: "high" | "medium" | "low";
  message: string;
};

type ReviewResult = {
  timeComplexity: string;
  spaceComplexity: string;
  errors: ErrorItem[];
  betterApproach: string;
  summary: string;
};

export default function ReviewPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReview() {
    if (!code || code.trim().length === 0) {
      setError("Please paste some code first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const cleaned = data.result.replace(/```json|```/g, "").trim();
      const parsed: ReviewResult = JSON.parse(cleaned);
      setResult(parsed);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  const severityColor: Record<string, string> = {
    high: "text-red-400 bg-red-900/20 border-red-900/50",
    medium: "text-yellow-400 bg-yellow-900/20 border-yellow-900/50",
    low: "text-blue-400 bg-blue-900/20 border-blue-900/50",
  };

  return (
    <div className="bg-background text-on-surface font-body-base min-h-screen bg-grid-pattern">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 animate-fade-down">
        <div className="flex justify-between items-center h-16 px-6 md:px-margin-desktop max-w-[1280px] mx-auto">
          <Link
            href="/"
            className="font-display-lg text-[24px] text-on-surface tracking-tighter font-extrabold transition-opacity hover:opacity-80"
          >
            CodeLens
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
              href="/features"
            >
              FEATURES
            </Link>
            <Link
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
              href="/how-it-works"
            >
              HOW IT WORKS
            </Link>
            <Link
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
              href="/pricing"
            >
              PRICING
            </Link>
            <Link
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors"
              href="/docs"
            >
              DOCS
            </Link>
          </div>
          <Link href="/review">
            <button className="bg-primary-container text-primary font-label-caps text-label-caps px-6 py-2.5 rounded hover:bg-primary/10 transition-all duration-200 active:scale-95 border border-primary/20">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 md:px-margin-desktop max-w-[1280px] mx-auto">
        <header className="mb-12 animate-fade-up">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
            Review Workspace
          </h1>
          <p className="text-on-surface-variant opacity-70">
            Initialize a new code analysis by providing your source logic.
          </p>
        </header>

        {/* Language selector */}
        <div className="mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/30 rounded px-4 py-2 text-on-surface font-label-caps text-label-caps transition-colors hover:border-primary/40 focus:border-primary focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[600px] animate-fade-up"
          style={{ animationDelay: "140ms" }}
        >
          {/* Left Column: macOS-style editor with Monaco inside */}
          <div className="flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl transition-shadow hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]">
            {/* Mac header */}
            <div className="bg-surface-container-high/50 px-4 py-3 flex items-center justify-between border-b border-outline-variant/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] transition-transform hover:scale-125"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] transition-transform hover:scale-125"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] transition-transform hover:scale-125"></div>
              </div>
              <div className="text-[11px] font-label-caps text-on-surface-variant tracking-widest opacity-50 uppercase">
                input.
                {language === "python"
                  ? "py"
                  : language === "java"
                  ? "java"
                  : language === "typescript"
                  ? "ts"
                  : "js"}
              </div>
              <div className="w-12"></div>
            </div>

            {/* Monaco editor */}
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value: string | undefined) => setCode(value ?? "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                }}
              />
            </div>

            {/* Footer action */}
            <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={handleReview}
                disabled={loading}
                className="flex items-center gap-2 bg-primary-container text-primary font-label-caps text-label-caps px-8 py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:-translate-y-0.5"
              >
                <span
                  className={`text-[18px] inline-block ${
                    loading ? "animate-spin-slow" : ""
                  }`}
                >
                  ⚡
                </span>
                {loading ? "REVIEWING..." : "REVIEW CODE"}
              </button>
            </div>
          </div>

          {/* Right Column: Results / Empty / Loading */}
          <div className="flex flex-col">
            {/* EMPTY STATE */}
            {!result && !loading && !error && (
              <div className="flex flex-col bg-surface-container-lowest/50 border-2 border-dashed border-outline-variant/40 rounded-xl items-center justify-center p-12 text-center flex-1 animate-fade-in transition-colors hover:border-primary/30 group">
                <div className="w-24 h-24 rounded-full bg-primary-container/10 flex items-center justify-center mb-8 border border-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-[48px] text-primary/40 transition-colors group-hover:text-primary/70">
                    {"</>"}
                  </span>
                </div>
                <h2 className="font-headline-md text-on-surface-variant mb-4 text-[24px]">
                  Awaiting Analysis
                </h2>
                <p className="max-w-md text-on-surface-variant/60 leading-relaxed">
                  Paste your code and click Review to get started. Our AI will
                  analyze your logic in seconds, identifying bottlenecks,
                  security flaws, and architectural improvements.
                </p>
                <div className="mt-12 flex gap-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="px-4 py-2 border border-outline-variant/30 rounded font-label-caps text-[10px] tracking-tighter">
                    VULNERABILITIES
                  </div>
                  <div className="px-4 py-2 border border-outline-variant/30 rounded font-label-caps text-[10px] tracking-tighter">
                    PERFORMANCE
                  </div>
                  <div className="px-4 py-2 border border-outline-variant/30 rounded font-label-caps text-[10px] tracking-tighter">
                    CLEAN CODE
                  </div>
                </div>
              </div>
            )}

            {/* ERROR STATE */}
            {error && (
              <div className="flex flex-col bg-red-900/10 border-2 border-dashed border-red-900/40 rounded-xl items-center justify-center p-12 text-center flex-1 animate-shake">
                <div className="text-4xl mb-4 animate-fade-in">⚠️</div>
                <p className="text-red-300 max-w-md animate-fade-in" style={{ animationDelay: "100ms" }}>
                  {error}
                </p>
              </div>
            )}

            {/* LOADING SKELETON */}
            {loading && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div className="relative bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col gap-3 overflow-hidden">
                  <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                  <div className="h-3 bg-surface-container-high rounded w-1/3"></div>
                  <div className="absolute inset-0 shimmer"></div>
                </div>
                <div className="relative bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col gap-2 overflow-hidden">
                  <div className="h-3 bg-surface-container-high rounded w-full"></div>
                  <div className="h-3 bg-surface-container-high rounded w-5/6"></div>
                  <div className="absolute inset-0 shimmer" style={{ animationDelay: "150ms" }}></div>
                </div>
                <div className="relative bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col gap-2 overflow-hidden">
                  <div className="h-3 bg-surface-container-high rounded w-1/4"></div>
                  <div className="h-3 bg-surface-container-high rounded w-full"></div>
                  <div className="absolute inset-0 shimmer" style={{ animationDelay: "300ms" }}></div>
                </div>
                <p className="text-xs text-on-surface-variant text-center opacity-60 animate-pulse">
                Codelens is analyzing your code...
                </p>
              </div>
            )}

            {/* RESULTS */}
            {result && !loading && (
              <div className="flex flex-col gap-4">
                <div
                  className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col gap-2 animate-fade-up transition-colors hover:border-primary/30"
                  style={{ animationDelay: "0ms" }}
                >
                  <div className="flex justify-between">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Time Complexity
                    </span>
                    <span className="font-code-sm text-primary">
                      {result.timeComplexity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Space Complexity
                    </span>
                    <span className="font-code-sm text-primary">
                      {result.spaceComplexity}
                    </span>
                  </div>
                </div>

                <div
                  className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 animate-fade-up transition-colors hover:border-primary/30"
                  style={{ animationDelay: "80ms" }}
                >
                  <p className="text-sm text-on-surface-variant">
                    {result.summary}
                  </p>
                </div>

                {result.errors?.map((err, i) => (
                  <div
                    key={i}
                    className={`bg-surface-container p-3 rounded border relative animate-fade-up transition-transform hover:-translate-y-0.5 ${severityColor[err.severity]}`}
                    style={{ animationDelay: `${160 + i * 70}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`font-label-caps text-xs px-2 py-0.5 rounded-full border ${severityColor[err.severity]}`}
                      >
                        {err.severity.toUpperCase()}
                      </span>
                      <span className="font-code-sm text-[10px] text-outline-variant">
                        Line {err.line}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant">
                      {err.message}
                    </p>
                  </div>
                ))}

                {result.betterApproach && (
                  <div
                    className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 animate-fade-up transition-colors hover:border-primary/30"
                    style={{
                      animationDelay: `${160 + (result.errors?.length || 0) * 70 + 80}ms`,
                    }}
                  >
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                      💡 Better Approach
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      {result.betterApproach}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick suggestion cards */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <div className="text-primary mb-3 text-xl transition-transform hover:scale-110 inline-block">
              🕒
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface mb-2">
              RECENT REVIEWS
            </h3>
            <p className="text-on-surface-variant text-[13px]">
              Quickly jump back into your last 5 analyzed snippets.
            </p>
          </div>
          <div
            className="p-6 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <div className="text-secondary mb-3 text-xl transition-transform hover:scale-110 inline-block">
              🔗
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface mb-2">
              GITHUB INTEGRATION
            </h3>
            <p className="text-on-surface-variant text-[13px]">
              Connect your repo to automatically review every Pull Request.
            </p>
          </div>
          <div
            className="p-6 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div className="text-tertiary mb-3 text-xl transition-transform hover:scale-110 inline-block">
              ✨
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface mb-2">
              LEARN BEST PRACTICES
            </h3>
            <p className="text-on-surface-variant text-[13px]">
              Browse our documentation on AI-driven code optimization.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-surface border-t border-outline-variant/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-margin-desktop max-w-[1280px] mx-auto">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display-lg text-[20px] text-on-surface mb-4">
              CodeLens
            </div>
            <p className="text-on-surface-variant text-[14px]">
              © 2026 CodeLens. Built for developers.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-primary text-[11px] mb-2">
              RESOURCES
            </span>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-[14px]"
              href="/docs"
            >
              Documentation
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-primary text-[11px] mb-2">
              LEGAL
            </span>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors text-[14px]"
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}