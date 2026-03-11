"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const messages = [
  'Analyzing your skill set...',
  'Finding the perfect project...',
  'Researching competitors...',
  'Calculating revenue potential...',
  'Building your roadmap...',
  'Almost ready...',
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1500);
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);
    const timeout = setTimeout(onComplete, 5000);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); clearTimeout(timeout); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-4">
      <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}>
        <Brain className="w-16 h-16 text-primary" />
      </motion.div>
      <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">BuildIQ is Consulting...</h2>
      <motion.p key={msgIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="text-muted-foreground text-sm mb-8">
        {messages[msgIndex]}
      </motion.p>
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: 'var(--gradient-violet)' }}
          animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
