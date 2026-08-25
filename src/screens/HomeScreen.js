import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useGhosts } from '../hooks/useGhosts';
import { theme } from '../theme';
import { formatCurrency } from '../utils/format';
import GhostCard from '../components/GhostCard';
import SelectionBar from '../components/SelectionBar';
import EmptyState from '../components/EmptyState';
import HauntedButton from '../components/HauntedButton';

const { colors = {}, spacing = {} } = theme;

export default function HomeScreen({ navigation }) {
  const { ghosts = [], fuseGhosts, exorciseGhosts } = useGhosts();
  const [selectedIds, setSelectedIds] = useState([]);

  const activeGhosts = useMemo(() => ghosts.filter((g) => !g.exorcised), [ghosts]);
  const totalHaunted = useMemo(
    () => activeGhosts.reduce((sum, g) => sum + Number(g.amount || 0), 0),
    [activeGhosts]
  );
  const selectedTotal = useMemo(
    () =>
      activeGhosts
        .filter((g) => selectedIds.includes(g.id))
        .reduce((sum, g) => sum + Number(g.amount || 0), 0),
    [activeGhosts, selectedIds]
  );

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id)