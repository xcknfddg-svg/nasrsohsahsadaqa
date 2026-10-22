import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES, convertFromUSD } from '../data/currencies';

interface ZakatCalculatorModalProps {
  currentCurrency: Currency;
  onClose: () => void;
  onAllocateZakat: (amount: number) => void;
}

export const ZakatCalculatorModal: React.FC<ZakatCalculatorModalProps> = ({
  currentCurrency,
  onClose,
  onAllocateZakat
}) => {
  // Nisab standard (Gold = 85g ≈ $6,800 USD, Silver = 595g ≈ $600 USD)
  const [nisabStandard, setNisabStandard] = useState<'silver' | 'gold'>('silver');
  
  // Asset Inputs
  const [cash, setCash] = useState<string>('');
  const [goldSilver, setGoldSilver] = useState<string>('');
  const [investments, setInvestments] = useState<string>('');
  const [businessStock, setBusinessStock] = useState<string>('');
  const [moneyOwed, setMoneyOwed] = useState<string>('');

  // Liabilities
  const [immediateDebts, setImmediateDebts] = useState<string>('');
  const [billsDue, setBillsDue] = useState<string>('');

  // Voluntary Sadaqah Top-up Percentage
  const [sadaqahBonus, setSadaqahBonus] = useState<number>(10); // 10% extra voluntary sadaqa

  const symbol = CURRENCIES[currentCurrency].symbol;

  // Approximate Nisab values converted to current currency
  const silverNisabUSD = 620;
  const goldNisabUSD = 6900;
  const currentNisab = convertFromUSD(nisabStandard === 'silver' ? silverNisabUSD : goldNisabUSD, currentCurrency);

  // Calculations
  const parseVal = (v: string) => Math.max(0, parseFloat(v) || 0);

  const totalAssets = 
    parseVal(cash) +
    parseVal(goldSilver) +
    parseVal(investments) +
    parseVal(businessStock) +
    parseVal(moneyOwed);

  const totalLiabilities = 
    parseVal(immediateDebts) + 
    parseVal(billsDue);

  const netZakatableWealth = Math.max(0, totalAssets - totalLiabilities);
  const isEligibleForZakat = netZakatableWealth >= currentNisab;
  const exactZakatDue = isEligibleForZakat ? netZakatableWealth * 0.025 : 0;
  const voluntarySadaqahAmount = exactZakatDue * (sadaqahBonus / 100);
  const totalRecommendedPayment = Math.round(exactZakatDue + voluntarySadaqahAmount);

  const handleAllocate = () => {
    if (totalRecommendedPayment > 0) {
      onAllocateZakat(totalRecommendedPayment);
    } else if (netZakatableWealth > 0) {
      // User is under nisab, but can give voluntary sadaqah
      onAllocateZakat(Math.max(25, Math.round(netZakatableWealth * 0.025)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <span>Zakat &amp; Sadaqah Calculator</span>
                <span className="text-xs bg-emerald-700 text-emerald-200 px-2 py-0.5 rounded-md font-normal">
                  2.5% Annual
                </span>
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                Calculate your obligatory Zakat on wealth held for a lunar year (Hawl).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {/* Nisab Selector Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                Select Nisab Threshold ({currentCurrency})
              </span>
              <span className="text-xs font-bold text-emerald-700">
                Threshold: {symbol}{currentNisab.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNisabStandard('silver')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  nisabStandard === 'silver'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Silver Standard (595g) — {symbol}{convertFromUSD(silverNisabUSD, currentCurrency)}
                <span className="block text-[10px] font-normal opacity-85 mt-0.5">Recommended (more charitable)</span>
              </button>
              <button
                type="button"
                onClick={() => setNisabStandard('gold')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  nisabStandard === 'gold'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Gold Standard (85g) — {symbol}{convertFromUSD(goldNisabUSD, currentCurrency)}
                <span className="block text-[10px] font-normal opacity-85 mt-0.5">Classic threshold</span>
              </button>
            </div>
          </div>

          {/* Assets Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              1. Zakatable Assets Held for One Year
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cash in Hand &amp; Bank Accounts ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gold, Silver &amp; Precious Bullion ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={goldSilver}
                  onChange={(e) => setGoldSilver(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stocks, Shares &amp; Cryptocurrencies ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Business Merchandise / Inventory ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={businessStock}
                  onChange={(e) => setBusinessStock(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Money Loaned to Others (Expected back) ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={moneyOwed}
                  onChange={(e) => setMoneyOwed(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              2. Immediate Short-Term Liabilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Debts Immediately Due ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={immediateDebts}
                  onChange={(e) => setImmediateDebts(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pending Utility / House Bills ({symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={billsDue}
                  onChange={(e) => setBillsDue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Voluntary Sadaqah Multiplier */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Voluntary Sadaqah Blessing Top-up (Barakah)
              </h4>
            </div>
            <p className="text-xs text-amber-800 mb-3">
              Purify your donation even further by adding an optional voluntary Sadaqah percentage:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[0, 5, 10, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setSadaqahBonus(pct)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    sadaqahBonus === pct
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-amber-900 border-amber-200 hover:bg-amber-100/50'
                  }`}
                >
                  +{pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-xs text-emerald-200">
              <span>Total Zakatable Wealth:</span>
              <span className="font-bold">{symbol}{netZakatableWealth.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xs text-emerald-200">
              <span>Nisab Threshold Met:</span>
              <span className={`font-bold ${isEligibleForZakat ? 'text-emerald-300' : 'text-amber-300'}`}>
                {isEligibleForZakat ? 'Yes (Zakat is obligatory)' : 'Below Nisab (Voluntary Sadaqa recommended)'}
              </span>
            </div>

            <div className="pt-2 border-t border-emerald-800/80 flex justify-between items-baseline">
              <div>
                <span className="text-xs text-emerald-300 font-medium">Exact Obligatory Zakat (2.5%):</span>
                <div className="text-lg font-bold">{symbol}{Math.round(exactZakatDue).toLocaleString()}</div>
              </div>

              {sadaqahBonus > 0 && exactZakatDue > 0 && (
                <div className="text-right">
                  <span className="text-xs text-amber-300 font-medium">+ {sadaqahBonus}% Sadaqa:</span>
                  <div className="text-sm font-semibold text-amber-200">+{symbol}{Math.round(voluntarySadaqahAmount).toLocaleString()}</div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-emerald-700/80 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Total Recommended Giving:
                </span>
                <span className="text-2xl font-extrabold text-white">
                  {symbol}{totalRecommendedPayment.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAllocate}
                className="py-2.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Allocate &amp; Donate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Complies with classical Islamic jurisprudence rules according to major scholars.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
