import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export const BRANCHES = [
  { id: '1', name: 'XERION CHEMIST', location: 'GURUGU, GOIL FILLING STATION, JISONAYILI JUNCTION', phone: '0596455844', status: 'Open Now' },
  { id: '2', name: 'XERION CHEMIST', location: 'SAWLA', phone: '05390011725', status: 'Open Now' },
  { id: '3', name: 'DOXA CHEMIST', location: 'DABOKPA, OPPOSITE GHANASCO', phone: '0596821559', status: 'Open Now' },
  { id: '4', name: 'DOXA CHEMIST (ANNEX)', location: 'GURUGU, KPALU JUNCTION', phone: '059825588', status: 'Open Now' },
  { id: '5', name: 'XERION CHEMIST (ANNEX)', location: 'YONG', phone: '0240697362', status: 'Open Now' },
  { id: '6', name: 'XERION CHEMIST', location: 'STADIUM, SAGNARIGU ROAD', phone: '259674227', status: 'Open Now' },
  { id: '7', name: 'XERION CHEMIST (WHOLESALE)', location: 'TARGET', phone: '0547454731', status: 'Open Now' },
];

export default function PharmacyDashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(drawer)/(dashboard)' as any)} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Pharmacy Services</Text>
      </View>

      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['#10b981', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerIconContainer}>
            <Ionicons name="medical" size={32} color="#10b981" />
          </View>
          <Text style={styles.bannerTitle}>Your Health, Our Priority</Text>
          <Text style={styles.bannerDesc}>Select a branch below to view specific services, wait times, and availability.</Text>
        </LinearGradient>
      </View>

      <Text style={styles.sectionTitle}>Our Pharmacy Branches</Text>
      
      <View style={styles.branchList}>
        {BRANCHES.map(branch => {
          const isClosed = branch.status === 'Closed';
          return (
            <TouchableOpacity 
              key={branch.id} 
              style={styles.branchCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/(drawer)/pharmacy/branch/${branch.id}` as any)}
            >
              <View style={styles.cardHeader}>
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
              
              <View style={styles.infoRow}>
                <View style={styles.iconCircleInfo}>
                  <Ionicons name="location" size={16} color="#0ea5e9" />
                </View>
                <Text style={styles.infoText}>{branch.location}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <View style={styles.iconCircleInfo}>
                  <Ionicons name="call" size={16} color="#0ea5e9" />
                </View>
                <Text style={styles.infoText}>{branch.phone}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailsText}>View Branch Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#0ea5e9" />
              </View>
            </TouchableOpacity>
          );
        })}
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
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  bannerIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  bannerTitle: { 
    color: '#ffffff', 
    fontSize: 24, 
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
    fontSize: 18, 
    fontWeight: '700', 
    color: '#0f172a', 
    marginHorizontal: 24, 
    marginBottom: 16,
    letterSpacing: -0.5
  },
  branchList: { 
    paddingHorizontal: 20, 
    gap: 16 
  },
  branchCard: { 
    backgroundColor: '#ffffff', 
    padding: 24, 
    borderRadius: 24, 
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 16, 
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 20 
  },
  branchName: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#0f172a', 
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
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0'
  },
  statusClosedBg: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca'
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6
  },
  statusOpenDot: {
    backgroundColor: '#16a34a'
  },
  statusClosedDot: {
    backgroundColor: '#ef4444'
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: '700' 
  },
  statusOpenText: {
    color: '#166534'
  },
  statusClosedText: {
    color: '#991b1b'
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  iconCircleInfo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  infoText: { 
    fontSize: 15, 
    color: '#475569',
    fontWeight: '500',
    flex: 1
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  viewDetailsText: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '700'
  }
});
