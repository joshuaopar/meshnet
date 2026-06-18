import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet
} from 'react-native';

export default function ChatScreen({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
    setInput('');
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerText}>⬡ MeshNet</Text>
        <Text style={s.headerSub}>no internet · peer to peer</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyIcon}>⬡</Text>
            <Text style={s.emptyTitle}>No messages yet</Text>
            <Text style={s.emptyText}>Works without internet</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={s.bubble}>
            <Text style={s.bubbleText}>{item.text}</Text>
            <Text style={s.bubbleTime}>{item.time}</Text>
          </View>
        )}
      />
      <View style={s.inputRow}>
        <TextInput
          style={s.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={s.sendBtn} onPress={send}>
          <Text style={s.sendText}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0', alignItems: 'center' },
  headerText: { fontSize: 22, fontWeight: '500', color: '#111' },
  headerSub: { fontSize: 12, color: '#22c55e', marginTop: 3 },
  list: { padding: 16, flexGrow: 1 },
  empty: { alignItems: 'center', paddingTop: 100 },
  emptyIcon: { fontSize: 52, marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: '500', color: '#111' },
  emptyText: { fontSize: 14, color: '#888', marginTop: 6 },
  bubble: { alignSelf: 'flex-end', backgroundColor: '#111', borderRadius: 16, borderBottomRightRadius: 4, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 8, maxWidth: '75%' },
  bubbleText: { color: '#fff', fontSize: 15 },
  bubbleTime: { color: '#999', fontSize: 11, marginTop: 3, textAlign: 'right' },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 0.5, borderTopColor: '#e0e0e0', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#111', marginRight: 8 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  sendText: { color: '#fff', fontSize: 18 }
});
