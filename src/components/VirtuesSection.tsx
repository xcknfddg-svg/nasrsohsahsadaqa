import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from 'lucide-react';
import { HADITH_VIRTUES } from '../data/hadiths';

export const VirtuesSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the precise difference between Zakat and Sadaqah?',
      a: 'Zakat is the third pillar of Islam and is an obligatory annual due (typically 2.5%) upon Muslims whose net wealth exceeds the threshold of Nisab for one lunar year. Sadaqah is voluntary charitable giving given purely to please Allah, without restriction on amount, time, or eligibility. Sadaqah carries infinite reward and purifies the giver.'
    },
    {
      q: 'What qualifies as Sadaqah Jariyah (continuous charity)?',
      a: 'Sadaqah Jariyah is an enduring charity that continues to benefit creation long after the donor gives it (or even after they pass away). Classical examples include drilling clean water wells, planting fruit trees, building mosques, constructing schools, providing medical equipment, or leaving behind beneficial knowledge.'
    },
    {
      q: 'Can I give Sadaqah on behalf of deceased parents or relatives?',
      a: 'Yes, authentically confirmed in the Sunnah. A Companion asked the Prophet ﷺ: "My mother died suddenly and I think that if she had spoken she would have given charity. Will she have a reward if I give charity on her behalf?" The Prophet ﷺ replied: "Yes." (Sahih al-Bukhari & Muslim). You can dedicate any donation in honor of their souls.'
    },
    {
      q: 'How does the 100% Voluntary Donation Policy work?',
      a: '100% of your donated amount is allocated directly towards ground implementation costs (materials, construction, medical supplies, food). Operational and governance expenses are sustained separately through dedicated institutional grants and Gift Aid recoveries, ensuring your Sadaqah reaches beneficiaries in full.'
    }
  ];

  return (
    <section id="virtues" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Wisdom from the Sunnah</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Virtues &amp; Blessings of Sadaqah
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            The Prophet Muhammad ﷺ and the Holy Quran illuminate the boundless spiritual, worldly, and eternal blessings of giving.
          </p>
        </div>

        {/* Hadith Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {HADITH_VIRTUES.slice(0, 3).map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {h.topic}
                </span>

                <p className="font-arabic text-base sm:text-lg text-emerald-950 font-bold mt-4 mb-3 leading-relaxed dir-rtl text-right">
                  {h.arabicText}
                </p>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                  "{h.translation}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Narrated by {h.narrator}</span>
                <span className="text-emerald-700">{h.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Frequently Asked Questions on Sadaqa &amp; Zakat
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Key rulings according to traditional Islamic scholarship
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
