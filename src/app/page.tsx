"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    // Add a slight artificial delay for the "processing" feel
    setTimeout(() => {
      router.push(`/dashboard?url=${encodeURIComponent(url)}`);
    }, 800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-15 dark:opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-brand-primary)] blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white pt-8 leading-[1.1]">
            Your Homepage Might Be <br className="hidden md:block" />
            <span className="text-[var(--color-brand-primary)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Losing Customers.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant AI-powered feedback on your website&apos;s design, SEO, and conversion performance.
          </p>

          <form onSubmit={handleAnalyze} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-2xl rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-within:border-[var(--color-brand-primary)] dark:focus-within:border-[var(--color-brand-primary)] transition-all p-2 pr-2">
              <div className="pl-4 pr-2 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                required
                className="flex-1 bg-transparent border-none outline-none text-lg py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="ml-2 px-8"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Analyze My Homepage</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </form>

          {/* Social Proof / Trusted By */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 pt-10 border-t border-slate-200/60 dark:border-slate-800/60 overflow-hidden"
          >
            <p className="text-sm font-medium text-slate-500 mb-10 uppercase tracking-widest">
              Trusted by Fargo, ND and Nationwide Companies
            </p>
            
            <div className="relative flex overflow-hidden group">
              <div className="animate-scroll flex items-center gap-20 py-4">
                {/* First Set of Logos */}
                {[
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Bank-Forward-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/FCCU-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Jacuzzi-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Kilbourne-Group-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/JRMC-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Precision-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Thunder-Seed-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Wimmers-Logo.png"
                ].map((logo, index) => (
                  <img 
                    key={`logo-1-${index}`} 
                    src={logo} 
                    alt="Client Logo" 
                    className="h-10 md:h-12 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none" 
                  />
                ))}
                {/* Duplicated Set for Seamless Loop */}
                {[
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Bank-Forward-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/FCCU-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Jacuzzi-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Kilbourne-Group-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/JRMC-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Precision-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Thunder-Seed-Logo.png",
                  "https://spotlightmediafargo.com/wp-content/uploads/2024/06/Wimmers-Logo.png"
                ].map((logo, index) => (
                  <img 
                    key={`logo-2-${index}`} 
                    src={logo} 
                    alt="Client Logo" 
                    className="h-10 md:h-12 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none" 
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
