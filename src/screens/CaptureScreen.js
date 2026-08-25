import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGhosts } from '../hooks/useGhosts';
import { HauntedButton } from '../components/HauntedButton';
import { ReceiptImage } from '../components/ReceiptImage';
import { AmountInput } from '../components/AmountInput';
import { theme } from '../theme';

const { colors, spacing = {}, radius = {} } = theme;
const pad = spacing.lg ?? 20;
const gap = spacing.md ?? 14;
const corner = radius.lg ?? 16;

export default function CaptureScreen({ navigation }) {
  const { addGhost } = useGhosts();
  const [amount, setAmount] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [busy, setBusy] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const handleCapture = async () => {
    setCapturing(true);
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
