// src/utils/format.js
/**
 * Formatting helpers for currency and dates.
 */

const CURRENCY = 'USD';
const LOCALE = 'en-US';

function getNumberFormat(min, max, currency) {
  try {
    return new Intl.NumberFormat(LOCALE, { style: 'currency', currency, minimumFractionDigits: min, maximumFractionDigits: max });
  } catch {
    return null;
  }
}

export function formatCurrency(amount, { currency = CURRENCY, compact = false } = {}) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return '—';

  if (compact) {
    try