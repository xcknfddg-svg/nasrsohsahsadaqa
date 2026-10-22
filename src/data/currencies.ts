import { Currency, CurrencyConfig } from '../types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.79 },
  SAR: { code: 'SAR', symbol: '﷼', rateFromUSD: 3.75 },
  AED: { code: 'AED', symbol: 'د.إ', rateFromUSD: 3.67 },
  CAD: { code: 'CAD', symbol: 'CA$', rateFromUSD: 1.36 }
};

export function formatCurrency(amountInUSD: number, currency: Currency): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = amountInUSD * config.rateFromUSD;
  
  // Clean formatting
  if (['SAR', 'AED'].includes(currency)) {
    return `${Math.round(converted).toLocaleString()} ${config.symbol}`;
  }
  return `${config.symbol}${Math.round(converted).toLocaleString()}`;
}

export function convertFromUSD(amountInUSD: number, currency: Currency): number {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  return Math.round(amountInUSD * config.rateFromUSD);
}

export function convertToUSD(amountInCurrency: number, currency: Currency): number {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  return amountInCurrency / config.rateFromUSD;
}
