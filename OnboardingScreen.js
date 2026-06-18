import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';

export default function OnboardingScreen({ onDone }) {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const nodeId = 'f3a91c02b7d14e5a';

  const finish = () => onDone({ name: name.trim(), nodeId });

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.inner}
      >
        {step === 1 && (
          <View style={s.step}>
            <Text style={s.logo}>⬡</Text>
            <Text style={s.title}>Welcome to MeshNet</Text>
            <Text style={s.subtitle}>
              Chat with people nearby without internet.{'\n'}
              No servers. No tracking. No censorship.
            </Text>
            <View style={s.features}>
              <View style={s.feature}>
                <Text style={s.fIcon}>📡</Text>
                <View>
                  <Text style={s.fTitle}>Works offline</Text>
                  <Text style={s.fText}>Uses Bluetooth & WiFi Direct</Text>
                </View>
              </View>
              <View style={s.feature}>
                <Text style={s.fIcon}>🔒</Text>
                <View>
                  <Text style={s.fTitle}>End-to-end encrypted</Text>
                  <Text style={s.fText}>Nobody can read your messages</Text>
                </View>
              </View>
              <View style={s.feature}>
                <Text style={s.fIcon}>⬡</Text>
                <View>
                  <Text style={s.fTitle}>Mesh network</Text>
                  <Text style={s.fText}>Messages hop through nearby phones</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={s.btn} onPress={() => setStep(2)}>
              <Text style={s.btnText}>Get started →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={s.step}>
            <Text style={s.logo}>⬡</Text>
            <Text style={s.title}>What's your name?</Text>
            <Text style={s.subtitle}>
              This is how other devices on the mesh will see you.
            </Text>
            <TextInput
              style={s.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name..."
              placeholderTextColor="#999"
              maxLength={30}
              autoFocus
            />
            <TouchableOpacity
              style={[s.btn, !name.trim() && s.btnDisabled]}
              onPress={() => name.trim() && setStep(3)}
              disabled={!name.trim()}
            >
              <Text style={s.btnText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={s.step}>
            <Text style={s.logo}>⬡</Text>
            <Text style={s.title}>Your mesh identity</Text>
            <Text style={s.subtitle}>
              This is your unique node ID.{'\n'}
              Share it so others can message you.
            </Text>
            <View style={s.idCard}>
              <Text style={s.idName}>{name}</Text>
              <Text style={s.idLabel}>Node ID</Text>
              <Text style={s.idValue}>{nodeId}</Text>
            </View>
            <Text style={s.hint}>
              🔒 Your messages are encrypted with this identity
            </Text>
            <TouchableOpacity style={s.btn} onPress={finish}>
              <Text style={s.btnText}>Start messaging →</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      <View style={s.dots}>
        {[1,2,3].map(i => (
          <View key={i} style={[s.dot, step === i && s.dotActive]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, padding: 28, justifyContent: 'center' },
  step: { alignItems: 'center' },
  logo: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '500', color: '#111', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  features: { width: '100%', marginBottom: 32, gap: 12 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#f9fafb', padding: 14, borderRadius: 12, borderWidth: 0.5, borderColor: '#e5e7eb' },
  fIcon: { fontSize: 24 },
  fTitle: { fontSize: 14, fontWeight: '500', color: '#111' },
  fText: { fontSize: 12, color: '#888', marginTop: 2 },
  input: { width: '100%', backgroundColor: '#f3f4f6', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, fontSize: 16, color: '#111', marginBottom: 16, borderWidth: 0.5, borderColor: '#e5e7eb' },
  btn: { width: '100%', backgroundColor: '#111', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled: { backgroundColor: '#d1d5db' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  idCard: { width: '100%', backgroundColor: '#f9fafb', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 0.5, borderColor: '#e5e7eb', marginBottom: 20 },
  idName: { fontSize: 22, fontWeight: '500', color: '#111', marginBottom: 16 },
  idLabel: { fontSize: 11, color: '#9ca3af', marginBottom: 4 },
  idValue: { fontSize: 15, fontFamily: 'monospace', color: '#374151', letterSpacing: 1 },
  hint: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingBottom: 32 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#e5e7eb' },
  dotActive: { backgroundColor: '#111', width: 20 },
});