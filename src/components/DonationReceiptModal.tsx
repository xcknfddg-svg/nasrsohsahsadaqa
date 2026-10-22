import React, { useEffect } from 'react';
import { X, CheckCircle, Printer, Share2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DonationRecord } from '../types';
import { CURRENCIES } from '../data/currencies';

interface DonationReceiptModalProps {
  record: DonationRecord | null;
  onClose: () => void;
  onOpenDedicationCertificate?: (record: DonationRecord) => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  record,
  onClose,
  onOpenDedicationCertificate
}) => {
  useEffect(() => {
    if (record) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [record]);

  if (!record) return null;

  const symbol = CURRENCIES[record.currency]?.symbol || '$';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Celebration Header */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/20 rounded-full mx-auto flex items-center justify-center text-white mb-3 shadow-inner">
            <CheckCircle className="w-8 h-8 text-emerald-300" />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold">
            Pledge Confirmed &amp; Recorded
          </h2>

          <p className="font-arabic text-lg text-amber-200 font-bold mt-1 dir-rtl">
            جَزَاكُمُ اللَّهُ خَيْرًا وَبَارَكَ فِيكُمْ
          </p>
          <p className="text-xs text-emerald-200/90 mt-0.5">
            "May Allah reward you with goodness and bless your wealth and family."
          </p>
        </div>

        {/* Receipt Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-5 text-slate-800 text-sm">
          
          {/* Main Amount Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Sadaqah Contributed
            </span>
            <div className="text-3xl font-black text-emerald-800 mt-1">
              {symbol}{record.amount.toLocaleString()} {record.currency}
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full inline-block mt-1">
              {record.frequency === 'friday' ? 'Recurring Every Blessed Friday' : record.frequency === 'monthly' ? 'Monthly Sustenance' : 'Single Donation'}
            </span>
          </div>

          {/* Details Table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Transaction Reference:</span>
              <span className="font-mono font-bold text-slate-800">{record.transactionRef}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Supported Cause:</span>
              <span className="font-semibold text-slate-800 max-w-[220px] text-right truncate">
                {record.campaignTitle}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Donor Name:</span>
              <span className="font-semibold text-slate-800">
                {record.isAnonymous ? 'Anonymous Believer' : record.donorName}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Date &amp; Time:</span>
              <span className="text-slate-700">
                {new Date(record.timestamp).toLocaleString()}
              </span>
            </div>

            {record.dedication && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>
                    {record.dedication.type === 'in_memory_of' ? 'In Loving Memory of:' : 'Dedicated In Honor of:'} {record.dedication.personName}
                  </span>
                </div>
                <p className="text-amber-800 italic text-[11px]">
                  "{record.dedication.duaMessage}"
                </p>
              </div>
            )}
          </div>

          {/* Receipt Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Official Tax Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Continue to Platform
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
