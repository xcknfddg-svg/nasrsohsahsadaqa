import React from 'react';
import { Heart, Droplets, Calculator, CheckCircle2, History, Globe } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/currencies';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenZakatCalc: () => void;
  onOpenDedication: () => void;
  onOpenDailyDeeds: () => void;
  onOpenHistory: () => void;
  onQuickDonate: () => void;
  donationHistoryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenZakatCalc,
  onOpenDedication,
  onOpenDailyDeeds,
  onOpenHistory,
  onQuickDonate,
  donationHistoryCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>100% Donation Policy: Every penny of your Sadaqah goes directly to verified beneficiaries on the ground.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <span className="text-2xl select-none">🤲</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Nasr <span className="text-emerald-700">Sadaqa</span>
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  نَصْرٌ وَصَدَقَةٌ
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Islamic Charitable Giving & Sadaqah Jariyah</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a 
              href="#campaigns" 
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors"
            >
              Appeals
            </a>
            <a 
              href="#simulator" 
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors flex items-center gap-1.5"
            >
              <Droplets className="w-4 h-4 text-teal-600" />
              Sadaqah Jariyah
            </a>
            <button 
              onClick={onOpenZakatCalc}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              Zakat Calculator
            </button>
            <button 
              onClick={onOpenDedication}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Dedicate in Honor
            </button>
            <button 
              onClick={onOpenDailyDeeds}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              Daily Deeds
            </button>
            <a 
              href="#virtues" 
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-colors"
            >
              Virtues & Hadith
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 hidden sm:block" />
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent text-xs font-semibold text-slate-700 pr-2 pl-1 py-1 focus:outline-none cursor-pointer"
                title="Select Currency"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c as Currency].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Donation History Button */}
            <button
              onClick={onOpenHistory}
              className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 relative"
              title="View your donation history"
            >
              <History className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">My Pledges</span>
              {donationHistoryCount > 0 && (
                <span className="w-5 h-5 bg-emerald-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {donationHistoryCount}
                </span>
              )}
            </button>

            {/* Give Now Button */}
            <button
              onClick={onQuickDonate}
              className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-xl shadow-md shadow-emerald-700/25 transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>Give Sadaqa</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
