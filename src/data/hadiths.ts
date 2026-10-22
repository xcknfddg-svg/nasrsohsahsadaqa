import { DailyDeed, HadithVirtue } from '../types';

export const HADITH_VIRTUES: HadithVirtue[] = [
  {
    id: 'jariyah-three-things',
    arabicText: 'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلا مِنْ ثَلاثَةٍ: إِلا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    translation: 'When a human being dies, all their deeds cease except for three: continuous charity (Sadaqah Jariyah), beneficial knowledge, or a righteous child who prays for them.',
    source: 'Sahih Muslim (1631)',
    narrator: 'Abu Hurairah (RA)',
    topic: 'Continuous Charity (Sadaqah Jariyah)'
  },
  {
    id: 'wealth-never-decreases',
    arabicText: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلا رَفَعَهُ اللَّهُ',
    translation: 'Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.',
    source: 'Sahih Muslim (2588)',
    narrator: 'Abu Hurairah (RA)',
    topic: 'Blessing in Wealth (Barakah)'
  },
  {
    id: 'shade-of-charity',
    arabicText: 'كُلُّ امْرِئٍ فِي ظِلِّ صَدَقَتِهِ حَتَّى يُفْصَلَ بَيْنَ النَّاسِ',
    translation: 'Every person will be in the shade of their charity on the Day of Resurrection until judgment is delivered between the people.',
    source: 'Musnad Ahmad (17333), Sahih',
    narrator: 'Uqbah ibn Amir (RA)',
    topic: 'Protection on the Day of Reckoning'
  },
  {
    id: 'extinguish-sins',
    arabicText: 'وَالصَّدَقَةُ تُطْفِئُ الخَطِيئَةَ كَمَا يُطْفِئُ المَاءُ النَّارَ',
    translation: 'Charity extinguishes sins just as water extinguishes fire.',
    source: 'Jami` at-Tirmidhi (2616)',
    narrator: 'Mu`adh ibn Jabal (RA)',
    topic: 'Forgiveness and Purification'
  },
  {
    id: 'every-kindness-charity',
    arabicText: 'كُلُّ مَعْرُوفٍ صَدَقَةٌ، وَإِنَّ مِنَ المَعْرُوفِ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ',
    translation: 'Every act of kindness is charity, and part of kindness is meeting your brother with a welcoming and cheerful face.',
    source: 'Jami` at-Tirmidhi (1970)',
    narrator: 'Jabir ibn Abdullah (RA)',
    topic: 'Non-Monetary Charity'
  }
];

export const INITIAL_DAILY_DEEDS: DailyDeed[] = [
  {
    id: 'deed-smile',
    text: 'Meet family, friends, or a stranger with a genuine warm smile',
    arabicSubtitle: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ',
    hadithReference: 'At-Tirmidhi (1956)',
    category: 'kindness',
    completed: false
  },
  {
    id: 'deed-remove-harm',
    text: 'Remove a piece of litter, sharp stone, or obstacle from a pathway',
    arabicSubtitle: 'إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ',
    hadithReference: 'Sahih Bukhari (2989)',
    category: 'community',
    completed: false
  },
  {
    id: 'deed-kind-word',
    text: 'Speak a comforting, encouraging, or gentle word to someone today',
    arabicSubtitle: 'وَالكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
    hadithReference: 'Sahih Muslim (1009)',
    category: 'speech',
    completed: false
  },
  {
    id: 'deed-dua-secret',
    text: 'Make a heartfelt Dua in secret for a friend, relative, or oppressed believers',
    arabicSubtitle: 'دَعْوَةُ المَرْءِ المُسْلِمِ لأَخِيهِ بِظَهْرِ الغَيْبِ مُسْتَجَابَةٌ',
    hadithReference: 'Sahih Muslim (2733)',
    category: 'worship',
    completed: false
  },
  {
    id: 'deed-forgive',
    text: 'Pardon someone who upset or wronged you, purely seeking Allah\'s pleasure',
    arabicSubtitle: 'فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللَّهِ',
    hadithReference: 'Surah Ash-Shura 42:40',
    category: 'kindness',
    completed: false
  },
  {
    id: 'deed-water-animal',
    text: 'Leave a shallow bowl of clean water for birds, stray animals, or water a thirsty plant',
    arabicSubtitle: 'فِي كُلِّ كَبِدٍ رَطْبَةٍ أَجْرٌ',
    hadithReference: 'Sahih Bukhari (2466)',
    category: 'kindness',
    completed: false
  }
];
