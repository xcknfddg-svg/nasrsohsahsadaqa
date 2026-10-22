import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Calendar, Sparkles, User, Mail, CreditCard } from 'lucide-react';
import { Campaign, Currency, DonationRecord } from '../types';
import { CURRENCIES, convertFromUSD, formatCurrency } from '../data/currencies';

interface CampaignDetailsModalProps {
  campaign: Campaign | null;
  currentCurrency: Currency;
  initialAmountUSD?: number;
  onClose: () => void;
  onCompleteDonation: (record: DonationRecord) => void;
}

export const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  campaign,
  currentCurrency,
  initialAmountUSD,
  onClose,
  onCompleteDonation
}) => {
  if (!campaign) return null;

  const [activeTab, setActiveTab] = useState<'donate' | 'story' | 'updates'>('donate');
  const [frequency, setFrequency] = useState<'one-time' | 'friday' | 'monthly'>('one-time');
  
  // Amount state
  const defaultAmount = initialAmountUSD ? convertFromUSD(initialAmountUSD, currentCurrency) : convertFromUSD(campaign.impactTiers[0]?.amountUSD || 50, currentCurrency);
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');

  // Dedication state
  const [isDedicated, setIsDedicated] = useState<boolean>(false);
  const [dedicationType, setDedicationType] = useState<'in_honor_of' | 'in_memory_of'>('in_honor_of');
  const [dedicatedTo, setDedicatedTo] = useState<string>('');
  const [duaMessage, setDuaMessage] = useState<string>('');

  // Donor state
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'bank'>('card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const record: DonationRecord = {
        id: `DON-${Date.now()}`,
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        amount: Math.round(effectiveAmount),
        currency: currentCurrency,
        donorName: isAnonymous ? 'Anonymous Believer' : (donorName.trim() || 'Generous Donor'),
        donorEmail: donorEmail.trim() || 'donor@example.com',
        isAnonymous,
        frequency,
        dedication: isDedicated && dedicatedTo.trim() ? {
          type: dedicationType,
          personName: dedicatedTo.trim(),
          duaMessage: duaMessage.trim() || 'May Allah accept this continuous charity and bestow peace and elevation upon them.'
        } : undefined,
        timestamp: new Date().toISOString(),
        transactionRef: `REF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      };

      onCompleteDonation(record);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header with image preview banner */}
        <div className="relative h-44 sm:h-52 bg-slate-900 shrink-0">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner text */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {campaign.category}
              </span>
              {campaign.isJariyah && (
                <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-900" />
                  Sadaqah Jariyah
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold line-clamp-1 leading-tight">
              {campaign.title}
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            onClick={() => setActiveTab('donate')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'donate'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>Donate &amp; Dedicate</span>
          </button>

          <button
            onClick={() => setActiveTab('story')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'story'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Full Story &amp; Need
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`py-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'updates'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Field Updates ({campaign.updates.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {/* TAB 1: DONATE & DEDICATE */}
          {activeTab === 'donate' && (
            <form onSubmit={handleDonateSubmit} className="space-y-6">
              
              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Giving Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'one-time', label: 'One-Time' },
                    { id: 'friday', label: 'Friday Sadaqa 🕌' },
                    { id: 'monthly', label: 'Monthly Sustenance' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id as any)}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                        frequency === f.id
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact Tiers Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Select Impact Tier ({CURRENCIES[currentCurrency].symbol})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {campaign.impactTiers.map((tier, idx) => {
                    const tierInCurrent = convertFromUSD(tier.amountUSD, currentCurrency);
                    const isSelected = !customAmount && selectedAmount === tierInCurrent;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedAmount(tierInCurrent);
                          setCustomAmount('');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="font-extrabold text-base text-emerald-800">
                            {formatCurrency(tier.amountUSD, currentCurrency)}
                          </span>
                          {isSelected && (
                            <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {tier.impact}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                      {CURRENCIES[currentCurrency].symbol}
                    </span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Or specify any custom contribution..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dedication in Honor / Memory Of Accordion */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">
                        Dedicate this Sadaqah in Honor of Someone
                      </h4>
                      <p className="text-xs text-amber-800/80">
                        Give on behalf of parents, a departed loved one, or for healing (Shifa).
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    id="dedicate-toggle"
                    checked={isDedicated}
                    onChange={(e) => setIsDedicated(e.target.checked)}
                    className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  />
                </div>

                {isDedicated && (
                  <div className="mt-4 pt-4 border-t border-amber-200/80 space-y-3">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-amber-950 cursor-pointer">
                        <input
                          type="radio"
                          name="dedication_type"
                          checked={dedicationType === 'in_honor_of'}
                          onChange={() => setDedicationType('in_honor_of')}
                          className="accent-emerald-600"
                        />
                        <span>In Honor of (Living / Parents / Shifa)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-amber-950 cursor-pointer">
                        <input
                          type="radio"
                          name="dedication_type"
                          checked={dedicationType === 'in_memory_of'}
                          onChange={() => setDedicationType('in_memory_of')}
                          className="accent-emerald-600"
                        />
                        <span>In Loving Memory of (Marhum / Deceased)</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-900 mb-1">
                        Name of Honoree / Loved One
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. My Beloved Parents, or Late Haji Ibrahim"
                        value={dedicatedTo}
                        onChange={(e) => setDedicatedTo(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-900 mb-1">
                        Personal Prayer / Dua Note (Printed on Certificate)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. May Allah grant them Jannatul Firdaus and illuminate their grave."
                        value={duaMessage}
                        onChange={(e) => setDuaMessage(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Donor Contact Details & Payment Simulator */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Donor Information
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <span>Give Anonymously</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="Email for instant tax receipt"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {/* Payment Channel Simulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Payment Method (Simulated Safe Checkout)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Debit/Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'apple'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>🍎 Apple / G-Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>🏦 Bank Wire</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={effectiveAmount <= 0 || isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-xl shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>
                    {isSubmitting
                      ? 'Processing Secure Pledge...'
                      : `Confirm & Donate ${CURRENCIES[currentCurrency].symbol}${Math.round(effectiveAmount)}`}
                  </span>
                </button>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Voluntary Donation Policy • Tax Deductible Official Receipt Issued</span>
                </div>
              </div>

            </form>
          )}

          {/* TAB 2: FULL STORY */}
          {activeTab === 'story' && (
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">Summary of Need</h4>
                <p className="text-emerald-800/90 text-xs sm:text-sm">{campaign.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Detailed Background &amp; Context</h4>
                <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                  {campaign.detailedStory}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Location &amp; Implementation</h4>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Active implementation cluster: <strong>{campaign.location}</strong>. Supervised directly by verified on-ground humanitarian partners with full transparency reporting.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: FIELD UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-4">
              {campaign.updates.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  Updates will be posted here as field deployment milestones are completed.
                </p>
              ) : (
                campaign.updates.map((up, i) => (
                  <div key={i} className="border-l-2 border-emerald-500 pl-4 py-1 space-y-1">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {up.date}
                    </span>
                    <h5 className="font-bold text-slate-900 text-sm">{up.title}</h5>
                    <p className="text-xs sm:text-sm text-slate-600">{up.description}</p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
