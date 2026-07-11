import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Lock, ExternalLink, Brain } from "lucide-react";

export function GlobalFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Elegant fade-in effect on load
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full relative mt-auto">
      {/* 2. Subtle glowing divider above the footer */}
      <div 
        id="footer-divider"
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent relative"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-sm"></div>
      </div>

      <footer 
        id="global-footer" 
        className={`w-full bg-[#050508]/90 backdrop-blur-md py-10 px-6 md:px-12 relative overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        aria-label="VoidCV Footer"
      >
        {/* 1st div child of footer: Subtle background glow */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-96 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>

        {/* 2nd div child of footer: div#footer-branding-container */}
        <div 
          id="footer-branding-container"
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 relative z-10"
        >
          {/* first 'a' element: hyperlinked logo and brand */}
          <a 
            href="https://brainexis.web.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Brainexis website, opens in a new tab"
            className="group flex items-center gap-3 font-display font-bold text-slate-100 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 rounded-xl px-4 py-2 bg-white/[0.02] border border-white/5 transition-all duration-300 md:justify-self-start"
          >
            {/* 1st div child of 'a': logo icon container */}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_12px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-all duration-300">
              {/* svg:nth-of-type(1) - Brain Logo Icon */}
              <Brain className="w-4 h-4 text-white" />
            </div>

            {/* brand text and details */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 select-none">
                  Powered by
                </span>
                <span className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-colors duration-300">
                  Brainexis
                </span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-all duration-300 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[10px] font-medium text-slate-500 font-mono tracking-wide leading-none mt-1">
                Intelligent Software &bull; AI Solutions &bull; SaaS Development
              </p>
            </div>
          </a>

          {/* 4. Trust Indicators */}
          <div 
            id="footer-trust-indicators"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 py-2 md:py-0"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-slate-400 hover:border-indigo-500/20 hover:text-indigo-300 transition duration-300 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-wide font-medium">✓ Secure Platform</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-slate-400 hover:border-indigo-500/20 hover:text-indigo-300 transition duration-300 select-none">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-wide font-medium">✓ AI Powered</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-slate-400 hover:border-indigo-500/20 hover:text-indigo-300 transition duration-300 select-none">
              <Lock className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-wide font-medium">✓ Privacy First</span>
            </div>
          </div>

          {/* 3. Copyright Section */}
          <div 
            id="footer-copyright-section"
            className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right text-[11px] font-mono"
          >
            <p className="text-slate-500">© 2026 VoidCV. All Rights Reserved.</p>
            <p className="text-slate-600 flex items-center gap-1">
              Powered by{" "}
              <a 
                href="https://brainexis.web.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-indigo-400 underline decoration-indigo-500/20 hover:decoration-indigo-500 transition-colors duration-200"
              >
                Brainexis
              </a>.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
