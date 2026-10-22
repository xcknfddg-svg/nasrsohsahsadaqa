import React from 'react';
import { Heart, MapPin, Users, Clock, Sparkles } from 'lucide-react';
import { Campaign, Currency } from '../types';
import { formatCurrency } from '../data/currencies';

interface CampaignCardProps {
  campaign: Campaign;
  currentCurrency: Currency;
  onSelect: (campaign: Campaign) => void;
  onDonate: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  currentCurrency,
  onSelect,
  onDonate
}) => {
  const percentage = Math.min(100, Math.round((campaign.raisedUSD / campaign.targetUSD) * 100));
  const firstImpact = campaign.impactTiers[0];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Container with Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none"></div>

        {/* Category & Jariyah Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="bg-white/95 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
            {campaign.category}
          </span>
          {campaign.isJariyah && (
            <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Sadaqah Jariyah
            </span>
          )}
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1 drop-shadow-md">
          <MapPin className="w-3.5 h-3.5 text-emerald-300" />
          <span>{campaign.location}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {campaign.arabicTitle && (
            <p className="font-arabic text-sm text-emerald-800 font-bold mb-1 line-clamp-1 dir-rtl text-right">
              {campaign.arabicTitle}
            </p>
          )}

          <h3 
            onClick={() => onSelect(campaign)}
            className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
          >
            {campaign.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {campaign.summary}
          </p>

          {/* Quick Impact Highlight */}
          {firstImpact && (
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-2.5 mb-4 text-xs text-emerald-900 flex items-start gap-2">
              <span className="font-bold text-emerald-700 shrink-0">Impact:</span>
              <span className="line-clamp-1">{firstImpact.impact}</span>
            </div>
          )}
        </div>

        <div>
          {/* Progress Bar & Financials */}
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(campaign.raisedUSD, currentCurrency)}
              </span>
              <span className="text-slate-500">
                goal: {formatCurrency(campaign.targetUSD, currentCurrency)}
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-0.5">
              <span className="text-emerald-700 font-bold">{percentage}% Funded</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  {campaign.donorCount} donors
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {campaign.daysLeft}d left
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelect(campaign)}
              className="w-full py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Story &amp; Updates
            </button>
            <button
              onClick={() => onDonate(campaign)}
              className="w-full py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Donate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
