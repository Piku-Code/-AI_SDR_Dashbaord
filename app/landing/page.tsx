"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, ChevronDown } from "lucide-react";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AURA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex text-gray-400 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg transition-all border border-white/10">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 ease-out"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
              left: `${mousePosition.x * 0.3}%`,
              top: `${mousePosition.y * 0.3}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 transition-all duration-1000 ease-out"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)",
              right: `${100 - mousePosition.x * 0.2}%`,
              bottom: `${100 - mousePosition.y * 0.2}%`,
              transform: "translate(50%, 50%)",
            }}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 bg-gradient-to-r from-cyan-500 to-blue-500 top-1/4 left-1/4" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block">Your AI-Powered</span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Sales Development
            </span>
            <span className="block">Revolution</span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Automate your outreach, personalize at scale, and book more meetings with 
            AURA - the intelligent SDR that works 24/7 to grow your pipeline.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:scale-105"
            >
              <span>Start Free Trial</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all">
              <span>Watch Demo</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto transition-all duration-700 delay-[400ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { value: "10x", label: "More Meetings" },
              { value: "85%", label: "Time Saved" },
              { value: "3.2M+", label: "Emails Sent" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors animate-bounce"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={20} />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                supercharge
              </span>{" "}
              sales
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AURA combines cutting-edge AI with proven sales strategies to help you close more deals faster.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast Outreach",
                description: "Send personalized emails at scale without sacrificing quality. Our AI crafts messages that resonate.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                icon: Shield,
                title: "Smart Inbox Warming",
                description: "Protect your sender reputation with intelligent warming schedules and domain health monitoring.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: BarChart3,
                title: "Actionable Insights",
                description: "Real-time analytics and AI-powered recommendations to optimize your campaigns continuously.",
                gradient: "from-violet-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity -z-10`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to transform your sales?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of sales teams already using AURA to exceed their targets.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold">AURA</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2024 AURA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

