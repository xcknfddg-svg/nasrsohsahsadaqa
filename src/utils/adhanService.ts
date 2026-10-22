import { calculateOfflinePrayerTimes, POPULAR_CITIES, CityLocation } from './prayerTimes';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface MuezzinSettings {
  enabled: boolean;
  selectedMuezzin: 'qatami'; // Sheikh Nasser Al-Qatami
  volume: number; // 0 to 1
  selectedCityId: string;
  enabledPrayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  lastAdhanPlayedPrayer?: string;
  lastAdhanPlayedDate?: string;
}

const MUEZZIN_STORAGE_KEY = 'nasr_sadaqa_muezzin_settings';

export const DEFAULT_MUEZZIN_SETTINGS: MuezzinSettings = {
  enabled: true,
  selectedMuezzin: 'qatami',
  volume: 0.9,
  selectedCityId: 'cairo',
  enabledPrayers: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true
  }
};

let currentAudioInstance: HTMLAudioElement | null = null;

export function getStoredMuezzinSettings(): MuezzinSettings {
  const saved = localStorage.getItem(MUEZZIN_STORAGE_KEY);
  if (saved) {
    try {
      return { ...DEFAULT_MUEZZIN_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_MUEZZIN_SETTINGS;
    }
  }
  return DEFAULT_MUEZZIN_SETTINGS;
}

export function saveMuezzinSettings(settings: MuezzinSettings): void {
  localStorage.setItem(MUEZZIN_STORAGE_KEY, JSON.stringify(settings));
}

// Play adhan audio (offline-ready from public/audio/adhan_qatami.mp3)
export function playAdhanAudio(volume: number = 0.9): Promise<void> {
  return new Promise((resolve, reject) => {
    stopAdhanAudio();

    const audio = new Audio('/audio/adhan_qatami.mp3');
    audio.volume = Math.max(0, Math.min(1, volume));
    currentAudioInstance = audio;

    audio.onended = () => {
      currentAudioInstance = null;
      resolve();
    };

    audio.onerror = (e) => {
      console.warn('Adhan audio playback error:', e);
      currentAudioInstance = null;
      reject(e);
    };

    audio.play().then(resolve).catch((err) => {
      console.warn('Autoplay prevented or audio load issue:', err);
      reject(err);
    });
  });
}

export function stopAdhanAudio(): void {
  if (currentAudioInstance) {
    currentAudioInstance.pause();
    currentAudioInstance.currentTime = 0;
    currentAudioInstance = null;
  }
}

export function isAdhanPlaying(): boolean {
  return currentAudioInstance !== null && !currentAudioInstance.paused;
}

// Check and trigger adhan if exact prayer time has arrived
export async function checkAndTriggerPrayerAdhan(): Promise<void> {
  const settings = getStoredMuezzinSettings();
  if (!settings.enabled) return;

  const city = POPULAR_CITIES.find(c => c.id === settings.selectedCityId) || POPULAR_CITIES[0];
  const prayers = calculateOfflinePrayerTimes(new Date(), city.lat, city.lng, city.timezone);
  
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const todayDateStr = now.toISOString().split('T')[0];

  for (const p of prayers) {
    if (p.id === 'sunrise') continue; // No adhan for sunrise

    const isEnabledForThisPrayer = settings.enabledPrayers[p.id as keyof typeof settings.enabledPrayers];
    if (!isEnabledForThisPrayer) continue;

    const prayerHours = p.dateObj.getHours();
    const prayerMinutes = p.dateObj.getMinutes();

    // Check if within the same minute and hasn't played yet today
    if (
      currentHours === prayerHours &&
      currentMinutes === prayerMinutes &&
      !(settings.lastAdhanPlayedPrayer === p.id && settings.lastAdhanPlayedDate === todayDateStr)
    ) {
      // Mark as played
      settings.lastAdhanPlayedPrayer = p.id;
      settings.lastAdhanPlayedDate = todayDateStr;
      saveMuezzinSettings(settings);

      // Trigger audio & notification
      try {
        await playAdhanAudio(settings.volume);
      } catch (e) {
        console.warn('Could not auto-play adhan audio:', e);
      }

      // Show notification
      const prayerName = p.nameArabic;
      const title = `🕌 حان الآن موعد أذان ${prayerName}`;
      const body = `الله أكبر، الله أكبر.. نداء صلاة ${prayerName} بصوت الشيخ ناصر القطامي. حياكم على الصلاة.`;

      if (Capacitor.isNativePlatform()) {
        try {
          await LocalNotifications.schedule({
            notifications: [
              {
                id: 9991,
                title: title,
                body: body,
                schedule: { at: new Date(Date.now() + 100) },
                channelId: 'sadaqa_adhan_channel',
                sound: 'adhan.wav'
              }
            ]
          });
        } catch (e) {
          console.warn('Native adhan notification error:', e);
        }
      } else if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: body,
            icon: '/assets/aistudio/IMG_________________9a23356f.jpg',
            tag: 'sadaqa-adhan',
            dir: 'rtl'
          });
        } catch (e) {
          console.warn('Web adhan notification error:', e);
        }
      }

      break;
    }
  }
}
