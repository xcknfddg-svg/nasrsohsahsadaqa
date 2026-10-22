import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { AZKAR_NOTIFICATIONS } from '../data/azkar';
import { HADITH_VIRTUES } from '../data/hadiths';
import { CAMPAIGNS } from '../data/campaigns';

interface SearchModalProps {
  onClose: () => void;
  onSelectAction?: (text: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState<string>('');

  const filteredAzkar = query.trim()
    ? AZKAR_NOTIFICATIONS.filter(z => z.text.includes(query) || (z.virtue && z.virtue.includes(query)))
    : AZKAR_NOTIFICATIONS.slice(0, 4);

  const filteredHadiths = query.trim()
    ? HADITH_VIRTUES.filter(h => h.arabicText.includes(query) || h.translation.includes(query) || h.topic.includes(query))
    : HADITH_VIRTUES.slice(0, 3);

  const filteredCampaigns = query.trim()
    ? CAMPAIGNS.filter(c => c.title.includes(query) || (c.arabicTitle && c.arabicTitle.includes(query)))
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200" dir="rtl">
      <div className="relative bg-[#0d131f] text-white rounded-3xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-amber-500/30">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 bg-[#121824] flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="ابحث في الأذكار، الأحاديث النبوية، ومشاريع الصدقة الجارية..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-arabic"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-4 sm:p-5 flex-1 space-y-4 text-sm">
          
          {/* Azkar Results */}
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2 font-arabic">
              📿 الأذكار والتسابيح
            </span>
            <div className="space-y-1.5">
              {filteredAzkar.map(z => (
                <div key={z.id} className="p-3 rounded-2xl bg-[#141b2a] border border-slate-800/80 hover:border-amber-500/40 transition-colors">
                  <div className="font-arabic font-bold text-amber-100 text-sm">{z.text}</div>
                  {z.virtue && <div className="text-xs text-slate-400 mt-1">{z.virtue}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Hadith Results */}
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2 font-arabic">
              📖 أحاديث نبوية في فضل الصدقة
            </span>
            <div className="space-y-1.5">
              {filteredHadiths.map(h => (
                <div key={h.id} className="p-3 rounded-2xl bg-[#141b2a] border border-slate-800/80">
                  <div className="font-arabic text-emerald-100 text-xs sm:text-sm font-semibold">{h.arabicText}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{h.source} — {h.topic}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Results */}
          {filteredCampaigns.length > 0 && (
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-2 font-arabic">
                💧 مشاريع الصدقة الجارية
              </span>
              <div className="space-y-1.5">
                {filteredCampaigns.map(c => (
                  <div key={c.id} className="p-3 rounded-2xl bg-[#141b2a] border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">{c.arabicTitle || c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.location}</div>
                    </div>
                    <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      {c.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
