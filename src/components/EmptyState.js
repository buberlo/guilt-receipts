import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as theme from '../theme';

const colors = theme.colors || {};
const spacing = theme.spacing || {};

const c = {
  background: colors.background || '#0F0F1A',
  text: colors.text || '#F5F0FF',
  textMuted: colors.textMuted || '#A79FC4',
  primary: colors.primary || '#8B5CF6',
  onPrimary: colors.onPrimary || '#FFFFFF',
};

const s = {
  sm: spacing.sm || 8,
  md: spacing.md || 16,
  lg: spacing.lg || 24,
};

const EmptyState = ({ onCapture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ghostWrap}>
        <Text style={styles.ghost}>👻</Text>
        <Text style={styles.title}>No Ghosts Yet</Text>
        <Text style={styles.subtitle}>
          Your wallet is suspiciously quiet. Capture a receipt to summon your first ghost.
        </Text>
        {onCapture ? (
          <Pressable
            onPress={onCapture}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Capture a Receipt</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s.lg,
    backgroundColor: c.background,
  },
  ghostWrap: {
    alignItems: 'center',
    maxWidth: 320,
  },
  ghost: {
    fontSize: 72,
    marginBottom: s.md,
    opacity: 0.9,
  },
  title: {
    color: c.text,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: s.sm,
  },
  subtitle: {
    color: c.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: s.lg,
  },
  button: {
    backgroundColor: c.primary,
    borderRadius: 16,
    paddingVertical: s.md,
    paddingHorizontal: s.lg,
    shadowColor: c.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: c.onPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default EmptyState;
