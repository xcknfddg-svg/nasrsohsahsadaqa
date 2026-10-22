import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { getRandomZikr, AZKAR_NOTIFICATIONS } from '../data/azkar';

export interface NotificationSettings {
  enabled: boolean;
  intervalMinutes: number; // 15, 30, 60, 120
  sleepModeEnabled: boolean;
  sleepStartHour: number; // e.g. 23 (11 PM)
  sleepEndHour: number; // e.g. 7 (7 AM)
  lastNotificationTime?: number;
}

const STORAGE_KEY = 'nasr_sadaqa_notification_settings';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  intervalMinutes: 30,
  sleepModeEnabled: true,
  sleepStartHour: 23,
  sleepEndHour: 7
};

export function getStoredNotificationSettings(): NotificationSettings {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return { ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// Check if current time is within quiet / sleep hours
export function isInSleepMode(settings: NotificationSettings): boolean {
  if (!settings.sleepModeEnabled) return false;
  const currentHour = new Date().getHours();
  if (settings.sleepStartHour > settings.sleepEndHour) {
    // e.g. 23 to 7
    return currentHour >= settings.sleepStartHour || currentHour < settings.sleepEndHour;
  }
  return currentHour >= settings.sleepStartHour && currentHour < settings.sleepEndHour;
}

// Request permissions across Native APK and Web
export async function requestNotificationPermission(): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      const status = await LocalNotifications.requestPermissions();
      return status.display === 'granted';
    } catch (e) {
      console.warn('Native notification permission error:', e);
      return false;
    }
  } else {
    // Web environment
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications');
      return false;
    }
    if (Notification.permission === 'granted') {
      return true;
    }
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
}

// Send an instant Azkar notification (used for testing or scheduled tick)
export async function sendInstantZikrNotification(customTitle?: string): Promise<boolean> {
  const zikr = getRandomZikr();
  const title = customTitle || '📿 ذكر وتذكير بالله';
  const body = zikr.text;

  if (Capacitor.isNativePlatform()) {
    try {
      // Create channel for Android
      await LocalNotifications.createChannel({
        id: 'sadaqa_azkar_channel',
        name: 'أذكار وتسابيح صدقة',
        description: 'تنبيهات الأذكار والتسابيح الدورية',
        importance: 4, // High importance
        visibility: 1, // Public on lockscreen
        vibration: true
      }).catch(() => {});

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Math.floor(Math.random() * 100000),
            title: title,
            body: body,
            schedule: { at: new Date(Date.now() + 100) },
            sound: 'beep.wav',
            channelId: 'sadaqa_azkar_channel',
            smallIcon: 'ic_launcher_foreground',
            extra: { zikrId: zikr.id, category: zikr.category }
          }
        ]
      });
      return true;
    } catch (e) {
      console.warn('Error scheduling native notification:', e);
      return false;
    }
  } else {
    // Web notification
    if (!('Notification' in window)) return false;

    if (Notification.permission !== 'granted') {
      const granted = await requestNotificationPermission();
      if (!granted) return false;
    }

    try {
      new Notification(title, {
        body: body,
        icon: '/assets/aistudio/IMG_________________9a23356f.jpg',
        badge: '/assets/aistudio/IMG_________________9a23356f.jpg',
        tag: 'sadaqa-zikr',
        dir: 'rtl',
        lang: 'ar'
      });
      return true;
    } catch (e) {
      console.warn('Error creating web notification:', e);
      return false;
    }
  }
}
