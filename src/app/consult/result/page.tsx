"use client";

import { useConsultation } from '@/context/ConsultationContext';
import { generateConsultation } from '@/lib/consultationData';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowRight, RotateCcw, Download, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ConsultResult() {
  const { formData, roadmapChecks, setRoadmapChecks } = useConsultation();
  const router = useRouter();
  const data = useMemo(() => generateConsultation(formData), [formData]);
  const [copiedStructure, setCopiedStructure] = useState(false);

  // Redirect if no data
  if (!formData.skill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No consultation data</h2>
          <button onClick={() => router.push('/consult')} className="gradient-btn px-6 py-3 cursor-pointer">Start Consultation</button>
        </div>
      </div>
    );
  }

  const copyStructure = () => {
    navigator.clipboard.writeText(data.folderStructure);
    setCopiedStructure(true);
    toast.success('Folder structure copied!');
    setTimeout(() => setCopiedStructure(false), 2000);
  };

  const toggleCheck = (key: string) => {
    setRoadmapChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const priorityBadge = (p: string) => {
    if (p === 'must') return <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">🔴 Must Have</span>;
    if (p === 'should') return <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">🟡 Should Have</span>;
    return <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">🔵 Nice to Have</span>;
  };

  const diffBadge = (d: string) => {
    const colors: Record<string, string> = { Easy: 'text-secondary', Medium: 'text-accent', Hard: 'text-destructive' };
    return <span className={`text-xs font-medium ${colors[d]}`}>{d}</span>;
  };

  // Score ring
  const scoreCircumference = 2 * Math.PI * 54;
  const scoreOffset = scoreCircumference - (data.projectScore / 100) * scoreCircumference;

  return (

    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 py-3 px-4" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="font-bold text-foreground cursor-pointer" onClick={() => router.push('/')}>BuildIQ</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{formData.skill}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{formData.buildType}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{formData.market}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 space-y-16">

        {/* SECTION 1: Project Recommendation */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="gradient-border p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">AI Recommended Project</p>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">{data.projectName}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{formData.buildType}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">{formData.market}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{data.projectDescription}</p>
                <div className="glass-card-static p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Why this project for YOU:</p>
                  <ul className="space-y-1.5">
                    {data.whyThisProject.map((w, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">✦</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                      strokeDasharray={scoreCircumference} strokeDashoffset={scoreOffset} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-foreground">{data.projectScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Project Score</span>
                <div className="flex flex-col gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full glass-card-static text-foreground">📈 High Demand</span>
                  <span className="px-3 py-1 rounded-full glass-card-static text-foreground">💰 {data.monthlyRevenue} Potential</span>
                  <span className="px-3 py-1 rounded-full glass-card-static text-foreground">⏱️ {data.buildTime} to build</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: Core Features */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Core Features To Build</h2>
          <p className="text-muted-foreground text-sm mb-8">These are the must-have features for your project</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((f, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{f.icon}</span>
                  {priorityBadge(f.priority)}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">{f.name}</h4>
                <p className="text-xs text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 3: Market Demand */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Market Demand Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div className="glass-card p-5">
                <p className="text-xs text-muted-foreground mb-2">Demand Level</p>
                <p className="text-xl font-bold text-foreground mb-3">{data.demandLevel}</p>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${data.demandPercent}%` }} />
                </div>
              </div>
              <div className="glass-card p-5">
                <p className="text-3xl font-black text-foreground">{data.marketSize}</p>
                <p className="text-sm text-muted-foreground">Global market size</p>
                <p className="text-sm text-secondary font-semibold mt-1">{data.marketGrowth}</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-xs text-muted-foreground mb-3">Market Growth Trend</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={data.marketTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#71717a', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                    <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">{data.marketOpportunity}</p>
              </div>
              {data.opportunityHighlights.map((h, i) => (
                <div key={i} className="glass-card p-4 flex items-start gap-3">
                  <span className="text-xl">{h.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{h.title}</h4>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                {data.marketValues.map((v, i) => (
                  <div key={i} className="glass-card p-3 text-center">
                    <span className="text-lg">{v.icon}</span>
                    <p className="text-xs font-bold text-foreground mt-1">{v.value}</p>
                    <p className="text-[10px] text-muted-foreground">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: Competitors */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Your Competitors</h2>
          <p className="text-muted-foreground text-sm mb-4">Know who you're up against and how to beat them</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <span>⚔️</span>
            <span className="text-sm font-semibold text-accent">{data.competitionLevel} Competition</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.competitors.map((c, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/5 border border-white/10">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`} 
                      alt={c.name}
                      className="w-6 h-6 object-contain rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold text-foreground">${c.initials}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{c.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c.type}</span>
                      <span className="text-[10px] text-muted-foreground">Founded {c.founded}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-destructive mb-1">Weakness: {c.weakness}</p>
                <p className="text-xs text-secondary">Your Edge: {c.yourEdge}</p>
              </div>
            ))}
          </div>
          <div className="gradient-border p-6 mt-8">
            <h4 className="text-sm font-bold text-foreground mb-3">Your Competitive Advantage</h4>
            <ul className="space-y-2">
              {data.competitiveAdvantage.map((a, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">✦</span> {a}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* SECTION 5: Revenue Model */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">How You'll Make Money</h2>
          <p className="text-muted-foreground text-sm mb-8">Multiple ways to monetize your project</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {data.revenueStreams.map((r, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{r.icon}</span>
                  {diffBadge(r.difficulty)}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">{r.type}</h4>
                <p className="text-xs text-muted-foreground mb-2">{r.description}</p>
                <p className="text-sm font-bold text-primary">{r.estimate}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="glass-card p-6">
            <h4 className="text-sm font-bold text-foreground mb-4">Projected Monthly Revenue</h4>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.revenueProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} />
                <YAxis tick={{ fill: '#71717a', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 8, color: '#fff', fontSize: 12 }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* SECTION 6: Folder Structure */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Complete Project Folder Structure</h2>
          <p className="text-muted-foreground text-sm mb-8">Your guided codebase structure — ready to start coding</p>
          <div className="relative glass-card-static overflow-hidden">
            <button onClick={copyStructure}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer z-10">
              {copiedStructure ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
            <pre className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed text-muted-foreground font-mono">
              {data.folderStructure}
            </pre>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {data.techStack.map((t, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium glass-card-static text-foreground">{t}</span>
            ))}
          </div>
        </motion.section>

        {/* SECTION 7: Roadmap */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Your Zero to Hero Roadmap</h2>
          <p className="text-muted-foreground text-sm mb-10">Follow this step by step — from complete beginner to launched product</p>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />
            <div className="space-y-10">
              {data.roadmap.map((phase) => (
                <div key={phase.phase} className="relative flex gap-6">
                  {/* Phase circle */}
                  <div className="hidden sm:flex flex-col items-center z-10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-foreground shrink-0"
                      style={{ background: phase.color + '22', border: `2px solid ${phase.color}` }}>
                      {phase.phase}
                    </div>
                  </div>
                  <div className="flex-1 glass-card-static p-6">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-foreground shrink-0"
                        style={{ background: phase.color + '22', border: `2px solid ${phase.color}` }}>
                        {phase.phase}
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{phase.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: phase.color + '15', color: phase.color }}>
                        {phase.duration}
                      </span>
                    </div>
                    <div className="space-y-2 mt-4">
                      {phase.tasks.map((task, j) => {
                        const key = `${phase.phase}-${j}`;
                        return (
                          <label key={j} className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" checked={!!roadmapChecks[key]} onChange={() => toggleCheck(key)}
                              className="mt-0.5 w-4 h-4 rounded accent-primary" style={{ accentColor: '#7c3aed' }} />
                            <span className={`text-sm transition-colors ${roadmapChecks[key] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                              {task}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <span className="text-xs font-semibold" style={{ color: phase.color }}>{phase.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="gradient-border p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Ready to start building?</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="gradient-btn px-6 py-3 inline-flex items-center justify-center gap-2 text-sm cursor-pointer">
                <Download className="w-4 h-4" /> Download Full Roadmap
              </button>
              <button onClick={copyStructure} className="px-6 py-3 rounded-xl border border-border text-foreground text-sm hover:border-primary/40 transition-colors cursor-pointer inline-flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" /> Copy Folder Structure
              </button>
              <button onClick={() => router.push('/consult')} className="px-6 py-3 rounded-xl text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer inline-flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Start New Consultation
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  
  );
}
