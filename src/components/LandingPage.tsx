import React, { useState } from "react";
import { 
  Layout, 
  Search, 
  FileText, 
  Linkedin, 
  Brain, 
  TrendingUp, 
  Code,
  ArrowRight,
  Star,
  Check,
  Award,
  Sparkles,
  Zap,
  ShieldCheck,
  User,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { DEFAULT_TEMPLATES } from "../templates/TemplateRegistry";

interface LandingPageProps {
  isLoggedIn: boolean;
  userEmail: string | null;
  onLogout: () => void;
  onSelectFeature: (featureId: string) => void;
  onOpenAuth: () => void;
}

export function LandingPage({ 
  isLoggedIn, 
  userEmail, 
  onLogout, 
  onSelectFeature, 
  onOpenAuth 
}: LandingPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("ats");

  const FEATURES = [
    {
      id: "builder",
      name: "AI Resume Builder",
      desc: "Create high-performing ATS-optimized resumes using advanced AI. Tailor-match bullets and structure templates dynamically.",
      icon: Layout,
      color: "from-blue-500 to-indigo-600",
      pill: "ATS Optimized"
    },
    {
      id: "analyzer",
      name: "AI Resume Analyzer",
      desc: "Upload existing PDF/DOCX resumes, target-scan roles, audit hidden risks, and perform interactive score recalculations.",
      icon: Search,
      color: "from-purple-500 to-indigo-600",
      pill: "Instant Audit"
    },
    {
      id: "coverletter",
      name: "AI Cover Letter Generator",
      desc: "Generate hyper-tailored pitch letters designed specifically for corporate, startup, or creative layouts.",
      icon: FileText,
      color: "from-pink-500 to-rose-600",
      pill: "High Conversion"
    },
    {
      id: "linkedin",
      name: "LinkedIn Optimizer",
      desc: "Revamp header metrics, optimize keyword densities, and craft high-impact bio descriptions to stand out to recruiters.",
      icon: Linkedin,
      color: "from-sky-500 to-blue-600",
      pill: "Recruiter Magnet"
    },
    {
      id: "interview",
      name: "Interview Copilot",
      desc: "Access live mock interview setups powered by generative prompts, respond interactively, and view feedback analysis.",
      icon: Brain,
      color: "from-indigo-500 to-violet-600",
      pill: "Live Prep"
    },
    {
      id: "career",
      name: "Career Copilot",
      desc: "Scan structural skills deficiencies, check hiring trends, and build automated certified learning paths instantly.",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      pill: "Path Generator"
    },
    {
      id: "portfolio",
      name: "Portfolio Builder",
      desc: "Compile detailed, beautiful portfolio static code websites automatically from your configured resume database.",
      icon: Code,
      color: "from-violet-500 to-fuchsia-600",
      pill: "One-Click Deploy"
    }
  ];

  /* Archived Pricing Architecture for Future Re-introduction:
  const PRICING_PLANS = [
    {
      name: "Free Forge",
      price: "$0",
      period: "forever",
      desc: "Great for basic resume generation and quick standard formatting checks.",
      features: [
        "1 ATS Standard Resume",
        "Basic Resume Builder entry",
        "Standard AI suggestions",
        "Plain text export formats",
        "No continuous credit system required"
      ],
      cta: "Start Free",
      isPopular: false,
      buttonStyle: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
    },
    {
      name: "Professional Plan",
      price: "$19",
      period: "month",
      desc: "The sweet spot for active job seekers targeting mid-to-senior levels.",
      features: [
        "Unlimited resumes and storage",
        "Unlimited ATS Scans and Audits",
        "AI Cover Letter & LinkedIn Optimizer",
        "Full access to Interview Copilot",
        "High-priority server-side generator queue",
        "Premium Serif & Modern Layout Templates"
      ],
      cta: "Upgrade to Pro",
      isPopular: true,
      buttonStyle: "bg-indigo-650 hover:bg-indigo-550 text-white shadow-lg shadow-indigo-600/20"
    },
    {
      name: "Executive Suite",
      price: "$39",
      period: "month",
      desc: "Perfect for senior leaders, directors, and consultants seeking premium support.",
      features: [
        "Everything in Professional Plan",
        "AI Portfolio Web Builder with hosting code",
        "Advanced career roadmap modeling",
        "Highest priority credits for continuous audits",
        "VIP dedicated feedback streams",
        "Full support for document imports (PDF, DOCX)"
      ],
      cta: "Join Executive",
      isPopular: false,
      buttonStyle: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
    }
  ];

  const TESTIMONIALS = [
    {
      quote: "Using VoidCV, I completely redesigned my standard engineering resume. The ATS Analyzer flagged three key missing keywords for the Lead React Engineer job. Received two interviews in one week!",
      author: "Marcus Chen",
      role: "Lead Software Architect",
      company: "Stripe",
      rating: 5,
      avatarBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
    },
    {
      quote: "The Portfolio Builder alone was worth it. I clicked a single export option and got a responsive static page, which I linked in my profile. The recruiter specifically mentioned liking my portfolio!",
      author: "Sarah Jenkins",
      role: "Senior UX Designer",
      company: "Vercel",
      rating: 5,
      avatarBg: "bg-violet-500/10 border-violet-500/30 text-violet-400"
    },
    {
      quote: "As an academic moving into corporate tech, standard resume layouts were failing me. The Sleek Indigo layout paired with the Career Roadmap advice optimized my landing pitch. Strongly recommend.",
      author: "Dr. Elena Rostova",
      role: "Data Science Director",
      company: "Anthropic",
      rating: 5,
      avatarBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
    }
  ];
  */

  const handleFeatureClick = (featureId: string) => {
    // Passes user directly to workspace if logged in, otherwise auth.
    onSelectFeature(featureId);
  };

  const handleHeroCTA = () => {
    if (isLoggedIn) {
      onSelectFeature("builder");
    } else {
      onOpenAuth();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070709] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/5 to-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-500/5 to-pink-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#070709]/80 backdrop-blur-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/25 font-display text-lg">
            VC
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white font-display">
              VoidCV
            </h1>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
        </nav>

        {/* Auth CTA / Status */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-mono text-slate-300">{userEmail}</span>
              </div>
              <button 
                onClick={() => onSelectFeature("builder")} 
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition cursor-pointer"
              >
                Go to Workspace
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-slate-350 hover:bg-white/10 hover:text-white text-xs font-medium cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/10 cursor-pointer active:scale-95 transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5 select-text">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          
          {/* Subtle announcement badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#A78BFA]">Next-Gen ATS Engine is Online</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.05]">
            Build Smarter Resumes.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">Get Hired Faster.</span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            AI-powered platform to build, optimize, and grow your career. Align skills with hiring algorithms, generate portfolio code instantly, and optimize LinkedIn presence easily.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleHeroCTA}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-full flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-indigo-600/25 transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-xs rounded-full border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 transition"
            >
              Explore Features
            </a>
          </div>

          {/* Core benefit tags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left max-w-3xl mx-auto border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Check className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-white">99% ATS Acceptance</p>
                <p className="text-[10px] text-slate-500">Industry standards</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Zap className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Instant Generation</p>
                <p className="text-[10px] text-slate-500">Real-time compilation</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Audit Scanning</p>
                <p className="text-[10px] text-slate-500">Risk risk tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Code className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Interactive Portfolios</p>
                <p className="text-[10px] text-slate-500">One-click website builder</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Section Grid */}
      <section id="features" className="px-6 py-20 max-w-7xl mx-auto w-full border-b border-white/5 select-text">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
          <p className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-bold">Suite of Intelligence</p>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            A Complete Career Forge Workspace
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Every feature is calibrated by professional recruitment criteria to maximize standard screen passing speeds. Explore our suite without immediate login friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id}
                className="bg-[#0D0D11] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-slate-900 border border-white/10 rounded-xl">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded-full text-indigo-300 font-bold">
                      {feature.pill}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mb-2 font-display">
                    {feature.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6">
                    {feature.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleFeatureClick(feature.id)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-indigo-650 text-slate-350 hover:text-white border border-white/5 hover:border-transparent text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all group cursor-pointer active:scale-95"
                >
                  <span>Try Now</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Template Showcase Section */}
      <section id="templates" className="px-6 py-20 bg-slate-950/40 border-b border-white/5 select-text">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-3">
            <p className="text-[10px] uppercase font-mono tracking-widest text-[#EC4899] font-bold">Aesthetic Design Systems</p>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
              Resume Templates Showcase
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Choose professional, high-impact layouts without authentication. All designs auto-compile and flow instantly based on recruiter feedback and ATS bot structures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left template cards list list */}
            <div className="lg:col-span-1 space-y-2 max-h-[500px] overflow-y-auto pr-2 customs-scrollbar">
              {DEFAULT_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  type="button"
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    selectedTemplate === tpl.id
                      ? "bg-[#0D0D11] border-indigo-500/40 text-white"
                      : "bg-transparent border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ background: tpl.previewThumbnail }}
                  >
                    <span className="text-[10px] font-bold text-white uppercase">{tpl.name[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold truncate">{tpl.name}</p>
                      <span className="text-[9px] font-mono font-bold text-emerald-400">{tpl.atsRating}% ATS</span>
                    </div>
                    <p className="text-[10px] opacity-70 truncate mt-0.5">{tpl.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Large Preview Pane */}
            <div className="lg:col-span-3 bg-[#0D0D11] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />
              
              {(() => {
                const activeTpl = DEFAULT_TEMPLATES.find(t => t.id === selectedTemplate) || DEFAULT_TEMPLATES[0];
                return (
                  <>
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/5 mb-6 gap-3">
                      <div>
                        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                          {activeTpl.name}
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold rounded">
                            ATS Acceptance: {activeTpl.atsRating}% Score
                          </span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{activeTpl.desc}</p>
                      </div>
                      <button
                        onClick={() => handleFeatureClick("builder")}
                        className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                      >
                        <span>Apply Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Paper Mockup representing spacing structure */}
                    <div className="flex-1 bg-white rounded-xl shadow-lg p-5 text-slate-800 text-left scale-[0.98] select-none shadow-indigo-500/[0.03]">
                      
                      {/* Name placeholder block */}
                      <div className="pb-3 mb-3 border-b border-slate-200" style={{ fontFamily: activeTpl.metadata.fontFamily }}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-extrabold tracking-tight" style={{ color: activeTpl.metadata.accentColor }}>
                            ALEXANDER COOPER
                          </h4>
                          <span className="text-[9px] font-mono bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase">
                            SAMPLE RESUME LAYOUT
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">Software Architect | San Francisco, CA | alex@coopertech.com | +1 (555) 0192</p>
                      </div>

                      {/* Brief text block */}
                      <div className="space-y-1 mb-3">
                        <div className="h-4 bg-slate-100 rounded w-full" />
                        <div className="h-4 bg-slate-100 rounded w-5/6" />
                      </div>

                      {/* Section 1 */}
                      <div className="mb-3">
                        <h5 className="text-[10px] uppercase font-bold tracking-widest pb-1 border-b mb-2" style={{ borderColor: activeTpl.metadata.accentColor, color: activeTpl.metadata.accentColor, fontFamily: activeTpl.metadata.fontFamily }}>
                          EXPERIENCE WORK HISTORY
                        </h5>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span>Lead Platform Developer &mdash; FinTech Global</span>
                              <span className="text-slate-500">2023 &mdash; Present</span>
                            </div>
                            <ul className="list-none space-y-1 mt-1 pl-3 text-[9px] text-slate-600">
                              <li className="flex items-start gap-1">
                                <span className="text-slate-400 mt-0.5">{activeTpl.metadata.bulletIcon}</span>
                                <span>Spearheaded Node.js API container optimization decreasing overall response times by 35% across all payment gateways.</span>
                              </li>
                              <li className="flex items-start gap-1">
                                <span className="text-slate-400 mt-0.5">{activeTpl.metadata.bulletIcon}</span>
                                <span>Architected distributed queue databases serving over 250,000 active concurrent connections daily securely.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div>
                        <h5 className="text-[10px] uppercase font-bold tracking-widest pb-1 border-b mb-2" style={{ borderColor: activeTpl.metadata.accentColor, color: activeTpl.metadata.accentColor, fontFamily: activeTpl.metadata.fontFamily }}>
                          TECHNICAL CAPABILITIES
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {["React", "TypeScript", "Node.js", "Express", "Vite", "Firebase Auth", "PostgreSQL", "Tailwind CSS", "Docker"].map((sk) => (
                            <span key={sk} className="text-[8px] bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="px-6 py-24 text-center relative overflow-hidden bg-radial-[at_center_center] from-[#1e1b4b]/30 to-[#070709]">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-xl mx-auto space-y-6 relative z-10 select-text">
          <Award className="w-10 h-10 text-indigo-400 mx-auto" />
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
            Ready to Accelerate Your Career Ascent?
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Build your baseline resumes and optimize cover letter streams directly. Setup takes less than two minutes.
          </p>
          <button
            onClick={handleHeroCTA}
            className="px-8 py-3.5 bg-indigo-650 hover:bg-indigo-550 text-white font-bold text-xs rounded-full shadow-lg shadow-indigo-650/15 cursor-pointer active:scale-95 transition-all inline-flex items-center gap-2 group mx-auto"
          >
            <span>Create Your Free Workspace</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-white/5 py-12 px-6 bg-slate-950/60 font-sans select-text text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white font-display text-sm">
              VC
            </div>
            <div>
              <p className="font-bold text-white tracking-tight leading-none text-xs">VoidCV</p>
              <p className="text-[10px] text-slate-500 mt-1">&copy; {new Date().getFullYear()} VoidCV. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <span className="text-slate-600">&bull;</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verified Secure SSL</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
