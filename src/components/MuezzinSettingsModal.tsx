import React, { useState, useEffect } from 'react';
import { X, Volume2, Play, Square, MapPin, Check, ShieldCheck, Clock } from 'lucide-react';
import {
  MuezzinSettings,
  getStoredMuezzinSettings,
  saveMuezzinSettings,
  playAdhanAudio,
  stopAdhanAudio,
  isAdhanPlaying
} from '../utils/adhanService';
import { POPULAR_CITIES } from '../utils/prayerTimes';

interface MuezzinSettingsModalProps {
  onClose: () => void;
  onSettingsChanged?: () => void;
}

export const MuezzinSettingsModal: React.FC<MuezzinSettingsModalProps> = ({
  onClose,
  onSettingsChanged
}) => {
  const [settings, setSettings] = useState<MuezzinSettings>(getStoredMuezzinSettings());
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(isAdhanPlaying());

  useEffect(() => {
    return () => {
      stopAdhanAudio();
    };
  }, []);

  const handleToggleMaster = (checked: boolean) => {
    const updated = { ...settings, enabled: checked };
    setSettings(updated);
    saveMuezzinSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleTogglePrayer = (prayerKey: keyof MuezzinSettings['enabledPrayers']) => {
    const updated = {
      ...settings,
      enabledPrayers: {
        ...settings.enabledPrayers,
        [prayerKey]: !settings.enabledPrayers[prayerKey]
      }
    };
    setSettings(updated);
    saveMuezzinSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleCityChange = (cityId: string) => {
    const updated = { ...settings, selectedCityId: cityId };
    setSettings(updated);
    saveMuezzinSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleTogglePlayTest = async () => {
    if (isPlayingAudio) {
      stopAdhanAudio();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      try {
        await playAdhanAudio(settings.volume);
        setIsPlayingAudio(false);
      } catch (e) {
        setIsPlayingAudio(false);
        console.warn('Playback error:', e);
      }
    }
  };

  const prayersList = [
    { key: 'fajr' as const, name: 'صلاة الفجر', note: 'يشمل التثويب: الصلاة خير من النوم' },
    { key: 'dhuhr' as const, name: 'صلاة الظهر', note: 'أذان منتصف النهار' },
    { key: 'asr' as const, name: 'صلاة العصر', note: 'الصلاة الوسطى' },
    { key: 'maghrib' as const, name: 'صلاة المغرب', note: 'عند غروب الشمس' },
    { key: 'isha' as const, name: 'صلاة العشاء', note: 'دخول وقت الليل' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200" dir="rtl">
      <div className="relative bg-[#0d131f] text-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-emerald-600/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#101824] to-[#090d16] p-5 flex items-center justify-between border-b border-emerald-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <span className="text-xl">🕌</span>
            </div>
            <div>
              <h3 className="font-arabic font-extrabold text-lg text-emerald-200">
                إعدادات المؤذن والأذان التلقائي
              </h3>
              <p className="text-xs text-emerald-300/70 font-medium">
                بصوت الشيخ ناصر القطامي • يعمل أوفلاين بدون إنترنت
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopAdhanAudio();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5 text-sm">
          
          {/* Master Toggle */}
          <div className="bg-[#141b2a] border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-arabic font-bold text-base text-white">
                تفعيل صوت الأذان عند دخول الوقت
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                سماع نداء الصلاة كاملاً عند حلول موعد كل صلاة
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleToggleMaster(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Muezzin Identity & Audio Player Test */}
          <div className="bg-gradient-to-br from-amber-950/40 via-[#18120c] to-[#121824] border border-amber-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-base">
                  🎙️
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    صوت المؤذن المعتمد
                  </span>
                  <div className="text-base font-extrabold text-amber-100 font-arabic">
                    الشيخ ناصر القطامي
                  </div>
                </div>
              </div>

              {/* Play / Stop Test Audio Button */}
              <button
                type="button"
                onClick={handleTogglePlayTest}
                className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>إيقاف الصوت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>تجربة صوت الأذان 🔊</span>
                  </>
                )}
              </button>
            </div>

            {isPlayingAudio && (
              <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs text-center font-arabic animate-in fade-in">
                «اللهُ أَكْبَرُ، اللهُ أَكْبَرُ.. حَيَّ عَلَى الصَّلَاةِ» (الشيخ ناصر القطامي)
              </div>
            )}
          </div>

          {/* City / Location Selector for Offline Calculation */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>المدينة لحساب المواقيت بدون نت</span>
            </label>

            <select
              value={settings.selectedCityId}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-[#141b2a] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.country}
                </option>
              ))}
            </select>
          </div>

          {/* Individual Prayer Adhan Toggles */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>الصلوات المفعل لها الأذان</span>
            </label>

            <div className="space-y-2">
              {prayersList.map((pr) => {
                const isEnabled = settings.enabledPrayers[pr.key];
                return (
                  <div
                    key={pr.key}
                    onClick={() => handleTogglePrayer(pr.key)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isEnabled
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : 'bg-[#141b2a] border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm font-arabic">
                        {pr.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {pr.note}
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                        isEnabled
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-600 bg-transparent'
                      }`}
                    >
                      {isEnabled && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offline Quality Guarantee */}
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-emerald-900/40 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>يعمل في أي مكان بدون اتصال بالإنترنت:</strong> يتم تشغيل ملف أذان الشيخ ناصر القطامي المحزوم محلياً، وحساب أوقات الصلوات فلكياً دون الحاجة لأي شبكة.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
