import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="medical" size={48} color="#0ea5e9" />
        </View>
        <Text style={styles.heroTitle}>Xerion & Doxa</Text>
        <Text style={styles.heroSubtitle}>Panacea of Health</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Main Content Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={24} color="#0ea5e9" />
            <Text style={styles.cardTitle}>Who We Are</Text>
          </View>
          <Text style={styles.text}>
            Xerion & Doxa Chemist Limited is a premier provider of pharmacy, laboratory, and drug wholesales dedicated to improving healthcare access. Currently located in Tamale and Sawla, we are committed to delivering high-quality pharmaceutical products and accurate diagnostics to our growing community. We also provide a delivery service that delivers drugs to our clients who can't come in person to our pharmacies.
          </Text>
        </View>

        {/* Mission Vision Grid */}
        <View style={styles.grid}>
          <View style={[styles.gridCard, { marginRight: 8 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4' }]}>
              <Ionicons name="rocket-outline" size={24} color="#16a34a" />
            </View>
            <Text style={styles.gridTitle}>Our Mission</Text>
            <Text style={styles.gridText}>To deliver exceptional healthcare services and products with unwavering dedication to quality.</Text>
          </View>

          <View style={[styles.gridCard, { marginLeft: 8 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#fff7ed' }]}>
              <Ionicons name="eye-outline" size={24} color="#ea580c" />
            </View>
            <Text style={styles.gridTitle}>Our Vision</Text>
            <Text style={styles.gridText}>To be the most trusted healthcare network, spreading our reach across the whole of Ghana and into other African countries.</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7+</Text>
            <Text style={styles.statLabel}>Branches</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20k+</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 24
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#e0f2fe',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 4,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  card: { 
    backgroundColor: '#ffffff', 
    padding: 24, 
    borderRadius: 24, 
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 16, 
    elevation: 4,
    marginBottom: 16
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginLeft: 10,
    letterSpacing: -0.5
  },
  text: { 
    fontSize: 16, 
    color: '#475569', 
    lineHeight: 26,
    fontWeight: '400'
  },
  grid: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 16, 
    elevation: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 16, 
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0ea5e9',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e2e8f0',
  }
});
