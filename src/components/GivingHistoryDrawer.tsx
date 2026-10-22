import React from 'react';
import { X, History, Heart, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { DonationRecord, Currency } from '../types';
import { CURRENCIES } from '../data/currencies';

interface GivingHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  donations: DonationRecord[];
  currentCurrency: Currency;
  onSelectReceipt: (record: DonationRecord) => void;
}

export const GivingHistoryDrawer: React.FC<GivingHistoryDrawerProps> = ({
  isOpen,
  onClose,
  donations,
  currentCurrency,
  onSelectReceipt
}) => {
  if (!isOpen) return null;

  const totalGiven = donations.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">My Giving History</h3>
              <p className="text-xs text-slate-500">Your recorded Sadaqah and Waqf pledges</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Total Summary */}
        <div className="p-5 bg-gradient-to-br from-emerald-800 to-teal-900 text-white">
          <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
            Lifetime Charity Contributed
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1">
            {CURRENCIES[currentCurrency].symbol}{totalGiven.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-200/80 mt-1">
            {donations.length} total pledge{donations.length === 1 ? '' : 's'} recorded in this browser session.
          </p>
        </div>

        {/* Donation List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {donations.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">No recorded pledges yet.</p>
              <p className="text-xs text-slate-400">
                Pledge a donation to any campaign to see your history and tax receipts here.
              </p>
            </div>
          ) : (
            donations.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectReceipt(item)}
                className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 pr-2">
                    {item.campaignTitle}
                  </h4>
                  <span className="font-extrabold text-emerald-800 text-sm shrink-0">
                    {CURRENCIES[item.currency]?.symbol || '$'}{item.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline">
                    <span>View Receipt</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                {item.dedication && (
                  <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                    Dedicated: {item.dedication.personName}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted local session storage</span>
          </div>
        </div>

      </div>
    </div>
  );
};
