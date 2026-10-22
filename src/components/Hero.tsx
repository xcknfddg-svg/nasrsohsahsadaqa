import React, { useState } from 'react';
import { Heart, Sparkles, ShieldCheck, Droplets, ArrowRight } from 'lucide-react';
import { Currency, Campaign } from '../types';
import { CURRENCIES, convertFromUSD } from '../data/currencies';

interface HeroProps {
  currentCurrency: Currency;
  campaigns: Campaign[];
  onDonateNow: (campaignId: string, amount: number, frequency: 'one-time' | 'friday' | 'monthly') => void;
  onOpenZakatCalc: () => void;
  onOpenDedication: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentCurrency,
  campaigns,
  onDonateNow,
  onOpenZakatCalc,
  onOpenDedication
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [frequency, setFrequency] = useState<'one-time' | 'friday' | 'monthly'>('one-time');
  
  // Suggested preset amounts in USD
  const presetAmountsUSD = [25, 50, 100, 250];
  const [selectedAmountUSD, setSelectedAmountUSD] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : convertFromUSD(selectedAmountUSD, currentCurrency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) return;
    onDonateNow(selectedCampaignId, activeAmount, frequency);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-10 pb-16 lg:pb-24">
      {/* Decorative Islamic Geometric Patterns & Stars */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quranic Verse Callout */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Multiply your rewards through sincere Sadaqa</span>
          </div>

          <h1 className="font-arabic text-2xl sm:text-4xl text-amber-200/90 leading-relaxed mb-3 dir-rtl tracking-wide">
            مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 italic font-light max-w-2xl mx-auto">
            "Who is it that will lend to Allah a goodly loan so that He may multiply it for him many times over?"
            <span className="block text-xs text-emerald-300/70 not-italic mt-0.5">— Surah Al-Baqarah 2:245</span>
          </p>
        </div>

        {/* Main Grid: Headline & Interactive Giving Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Message & Key Pillars */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Enduring Charity for This Life &amp; the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">Hereafter</span>
            </h2>
            
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Join thousands of believers providing perpetual clean water, holistic orphan sustenance, life-saving medical care, and food security. Sincere giving with verified 100% field delivery.
            </p>

            {/* Badges / Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-emerald-900/50 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
                <h4 className="font-semibold text-xs sm:text-sm text-white">100% Donation Policy</h4>
                <p className="text-xs text-emerald-200/70">No administrative cuts</p>
              </div>

              <div className="bg-emerald-900/50 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-xs">
                <Droplets className="w-5 h-5 text-teal-400 mb-1" />
                <h4 className="font-semibold text-xs sm:text-sm text-white">Sadaqah Jariyah</h4>
                <p className="text-xs text-emerald-200/70">Continuous ongoing reward</p>
              </div>

              <div className="bg-emerald-900/50 border border-emerald-700/40 rounded-xl p-3 backdrop-blur-xs col-span-2 sm:col-span-1">
                <Heart className="w-5 h-5 text-rose-400 mb-1" />
                <h4 className="font-semibold text-xs sm:text-sm text-white">Dedicate in Honor</h4>
                <p className="text-xs text-emerald-200/70">Gift &amp; Memorial plaques</p>
              </div>
            </div>

            {/* Secondary CTA Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onOpenZakatCalc}
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4"
              >
                Calculate your precise Zakat &amp; Nisab
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-emerald-600 hidden sm:inline">•</span>
              <button
                onClick={onOpenDedication}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200 underline underline-offset-4"
              >
                Generate a Dedication Certificate
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Quick Giving Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 text-slate-900 shadow-2xl shadow-emerald-950/40 border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Quick Sadaqa Pledge
                </span>
                <span className="text-xs text-slate-500 font-medium">Currency: {currentCurrency}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Cause Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Cause / Appeal
                  </label>
                  <select
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {campaigns.map((camp) => (
                      <option key={camp.id} value={camp.id}>
                        {camp.title} ({camp.isJariyah ? 'Jariyah' : camp.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Frequency Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Giving Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`text-xs font-bold py-2 rounded-lg transition-all ${
                        frequency === 'one-time'
                          ? 'bg-white text-emerald-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('friday')}
                      className={`text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                        frequency === 'friday'
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>Friday Sadaqa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`text-xs font-bold py-2 rounded-lg transition-all ${
                        frequency === 'monthly'
                          ? 'bg-white text-emerald-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Choose Amount ({CURRENCIES[currentCurrency].symbol})
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2.5">
                    {presetAmountsUSD.map((usd) => {
                      const converted = convertFromUSD(usd, currentCurrency);
                      const isSelected = !customAmount && selectedAmountUSD === usd;
                      return (
                        <button
                          key={usd}
                          type="button"
                          onClick={() => {
                            setSelectedAmountUSD(usd);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-1 text-center font-bold text-sm rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {CURRENCIES[currentCurrency].symbol}{converted}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                      {CURRENCIES[currentCurrency].symbol}
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Submit Pledge CTA */}
                <button
                  type="submit"
                  disabled={activeAmount <= 0}
                  className="w-full py-3 px-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-lg shadow-emerald-700/25 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>
                    Donate {CURRENCIES[currentCurrency].symbol}{Math.round(activeAmount)} {frequency === 'friday' ? 'every Friday' : frequency === 'monthly' ? '/ month' : 'now'}
                  </span>
                </button>

                <p className="text-center text-xs text-slate-500 font-medium">
                  🔒 100% Secure • Instant receipt &amp; dedication certificate available
                </p>
              </form>
            </div>
          </div>

        </div>

        {/* Global Impact Numbers Counter Bar */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">100%</div>
            <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-1">Donation Policy Guarantee</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">12,400+</div>
            <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-1">Clean Water Beneficiaries</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">3,850+</div>
            <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-1">Orphans Sustained</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-200">14</div>
            <div className="text-xs sm:text-sm text-emerald-200/80 font-medium mt-1">Countries with Active Relief</div>
          </div>
        </div>

      </div>
    </div>
  );
};
