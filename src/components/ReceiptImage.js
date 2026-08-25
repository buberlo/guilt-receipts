import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

const ReceiptImage = ({ uri, ageDays = 0, status = 'ghost', size = 'medium', style }) => {
  const isExorcised = status === 'exorcised';
  const dimensions =
    size === 'large'
      ? { width: 220, height: 280 }
      : size === 'small'
        ? { width: 72, height: 90 }
        : { width: 120, height: 150 };

  return (
    <View
      style={[
        styles.container,
        dimensions,
        { opacity: isExorcised ? 0.72 : 1 },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>{isExorcised ? '✨' : '👻'}</Text>
          <Text style={styles.placeholderText}>
            {isExorcised ? 'Exorcised' : 'No photo'}
          </Text>
        </View>
      )}

      {ageDays > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{ageDays}d</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  placeholderEmoji: {
    fontSize: 34,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    color: colors.muted,
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ReceiptImage;
