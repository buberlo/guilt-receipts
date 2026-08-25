// src/utils/ghosts.js
// Computes ghost age, haunting level, and playful ghost titles.

const DAY_MS = 24 * 60 * 60 * 1000;

export function getGhostAgeDays(receipt, now = Date.now()) {
  if (!receipt) return 0;
  const raw =
    receipt.date_captured ||
    receipt.captured_at ||
    receipt.createdAt ||
    receipt.created_at ||
    receipt.date;

  if (!raw) return 0;

  const start = raw instanceof Date ? raw.getTime() : new Date(raw).getTime();
  if (Number.isNaN(start)) return 0;

  const diff = Math.max(0, now - start);
  return Math.floor(diff / DAY_MS);
}

export function getHauntingLevel(ageDays = 0) {
  if (ageDays < 1) return 'fresh';
  if (ageDays < 3) return 'restless';
  if (ageDays < 7) return 'spooky';
  if (ageDays < 14) return 'moaning';
  if (ageDays < 30) return 'cursed';
  if (ageDays < 90) return 'ancient';
  return 'legendary';
}

const TITLES = {
  fresh: 'Fresh Phantom',
  restless: 'Restless Bill',
  spooky: 'Spooky Slip',
  moaning: 'Moaning Memo',
  cursed: 'Cursed Coupon',
  ancient: 'Ancient Artifact',
  legendary: 'Legendary Ledger Ghost'
};

export function getGhostTitle(receipt, now = Date.now()) {
  if (!receipt) return 'Unknown Ghost';
  if (receipt.status === 'exorcised' || receipt.exorcised) {
    return 'Exorcised Expense';
  }

  const ageDays = getGhostAgeDays(receipt, now);
  const level = getHauntingLevel(ageDays);
  const base = TITLES[level] || 'Haunted Receipt';
  const amount = Number(receipt.amount || 0);

  if (amount >= 1000) return `Mega ${base}`;
  if (amount >= 100) return `Bold ${base}`;
  return base;
}

export function getGhostAgeLabel(receipt, now = Date.now()) {
  const days = getGhostAgeDays(receipt, now);

  if (days <= 0) return 'today';
  if (days === 1) return '1 day old';
  if (days < 30) return `${days} days old`;

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} old`;
  }

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? '' : 's'} old`;
}

export function getGhostSummary(receipt, now = Date.now()) {
  const ageDays = getGhostAgeDays(receipt, now);

  return {
    ageDays,
    ageLabel: getGhostAgeLabel(receipt, now),
    hauntingLevel: getHauntingLevel(ageDays),
    title: getGhostTitle(receipt, now),
    isExorcised: Boolean(receipt.status === 'exorcised' || receipt.exorcised)
  };
}
