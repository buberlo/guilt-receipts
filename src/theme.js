// Shared haunted UI palette, spacing, and expense categories.

export const colors = {
  background: '#0F0B1A',
  surface: '#1A1428',
  surfaceRaised: '#241B38',
  border: '#3A2D55',
  text: '#F4EFFB',
  textDim: '#A99BC2',
  textFaint: '#6F628A',
  accent: '#9B7BFF',
  accentSoft: '#C9B8FF',
  danger: '#FF7A8A',
  warning: '#FFC46B',
  success: '#7BE3A8',
  ghost: '#B7A6FF',
  ghostDim: '#6D5C99',
  exorcised: '#8FE3B0',
  selected: '#FFD166',
  overlay: 'rgba(10, 7, 18, 0.78)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const shadows = {
  ghost: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const categories = [
  { id: 'food', label: 'Food', emoji: '🍕', color: colors.warning },
  { id: 'transport', label: 'Transport', emoji: '🚕', color: colors.accent },
  { id: 'home', label: 'Home', emoji: '🏚️', color: colors.ghost },
  { id: 'fun', label: 'Fun', emoji: '🎃', color: colors.danger },
  { id: 'health', label: 'Health', emoji: '💊', color: colors.success },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', color: colors.accentSoft },
  { id: 'bills', label: 'Bills', emoji: '📄', color: colors.textDim },
  { id: 'other', label: 'Other', emoji: '🌫️', color: colors.ghostDim },
];

export const categoryMap = categories.reduce((map, category) => {
  map[category.id] = category;
  return map;
}, {});

const theme = {
  colors,
  spacing,
  radius,
  shadows,
  categories,
  categoryMap,
};

export default theme;