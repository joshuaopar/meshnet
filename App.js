cat > App.js << 'DONE'
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import ChatScreen from './ChatScreen';
import PeersScreen from './PeersScreen';
import OnboardingScreen from './OnboardingScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('chat');

  if (!user) {
    return <OnboardingScreen onDone={(u) => setUser(u)} />;
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.content}>
        {tab === 'chat' ? (
          <ChatScreen user={user} />
        ) : tab === 'peers' ? (
          <PeersScreen user={user} />
        ) : (
          <View style={s.profile}>
            <View style={s.profileCard}>
              <Text style={s.profileAvatar}>{user.name[0].toUpperCase()}</Text>
              <Text style={s.profileName}>{user.name}</Text>
              <Text style={s.profileLabel}>Node ID</Text>
              <Text style={s.profileId}>{user.nodeId}</Text>
              <View style={s.profileBadge}>
                <Text style={s.profileBadgeText}>⬡ mesh active</Text>
              </View>
            </View>
            <TouchableOpacity style={s.logoutBtn} onPress={() => setUser(null)}>
              <Text style={s.logoutText}>Reset identity</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={s.tabBar}>
        <TouchableOpacity style={[s.tab, tab === 'chat' && s.tabActive]} onPress={() => setTab('chat')}>
          <Text style={[s.tabIcon, tab === 'chat' && s.tabIconActive]}>💬</Text>
          <Text style={[s.tabLabel, tab === 'chat' && s.tabLabelActive]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.tab, tab === 'peers' && s.tabActive]} onPress={() => setTab('peers')}>
          <Text style={[s.tabIcon, tab === 'peers' && s.tabIconActive]}>⬡</Text>
          <Text style={[s.tabLabel, tab === 'peers' && s.tabLabelActive]}>Peers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.tab, tab === 'settings' && s.tabActive]} onPress={() => setTab('settings')}>
          <Text style={[s.tabIcon, tab === 'settings' && s.tabIconActive]}>⚙️</Text>
          <Text style={[s.tabLabel, tab === 'settings' && s.tabLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#e0e0e0', backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabActive: { borderTopWidth: 2, borderTopColor: '#111' },
  tabIcon: { fontSize: 22, color: '#ccc' },
  tabIconActive: { color: '#111' },
  tabLabel: { fontSize: 11, color: '#ccc', marginTop: 3 },
  tabLabelActive: { color: '#111', fontWeight: '500' },
  profile: { flex: 1, padding: 24, justifyContent: 'center' },
  profileCard: { alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 20, padding: 32, borderWidth: 0.5, borderColor: '#e5e7eb', marginBottom: 16 },
  profileAvatar: { fontSize: 56, marginBottom: 12 },
  profileName: { fontSize: 24, fontWeight: '500', color: '#111', marginBottom: 16 },
  profileLabel: { fontSize: 11, color: '#9ca3af', marginBottom: 4 },
  profileId: { fontSize: 14, fontFamily: 'monospace', color: '#374151', marginBottom: 16, letterSpacing: 1 },
  profileBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 0.5, borderColor: '#bbf7d0' },
  profileBadgeText: { fontSize: 13, color: '#16a34a' },
  logoutBtn: { padding: 16, borderRadius: 14, alignItems: 'center', borderWidth: 0.5, borderColor: '#e5e7eb' },
  logoutText: { fontSize: 15, color: '#ef4444' },
});
