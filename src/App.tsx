import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PrayerTimesBar } from './components/PrayerTimesBar';
import { Hero } from './components/Hero';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetailsModal } from './components/CampaignDetailsModal';
import { ZakatCalculatorModal } from './components/ZakatCalculatorModal';
import { DedicationModal } from './components/DedicationModal';
import { DailyDeedsModal } from './components/DailyDeedsModal';
import { PerpetualImpactSimulator } from './components/PerpetualImpactSimulator';
import { VirtuesSection } from './components/VirtuesSection';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { GivingHistoryDrawer } from './components/GivingHistoryDrawer';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { MuezzinSettingsModal } from './components/MuezzinSettingsModal';
import { SearchModal } from './components/SearchModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Footer } from './components/Footer';

import { Campaign, Category, Currency, DonationRecord } from './types';
import { CAMPAIGNS } from './data/campaigns';
import { Search, Sparkles, Filter } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import {
  getStoredNotificationSettings,
  saveNotificationSettings,
  isInSleepMode,
  sendInstantZikrNotification
} from './utils/notificationService';
import { checkAndTriggerPrayerAdhan } from './utils/adhanService';

export const App: React.FC = () => {
  // Currency State
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');

  // Campaigns State
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyJariyah, setOnlyJariyah] = useState<boolean>(false);

  // Modals & Drawer States
  const [activeModalCampaign, setActiveModalCampaign] = useState<Campaign | null>(null);
  const [initialModalAmountUSD, setInitialModalAmountUSD] = useState<number | undefined>(undefined);
  
  const [isZakatModalOpen, setIsZakatModalOpen] = useState<boolean>(false);
  const [isDedicationModalOpen, setIsDedicationModalOpen] = useState<boolean>(false);
  const [isDailyDeedsModalOpen, setIsDailyDeedsModalOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [isMuezzinModalOpen, setIsMuezzinModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);
  
  const [latestReceipt, setLatestReceipt] = useState<DonationRecord | null>(null);

  // Donation History in localStorage
  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('nasr_sadaqa_donations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('nasr_sadaqa_donations', JSON.stringify(donations));
  }, [donations]);

  // Periodic Azkar Notification & Adhan Prayer Time Checker
  useEffect(() => {
    // Check every 30 seconds
    const interval = setInterval(() => {
      // 1. Check Prayer Times for Adhan
      checkAndTriggerPrayerAdhan();

      // 2. Check Periodic Azkar Notifications
      const notifSettings = getStoredNotificationSettings();
      if (notifSettings.enabled && !isInSleepMode(notifSettings)) {
        const now = Date.now();
        const last = notifSettings.lastNotificationTime || 0;
        const intervalMs = (notifSettings.intervalMinutes || 30) * 60 * 1000;

        if (now - last >= intervalMs) {
          sendInstantZikrNotification();
          notifSettings.lastNotificationTime = now;
          saveNotificationSettings(notifSettings);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Hardware Back Button Handler for Native Android APK
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const backListener = CapApp.addListener('backButton', () => {
        if (isSearchModalOpen) {
          setIsSearchModalOpen(false);
        } else if (isMenuDrawerOpen) {
          setIsMenuDrawerOpen(false);
        } else if (isNotificationModalOpen) {
          setIsNotificationModalOpen(false);
        } else if (isMuezzinModalOpen) {
          setIsMuezzinModalOpen(false);
        } else if (activeModalCampaign) {
          setActiveModalCampaign(null);
        } else if (isZakatModalOpen) {
          setIsZakatModalOpen(false);
        } else if (isDedicationModalOpen) {
          setIsDedicationModalOpen(false);
        } else if (isDailyDeedsModalOpen) {
          setIsDailyDeedsModalOpen(false);
        } else if (isHistoryDrawerOpen) {
          setIsHistoryDrawerOpen(false);
        } else if (latestReceipt) {
          setLatestReceipt(null);
        } else if (window.scrollY > 100) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          CapApp.exitApp();
        }
      });

      return () => {
        backListener.then((sub) => sub.remove());
      };
    }
  }, [
    isSearchModalOpen,
    isMenuDrawerOpen,
    isNotificationModalOpen,
    isMuezzinModalOpen,
    activeModalCampaign,
    isZakatModalOpen,
    isDedicationModalOpen,
    isDailyDeedsModalOpen,
    isHistoryDrawerOpen,
    latestReceipt
  ]);

  // Handle successful donation completion
  const handleDonationComplete = (record: DonationRecord) => {
    setDonations((prev) => [record, ...prev]);

    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === record.campaignId) {
          return {
            ...c,
            raisedUSD: c.raisedUSD + record.amount,
            donorCount: c.donorCount + 1
          };
        }
        return c;
      })
    );

    setLatestReceipt(record);
  };

  const handleQuickDonateTrigger = (campaignId?: string, amountUSD?: number) => {
    const targetCampaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];
    setInitialModalAmountUSD(amountUSD);
    setActiveModalCampaign(targetCampaign);
  };

  const handleAllocateFromZakat = (amount: number) => {
    setIsZakatModalOpen(false);
    const targetCampaign = campaigns[0];
    setInitialModalAmountUSD(amount);
    setActiveModalCampaign(targetCampaign);
  };

  const handleCommitJariyah = (amountUSD: number) => {
    const jariyahCampaign = campaigns.find((c) => c.isJariyah) || campaigns[0];
    setInitialModalAmountUSD(amountUSD);
    setActiveModalCampaign(jariyahCampaign);
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'صدقة • نصر صهصاح',
        text: 'تطبيق إسلامي شامل للمصحف، الأذكار، المؤذن بصوت الشيخ ناصر القطامي، ومشاريع الصدقة الجارية.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط التطبيق بنجاح! جزاكم الله خيراً على نشره.');
    }
  };

  const categories: Category[] = [
    'All',
    'Sadaqah Jariyah',
    'Clean Water',
    'Orphan & Widow',
    'Emergency Relief',
    'Healthcare & Medical',
    'Mosque & Education'
  ];

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCategory = 
      selectedCategory === 'All' 
        ? true 
        : selectedCategory === 'Sadaqah Jariyah' 
          ? camp.isJariyah 
          : camp.category === selectedCategory;

    const matchesJariyahOnly = onlyJariyah ? camp.isJariyah : true;

    const matchesSearch = 
      camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camp.arabicTitle && camp.arabicTitle.includes(searchQuery));

    return matchesCategory && matchesJariyahOnly && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      
      {/* 1. Header (matching screenshot: Golden Seal, Sadaqah Jariyah badge, Install button conditional) */}
      <Header
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenMuezzin={() => setIsMuezzinModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        hasActiveNotifications={true}
      />

      {/* 2. Prayer Times & Muezzin Bar (Offline calculated, Sheikh Nasser Al-Qatami) */}
      <PrayerTimesBar
        onOpenMuezzinSettings={() => setIsMuezzinModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          currentCurrency={currentCurrency}
          campaigns={campaigns}
          onDonateNow={(cId, amt) => handleQuickDonateTrigger(cId, amt)}
          onOpenZakatCalc={() => setIsZakatModalOpen(true)}
          onOpenDedication={() => setIsDedicationModalOpen(true)}
        />

        {/* Featured Campaigns Section */}
        <section id="campaigns" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-md mb-2">
                <span>Active Field Appeals • مشاريع البر والإغاثة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Where Your Sadaqa Is Urgently Needed
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Select an appeal below to provide immediate sustenance or establish a continuous perpetual charity (Sadaqah Jariyah).
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search causes or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121824] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
            </div>
          </div>

          {/* Filters & Jariyah Switch */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#121824] text-slate-300 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sadaqah Jariyah Toggle */}
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer bg-[#121824] px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800">
              <input
                type="checkbox"
                checked={onlyJariyah}
                onChange={(e) => setOnlyJariyah(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Only Sadaqah Jariyah (Continuous)
              </span>
            </label>
          </div>

          {/* Campaigns Grid */}
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-16 bg-[#121824] rounded-3xl border border-slate-800">
              <Filter className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-200">No campaigns match your filters</h3>
              <p className="text-xs text-slate-400 mt-1">Try resetting search keywords or category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setOnlyJariyah(false);
                }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCampaigns.map((camp) => (
                <CampaignCard
                  key={camp.id}
                  campaign={camp}
                  currentCurrency={currentCurrency}
                  onSelect={(c) => {
                    setInitialModalAmountUSD(undefined);
                    setActiveModalCampaign(c);
                  }}
                  onDonate={(c) => {
                    setInitialModalAmountUSD(undefined);
                    setActiveModalCampaign(c);
                  }}
                />
              ))}
            </div>
          )}

        </section>

        {/* Perpetual Impact Simulator Section */}
        <PerpetualImpactSimulator
          currentCurrency={currentCurrency}
          onCommitJariyah={handleCommitJariyah}
        />

        {/* Virtues of Sadaqa & FAQs */}
        <VirtuesSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenZakat={() => setIsZakatModalOpen(true)}
        onOpenDedication={() => setIsDedicationModalOpen(true)}
        onOpenDeeds={() => setIsDailyDeedsModalOpen(true)}
      />

      {/* ALL MODALS & DRAWERS */}
      
      {/* Notification Settings Modal (Azkar & Tassbeeh) */}
      {isNotificationModalOpen && (
        <NotificationSettingsModal
          onClose={() => setIsNotificationModalOpen(false)}
        />
      )}

      {/* Muezzin & Prayer Times Settings Modal (Sheikh Nasser Al-Qatami) */}
      {isMuezzinModalOpen && (
        <MuezzinSettingsModal
          onClose={() => setIsMuezzinModalOpen(false)}
        />
      )}

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}

      {/* Side Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenMuezzin={() => setIsMuezzinModalOpen(true)}
        onOpenZakat={() => setIsZakatModalOpen(true)}
        onOpenDedication={() => setIsDedicationModalOpen(true)}
        onOpenDeeds={() => setIsDailyDeedsModalOpen(true)}
        onShareApp={handleShareApp}
      />

      {/* Campaign Details & Donation Modal */}
      {activeModalCampaign && (
        <CampaignDetailsModal
          campaign={activeModalCampaign}
          currentCurrency={currentCurrency}
          initialAmountUSD={initialModalAmountUSD}
          onClose={() => setActiveModalCampaign(null)}
          onCompleteDonation={handleDonationComplete}
        />
      )}

      {/* Zakat & Sadaqah Calculator Modal */}
      {isZakatModalOpen && (
        <ZakatCalculatorModal
          currentCurrency={currentCurrency}
          onClose={() => setIsZakatModalOpen(false)}
          onAllocateZakat={handleAllocateFromZakat}
        />
      )}

      {/* Dedication & Certificate Generator Modal */}
      {isDedicationModalOpen && (
        <DedicationModal
          currentCurrency={currentCurrency}
          campaigns={campaigns}
          onClose={() => setIsDedicationModalOpen(false)}
          onCompleteDonation={handleDonationComplete}
        />
      )}

      {/* Daily Good Deeds Checklist Modal */}
      {isDailyDeedsModalOpen && (
        <DailyDeedsModal
          onClose={() => setIsDailyDeedsModalOpen(false)}
          onOpenHadithVirtues={() => {
            const el = document.getElementById('virtues');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Donation Receipt Modal with Confetti */}
      {latestReceipt && (
        <DonationReceiptModal
          record={latestReceipt}
          onClose={() => setLatestReceipt(null)}
        />
      )}

      {/* Giving History Drawer */}
      <GivingHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        donations={donations}
        currentCurrency={currentCurrency}
        onSelectReceipt={(rec) => {
          setIsHistoryDrawerOpen(false);
          setLatestReceipt(rec);
        }}
      />

    </div>
  );
};
