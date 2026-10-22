import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Award, HeartHandshake, BookOpen } from 'lucide-react';
import { DailyDeed } from '../types';
import { INITIAL_DAILY_DEEDS } from '../data/hadiths';

interface DailyDeedsModalProps {
  onClose: () => void;
  onOpenHadithVirtues: () => void;
}

export const DailyDeedsModal: React.FC<DailyDeedsModalProps> = ({
  onClose,
  onOpenHadithVirtues
}) => {
  const [deeds, setDeeds] = useState<DailyDeed[]>(() => {
    const saved = localStorage.getItem('nasr_sadaqa_daily_deeds');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DAILY_DEEDS;
      }
    }
    return INITIAL_DAILY_DEEDS;
  });

  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('nasr_sadaqa_streak') || '3', 10);
  });

  useEffect(() => {
    localStorage.setItem('nasr_sadaqa_daily_deeds', JSON.stringify(deeds));
  }, [deeds]);

  const toggleDeed = (id: string) => {
    setDeeds((prev) =>
      prev.map((deed) =>
        deed.id === id ? { ...deed, completed: !deed.completed } : deed
      )
    );
  };

  const completedCount = deeds.filter((d) => d.completed).length;
  const isAllCompleted = completedCount === deeds.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <span>Daily Good Deeds Journal</span>
              </h2>
              <p className="text-xs text-emerald-200">
                "Every act of kindness is charity." (Hadith — Tirmidhi)
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

        {/* Scrollable List */}
        <div className="overflow-y-auto p-6 flex-1 space-y-5">
          
          {/* Streak & Progress Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Today's Non-Monetary Sadaqah
              </span>
              <div className="text-lg font-extrabold text-emerald-950 mt-0.5">
                {completedCount} of {deeds.length} Deeds Completed
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-lg">
                <Sparkles className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>{streak} Days</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Giving Streak</span>
            </div>
          </div>

          {isAllCompleted && (
            <div className="bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 rounded-2xl p-4 text-center space-y-1 animate-in zoom-in-95 duration-300">
              <Award className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-extrabold text-amber-950 text-base">
                Masha'Allah! All Daily Deeds Accomplished!
              </h4>
              <p className="text-xs text-amber-800">
                May Allah accept your kindness and record them on your scales of good deeds.
              </p>
            </div>
          )}

          {/* Deed Items */}
          <div className="space-y-2.5">
            {deeds.map((deed) => (
              <div
                key={deed.id}
                onClick={() => toggleDeed(deed.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  deed.completed
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="pt-0.5">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      deed.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {deed.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold leading-snug transition-colors ${
                      deed.completed ? 'text-emerald-950 line-through opacity-80' : 'text-slate-800'
                    }`}
                  >
                    {deed.text}
                  </p>

                  {deed.arabicSubtitle && (
                    <p className="font-arabic text-xs text-emerald-800 font-medium mt-1 dir-rtl text-right">
                      {deed.arabicSubtitle}
                    </p>
                  )}

                  <span className="inline-block mt-1 text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                    📖 {deed.hadithReference}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Virtues Prompt */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenHadithVirtues();
              }}
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Authentic Hadiths on Sadaqa</span>
            </button>

            <button
              onClick={() => {
                setDeeds((prev) => prev.map((d) => ({ ...d, completed: false })));
              }}
              className="text-slate-400 hover:text-slate-600 text-[11px]"
            >
              Reset for Tomorrow
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
