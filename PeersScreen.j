import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native';

const FAKE_PEERS = [
  { id: 'a1b2c3d4', name: 'Phone B', rssi: -52, connected: true },
  { id: 'e5f6g7h8', name: 'Phone C', rssi: -71, connected: false },
];

export default function PeersScreen({ user }) {
  const [peers, setPeers] = useState([]);
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    setPeers([]);
    setTimeout(() => setPeers([FAKE_PEERS[0]]), 1500);
    setTimeout(() => { setPeers(FAKE_PEERS); setScanning(false); }, 3000);
  };

  useEffect(() => { startScan(); }, []);

  const signal = (rssi) => {
    if (rssi > -60) return { bars: '▂▄▆█', color: '#22c55e', label: 'strong' };
    if (rssi > -75) return { bars: '▂▄▆', color: '#fbbf24', label: 'fair' };
    return { bars: '▂', color: '#f87171', label: 'weak' };
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Nearby peers</Text>
        <View style={s.pill}>
          <View style={[s.dot, scanning ? s.dotScanning : s.dotIdle]} />
          <Text style={s.pillText}>{scanning ? 'scanning...' : 'mesh active'}</Text>
        </View>
      </View>
      <View style={s.myId}>
        <Text style={s.myIdLabel}>Your node ID</Text>
        <Text style={s.myIdValue}>{user?.nodeId || 'f3a91c02'}</Text>
      </View>
      <FlatList
        data={peers}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyIcon}>⬡</Text>
            <Text style={s.emptyTitle}>{scanning ? 'Scanning...' : 'No peers found'}</Text>
            <Text style={s.emptyText}>Other phones with MeshNet{'\n'}will appear here</Text>
          </View>
        }
        renderItem={({ item }) => {
          const sig = signal(item.rssi);
          return (
            <View style={s.card}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={s.cardInfo}>
                <Text style={s.cardName}>{item.name}</Text>
                <Text style={s.cardId}>{item.id}</Text>
              </View>
              <View style={s.cardRight}>
                <Text style={[s.bars, { color: sig.color }]}>{sig.bars}</Text>
                <Text style={s.barLabel}>{sig.label}</Text>
                <View style={[s.connDot, item.connected ? s.connOn : s.connOff]} />
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={s.scanBtn} onPress={startScan}>
        <Text style={s.scanBtnText}>{scanning ? 'Scanning...' : '⬡  Scan again'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  title: { fontSize: 22, fontWeight: '500', color: '#111' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 0.5, borderColor: '#bbf7d0' },
  dot: { width: 7, height: 7, borderRadius: 4 },
  dotScanning: { backgroundColor: '#fbbf24' },
  dotIdle: { backgroundColor: '#22c55e' },
  pillText: { fontSize: 12, color: '#16a34a' },
  myId: { margin: 16, padding: 12, backgroundColor: '#f9fafb', borderRadius: 10, borderWidth: 0.5, borderColor: '#e5e7eb' },
  myIdLabel: { fontSize: 11, color: '#9ca3af', marginBottom: 2 },
  myIdValue: { fontSize: 14, fontFamily: 'monospace', color: '#374151' },
  list: { padding: 16, flexGrow: 1 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: '#111' },
  emptyText: { fontSize: 13, color: '#888', textAlign: 'center', marginTop: 6 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 10, backgroundColor: '#fff', borderRadius: 14, borderWidth: 0.5, borderColor: '#e5e7eb' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 18, fontWeight: '500', color: '#374151' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '500', color: '#111' },
  cardId: { fontSize: 12, color: '#9ca3af', marginTop: 2, fontFamily: 'monospace' },
  cardRight: { alignItems: 'flex-end', gap: 3 },
  bars: { fontSize: 14, letterSpacing: 1 },
  barLabel: { fontSize: 10, color: '#9ca3af' },
  connDot: { width: 8, height: 8, borderRadius: 4, marginTop: 2 },
  connOn: { backgroundColor: '#22c55e' },
  connOff: { backgroundColor: '#d1d5db' },
  scanBtn: { margin: 16, padding: 14, backgroundColor: '#111', borderRadius: 14, alignItems: 'center' },
  scanBtnText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});