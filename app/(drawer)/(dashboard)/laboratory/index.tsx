import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LaboratoryDashboard() {
  const widgets = [
    { id: '1', title: 'Schedule Test', icon: 'calendar', color: '#8b5cf6', info: 'Book your home/lab visit' },
    { id: '2', title: 'Test Results', icon: 'document-text', color: '#10b981', info: 'View recent lab reports' },
    { id: '3', title: 'Health Packages', icon: 'medkit', color: '#f43f5e', info: 'Checkup bundles & offers' },
    { id: '4', title: 'Find a Lab', icon: 'location', color: '#0ea5e9', info: 'Locate nearest test center' },
  ] as const;

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
            <TouchableOpacity style={styles.widgetCard} activeOpacity={0.9}>
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
  }
});
