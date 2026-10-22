import React, { useState } from 'react';
import { X, Heart, Printer, Sparkles, Check, Download } from 'lucide-react';
import { Campaign, Currency, DonationRecord } from '../types';
import { CURRENCIES, convertFromUSD } from '../data/currencies';

interface DedicationModalProps {
  currentCurrency: Currency;
  campaigns: Campaign[];
  onClose: () => void;
  onCompleteDonation: (record: DonationRecord) => void;
}

export const DedicationModal: React.FC<DedicationModalProps> = ({
  currentCurrency,
  campaigns,
  onClose,
  onCompleteDonation
}) => {
  const [dedicationType, setDedicationType] = useState<'in_honor_of' | 'in_memory_of'>('in_memory_of');
  const [recipientName, setRecipientName] = useState<string>('My Beloved Mother');
  const [donorName, setDonorName] = useState<string>('Her Loving Family');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [duaNote, setDuaNote] = useState<string>('May Allah accept this continuous charity (Sadaqah Jariyah), illuminate their grave, and grant them Jannat al-Firdaus.');
  const [amountUSD, setAmountUSD] = useState<number>(100);
  const [viewCertificate, setViewCertificate] = useState<boolean>(false);

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];
  const convertedAmount = convertFromUSD(amountUSD, currentCurrency);
  const symbol = CURRENCIES[currentCurrency].symbol;

  const handlePrint = () => {
    window.print();
  };

  const handlePledgeAndFinish = () => {
    const record: DonationRecord = {
      id: `DED-${Date.now()}`,
      campaignId: selectedCampaign.id,
      campaignTitle: selectedCampaign.title,
      amount: convertedAmount,
      currency: currentCurrency,
      donorName: donorName || 'Devoted Giver',
      donorEmail: 'dedication@nasrsadaqa.org',
      isAnonymous: false,
      frequency: 'one-time',
      dedication: {
        type: dedicationType,
        personName: recipientName,
        duaMessage: duaNote
      },
      timestamp: new Date().toISOString(),
      transactionRef: `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    onCompleteDonation(record);
    setViewCertificate(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
              <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <span>Dedicate a Sadaqa in Honor of a Loved One</span>
              </h2>
              <p className="text-xs text-emerald-200">
                Establish an ongoing reward (Sadaqah 'Anhu/Anha) with a personalized Islamic certificate.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {!viewCertificate ? (
            /* Dedication Configuration Form */
            <div className="space-y-5">
              
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dedication Purpose
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDedicationType('in_memory_of')}
                    className={`py-3 px-4 rounded-xl border text-left font-bold text-sm transition-all ${
                      dedicationType === 'in_memory_of'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>🕊️ In Loving Memory of (Marhum)</span>
                      {dedicationType === 'in_memory_of' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-xs font-normal text-slate-500 block mt-1">
                      For deceased parents, grandparents, family, or martyrs.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDedicationType('in_honor_of')}
                    className={`py-3 px-4 rounded-xl border text-left font-bold text-sm transition-all ${
                      dedicationType === 'in_honor_of'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>🌸 In Honor of / Gift of Healing (Shifa)</span>
                      {dedicationType === 'in_honor_of' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-xs font-normal text-slate-500 block mt-1">
                      For living parents, wedding gift, newborn, or recovery.
                    </span>
                  </button>
                </div>
              </div>

              {/* Recipient and Donor Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name of Person being Dedicated ({dedicationType === 'in_memory_of' ? 'The Deceased' : 'Honoree'})
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Fatima bint Ahmad"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Given by (Your Name / Family Name)
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Her Son / The Rahman Family"
                  />
                </div>
              </div>

              {/* Cause Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Cause / Sadaqah Jariyah Project
                </label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — {c.location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Dua or Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Heartfelt Prayer / Dua Message for Certificate
                </label>
                <textarea
                  rows={2}
                  value={duaNote}
                  onChange={(e) => setDuaNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter custom prayer..."
                />
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contribution Amount ({symbol})
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[50, 100, 250, 500].map((amt) => {
                    const conv = convertFromUSD(amt, currentCurrency);
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmountUSD(amt)}
                        className={`py-2 text-center rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                          amountUSD === amt
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {symbol}{conv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePledgeAndFinish}
                  disabled={!recipientName.trim()}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-xl shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>
                    Confirm Dedication &amp; Generate Certificate ({symbol}{convertedAmount})
                  </span>
                </button>
              </div>

            </div>
          ) : (
            /* CERTIFICATE PREVIEW & PRINT */
            <div className="space-y-6">
              
              {/* Certificate Canvas Box */}
              <div 
                id="dedication-certificate" 
                className="bg-radial from-amber-50/70 via-stone-50 to-amber-100/60 p-6 sm:p-10 rounded-2xl border-4 border-amber-300/80 shadow-inner relative text-slate-900 text-center"
              >
                {/* Ornate corner borders */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600 pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600 pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600 pointer-events-none"></div>

                {/* Bismillah Calligraphy */}
                <p className="font-arabic text-xl sm:text-2xl text-emerald-900 font-bold mb-3 tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>

                <div className="inline-block bg-amber-200/80 text-amber-950 text-xs font-extrabold uppercase tracking-widest px-4 py-1 rounded-full mb-3 border border-amber-300">
                  {dedicationType === 'in_memory_of' ? 'Certificate of Sadaqah in Loving Memory' : 'Certificate of Sadaqah Dedication'}
                </div>

                <h3 className="font-arabic text-lg sm:text-xl text-emerald-800 mb-2 font-bold">
                  شَهَادَةُ صَدَقَةٍ جَارِيَةٍ وَإِهْدَاءِ ثَوَابٍ
                </h3>

                <p className="text-xs text-slate-500 italic max-w-lg mx-auto mb-6">
                  "When a person dies, all their deeds end except three: a continuous charity, beneficial knowledge, or a child who prays for them." — Sahih Muslim
                </p>

                <div className="my-6 py-4 border-y border-amber-300/70 space-y-2">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                    {dedicationType === 'in_memory_of' ? 'This continuous charity is dedicated to the soul of:' : 'This continuous charity is lovingly dedicated in honor of:'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">
                    {recipientName}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Gifted with profound devotion by: <strong className="text-slate-800">{donorName}</strong>
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="text-xs text-slate-600">
                    Project Supported: <strong className="text-emerald-800">{selectedCampaign.title}</strong>
                  </div>
                  <div className="text-xs text-slate-600">
                    Location: <strong>{selectedCampaign.location}</strong>
                  </div>
                  <div className="text-xs text-slate-600">
                    Dedicated Contribution: <strong>{symbol}{convertedAmount}</strong>
                  </div>
                </div>

                {duaNote && (
                  <div className="bg-white/80 p-3 rounded-xl border border-amber-200 max-w-md mx-auto text-xs text-slate-700 italic">
                    "{duaNote}"
                  </div>
                )}

                <div className="mt-8 pt-4 border-t border-amber-200/70 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Nasr Sohsah Sadaqa Verification Registry</span>
                  <span>Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              {/* Print and Download Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setViewCertificate(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  ← Edit Dedication
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
