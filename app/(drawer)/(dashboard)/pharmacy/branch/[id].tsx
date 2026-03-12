import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Modal, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BRANCHES } from '../index'; // Import main branches list

export default function BranchDashboard() {
  const { id } = useLocalSearchParams();
  const [activeModal, setActiveModal] = useState<'order' | 'consult' | null>(null);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const branch = BRANCHES.find(b => b.id === id) || { 
    name: 'Unknown Branch', 
    location: 'Location not found', 
    phone: 'N/A', 
    status: 'Unknown' 
  };

  const isClosed = branch.status === 'Closed';

  const widgets = [
    { title: 'Current Stock', value: '8,432', label: 'Items available', icon: 'cube', color: '#8b5cf6' },
    { title: 'Wait Time', value: '15 min', label: 'Average queue', icon: 'time', color: '#f59e0b' },
    { title: 'Staff on Duty', value: '4', label: 'Pharmacists', icon: 'people', color: '#0ea5e9' },
    { title: 'Prescriptions', value: 'Ready', label: 'Processing online', icon: 'receipt', color: '#10b981' },
  ] as const;

  const openModal = (type: 'order' | 'consult') => {
    setActiveModal(type);
    setInputText('');
    // Focus the input after a short delay to allow modal animation
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleConfirm = () => {
    if (!inputText.trim()) {
      Alert.alert('Message', `Please type your ${activeModal === 'order' ? 'drug list' : 'health concern'}.`);
      return;
    }

    let message = '';
    if (activeModal === 'order') {
      message = `*DRUG ORDER REQUEST*\n\nBranch: ${branch.name}\n\nDrugs Needed:\n${inputText}\n\n_Please confirm availability and total cost._`;
    } else {
      message = `*HEALTH CONSULTATION*\n\nBranch: ${branch.name} Pharmacist\n\nPatient Complaint:\n${inputText}\n\n_Kindly provide professional advice regarding the above._`;
    }

    const phone = branch.phone.replace(/[^0-9]/g, '');
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        const fallbackUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        Linking.openURL(fallbackUrl);
      }
      setActiveModal(null);
      setInputText('');
    }).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device');
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!activeModal}
        onRequestClose={() => setActiveModal(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setActiveModal(null)}
        >
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <View style={[styles.modalIconBg, { backgroundColor: activeModal === 'order' ? '#f0fdf4' : '#eff6ff' }]}>
                  <Ionicons 
                    name={activeModal === 'order' ? "cart-outline" : "medical-outline"} 
                    size={24} 
                    color={activeModal === 'order' ? "#16a34a" : "#2563eb"} 
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.modalTitle}>
                    {activeModal === 'order' ? 'Order Drugs' : 'Health Consult'}
                  </Text>
                  <Text style={styles.modalSubtitle}>{branch.name}</Text>
                </View>
                <TouchableOpacity onPress={() => setActiveModal(null)} style={styles.closeBtn}>
                  <Ionicons name="close" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>
                {activeModal === 'order' ? 'What drugs do you need?' : 'Describe your health symptoms:'}
              </Text>
              
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder={activeModal === 'order' 
                  ? "e.g. Paracetamol 500mg (2 blisters), Amoxicillin..." 
                  : "e.g. Severe headache for 2 days, accompanied by slight fever..."
                }
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={4}
                value={inputText}
                onChangeText={setInputText}
                textAlignVertical="top"
                autoFocus={true}
              />

              <TouchableOpacity 
                style={[styles.sendOrderBtn, { backgroundColor: activeModal === 'order' ? '#16a34a' : '#2563eb' }]} 
                activeOpacity={0.9}
                onPress={handleConfirm}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#ffffff" style={{marginRight: 8}} />
                <Text style={styles.sendOrderText}>
                  {activeModal === 'order' ? 'Send Order via WhatsApp' : 'Start Consultation'}
                </Text>
              </TouchableOpacity>
              
              <Text style={styles.modalFooterText}>
                The branch pharmacist will respond to your {activeModal === 'order' ? 'order' : 'consultation'} immediately.
              </Text>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.canGoBack() ? router.back() : router.replace('/pharmacy')} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.title}>Branch Details</Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.banner}>
            <View style={styles.bannerHeader}>
              <Text style={styles.branchName}>{branch.name}</Text>
              <View style={[
                styles.statusBadge, 
                isClosed ? styles.statusClosedBg : styles.statusOpenBg
              ]}>
                <View style={[
                  styles.statusDot, 
                  isClosed ? styles.statusClosedDot : styles.statusOpenDot
                ]} />
                <Text style={[
                  styles.statusText,
                  isClosed ? styles.statusClosedText : styles.statusOpenText
                ]}>{branch.status}</Text>
              </View>
            </View>

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
          </View>

          {/* Image Gallery Section */}
          <View style={styles.galleryContainer}>
            <View style={styles.galleryHeader}>
              <Text style={styles.sectionTitleSmall}>Facility Gallery</Text>
              <Text style={styles.imageCount}>4 Photos</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.galleryScroll}
              decelerationRate="fast"
              snapToInterval={280 + 16}
            >
              {(branch as any).images?.map((img: string, idx: number) => (
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

          <Text style={styles.sectionTitle}>Pharmacy Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.orderBtn]} 
              activeOpacity={0.8} 
              onPress={() => openModal('order')}
            >
              <View style={styles.btnIconBg}>
                <Ionicons name="cart" size={24} color="#ffffff" />
              </View>
              <Text style={[styles.btnText, styles.orderBtnText]}>Order Drugs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionBtn, styles.consultBtn]} 
              activeOpacity={0.8} 
              onPress={() => openModal('consult')}
            >
              <View style={[styles.btnIconBg, { backgroundColor: '#2563eb' }]}>
                <Ionicons name="chatbubbles" size={24} color="#ffffff" />
              </View>
              <Text style={styles.btnText}>Health Consult</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Live Status</Text>
          
          <View style={styles.grid}>
            {widgets.map((w, index) => (
              <View key={index} style={styles.widgetWrapper}>
                <View style={styles.widgetCard}>
                  <View style={styles.widgetHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: w.color + '15' }]}>
                      <Ionicons name={w.icon as any} size={24} color={w.color} />
                    </View>
                  </View>
                  <Text style={styles.widgetValue}>{w.value}</Text>
                  <Text style={styles.widgetTitle}>{w.title}</Text>
                  <Text style={styles.widgetLabel}>{w.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.9} 
            onPress={() => {
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${branch.name} ${branch.location}`)}`;
              Linking.openURL(mapUrl);
            }}
          >
            <Ionicons name="map" size={20} color="#ffffff" style={{marginRight: 8}} />
            <Text style={styles.actionText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom Padding */}
        <View style={{height: 40}} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 24, 
    paddingTop: 32, 
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 8
  },
  backButton: { 
    marginRight: 16,
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 12
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0f172a',
    letterSpacing: -0.5
  },
  mainContent: {
    paddingHorizontal: 20,
    marginTop: 16
  },
  banner: { 
    backgroundColor: '#0f172a', 
    padding: 24, 
    borderRadius: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  branchName: { 
    color: '#ffffff', 
    fontSize: 26, 
    fontWeight: '800', 
    flex: 1,
    marginRight: 12,
    letterSpacing: -0.5
  },
  statusBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 20,
    borderWidth: 1
  },
  statusOpenBg: {
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    borderColor: 'rgba(22, 163, 74, 0.5)'
  },
  statusClosedBg: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.5)'
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  statusOpenDot: {
    backgroundColor: '#4ade80'
  },
  statusClosedDot: {
    backgroundColor: '#f87171'
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: '700' 
  },
  statusOpenText: {
    color: '#4ade80'
  },
  statusClosedText: {
    color: '#f87171'
  },
  infoContainer: {
    gap: 12
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  iconCircleDark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  infoText: { 
    color: '#cbd5e1', 
    fontSize: 15,
    fontWeight: '500',
    flex: 1
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginTop: 8,
    marginBottom: 16, 
    marginLeft: 4,
    letterSpacing: -0.5 
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  orderBtn: {
    backgroundColor: '#1a6b2f',
  },
  consultBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  btnIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0f172a',
  },
  orderBtnText: {
    color: '#ffffff',
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginHorizontal: -8 
  },
  widgetWrapper: { 
    width: '50%', 
    padding: 8 
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    height: 160,
    justifyContent: 'space-between'
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  iconContainer: { 
    width: 48,
    height: 48,
    borderRadius: 24, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12 
  },
  widgetValue: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 4,
    letterSpacing: -0.5
  },
  widgetTitle: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#475569', 
    marginBottom: 2 
  },
  widgetLabel: { 
    fontSize: 12, 
    color: '#94a3b8',
    fontWeight: '500'
  },
  actionButton: { 
    backgroundColor: '#10b981', 
    marginTop: 24, 
    height: 56, 
    borderRadius: 16, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  actionText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700',
    letterSpacing: 0.5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  closeBtn: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    height: 120,
    fontSize: 16,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  sendOrderBtn: {
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 16,
  },
  sendOrderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalFooterText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  galleryContainer: {
    marginBottom: 24,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  sectionTitleSmall: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  imageCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  galleryScroll: {
    paddingRight: 20,
  },
  imageWrapper: {
    width: 280,
    height: 180,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  branchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
  }
});
