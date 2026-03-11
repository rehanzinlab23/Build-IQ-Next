"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConsultation } from '@/context/ConsultationContext';
import { Globe, Wrench, Smartphone, Sprout, Zap, Trophy, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';


const skillChips = [
  'React Developer', 'Flutter Developer', 'Python Developer', 'UI/UX Designer',
  'WordPress Developer', 'Unity Game Dev', 'Data Scientist', 'Node.js Developer',
  'Shopify Developer', 'No-Code Developer',
];

const markets = [
  { emoji: '💻', label: 'Tech & Software' }, { emoji: '🛒', label: 'E-Commerce & Retail' },
  { emoji: '🏥', label: 'Healthcare' }, { emoji: '🎓', label: 'Education' },
  { emoji: '💰', label: 'Finance & FinTech' }, { emoji: '🍕', label: 'Food & Restaurant' },
  { emoji: '🏠', label: 'Real Estate' }, { emoji: '🎨', label: 'Design & Creative' },
  { emoji: '📱', label: 'Social Media & Marketing' }, { emoji: '⚙️', label: 'Other / General' },
];

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
};

export default function Consult() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useConsultation();
  const router = useRouter();

  const canNext = () => {
    if (step === 1) return formData.skill.trim().length > 0;
    if (step === 2) return formData.buildType !== '';
    if (step === 3) return formData.market !== '';
    if (step === 4) return formData.experience !== '';
    return false;
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  const handleLoadingComplete = () => {
    router.push('/consult/result');
  };

  if (loading) return <LoadingScreen onComplete={handleLoadingComplete} />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <motion.div className="h-full rounded-r-full" style={{ background: 'var(--gradient-violet)' }}
          animate={{ width: `${(step / 4) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8 justify-center">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s === step ? 'bg-primary text-primary-foreground' : s < step ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {s}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}>

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">What is your main skill?</h2>
                  <p className="text-muted-foreground mb-8">Be specific — this helps us give better recommendations</p>
                  <input type="text" value={formData.skill}
                    onChange={(e) => setFormData(prev => ({ ...prev, skill: e.target.value }))}
                    placeholder="e.g. React Developer, UI/UX Designer, Python Developer..."
                    className="w-full p-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-base" />
                  <div className="flex flex-wrap gap-2 mt-6">
                    {skillChips.map((chip) => (
                      <button key={chip} onClick={() => setFormData(prev => ({ ...prev, skill: chip }))}
                        className={`px-4 py-2 rounded-full text-sm border transition-all cursor-pointer ${formData.skill === chip ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">What do you want to build?</h2>
                  <p className="text-muted-foreground mb-8">Choose what excites you most</p>
                  <div className="grid gap-4">
                    {[
                      { value: 'Website', icon: <Globe className="w-8 h-8" />, sub: 'Landing pages, portfolios, business sites, web apps' },
                      { value: 'Tool / SaaS', icon: <Wrench className="w-8 h-8" />, sub: 'Software tools, dashboards, AI-powered apps, platforms' },
                      { value: 'Mobile App', icon: <Smartphone className="w-8 h-8" />, sub: 'iOS, Android, or cross-platform mobile applications' },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setFormData(prev => ({ ...prev, buildType: opt.value }))}
                        className={`glass-card p-6 text-left flex items-start gap-4 cursor-pointer ${formData.buildType === opt.value ? 'step-selected' : ''}`}>
                        <div className="text-primary">{opt.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{opt.value}</h3>
                          <p className="text-sm text-muted-foreground">{opt.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Which market are you targeting?</h2>
                  <p className="text-muted-foreground mb-8">Who will use what you build?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {markets.map((m) => (
                      <button key={m.label} onClick={() => setFormData(prev => ({ ...prev, market: m.label }))}
                        className={`glass-card p-4 text-left cursor-pointer flex items-center gap-3 ${formData.market === m.label ? 'step-selected' : ''}`}>
                        <span className="text-xl">{m.emoji}</span>
                        <span className="text-sm font-medium text-foreground">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">How experienced are you?</h2>
                  <p className="text-muted-foreground mb-8">This helps us match the right complexity project for you</p>
                  <div className="grid gap-4">
                    {[
                      { value: 'Beginner', icon: <Sprout className="w-8 h-8" />, sub: '0 - 1 year experience', desc: 'Still learning, built a few small things' },
                      { value: 'Intermediate', icon: <Zap className="w-8 h-8" />, sub: '1 - 3 years experience', desc: 'Comfortable building, completed real projects' },
                      { value: 'Expert', icon: <Trophy className="w-8 h-8" />, sub: '3+ years experience', desc: 'Strong skills, shipped production projects' },
                    ].map((opt) => (
                      <button key={opt.value} onClick={() => setFormData(prev => ({ ...prev, experience: opt.value }))}
                        className={`glass-card p-6 text-left flex items-start gap-4 cursor-pointer ${formData.experience === opt.value ? 'step-selected' : ''}`}>
                        <div className="text-primary">{opt.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-foreground">{opt.value}</h3>
                            <span className="text-xs text-muted-foreground">{opt.sub}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button onClick={() => router.push('/')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" /> Home
              </button>
            )}
            {step < 4 ? (
              <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
                className={`gradient-btn px-6 py-3 inline-flex items-center gap-2 text-sm cursor-pointer ${!canNext() ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => canNext() && handleSubmit()} disabled={!canNext()}
                className={`gradient-btn px-8 py-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm cursor-pointer ${!canNext() ? 'opacity-40 cursor-not-allowed' : ''}`}>
                Get My Consultation <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
          {step === 4 && <p className="text-center text-muted-foreground text-xs mt-4">Generating your personalized consultation in seconds...</p>}
        </div>
      </div>
    </div>
  );
}
