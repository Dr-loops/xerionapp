import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LAB_BRANCHES } from '../index'; 

export default function LabBranchDashboard() {
  const { id } = useLocalSearchParams();
  const [activeModal, setActiveModal] = useState<'consult' | null>(null);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const branch = LAB_BRANCHES.find(b => b.id === id) || { 
    name: 'Unknown Laboratory', 
    location: 'Location not found', 
    phone: 'N/A', 
    status: 'Unknown',
    images: []
  };

  const isClosed = branch.status === 'Closed';

  const handleWhatsApp = (type: 'consult') => {
    if (!inputText.trim()) {
      Alert.alert('Empty Message', 'Please describe your request before sending.');
      return;
    }

    const message = type === 'consult' 
      ? `Health Consultation for ${branch.name}: ${inputText}`
      : `Test Request for ${branch.name}: ${inputText}`;
    
    const url = `whatsapp://send?phone=${branch.phone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
        setActiveModal(null);
        setInputText('');
      } else {
        Alert.alert('WhatsApp not installed', 'Please install WhatsApp to continue.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>{branch.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: isClosed ? '#ef4444' : '#22c55e' }]} />
                <Text style={styles.headerStatus}>{branch.status}</Text>
              </View>
            </View>
          </View>

          {/* Location Banner */}
          <View style={styles.infoSection}>
            <LinearGradient
              colors={['#1e293b', '#0f172a']}
              style={styles.infoBanner}
            >
              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <View style={styles.iconCircleDark}>
                    <Ionicons name="location" size={16} color="#cbd5e1" />
                  </View>
                  <Text style={styles.infoText}>{branch.location}</Text>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.iconCircleDark}>
                    <Ionicons name="call" size={16} color="#cbd5e1" />
                  </View>
                  <Text style={styles.infoText}>{branch.phone}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Image Gallery Section */}
          <View style={styles.galleryContainer}>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitleSmall}>Laboratory Gallery</Text>
              <Text style={styles.imageCount}>{branch.images?.length || 0} Photos</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.galleryScroll}
              decelerationRate="fast"
              snapToInterval={280 + 16}
            >
              {branch.images?.map((img: string, idx: number) => (
                <View key={idx} style={styles.imageWrapper}>
                  <Image source={{ uri: img }} style={styles.branchImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.sectionTitle}>Lab Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.actionCard} 
              onPress={() => {
                setActiveModal('consult');
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
            >
              <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.actionIcon}>
                <Ionicons name="chatbubbles" size={26} color="#ffffff" />
              </LinearGradient>
              <Text style={styles.actionTitle}>Book a Test</Text>
              <Text style={styles.actionSub}>WhatsApp Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => Linking.openURL(`tel:${branch.phone}`)}
            >
              <LinearGradient colors={['#0ea5e9', '#0284c7']} style={styles.actionIcon}>
                <Ionicons name="call" size={26} color="#ffffff" />
              </LinearGradient>
              <Text style={styles.actionTitle}>Call Lab</Text>
              <Text style={styles.actionSub}>Quick Support</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Unified Interactive Modal */}
        <Modal
          visible={!!activeModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setActiveModal(null)}
        >
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            setActiveModal(null);
          }}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <View style={[styles.modalIconCircle, { backgroundColor: '#8b5cf620' }]}>
                      <Ionicons name="flask" size={28} color="#8b5cf6" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.modalTitle}>Book Laboratory Test</Text>
                      <Text style={styles.modalSub}>{branch.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setActiveModal(null)}>
                      <Ionicons name="close-circle" size={32} color="#cbd5e1" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={inputRef}
                      style={styles.textInput}
                      placeholder="Describe the test you need (e.g., Malaria, Typhoid, Full Blood Count)..."
                      placeholderTextColor="#94a3b8"
                      multiline
                      value={inputText}
                      onChangeText={setInputText}
                      autoFocus={true}
                    />
                  </View>

                  <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={() => handleWhatsApp('consult')}
                  >
                    <LinearGradient
                      colors={['#22c55e', '#16a34a']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.sendGradient}
                    >
                      <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
                      <Text style={styles.sendText}>Send to Lab</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <Text style={styles.modalFooterText}>
                    Our lab scientists will respond immediately via WhatsApp to schedule your test.
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Reuse Pharmacy styles for consistency
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    backgroundColor: '#0f172a',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#ffffff', letterSpacing: -0.5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  headerStatus: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  infoSection: { marginTop: -25, paddingHorizontal: 20 },
  infoBanner: { borderRadius: 24, padding: 20, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20 },
  infoContainer: { gap: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircleDark: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  infoText: { fontSize: 15, color: '#ffffff', flex: 1, fontWeight: '500', lineHeight: 22 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginHorizontal: 20, marginTop: 24, marginBottom: 16, letterSpacing: -0.5 },
  galleryContainer: { marginTop: 20, paddingHorizontal: 20 },
  galleryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitleSmall: { fontSize: 18, fontWeight: '800', color: '#0f172a', letterSpacing: -0.5 },
  imageCount: { fontSize: 12, fontWeight: '600', color: '#64748b', backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  galleryScroll: { paddingRight: 20 },
  imageWrapper: { width: 280, height: 180, borderRadius: 20, marginRight: 16, overflow: 'hidden', backgroundColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  branchImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%' },
  actionGrid: { flexDirection: 'row', paddingHorizontal: 12 },
  actionCard: { flex: 1, backgroundColor: '#ffffff', margin: 8, padding: 20, borderRadius: 24, alignItems: 'center', elevation: 4, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, borderWidth: 1, borderColor: '#f1f5f9' },
  actionIcon: { width: 56, height: 56, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  actionSub: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#ffffff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  modalIconCircle: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#0f172a' },
  modalSub: { fontSize: 14, color: '#64748b', fontWeight: '600' },
  inputContainer: { backgroundColor: '#f8fafc', borderRadius: 20, padding: 16, height: 120, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  textInput: { flex: 1, fontSize: 16, color: '#0f172a', fontWeight: '500', textAlignVertical: 'top' },
  sendButton: { height: 56, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  sendGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  sendText: { fontSize: 17, fontWeight: '800', color: '#ffffff' },
  modalFooterText: { fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 18, paddingHorizontal: 10 }
});
