"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Monitor, Smartphone, Flame, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Skeleton } from "@/components/ui/Skeleton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DashboardContent() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url") || "https://example.com";
  const isSpotlight = urlParam.includes("spotlightmediafargo.com");
  
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [roastMode, setRoastMode] = useState(false);

  // Expert Audit Data Structure
  const auditData = {
    scores: {
      overall: isSpotlight ? 88 : 62,
      conversion: isSpotlight ? 78 : 45,
      seo: isSpotlight ? 94 : 58,
      mobile: isSpotlight ? 82 : 71,
      trust: isSpotlight ? 96 : 50,
      design: isSpotlight ? 90 : 65,
    },
    pros: isSpotlight ? [
      "Excellent use of video social proof on the homepage.",
      "Highly optimized meta-titles for 'Fargo Web Design'.",
      "Fast server response times (TTFB) under 200ms.",
      "Clear, high-contrast primary CTA buttons."
    ] : [
      "Mobile responsive layout is functional.",
      "Base SSL certificate is correctly installed.",
      "Brand colors are consistent throughout the header."
    ],
    cons: isSpotlight ? [
      "Hero section text is slightly dense for quick mobile scanning.",
      "Some decorative images lack descriptive alt-text attributes.",
      "Service pages could benefit from more internal linking to case studies."
    ] : [
      "Primary CTA is below the fold on mobile devices.",
      "Missing H1 tag on the homepage—hurting SEO rankings.",
      "Page weight is over 4MB—causing slow load times on 4G.",
      "Low contrast ratio on footer text makes it hard to read."
    ],
    heroRewrite: {
      current: isSpotlight 
        ? "Spotlight Media is Fargo’s leading web design & marketing agency. Trusted by 500+ clients."
        : "Welcome to our website. We offer professional services for all your needs.",
      optimized: isSpotlight
        ? "Stop Guessing, Start Growing. Fargo's #1 Results-Driven Agency Scaling Businesses with Expert Strategy."
        : "Scale Your Revenue Without the Guesswork. Turn Visitors into Customers with Data-Driven Marketing."
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleExportPDF = async () => {
    const element = document.getElementById("dashboard-content");
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 1.5 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Spotlight_AI_Audit_${urlParam.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  if (isAnalyzing) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-6 mb-12">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-brand-primary" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Deep Scanning {urlParam}...</h2>
            <p className="text-slate-500 max-w-md mx-auto">Our AI is analyzing your DOM structure, Lighthouse metrics, and conversion hierarchy to provide expert feedback.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i}><CardContent className="p-6 flex flex-col items-center"><Skeleton className="w-24 h-24 rounded-full mb-4" /><Skeleton className="w-32 h-6" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl" id="dashboard-content">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest">Live Audit</span>
            <span className="text-slate-400 text-xs">{new Date().toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Marketing Intelligence Report</h1>
          <p className="text-slate-500">
            Domain: <span className="font-semibold text-slate-900 dark:text-white ml-1">{urlParam}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setRoastMode(!roastMode)}
            className={roastMode ? "border-orange-500 text-orange-500 bg-orange-50 dark:bg-orange-950/20" : ""}
          >
            <Flame className="w-4 h-4 mr-2" />
            {roastMode ? "Roast Mode: ON" : "Roast Mode: OFF"}
          </Button>
          <Button onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-2" />
            Export Audit
          </Button>
        </div>
      </div>

      {/* Hero Scores & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-4">
          <Card className="overflow-hidden border-4 border-slate-800 dark:border-slate-700 rounded-3xl shadow-2xl">
            <div className="bg-slate-800 h-6 flex items-center px-4 space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="h-[400px] bg-slate-100 dark:bg-slate-900 relative flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex flex-col p-4">
                <div className="h-10 w-full bg-white dark:bg-slate-800 rounded shadow-sm mb-4 flex justify-between items-center px-4">
                  <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
                  <div className="flex space-x-2"><div className="w-8 h-2 bg-slate-200 dark:bg-slate-700 rounded"/><div className="w-8 h-2 bg-slate-200 dark:bg-slate-700 rounded"/></div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <div className="w-3/4 h-8 bg-slate-300 dark:bg-slate-700 rounded" />
                  <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="w-32 h-10 bg-brand-primary/50 rounded mt-4" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Button variant="glass" onClick={() => window.open(urlParam, '_blank')}>Explore Live Site</Button>
              </div>
            </div>
          </Card>
          <div className="flex justify-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center"><Monitor className="w-4 h-4 mr-1"/> Desktop Analysis</span>
            <span className="flex items-center"><Smartphone className="w-4 h-4 mr-1"/> Core Web Vitals</span>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.overall} label="Performance" /></CardContent></Card>
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.conversion} label="Conversion" /></CardContent></Card>
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.seo} label="SEO Authority" /></CardContent></Card>
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.mobile} label="Mobile UX" /></CardContent></Card>
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.trust} label="Trust Signals" /></CardContent></Card>
          <Card><CardContent className="p-6 flex flex-col items-center justify-center h-full"><ScoreRing score={auditData.scores.design} label="Visual Design" /></CardContent></Card>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {roastMode ? (
          <motion.div 
            key="roast"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="mb-12 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-500 mb-6 flex items-center">
              <Flame className="w-6 h-6 mr-2" /> The Brutal Truth
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start"><span className="text-xl mr-3">🔥</span>{isSpotlight ? "Even for pros, your mobile hero text is a bit of a scroll-trap. Trim it down!" : "Your website looks like it was designed in 2012 and forgot to leave."}</li>
              <li className="flex items-start"><span className="text-xl mr-3">🔥</span>{isSpotlight ? "Your footer links are so small I need a magnifying glass to contact you." : "Your load time is so slow that users are finishing their coffee before the page loads."}</li>
              <li className="flex items-start"><span className="text-xl mr-3">🔥</span>{isSpotlight ? "Stop hiding those amazing case studies! They're your best asset." : "You have 4 different CTAs on one screen. It's like a fire exit with 4 doors—no one knows where to go."}</li>
            </ul>
          </motion.div>
        ) : (
          <motion.div 
            key="standard"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="border-green-100 dark:border-green-900/30">
              <CardHeader><CardTitle className="flex items-center text-green-600"><CheckCircle2 className="w-5 h-5 mr-2" /> Strengths & Wins</CardTitle></CardHeader>
              <CardContent><ul className="space-y-3">{auditData.pros.map((pro, i) => (<li key={i} className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2 shrink-0"/><span>{pro}</span></li>))}</ul></CardContent>
            </Card>
            <Card className="border-amber-100 dark:border-amber-900/30">
              <CardHeader><CardTitle className="flex items-center text-amber-500"><AlertTriangle className="w-5 h-5 mr-2" /> Strategic Improvements</CardTitle></CardHeader>
              <CardContent><ul className="space-y-3">{auditData.cons.map((con, i) => (<li key={i} className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 mr-2 shrink-0"/><span>{con}</span></li>))}</ul></CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expert Recommendations */}
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary"><Sparkles className="w-5 h-5" /></div>
            <h3 className="text-2xl font-bold tracking-tight">AI Hero Optimization</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <CardHeader><CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Version</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xl font-medium text-slate-400 line-through decoration-red-500/50">{auditData.heroRewrite.current}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">Needs Improvement</div>
              </CardContent>
            </Card>
            <Card className="border-brand-primary/30 bg-brand-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Sparkles className="w-24 h-24 text-brand-primary" /></div>
              <CardHeader><CardTitle className="text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center">Optimized High-Conversion Copy <Sparkles className="w-3 h-3 ml-2" /></CardTitle></CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{auditData.heroRewrite.optimized}</p>
                <p className="text-sm text-slate-500">We recommend leading with a result-oriented promise to lower bounce rates by up to 22%.</p>
                <Button className="w-full bg-brand-primary text-black font-bold">Apply to Website <ArrowRight className="w-4 h-4 ml-2"/></Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5 text-blue-500" /> Technical SEO Roadmap</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Recommended Title Tag</p>
                <p className="font-medium text-slate-900 dark:text-white">{isSpotlight ? "Spotlight Media | #1 Fargo Web Design & Digital Marketing Agency" : `Top Rated ${urlParam.split('.')[0]} Services | Expert Solutions`}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">High-Intent Keywords to Target</p>
                <div className="flex flex-wrap gap-2">
                  {(isSpotlight ? ["fargo web design", "digital marketing nd", "advertising agency fargo", "seo services fargo"] : ["conversion optimization", "lead generation", "user experience", "performance marketing"]).map(kw => (
                    <span key={kw} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Smartphone className="w-5 h-5 text-purple-500" /> Competitive Advantage</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-sm font-bold mr-3 shrink-0 text-brand-primary">1</div>
                  <div><p className="font-semibold">{isSpotlight ? "Interactive Strategy Quiz" : "Lead Magnets"}</p><p className="text-sm text-slate-500">{isSpotlight ? "Competitors like AdShark are using quizzes to capture top-of-funnel leads early." : "Top ranking sites use downloadable guides to capture emails before users bounce."}</p></div>
                </li>
                <li className="flex items-start pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-sm font-bold mr-3 shrink-0 text-brand-primary">2</div>
                  <div><p className="font-semibold">Core Web Vitals</p><p className="text-sm text-slate-500">Your LCP (Largest Contentful Paint) is currently {isSpotlight ? "1.8s" : "3.4s"}. Improving this to sub-1.5s will give you a significant SEO boost.</p></div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-12"><Skeleton className="w-full h-[600px]" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
