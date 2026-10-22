import { Campaign } from '../types';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'deep-solar-water-wells',
    title: 'Deep Solar Water Wells & Community Taps',
    arabicTitle: 'حَفْرُ الآبَارِ الِارْتِوَازِيَّةِ وَسُقْيَا المَاءِ',
    category: 'Clean Water',
    isJariyah: true,
    featured: true,
    location: 'Tharparkar, Pakistan & Wajir, Kenya',
    targetUSD: 38000,
    raisedUSD: 31250,
    donorCount: 428,
    daysLeft: 14,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80',
    summary: 'Perpetual clean drinking water for desert villages. Powered by solar pumps to serve 800+ souls daily for decades.',
    detailedStory: 'In arid regions, women and young children walk up to 6 kilometers each day under scorching heat simply to retrieve muddy, unsafe water. By building high-capacity deep solar borewells, we reach aquifers 250 feet below ground, delivering pure, tested drinking water straight to central community taps. The Prophet ﷺ was asked: "Which charity is the best?" He replied: "Providing water." [Sunan Abi Dawud]. Each well is equipped with long-lasting maintenance contracts and community oversight.',
    impactTiers: [
      { amountUSD: 35, impact: 'Provides clean safe water to 1 family for 1 full year' },
      { amountUSD: 120, impact: 'Funds 1 high-durability filtration station with solar filtration' },
      { amountUSD: 650, impact: 'Shares in drilling deep aquifer bedrock and installing solar pump' },
      { amountUSD: 2400, impact: 'Full community well built with custom dedication plaque' }
    ],
    updates: [
      {
        date: '3 days ago',
        title: 'Geological survey completed in village Al-Huda',
        description: 'Water table detected at 190 ft depth with excellent mineral purity metrics.'
      },
      {
        date: '2 weeks ago',
        title: 'Borewell #14 commissioned and dedicated',
        description: 'Over 450 villagers now drink fresh cool water every morning at sunrise.'
      }
    ]
  },
  {
    id: 'orphan-widow-sustenance',
    title: 'Comprehensive Orphan & Widow Lifeline Sponsorship',
    arabicTitle: 'كَفَالَةُ الأَيْتَامِ وَالأَرَامِلِ',
    category: 'Orphan & Widow',
    isJariyah: false,
    featured: true,
    location: 'Syrian Refugee Camps & Gaza Borders',
    targetUSD: 52000,
    raisedUSD: 44800,
    donorCount: 615,
    daysLeft: 9,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    summary: 'Monthly nutritious food baskets, warm winter clothing, safe shelter subsidies, and schooling support for fatherless children.',
    detailedStory: 'The Messenger of Allah ﷺ said: "I and the person who looks after an orphan and provides for him will be in Paradise like this," putting his index and middle fingers together. Our holistic sponsorship covers not just calories, but psychological well-being, books, uniforms, and empowering the mother with micro-enterprise vocational skills.',
    impactTiers: [
      { amountUSD: 45, impact: 'Monthly nutritious food basket for an orphan family' },
      { amountUSD: 90, impact: 'Full 1-month comprehensive sponsorship (food, school, health)' },
      { amountUSD: 540, impact: 'Half-year sponsorship with termly educational progress reports' },
      { amountUSD: 1080, impact: 'Full-year orphan sponsorship with personal letters and updates' }
    ],
    updates: [
      {
        date: 'Yesterday',
        title: 'Winter jackets and school uniforms delivered',
        description: '210 children received warm boots, thermal coats, and stationery packages.'
      }
    ]
  },
  {
    id: 'mobile-emergency-clinics',
    title: 'Mobile Emergency Medical Aid & Dialysis Support',
    arabicTitle: 'العِيَادَاتُ الطِّبِّيَّةُ وَغَسِيلُ الكُلَى',
    category: 'Healthcare & Medical',
    isJariyah: false,
    featured: false,
    location: 'Yemen & Northern Syria',
    targetUSD: 29000,
    raisedUSD: 18450,
    donorCount: 289,
    daysLeft: 21,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    summary: 'Subsidizing life-saving dialysis sessions, insulin, emergency pediatric antibiotics, and mobile medical vans for isolated families.',
    detailedStory: 'Hospitals in conflict zones have suffered severe energy cutoffs and depleted medicine reserves. Patients with chronic kidney failure face death within days without regular dialysis sessions. Our mobile medical vans travel to rural villages providing free consultations, maternal checkups, and dispatching medicines.',
    impactTiers: [
      { amountUSD: 30, impact: 'Emergency medication pack for a mother and newborn infant' },
      { amountUSD: 75, impact: 'Covers 1 complete life-saving kidney dialysis session' },
      { amountUSD: 250, impact: 'Supplies medical van fuel and physician team for 1 week in remote villages' },
      { amountUSD: 850, impact: 'Funds 12 subsidized dialysis sessions for chronic patients' }
    ],
    updates: [
      {
        date: '5 days ago',
        title: 'Mobile Van 3 reached 340 displaced families',
        description: 'Vaccinations, prenatal ultrasounds, and asthma medications dispensed.'
      }
    ]
  },
  {
    id: 'olive-trees-agricultural-endowment',
    title: 'Blessed Olive Trees & Agricultural Waqf Endowment',
    arabicTitle: 'وَقْفُ أَشْجَارِ الزَّيْتُونِ المُبَارَكَةِ',
    category: 'Sadaqah Jariyah',
    isJariyah: true,
    featured: true,
    location: 'Palestine & Jordan Valley',
    targetUSD: 24000,
    raisedUSD: 21600,
    donorCount: 380,
    daysLeft: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541256942802-7b299b483057?auto=format&fit=crop&w=1000&q=80',
    summary: 'Plant resilient olive saplings that bear fruit for over 300 years, providing perpetual harvest revenue to poor farming families.',
    detailedStory: 'The Prophet ﷺ said: "There is none amongst the Muslims who plants a tree or sows seeds, and then a bird, or a person or an animal eats thereof, but it is regarded as a charitable gift for him." [Bukhari]. Olive trees can live and yield produce for centuries. Each sapling is tagged with geolocation and cared for by local agrarian cooperatives.',
    impactTiers: [
      { amountUSD: 20, impact: 'Plants 1 mature resilient olive sapling with drip irrigation tube' },
      { amountUSD: 100, impact: 'Plants a family grove of 5 olive trees with dedication label' },
      { amountUSD: 300, impact: 'Plants 15 olive trees with solar irrigation water connection' },
      { amountUSD: 1000, impact: 'Endows an orchard quarter supporting 2 farming households perpetually' }
    ],
    updates: [
      {
        date: '1 week ago',
        title: 'Spring planting phase commenced',
        description: 'First 600 saplings planted across terraced hillsides.'
      }
    ]
  },
  {
    id: 'quran-academy-hifz-waqf',
    title: 'Rural Hifz Academy & Islamic Library Waqf',
    arabicTitle: 'وَقْفُ مَدْرَسَةِ القُرْآنِ وَالمَكْتَبَةِ الإِسْلَامِيَّةِ',
    category: 'Mosque & Education',
    isJariyah: true,
    featured: false,
    location: 'Mali & Bangladesh Rural Villages',
    targetUSD: 34000,
    raisedUSD: 26800,
    donorCount: 312,
    daysLeft: 27,
    imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1000&q=80',
    summary: 'Equipping village learning centers with Mus-hafs, solar lighting, trained teachers, and clean sanitation for 200 student memorizers.',
    detailedStory: '"When a person dies, all their deeds come to an end except three: continuous charity (Sadaqah Jariyah), beneficial knowledge, or a righteous child who prays for them." [Muslim]. This project establishes an enduring center of learning, training children who will teach and recite the Holy Quran for generations.',
    impactTiers: [
      { amountUSD: 25, impact: 'Donates 5 hardbound Large Font Mus-hafs to students' },
      { amountUSD: 60, impact: 'Provides monthly stipend and housing allowance for 1 Quran teacher' },
      { amountUSD: 200, impact: 'Funds solar lighting and battery kit so students can study after dusk' },
      { amountUSD: 1200, impact: 'Constructs 1 permanent classroom with study desks and chalkboards' }
    ],
    updates: [
      {
        date: '4 days ago',
        title: 'Roofing and solar panels installed',
        description: 'Classrooms now have steady lighting and shaded ventilation.'
      }
    ]
  },
  {
    id: 'emergency-hot-meals-bakeries',
    title: 'Emergency Community Bakeries & Hot Meals',
    arabicTitle: 'إِطْعَامُ الطَّعَامِ وَالمَخَابِزُ الخَيْرِيَّةُ',
    category: 'Emergency Relief',
    isJariyah: false,
    featured: false,
    location: 'Sudan Displaced Camps & Somalia',
    targetUSD: 45000,
    raisedUSD: 39100,
    donorCount: 540,
    daysLeft: 8,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    summary: 'Distributing warm freshly baked flatbread and wholesome lentil/rice stews to thousands suffering acute hunger.',
    detailedStory: 'Severe drought and displacement have pushed millions into food crisis. Our partner community bakeries operate around the clock to mill locally grown grains and bake thousands of loaves distributed free every afternoon to lines of vulnerable mothers and elderly people.',
    impactTiers: [
      { amountUSD: 30, impact: 'Fresh bread bundles for 10 families every morning for 1 week' },
      { amountUSD: 70, impact: 'High-protein emergency food hamper for a family of six for 1 month' },
      { amountUSD: 200, impact: '500 hot nutritious communal meals delivered to refugee shelters' },
      { amountUSD: 1000, impact: 'Funds 1 full metric ton of flour, yeast, and fuel for the bakery' }
    ],
    updates: [
      {
        date: '6 hours ago',
        title: '2,400 warm meal trays handed out today',
        description: 'Nutritious lentil soup, rice, and fresh bread given out at camp gate B.'
      }
    ]
  }
];
