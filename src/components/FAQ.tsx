"use client";

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What exactly is BuildIQ?",
        answer: "BuildIQ is an AI-powered project consultant that helps you find the perfect project to build based on your skills, market demand, and experience level. We provide complete roadmaps, market analysis, and competitive insights to help you launch successfully."
      },
      {
        question: "Is BuildIQ suitable for beginners?",
        answer: "Absolutely! Whether you're just starting out or you're an experienced founder, BuildIQ tailors its recommendations to your specific skill level and goals."
      },
      {
        question: "Do I need to sign up to try it?",
        answer: "No, you can get your first consultation for free with no signup required. It takes less than 2 minutes to get started."
      }
    ]
  },
  {
    category: "Product & Roadmap",
    questions: [
      {
        question: "What kind of projects can I build?",
        answer: "BuildIQ can suggest anything from SaaS applications and mobile apps to browser extensions and open-source tools, depending on what matches your skills and the current market trends."
      },
      {
        question: "How detailed are the roadmaps?",
        answer: "Our roadmaps include a full folder structure, a step-by-step implementation guide, recommended tech stacks, and even advice on how to monetize and market your product."
      },
      {
        question: "Can I customize the tech stack?",
        answer: "Yes, our AI takes your existing skills into account, but you can also specify preferred technologies during the consultation process."
      }
    ]
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        question: "What's included in the Free plan?",
        answer: "The Free plan gives you access to 1 user profile and up to 20 bookings or consultations per month, along with basic features and email support."
      },
      {
        question: "Can I upgrade or downgrade anytime?",
        answer: "Yes, you can change your plan at any time from your account settings. Upgrades take effect immediately, while downgrades happen at the end of your billing cycle."
      },
      {
        question: "Do you offer custom enterprise solutions?",
        answer: "Our Business plan covers most multi-user needs, but for larger organizations, we can discuss custom API access and dedicated support. Contact us for more details."
      }
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const } }),
};

const FAQ = () => {
  return (
    <section id="faq" className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about BuildIQ and how it can help you build your next big thing.
        </p>
      </motion.div>

      <div className="space-y-12">
        {faqCategories.map((cat, catIdx) => (
          <motion.div 
            key={catIdx} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp} 
            custom={catIdx + 1}
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              {cat.category}
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {cat.questions.map((q, qIdx) => (
                <AccordionItem 
                  key={qIdx} 
                  value={`${catIdx}-${qIdx}`}
                  className="glass-card-static border-none px-6 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline hover:text-primary transition-colors py-5">
                    {q.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {q.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
