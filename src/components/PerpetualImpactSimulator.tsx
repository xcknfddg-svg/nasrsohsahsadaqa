import React, { useState } from 'react';
import { Droplets, Sprout, BookOpen, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES, convertFromUSD } from '../data/currencies';

interface PerpetualImpactSimulatorProps {
  currentCurrency: Currency;
  onCommitJariyah: (amountUSD: number) => void;
}

export const PerpetualImpactSimulator: React.FC<PerpetualImpactSimulatorProps> = ({
  currentCurrency,
  onCommitJariyah
}) => {
  const [sliderUSD, setSliderUSD] = useState<number>(150);
  const symbol = CURRENCIES[currentCurrency].symbol;
  const convertedValue = convertFromUSD(sliderUSD, currentCurrency);

  // Multipliers for perpetual impact calculation
  const litersPerUSD = 450; // Liters of perpetual water pumped across equipment lifespan
  const fruitKgPerUSD = 8; // Harvest over tree maturity
  const recitationsPerUSD = 240; // Verses recited by student memorizers
  const yearsActive = Math.min(30, Math.round(5 + sliderUSD / 40));

  const totalLiters = sliderUSD * litersPerUSD;
  const totalKgFruit = sliderUSD * fruitKgPerUSD;
  const totalRecitations = sliderUSD * recitationsPerUSD;

  return (
    <section id="simulator" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sadaqah Jariyah Ripple Effect</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            The Perpetual Impact Simulator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Unlike one-time aid, continuous charity (Sadaqah Jariyah) flows like an unceasing spring. Adjust the slider to visualize your ongoing generational reward.
          </p>
        </div>

        {/* Interactive Slider Box */}
        <div className="max-w-3xl mx-auto bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Select Your Intended Continuous Investment
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                {symbol}{convertedValue.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[50, 150, 300, 600, 1200].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSliderUSD(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    sliderUSD === preset
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {symbol}{convertFromUSD(preset, currentCurrency)}
                </button>
              ))}
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-2 mb-8">
            <input
              type="range"
              min="25"
              max="2000"
              step="25"
              value={sliderUSD}
              onChange={(e) => setSliderUSD(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-400 font-semibold px-1">
              <span>{symbol}{convertFromUSD(25, currentCurrency)}</span>
              <span>Lifespan Estimate: {yearsActive}+ Years of Perpetual Good</span>
              <span>{symbol}{convertFromUSD(2000, currentCurrency)}</span>
            </div>
          </div>

          {/* Impact Outcomes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center mb-2">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {totalLiters.toLocaleString()} L
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pure drinking water supplied to arid villages
              </p>
            </div>

            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-2">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {totalKgFruit.toLocaleString()} kg
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Organic fruit harvested from enduring Waqf trees
              </p>
            </div>

            <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {totalRecitations.toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Verses recited by orphan Hifz students
              </p>
            </div>
          </div>

          {/* Pledge CTA */}
          <div className="text-center">
            <button
              onClick={() => onCommitJariyah(sliderUSD)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-xl shadow-emerald-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Plant Your Sadaqah Jariyah for {symbol}{convertedValue.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
