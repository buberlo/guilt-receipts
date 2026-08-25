import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { palette, spacing } from '../theme';
import { formatCurrency, formatDate } from '../utils/format';
import { getGhostAge, getHauntingLevel, getGhostTitle } from '../utils/ghosts';
import ReceiptImage from './ReceiptImage';

const p = palette || {};
const s = spacing || {};
const surface = p.surface || p.background || '#12101A';
const border = p.border || p.muted || '#3A3550';
const text = p.text || p.foreground || '#