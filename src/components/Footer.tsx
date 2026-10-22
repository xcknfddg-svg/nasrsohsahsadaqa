import React from 'react';
import { Heart, ShieldCheck, Droplets, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenZakat: () => void;
  onOpenDedication: () => void;
  onOpenDeeds: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenZakat,
  onOpenDedication,
  onOpenDeeds
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <span className="text-xl">🤲</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Nasr <span className="text-emerald-400">Sadaqa</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Nasr Sohsah Sadaqa is a transparent humanitarian and Islamic charitable platform dedicated to perpetual water development, orphan sponsorship, emergency food relief, and Waqf continuous charity (Sadaqah Jariyah).
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified 100% Transparent Donation Execution</span>
            </div>
          </div>

          {/* Core Giving Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Charity Portals</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#campaigns" className="hover:text-emerald-400 transition-colors">
                  Urgent Appeals &amp; Water
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-teal-400" />
                  Sadaqah Jariyah
                </a>
              </li>
              <li>
                <button onClick={onOpenZakat} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Zakat &amp; Nisab Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenDedication} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Dedicate in Honor / Memory
                </button>
              </li>
            </ul>
          </div>

          {/* Spiritual Tools */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Spiritual Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={onOpenDeeds} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Daily Good Deeds Checklist
                </button>
              </li>
              <li>
                <a href="#virtues" className="hover:text-emerald-400 transition-colors">
                  Authentic Hadiths on Sadaqa
                </a>
              </li>
              <li>
                <a href="#virtues" className="hover:text-emerald-400 transition-colors">
                  Zakat vs Sadaqah FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Spiritual Quote */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Sacred Verse</h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300">
              <p className="font-arabic text-sm text-amber-200 dir-rtl text-right mb-1.5">
                وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ
              </p>
              <p className="text-[11px] text-slate-400 italic">
                "And whatever good you put forward for yourselves, you will find it with Allah."
              </p>
              <span className="block text-[10px] text-emerald-400 mt-1">— Surah Al-Baqarah 2:110</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nasr Sohsah Sadaqa. All rights reserved. Sincere giving for humanity.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
