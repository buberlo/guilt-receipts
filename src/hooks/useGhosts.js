import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchGhosts,
  createGhost,
  updateGhost,
  splitGhost,
  fuseGhosts,
  exorciseGhosts,
} from '../db/queries';
import { getGhostAge, getHauntingLevel, getGhostTitle } from '../utils/ghosts';

const decorate = (row) => {
  if (!row) return null;
  const ageDays = getGhostAge(row.created_at);
  return {
    ...row,
    ageDays,
    hauntingLevel: getHauntingLevel(ageDays),
    title: getGhostTitle(row.category, row.amount, ageDays),
  };
};

export default function useGhosts({ onlyActive = true } = {}) {
  const [ghosts, setGhosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchGhosts(onlyActive ? 'active' : null);
      setGhosts(rows.map(decorate));
    } catch (err) {
      setError(err.message || 'The spirits are restless.');
    } finally {
      setLoading(false);
    }
  }, [onlyActive]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const capture = useCallback(async (payload) => {
    const ghost = await createGhost(payload);
    await refresh();
    return decorate(ghost);
  }, [refresh]);

  const update = useCallback(async (id, payload) => {
    const ghost = await updateGhost(id, payload);
    await refresh();
    return decorate(ghost);
  }, [refresh]);

  const split = useCallback(async (id, splits) => {
    const created = await splitGhost(id, splits);
    await refresh();
    return created.map(decorate);
  }, [refresh]);

  const fuse = useCallback(async (ids) => {
    const ghost = await fuseGhosts(ids);
    await refresh();
    return decorate(ghost);
  }, [refresh]);

  const exorcise = useCallback(async (ids, category) => {
    const exorcised = await exorciseGhosts(ids, category);
    await refresh();
    return exorcised.map(decorate);
  }, [refresh]);

  const totalHaunted = useMemo(
    () =>
      ghosts
        .filter((ghost) => ghost.status !== 'exorcised')
        .reduce((sum, ghost) => sum + Number(ghost.amount || 0), 0),
    [ghosts],
  );

  return {
    ghosts,
    loading,
    error,
    totalHaunted,
    refresh,
    capture,
    update,
    split,
    fuse,
    exorcise,
  };
}
