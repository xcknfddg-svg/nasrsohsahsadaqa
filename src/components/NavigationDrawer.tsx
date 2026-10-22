import React from 'react';
import { X, BookOpen, Clock, Heart, Bell, CheckCircle2, Calculator, Volume2, ShieldCheck, Share2 } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNotifications: () => void;
  onOpenMuezzin: () => void;
  onOpenZakat: () => void;
  onOpenDedication: () => void;
  onOpenDeeds: () => void;
  onShareApp: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenNotifications,
  onOpenMuezzin,
  onOpenZakat,
  onOpenDedication,
  onOpenDeeds,
  onShareApp
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-start animate-in fade-in duration-200" dir="rtl">
      <div className="relative w-full max-w-sm bg-[#090d16] text-white h-full shadow-2xl flex flex-col border-l border-amber-900/40">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-amber-900/40 bg-gradient-to-r from-amber-950/60 to-[#090d16] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-950 flex items-center justify-center text-amber-300 font-arabic font-bold text-lg shadow-md">
              نَصْر
            </div>
            <div>
              <h3 className="font-arabic font-extrabold text-base text-amber-100">
                صدقة • نصر صهصاح
              </h3>
              <p className="text-xs text-amber-400/70 font-medium">
                تطبيق إسلامي شامل وصدقة جارية
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

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
          
          <button
            onClick={() => {
              onClose();
              onOpenMuezzin();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-emerald-950/40 border border-emerald-900/40 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
              🕌
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">المؤذن ومواقيت الصلاة</div>
              <div className="text-xs text-emerald-300/80">أذان الشيخ ناصر القطامي بدون نت</div>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenNotifications();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-amber-950/40 border border-amber-900/40 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-base">
              📿
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">تنبيهات الأذكار والتسابيح</div>
              <div className="text-xs text-amber-300/80">سبحان الله، الحمد لله، الاستغفار</div>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDeeds();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-slate-800 border border-slate-800 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-base">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">أعمال البر والصدقة اليومية</div>
              <div className="text-xs text-slate-400">«كل معروف صدقة» وتبسمك في وجه أخيك</div>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDedication();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-rose-950/40 border border-rose-900/40 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-base">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">إهداء ثواب الصدقة للمتوفى</div>
              <div className="text-xs text-rose-300/80">شهادة صدقة جارية باسم الوالدين</div>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenZakat();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-slate-800 border border-slate-800 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-base">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">حاسبة زكاة المال والنصاب</div>
              <div className="text-xs text-slate-400">حساب شرعي دقيق بنصاب الذهب والفضة</div>
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onShareApp();
            }}
            className="w-full p-3 rounded-2xl bg-[#121824] hover:bg-slate-800 border border-slate-800 flex items-center gap-3 text-right transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-base">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-arabic font-bold text-white text-sm">مشاركة التطبيق ولك الأجر</div>
              <div className="text-xs text-slate-400">«الدال على الخير كفاعله»</div>
            </div>
          </button>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-amber-900/30 bg-[#070a12] text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300/80 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>صدقة جارية لوجه الله تعالى</span>
          </div>
          <p className="text-[10px] text-slate-500">
            عن روح أمواتنا وأموات المسلمين جميعاً
          </p>
        </div>

      </div>
    </div>
  );
};
