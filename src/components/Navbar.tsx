"use client";

import { Zap, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50" style={{ background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-violet)' }}>
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">BuildIQ</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            How it Works
          </a>
          <button className="gradient-btn px-5 py-2.5 text-sm cursor-pointer">
            Start Free
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 px-4 py-4 flex flex-col gap-3" style={{ background: 'rgba(8,8,8,0.95)' }}>
          <a href="#how-it-works" className="text-sm text-muted-foreground py-2" onClick={() => setMenuOpen(false)}>How it Works</a>
          <button onClick={() => { setMenuOpen(false); router.push('/consult'); }} className="gradient-btn px-5 py-2.5 text-sm">
            Start Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
