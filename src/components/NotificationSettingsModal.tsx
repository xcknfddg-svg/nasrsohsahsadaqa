import React, { useState } from 'react';
import { X, Bell, Moon, Clock, Sparkles, Send, CheckCircle, ShieldCheck } from 'lucide-react';
import {
  NotificationSettings,
  getStoredNotificationSettings,
  saveNotificationSettings,
  sendInstantZikrNotification,
  requestNotificationPermission
} from '../utils/notificationService';
import { AZKAR_NOTIFICATIONS } from '../data/azkar';

interface NotificationSettingsModalProps {
  onClose: () => void;
  onSettingsChanged?: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  onClose,
  onSettingsChanged
}) => {
  const [settings, setSettings] = useState<NotificationSettings>(getStoredNotificationSettings());
  const [testSentMessage, setTestSentMessage] = useState<string>('');
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);

  const handleToggleEnabled = async (checked: boolean) => {
    if (checked) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        alert('يرجى السماح بصلاحية الإشعارات من إعدادات المتصفح أو الهاتف لتصلك الأذكار.');
      }
    }
    const updated = { ...settings, enabled: checked };
    setSettings(updated);
    saveNotificationSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleIntervalChange = (mins: number) => {
    const updated = { ...settings, intervalMinutes: mins };
    setSettings(updated);
    saveNotificationSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleSleepToggle = (checked: boolean) => {
    const updated = { ...settings, sleepModeEnabled: checked };
    setSettings(updated);
    saveNotificationSettings(updated);
    if (onSettingsChanged) onSettingsChanged();
  };

  const handleSendTestNotification = async () => {
    setIsSendingTest(true);
    setTestSentMessage('');

    const granted = await requestNotificationPermission();
    if (!granted) {
      setIsSendingTest(false);
      setTestSentMessage('⚠️ يرجى تفعيل إذن الإشعارات أولاً لتصلك التنبيهات.');
      return;
    }

    const success = await sendInstantZikrNotification('📿 ذكر من صدقة جارية');
    setIsSendingTest(false);

    if (success) {
      setTestSentMessage('✅ تم إرسال إشعار الذكر لهاتفك بنجاح! تفقد شريط التنبيهات الآن.');
    } else {
      setTestSentMessage('تم إرسال التنبيه، تأكد من عدم تفعيل وضع عدم الإزعاج في هاتفك.');
    }

    setTimeout(() => {
      setTestSentMessage('');
    }, 6000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200" dir="rtl">
      <div className="relative bg-[#0d131f] text-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-amber-600/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-[#18120c] to-[#090d16] p-5 flex items-center justify-between border-b border-amber-700/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-arabic font-extrabold text-lg text-amber-200">
                إعدادات تنبيهات الأذكار والتسابيح
              </h3>
              <p className="text-xs text-amber-300/70 font-medium">
                تذكير دوري بالله مع خيارات التكرار وساعات الهدوء
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1 space-y-5 text-sm">
          
          {/* Main Activation Toggle */}
          <div className="bg-[#141b2a] border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h4 className="font-arabic font-bold text-base text-white">
                تفعيل الإشعارات الدورية
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                إرسال أذكار وتسابيح (سبحان الله، الحمد لله، لا إله إلا الله...)
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleToggleEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Test Notification Action */}
          <div className="space-y-2">
            <button
              onClick={handleSendTestNotification}
              disabled={isSendingTest}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSendingTest ? 'جارٍ الإرسال...' : 'إرسال إشعار تجريبي لهاتفي الآن 📲'}</span>
            </button>

            {testSentMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-semibold text-center animate-in fade-in">
                {testSentMessage}
              </div>
            )}
          </div>

          {/* Frequency Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
              مدة التكرار بين كل ذكر وآخر
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'كل 15 دقيقة', mins: 15 },
                { label: 'كل 30 دقيقة', mins: 30 },
                { label: 'كل ساعة', mins: 60 },
                { label: 'كل ساعتين', mins: 120 }
              ].map((item) => (
                <button
                  key={item.mins}
                  type="button"
                  onClick={() => handleIntervalChange(item.mins)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    settings.intervalMinutes === item.mins
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-xs'
                      : 'bg-[#141b2a] text-slate-400 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sleep Mode / Quiet Hours */}
          <div className="bg-[#141b2a] border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-amber-400" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    وضع النوم وساعات الهدوء
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    كتم التنبيهات تلقائياً أثناء ساعات نومك (من 11:00 م حتى 7:00 ص)
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.sleepModeEnabled}
                onChange={(e) => handleSleepToggle(e.target.checked)}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Preview of Sample Azkar for the user */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>نماذج من الأذكار التي ستصلك في التنبيهات:</span>
            </div>

            <div className="space-y-1.5">
              {AZKAR_NOTIFICATIONS.slice(0, 3).map((z) => (
                <div
                  key={z.id}
                  className="p-2.5 rounded-xl bg-[#090d16] border border-amber-900/30 text-xs font-arabic text-amber-200/90 flex items-center justify-between"
                >
                  <span>{z.text}</span>
                  <span className="text-[10px] text-slate-500 font-sans">ذكر وتكفير</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Offline Notice */}
          <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>يعمل بدون إنترنت على الهاتف كـ APK وعلى المتصفح (PWA)</span>
          </div>

        </div>

      </div>
    </div>
  );
};
