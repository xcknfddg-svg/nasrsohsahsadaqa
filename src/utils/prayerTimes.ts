export interface PrayerTimeData {
  id: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  nameArabic: string;
  nameEnglish: string;
  timeFormatted: string; // "04:45 ص"
  time24: string; // "04:45"
  dateObj: Date;
  isPassed: boolean;
  isNext: boolean;
}

export interface CityLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: number;
}

export const POPULAR_CITIES: CityLocation[] = [
  { id: 'cairo', name: 'القاهرة', country: 'مصر', lat: 30.0444, lng: 31.2357, timezone: 2 },
  { id: 'alex', name: 'الإسكندرية', country: 'مصر', lat: 31.2001, lng: 29.9187, timezone: 2 },
  { id: 'makkah', name: 'مكة المكرمة', country: 'السعودية', lat: 21.4225, lng: 39.8262, timezone: 3 },
  { id: 'madinah', name: 'المدينة المنورة', country: 'السعودية', lat: 24.4686, lng: 39.6142, timezone: 3 },
  { id: 'riyadh', name: 'الرياض', country: 'السعودية', lat: 24.7136, lng: 46.6753, timezone: 3 },
  { id: 'jerusalem', name: 'القدس الشريف', country: 'فلسطين', lat: 31.7683, lng: 35.2137, timezone: 2 },
  { id: 'dubai', name: 'دبي', country: 'الإمارات', lat: 25.2048, lng: 55.2708, timezone: 4 },
  { id: 'amman', name: 'عمان', country: 'الأردن', lat: 31.9454, lng: 35.9284, timezone: 3 }
];

// Calculation of prayer times using standard solar astronomical formulae
export function calculateOfflinePrayerTimes(
  date: Date = new Date(),
  lat: number = 30.0444,
  lng: number = 31.2357,
  timezoneOffsetHours?: number
): PrayerTimeData[] {
  const d = date;
  const tz = timezoneOffsetHours ?? (-d.getTimezoneOffset() / 60);

  // Day of year
  const startOfYear = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Solar declination & Equation of Time
  const B = (2 * Math.PI * (dayOfYear - 81)) / 365;
  const E = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // EoT in minutes
  const delta = 23.45 * Math.sin(((360 / 365) * (dayOfYear - 81) * Math.PI) / 180); // Declination in degrees

  const latRad = (lat * Math.PI) / 180;
  const deltaRad = (delta * Math.PI) / 180;

  // Solar noon in hours (local time)
  const solarNoon = 12 + (4 * (tz * 15 - lng) - E) / 60;

  // Hour angle calculation for zenith angle alpha
  const getHourAngle = (alphaDeg: number) => {
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const cosH =
      (Math.cos(alphaRad) - Math.sin(latRad) * Math.sin(deltaRad)) /
      (Math.cos(latRad) * Math.cos(deltaRad));
    if (cosH > 1 || cosH < -1) return 0;
    return (Math.acos(cosH) * 180) / Math.PI / 15; // in hours
  };

  // Asr hour angle (standard Shafi'i shadow factor = 1)
  const asrZenithAngleRad = Math.atan(1 + Math.tan(Math.abs(latRad - deltaRad)));
  const asrHourAngle = getHourAngle((90 - (asrZenithAngleRad * 180) / Math.PI));

  // Angles:
  // Fajr: 19.5 degrees below horizon (zenith 109.5)
  // Sunrise: 0.833 degrees below horizon (zenith 90.833)
  // Maghrib: sunset (zenith 90.833)
  // Isha: 17.5 degrees below horizon (zenith 107.5)
  const fajrHA = getHourAngle(109.5);
  const sunHA = getHourAngle(90.833);
  const ishaHA = getHourAngle(107.5);

  const fajrHours = solarNoon - fajrHA;
  const sunriseHours = solarNoon - sunHA;
  const dhuhrHours = solarNoon + 0.05; // 3 minutes after noon
  const asrHours = solarNoon + asrHourAngle;
  const maghribHours = solarNoon + sunHA;
  const ishaHours = solarNoon + ishaHA;

  const createDateObj = (decimalHours: number) => {
    let normalized = decimalHours;
    if (normalized < 0) normalized += 24;
    if (normalized >= 24) normalized -= 24;
    const hours = Math.floor(normalized);
    const minutes = Math.floor((normalized - hours) * 60);
    const res = new Date(d);
    res.setHours(hours, minutes, 0, 0);
    return res;
  };

  const formatTime = (dateObj: Date) => {
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const formattedMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMin} ${isPM ? 'م' : 'ص'}`;
  };

  const format24 = (dateObj: Date) => {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const now = new Date();

  const prayers: Omit<PrayerTimeData, 'isNext'>[] = [
    {
      id: 'fajr',
      nameArabic: 'الفجر',
      nameEnglish: 'Fajr',
      dateObj: createDateObj(fajrHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    },
    {
      id: 'sunrise',
      nameArabic: 'الشروق',
      nameEnglish: 'Sunrise',
      dateObj: createDateObj(sunriseHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    },
    {
      id: 'dhuhr',
      nameArabic: 'الظهر',
      nameEnglish: 'Dhuhr',
      dateObj: createDateObj(dhuhrHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    },
    {
      id: 'asr',
      nameArabic: 'العصر',
      nameEnglish: 'Asr',
      dateObj: createDateObj(asrHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    },
    {
      id: 'maghrib',
      nameArabic: 'المغرب',
      nameEnglish: 'Maghrib',
      dateObj: createDateObj(maghribHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    },
    {
      id: 'isha',
      nameArabic: 'العشاء',
      nameEnglish: 'Isha',
      dateObj: createDateObj(ishaHours),
      timeFormatted: '',
      time24: '',
      isPassed: false
    }
  ];

  // Fill formatted times & check passed status
  prayers.forEach((p) => {
    p.timeFormatted = formatTime(p.dateObj);
    p.time24 = format24(p.dateObj);
    p.isPassed = p.dateObj.getTime() < now.getTime();
  });

  // Determine next prayer (excluding sunrise for adhan if desired, but we can highlight next prayer)
  let foundNext = false;
  const finalPrayers: PrayerTimeData[] = prayers.map((p) => {
    let isNext = false;
    if (!foundNext && !p.isPassed) {
      isNext = true;
      foundNext = true;
    }
    return { ...p, isNext };
  });

  // If all prayers passed today, tomorrow's Fajr is next
  if (!foundNext && finalPrayers[0]) {
    finalPrayers[0].isNext = true;
  }

  return finalPrayers;
}
