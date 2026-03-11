"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Full-stack Developer",
    company: "CloudScale Solutions",
    content: "BuildIQ completely changed how I approach side projects. Instead of building random apps, I'm now focusing on things that actually have market potential.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "Innovate Labs",
    content: "The market analysis provided by BuildIQ is top-notch. It saved me weeks of research time and gave me confidence in my next venture.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "SaaS Founder",
    company: "LaunchPad",
    content: "The roadmap is a game-changer. It breaks down complex builds into manageable steps, making the impossible feel totally achievable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "Emily Davis",
    role: "UI/UX Designer",
    company: "CreativeFlow",
    content: "BuildIQ helped me bridge the gap between design and business logic. The project matches are spot on for my design-heavy skill set.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    name: "David Smith",
    role: "Indie Hacker",
    company: "SoloBuilds",
    content: "If you're building alone, you need this. It's like having a co-founder who knows exactly what the market wants.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

// Double the testimonials for seamless loop
const allTestimonials = [...testimonials, ...testimonials];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const } }),
};

const Testimonials = () => {
  return (
    <section className="pb-24 overflow-hidden">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">Trusted by Builders Worldwide</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
          Join thousands of developers and entrepreneurs who use BuildIQ to turn their ideas into successful products.
        </p>
      </motion.div>

      <div className="relative flex overflow-x-hidden">
        {/* Carousel Container */}
        <motion.div 
          className="flex gap-6 animate-carousel py-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          whileHover={{ transition: { duration: 60 } }} // Slow down on hover
        >
          {allTestimonials.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] sm:w-[400px]">
              <div className="glass-card p-8 h-full flex flex-col relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-6" aria-label={`Rating: ${t.rating} stars`}>
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-foreground/90 text-sm leading-relaxed mb-8 italic">
                  &quot;{t.content}&quot;
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-primary/20">
                    <AvatarImage src={t.avatar} alt={t.name} loading="lazy" />
                    <AvatarFallback>{t.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role} @ {t.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Masking gradients for smooth entry/exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      {/* Schema Markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": testimonials.map((t, i) => ({
            "@type": "Review",
            "position": i + 1,
            "author": {
              "@type": "Person",
              "name": t.name
            },
            "reviewBody": t.content,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": t.rating,
              "bestRating": 5
            }
          }))
        })}
      </script>
    </section>
  );
};

export default Testimonials;
