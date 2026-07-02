'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Target, Compass } from 'lucide-react'

export default function Landing() {
  return (
    <div className="w-full bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Product Discovery</span>
          </div>
          <Link
            href="/app"
            className="px-6 py-2 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition"
          >
            Try it free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700 font-medium">AI-powered intelligence</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover what your competitors don't
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform raw market data into actionable insights with AI-powered analysis. Uncover hidden patterns, identify opportunities, and stay ahead of the market.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="px-8 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition flex items-center gap-2 whitespace-nowrap"
            >
              Try it free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-3 rounded-full border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition">
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 text-center">
            Tired of guessing what your market wants?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Most teams waste thousands of hours manually analyzing competitors and market trends. You&apos;re left with outdated insights and missed opportunities. It doesn&apos;t have to be this way.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            Three ways Product Discovery works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Intelligent analysis at every step of discovery
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Extract Entities</h3>
              <p className="text-gray-600">
                AI automatically identifies and extracts key entities from competitor data—products, features, pricing, and more—in seconds.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Find Relationships</h3>
              <p className="text-gray-600">
                Discover how features, pricing, and positioning connect. Map the competitive landscape with AI-powered relationship detection.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Generate Insights</h3>
              <p className="text-gray-600">
                Get contextual analysis that synthesizes all the data into actionable insights—no guesswork, pure intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
            How it works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            From raw data to actionable intelligence in three steps
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload your data</h3>
              <p className="text-gray-600">
                Paste competitor artifacts—landing pages, blog posts, feature lists, pricing pages, or any text data you want analyzed.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl text-gray-300">→</div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI analyzes instantly</h3>
              <p className="text-gray-600">
                Our AI engine processes the data, extracting key entities, finding relationships, and building a knowledge graph automatically.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl text-gray-300">→</div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get insights & search</h3>
              <p className="text-gray-600">
                Explore the interactive graph, search for patterns, and get AI-synthesized insights on competitive positioning and gaps.
              </p>
            </div>
          </div>

          {/* Mobile view arrows */}
          <div className="md:hidden flex flex-col items-center gap-6 mt-12">
            <div className="text-3xl text-gray-300">↓</div>
            <div className="text-3xl text-gray-300">↓</div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            Start discovering today
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Get instant access to product intelligence. No credit card required.
          </p>
          <Link
            href="/app"
            className="inline-flex px-10 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-700 transition items-center gap-2"
          >
            Get started free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2024 Product Discovery Intelligence. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
