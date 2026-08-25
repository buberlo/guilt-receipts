import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const pad = spacing || {};
const xs = pad.xs || 4;
const sm = pad.sm || 8;
const md = pad.md || 12;

const c = colors || {};
const accent = c.accent || '#8B5CF6';
const text = c.text || '#F5F0FF';
const surface = c.surface || '#1F1830';
const border = c.border || '#3A2E55';
const danger = c.danger || '#EF6B7D';
const onAccent = c.onAccent || text;

const variants = {
  primary: {
    bg: accent,
    text: onAccent,
    border: accent,
  },
  ghost: {
    bg: 'transparent',
    text: accent,
    border: accent,
  },
  danger: {
    bg: danger,
    text: text,
    border: danger,
  },
  subtle: {
    bg: surface,
    text: text,
    border: border,
  },
};

const sizes = {
  sm: { padding: xs, radius: 10, fontSize: 13, minHeight: 36 },
  md: { padding: sm, radius: 14, fontSize: 15, minHeight: 44 },
  lg: { padding: md, radius: 18, fontSize: 17, minHeight: 52 },
};

export default function HauntedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  children,
  style,
}) {
  const isDisabled = disabled || loading;
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const label = children || title;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          borderRadius: s.radius,
          minHeight: s.minHeight,
          paddingHorizontal: s.padding,
          paddingVertical: Math.max(8, s.padding - 4),
          opacity: pressed ? 0.78 : isDisabled ? 0.55 : 1,
          borderWidth: variant === 'ghost' ? 1.5 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={v.text} size="small" /> : null}
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      {label ? <Text style={[styles.label, { color: v.text, fontSize: s.fontSize }]}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: { alignSelf: 'stretch' },
  icon: { marginRight: 6 },
  label: { fontWeight: '700', letterSpacing: 0.2 },
});
