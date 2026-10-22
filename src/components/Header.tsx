import React, { useState, useEffect } from 'react';
import { Download, Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenMuezzin: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  hasActiveNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenMuezzin,
  onOpenSearch,
  onOpenMenu,
  hasActiveNotifications = true
}) => {
  const [isNative, setIsNative] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // 1. Detect if running inside Capacitor native APK
    const native = Capacitor.isNativePlatform();
    setIsNative(native);

    // 2. Detect if running in standalone PWA installed mode
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // 3. Listen for PWA beforeinstallprompt on web
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPrompt(null);
    } else {
      // Guide user on how to install
      alert('لتثبيت التطبيق على جهازك: اضغط على خيارات المتصفح (⋮) ثم اختر "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق".');
    }
  };

  // Rule: In APK mode or when running as installed standalone app, NEVER show the "تثبيت" button
  const shouldShowInstallButton = !isNative && !isStandalone && !isInstalled;

  return (
    <header className="sticky top-0 z-40 bg-[#090d16] text-white border-b border-amber-900/30 shadow-lg px-2 sm:px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2" dir="rtl">
        
        {/* Right side: Golden Nasr seal & Sadaqah Jariyah badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Circular Golden "نصر" Calligraphy Emblem */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500/80 bg-gradient-to-br from-amber-950 via-[#120e09] to-black shadow-md shadow-amber-500/20 hover:scale-105 transition-transform"
            title="نصر صهصاح - صدقة"
          >
            {/* Concentric inner ring */}
            <div className="absolute inset-0.5 rounded-full border border-amber-400/40 pointer-events-none"></div>
            
            {/* Calligraphic Nasr text */}
            <span className="font-arabic text-amber-300 font-bold text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)] select-none">
              نَصْر
            </span>
          </div>

          {/* "صدقة جارية" Badge with Glowing Green Pulse */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-950/60 border border-emerald-600/50 shadow-inner">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-arabic font-bold text-xs sm:text-sm text-emerald-300 whitespace-nowrap">
              صدقة جارية
            </span>
          </div>

        </div>

        {/* Action Controls & Navigation Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* "تثبيت" (Install) Button - Displayed ONLY on Web when NOT in APK or Standalone */}
          {shouldShowInstallButton && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-amber-500/70 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 font-bold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
              title="تثبيت التطبيق على الهاتف"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-arabic text-xs">تثبيت</span>
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-amber-500/60 bg-[#16120b] hover:bg-amber-950/50 text-amber-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="بحث في الأذكار والقرآن"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Notifications Button with active badge */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-amber-500/60 bg-[#16120b] hover:bg-amber-950/50 text-amber-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="إعدادات تنبيهات الأذكار"
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {hasActiveNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#090d16] animate-pulse"></span>
            )}
          </button>

          {/* Muezzin / Adhan Quick Toggle Button */}
          <button
            onClick={onOpenMuezzin}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-amber-500/60 bg-[#16120b] hover:bg-amber-950/50 text-amber-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="المؤذن ومواقيت الصلاة (الشيخ ناصر القطامي)"
          >
            <span className="text-sm select-none">🕌</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-amber-500/60 bg-[#16120b] hover:bg-amber-950/50 text-amber-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="تغيير المظهر"
          >
            {isDarkMode ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
          </button>

          {/* Menu Drawer Button */}
          <button
            onClick={onOpenMenu}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-amber-500/60 bg-[#16120b] hover:bg-amber-950/50 text-amber-400 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="القائمة الرئيسية"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>

      </div>
    </header>
  );
};
