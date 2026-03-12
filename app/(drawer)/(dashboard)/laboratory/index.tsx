import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Linking, Alert, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export const LAB_BRANCHES = [
  { 
    id: '1', 
    name: 'XERION MEDICAL LABORATORY', 
    location: 'GURUGU, GOIL FEELING STATION, JISONAYILI JUNCTION', 
    phone: '0595441825', 
    whatsapp: '0246344188',
    status: 'Open Now',
    images: [
      'https://images.unsplash.com/photo-1579152276507-dc3f34ccc524?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532187875605-7fe35f47b1e4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579152276481-1250109a1599?q=80&w=800&auto=format&fit=crop'
    ]
  },
];

export default function LaboratoryDashboard() {
  const [showPackages, setShowPackages] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [testsNeeded, setTestsNeeded] = useState('');
  
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      full: d.toDateString(),
    };
  });

  const timeSlots = ['08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const widgets = [
    { id: '1', title: 'Schedule Test', icon: 'calendar', color: '#8b5cf6', info: 'Book your home/lab visit', action: () => setShowSchedule(true) },
    { id: '2', title: 'Test Results', icon: 'document-text', color: '#10b981', info: 'View recent lab reports' },
    { id: '3', title: 'Health Packages', icon: 'medkit', color: '#f43f5e', info: 'Checkup bundles & offers', action: () => setShowPackages(true) },
    { id: '4', title: 'Find a Lab', icon: 'location', color: '#0ea5e9', info: 'Locate nearest test center', route: '/laboratory/branch/1' },
  ] as const;

  const handleBookTest = () => {
    if (!selectedDate || !selectedTime || !testsNeeded.trim()) {
      Alert.alert('Missing Information', 'Please select a date, time, and specify the tests you need.');
      return;
    }

    const lab = LAB_BRANCHES[0];
    const message = `Scheduled Test Booking:\nBranch: ${lab.name}\nTests: ${testsNeeded}\nDate: ${selectedDate}\nTime: ${selectedTime}`;
    const url = `whatsapp://send?phone=${lab.whatsapp || lab.phone}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
        setShowSchedule(false);
        setTestsNeeded('');
        setSelectedDate(null);
        setSelectedTime(null);
      } else {
        Alert.alert('WhatsApp Issue', 'Please ensure WhatsApp is installed on your device.');
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(drawer)/(dashboard)' as any)} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Laboratory Services</Text>
      </View>

      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['#3b82f6', '#2563eb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerHeader}>
            <View style={styles.bannerIconContainer}>
              <Ionicons name="flask" size={32} color="#3b82f6" />
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ISO Certified</Text>
            </View>
          </View>
          <Text style={styles.bannerTitle}>Advanced Diagnostics</Text>
          <Text style={styles.bannerDesc}>Accurate, reliable results from our state-of-the-art laboratory network.</Text>
        </LinearGradient>
      </View>

      <Text style={styles.sectionTitle}>Lab Dashboard</Text>
      
      <View style={styles.grid}>
        {widgets.map(w => (
          <View key={w.id} style={styles.widgetWrapper}>
            <TouchableOpacity 
              style={styles.widgetCard} 
              activeOpacity={0.9}
              onPress={() => {
                if ((w as any).action) (w as any).action();
                else if ((w as any).route) router.push((w as any).route);
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: w.color + '15' }]}>
                <Ionicons name={w.icon as any} size={28} color={w.color} />
              </View>
              <Text style={styles.widgetTitle}>{w.title}</Text>
              <Text style={styles.widgetInfo}>{w.info}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.infoWrapper}>
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color="#b45309" />
            <Text style={styles.infoTitle}>Important Notice</Text>
          </View>
          <Text style={styles.infoText}>Fasting is strictly required for lipid profile and blood glucose tests. Please ensure 10-12 hours of fasting prior to sample collection.</Text>
        </View>
      </View>
      
      {/* Health Packages Modal */}
      <Modal
        visible={showPackages}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPackages(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIconCircle, { backgroundColor: '#f43f5e15' }]}>
                <Ionicons name="gift" size={28} color="#f43f5e" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.modalTitle}>Health Packages</Text>
                <Text style={styles.modalSub}>Exclusive Offers & Services</Text>
              </View>
              <TouchableOpacity onPress={() => setShowPackages(false)}>
                <Ionicons name="close-circle" size={32} color="#cbd5e1" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll}>
              {/* Discount Card */}
              <View style={styles.promoCard}>
                <LinearGradient
                  colors={['#f43f5e', '#e11d48']}
                  style={styles.promoGradient}
                >
                  <View style={styles.promoHeader}>
                    <Text style={styles.promoTitle}>Special 5% Discount</Text>
                    <Ionicons name="sparkles" size={20} color="#ffffff" />
                  </View>
                  <Text style={styles.promoText}>
                    Patients who request for tests totaling more than 800 GHS will receive an instant 5% discount on their bill.
                  </Text>
                </LinearGradient>
              </View>

              <Text style={styles.sectionTitleSmall}>Additional Services</Text>

              <View style={styles.serviceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#8b5cf615' }]}>
                  <Ionicons name="chatbox-ellipses" size={20} color="#8b5cf6" />
                </View>
                <View style={styles.serviceTextContent}>
                  <Text style={styles.serviceTitle}>Thorough Results Interpretation</Text>
                  <Text style={styles.serviceInfo}>Direct walkthrough of your lab results with our lead scientists.</Text>
                </View>
              </View>

              <View style={styles.serviceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#10b98115' }]}>
                  <Ionicons name="headset" size={20} color="#10b981" />
                </View>
                <View style={styles.serviceTextContent}>
                  <Text style={styles.serviceTitle}>Further Consultations</Text>
                  <Text style={styles.serviceInfo}>Expert advice on next steps based on your diagnostic profile.</Text>
                </View>
              </View>

              <View style={styles.serviceItem}>
                <View style={[styles.serviceIcon, { backgroundColor: '#0ea5e915' }]}>
                  <Ionicons name="add-circle" size={20} color="#0ea5e9" />
                </View>
                <View style={styles.serviceTextContent}>
                  <Text style={styles.serviceTitle}>And More...</Text>
                  <Text style={styles.serviceInfo}>Priority scheduling, family bundles, and periodic health screenings.</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setShowPackages(false)}
            >
              <Text style={styles.closeBtnText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Schedule Test Modal */}
      <Modal
        visible={showSchedule}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSchedule(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '90%' }]}>
              <View style={styles.modalHeader}>
                <View style={[styles.modalIconCircle, { backgroundColor: '#8b5cf615' }]}>
                  <Ionicons name="calendar" size={28} color="#8b5cf6" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.modalTitle}>Schedule a Test</Text>
                  <Text style={styles.modalSub}>Select your preferred slot</Text>
                </View>
                <TouchableOpacity onPress={() => setShowSchedule(false)}>
                  <Ionicons name="close-circle" size={32} color="#cbd5e1" />
                </TouchableOpacity>
              </View>

              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
              >
                <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
                  <Text style={styles.sectionTitleSmall}>Select Date</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
                    {next7Days.map((d, i) => (
                      <TouchableOpacity 
                        key={i}
                        style={[
                          styles.dateCard,
                          selectedDate === d.full && styles.dateCardActive
                        ]}
                        onPress={() => setSelectedDate(d.full)}
                      >
                        <Text style={[styles.dateDay, selectedDate === d.full && styles.dateTextActive]}>{d.day}</Text>
                        <Text style={[styles.dateNum, selectedDate === d.full && styles.dateTextActive]}>{d.date}</Text>
                        <Text style={[styles.dateMonth, selectedDate === d.full && styles.dateTextActive]}>{d.month}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <Text style={[styles.sectionTitleSmall, { marginTop: 20 }]}>Select Time</Text>
                  <View style={styles.timeGrid}>
                    {timeSlots.map((t, i) => (
                      <TouchableOpacity 
                        key={i}
                        style={[
                          styles.timeChip,
                          selectedTime === t && styles.timeChipActive
                        ]}
                        onPress={() => setSelectedTime(t)}
                      >
                        <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>{t}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={[styles.sectionTitleSmall, { marginTop: 20 }]}>Tests Needed</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="List the tests or symptoms here..."
                      placeholderTextColor="#94a3b8"
                      multiline
                      numberOfLines={4}
                      value={testsNeeded}
                      onChangeText={setTestsNeeded}
                    />
                  </View>
                </ScrollView>

                <TouchableOpacity 
                  style={styles.bookBtn}
                  onPress={handleBookTest}
                >
                  <LinearGradient
                    colors={['#8b5cf6', '#7c3aed']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bookGradient}
                  >
                    <Ionicons name="logo-whatsapp" size={20} color="#ffffff" />
                    <Text style={styles.bookBtnText}>Confirm via WhatsApp</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Padding */}
      <View style={{height: 40}} />
    </ScrollView>
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
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 24
  },
  banner: { 
    padding: 24, 
    borderRadius: 24, 
    alignItems: 'flex-start',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16
  },
  bannerIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700'
  },
  bannerTitle: { 
    color: '#ffffff', 
    fontSize: 26, 
    fontWeight: '800', 
    marginBottom: 8,
    letterSpacing: -0.5
  },
  bannerDesc: { 
    color: 'rgba(255,255,255,0.9)', 
    fontSize: 15, 
    lineHeight: 22,
    fontWeight: '500'
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginHorizontal: 24, 
    marginBottom: 16,
    letterSpacing: -0.5
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 16 
  },
  widgetWrapper: { 
    width: '50%', 
    padding: 8 
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    height: 180,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  iconContainer: { 
    width: 56,
    height: 56,
    borderRadius: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16 
  },
  widgetTitle: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 6,
    letterSpacing: -0.5
  },
  widgetInfo: { 
    fontSize: 13, 
    color: '#64748b',
    lineHeight: 18,
    fontWeight: '500'
  },
  infoWrapper: {
    paddingHorizontal: 24,
    marginTop: 8
  },
  infoCard: { 
    backgroundColor: '#fef3c7', 
    padding: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#fde68a', 
    borderLeftWidth: 4, 
    borderLeftColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  infoTitle: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#b45309', 
    marginLeft: 8,
    letterSpacing: -0.5
  },
  infoText: { 
    fontSize: 14, 
    color: '#92400e', 
    lineHeight: 22,
    fontWeight: '500'
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  modalSub: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  modalScroll: {
    paddingBottom: 24,
  },
  promoCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 28,
  },
  promoGradient: {
    padding: 24,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  promoText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionTitleSmall: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  serviceTextContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  serviceInfo: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    fontWeight: '500',
  },
  closeBtn: {
    backgroundColor: '#0f172a',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  // Scheduling Styles
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dateCard: {
    width: 70,
    height: 90,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateCardActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#7c3aed',
    elevation: 4,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dateDay: { fontSize: 12, color: '#64748b', fontWeight: 'bold' },
  dateNum: { fontSize: 20, color: '#0f172a', fontWeight: '900', marginVertical: 2 },
  dateMonth: { fontSize: 11, color: '#94a3b8', fontWeight: '600' },
  dateTextActive: { color: '#ffffff' },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeChipActive: {
    backgroundColor: '#8b5cf615',
    borderColor: '#8b5cf6',
  },
  timeText: { fontSize: 14, color: '#475569', fontWeight: '600' },
  timeTextActive: { color: '#8b5cf6', fontWeight: '800' },
  inputWrapper: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 100,
  },
  textInput: {
    fontSize: 15,
    color: '#0f172a',
    textAlignVertical: 'top',
  },
  bookBtn: {
    marginTop: 16,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  bookBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  }
});
