import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, MapPin, Clock, Sparkles } from 'lucide-react';
import { calculateOfflinePrayerTimes, PrayerTimeData, POPULAR_CITIES } from '../utils/prayerTimes';
import { getStoredMuezzinSettings } from '../utils/adhanService';

interface PrayerTimesBarProps {
  onOpenMuezzinSettings: () => void;
}

export const PrayerTimesBar: React.FC<PrayerTimesBarProps> = ({
  onOpenMuezzinSettings
}) => {
  const [prayers, setPrayers] = useState<PrayerTimeData[]>([]);
  const [cityName, setCityName] = useState<string>('القاهرة');
  const [isMuezzinEnabled, setIsMuezzinEnabled] = useState<boolean>(true);
  const [countdownText, setCountdownText] = useState<string>('');

  const refreshTimes = () => {
    const settings = getStoredMuezzinSettings();
    setIsMuezzinEnabled(settings.enabled);
    const city = POPULAR_CITIES.find(c => c.id === settings.selectedCityId) || POPULAR_CITIES[0];
    setCityName(city.name);

    const calc = calculateOfflinePrayerTimes(new Date(), city.lat, city.lng, city.timezone);
    setPrayers(calc);

    // Calculate countdown to next prayer
    const nextPrayer = calc.find(p => p.isNext) || calc[0];
    if (nextPrayer) {
      const now = new Date();
      let targetTime = nextPrayer.dateObj.getTime();
      if (targetTime < now.getTime()) {
        targetTime += 24 * 60 * 60 * 1000;
      }
      const diffMs = targetTime - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      const hStr = hours < 10 ? `0${hours}` : `${hours}`;
      const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const sStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

      setCountdownText(`متبقي على صلاة ${nextPrayer.nameArabic}: ${hStr}:${mStr}:${sStr}`);
    }
  };

  useEffect(() => {
    refreshTimes();
    const interval = setInterval(refreshTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b101c] text-white border-b border-amber-900/30 px-3 sm:px-4 py-3" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* City and Countdown Info */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs">
          <button
            onClick={onOpenMuezzinSettings}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#151c2c] border border-slate-700 hover:border-amber-500/60 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>مواقيت: <strong>{cityName}</strong></span>
          </button>

          {countdownText && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold font-arabic">
              <Clock className="w-3.5 h-3.5" />
              <span>{countdownText}</span>
            </div>
          )}

          <button
            onClick={onOpenMuezzinSettings}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isMuezzinEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {isMuezzinEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>أذان ناصر القطامي: {isMuezzinEnabled ? 'مفعّل 🔊' : 'صامت'}</span>
          </button>
        </div>

        {/* 5 Prayers Grid */}
        <div className="grid grid-cols-6 gap-1 sm:gap-1.5 w-full md:w-auto">
          {prayers.map((p) => (
            <div
              key={p.id}
              onClick={onOpenMuezzinSettings}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl border text-center transition-all cursor-pointer ${
                p.isNext
                  ? 'bg-gradient-to-b from-amber-500/25 to-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500/50 shadow-sm'
                  : p.isPassed
                  ? 'bg-[#121824] border-slate-800/80 text-slate-500'
                  : 'bg-[#141b2a] border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-[10px] sm:text-xs font-arabic font-bold truncate">
                {p.nameArabic}
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold whitespace-nowrap mt-0.5">
                {p.timeFormatted}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
