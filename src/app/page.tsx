"use client";

import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import { useRouter } from 'next/navigation';
import { Lightbulb, BarChart3, Map, ArrowRight, Sparkles, Check, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const } }),
};

export default function Landing() {
  const router = useRouter();

  return (
    <>
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 mb-8"
          style={{ background: 'rgba(124,58,237,0.08)' }}>
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">BuildIQ Project Consultant</span>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 text-foreground tracking-tight">
          Stop Guessing.<br />
          Start Building<br />
          <span className="text-gradient">The Right Thing.</span>
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell us your skill our AI will tell you exactly what project to build, who your competitors are, how to make money, and give you a complete roadmap from zero to launch.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
          <button onClick={() => router.push('/consult')}
            className="gradient-btn px-8 py-4 text-base sm:text-lg inline-flex items-center gap-2 cursor-pointer">
            Get My Consultation <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Lightbulb className="w-7 h-7 text-primary" />, title: 'Perfect Project Match', text: 'AI finds the best project for your skill, market & experience level' },
            { icon: <BarChart3 className="w-7 h-7 text-secondary" />, title: 'Full Market Analysis', text: 'Market demand, competitors, revenue potential all in one place' },
            { icon: <Map className="w-7 h-7 text-accent" />, title: 'Zero to Hero Roadmap', text: 'Complete folder structure and step by step roadmap to go from idea to launched product' },
          ].map((card, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="glass-card p-8">
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
     <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight text-center">How it works</h2>
      <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed text-center mb-4">
         That's how this BuildIQ works.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Enter Your Skill', desc: 'Tell us what you\'re good at' },
            { step: '02', title: 'Answer 3 Quick Questions', desc: 'Help us narrow down your path' },
            { step: '03', title: 'Get Your Full Consultation', desc: 'Complete roadmap, analysis & more' },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="text-center glass-card">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-black text-primary"
                style={{ background: 'rgba(124,58,237,0.1)' }}>
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
              {i < 2 && <div className="hidden md:block text-muted-foreground text-2xl mt-4">→</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing Section */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Pricing</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Start free. Upgrade when you're ready to scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {[
            {
              name: 'FREE',
              price: '$0',
              description: 'Perfect for exploring your first idea',
              icon: <Zap className="w-6 h-6 text-muted-foreground/50" />,
              features: ['1 user profile', '20 bookings/month', 'Basic features', 'Email support'],
              recommended: false,
              cta: 'Choose Plan'
            },
            {
              name: 'PRO',
              price: '$29',
              description: 'For serious entrepreneurs and founders',
              icon: <Crown className="w-6 h-6 text-primary" />,
              features: ['Unlimited bookings', 'SMS reminders', 'Payment processing', 'Analytics dashboard', 'Priority support'],
              recommended: true,
              cta: 'Get Started'
            },
            {
              name: 'BUSINESS',
              price: '$79',
              description: 'For teams and accelerators',
              icon: <Sparkles className="w-6 h-6 text-muted-foreground/50" />,
              features: ['Everything in Pro', 'Multi-user support', 'Custom branding', 'API access', 'Dedicated support'],
              recommended: false,
              cta: 'Choose Plan'
            },
          ].map((tier, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className={`relative rounded-[2.5rem] p-[1.5px] group transition-all duration-500 ${
                tier.recommended 
                  ? 'bg-gradient-to-b from-primary via-primary/50 to-transparent shadow-[0_0_50px_-12px_rgba(124,58,237,0.3)]' 
                  : 'bg-border/50 hover:bg-border'
              }`}>
              <div className={`h-full rounded-[2.5rem] p-10 flex flex-col ${
                tier.recommended 
                  ? 'bg-[#080808]' 
                  : 'bg-[#0D0D0D]'
              }`}>
                {tier.recommended && (
                  <div className="mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full">Recommended</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tier.recommended ? 'bg-primary/10' : 'bg-white/5'}`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-black text-foreground tracking-tight">{tier.name}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{tier.description}</p>

                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl font-black text-foreground tracking-tighter">{tier.price}</span>
                  <span className="text-lg text-muted-foreground font-medium">/mo</span>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 group/item">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        tier.recommended ? 'bg-primary/20 group-hover/item:bg-primary/30' : 'bg-white/5 group-hover/item:bg-white/10'
                      }`}>
                        <Check className={`w-3 h-3 ${tier.recommended ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <span className="text-sm text-muted-foreground/90 font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    tier.recommended
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)] active:scale-[0.98]'
                      : 'bg-white/5 text-foreground hover:bg-white/10 border border-white/10 active:scale-[0.98]'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-muted-foreground text-xs">
        Built with ✦ BuildIQ AI Project Consultant
      </footer>
    </div>
    </>
  );
}
