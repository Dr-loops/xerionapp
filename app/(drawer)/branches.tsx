import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BranchesScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Network</Text>
      </View>

      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['#0ea5e9', '#0369a1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerIconContainer}>
            <Ionicons name="map" size={32} color="#0ea5e9" />
          </View>
          <Text style={styles.bannerTitle}>Find Us Near You</Text>
          <Text style={styles.bannerDesc}>Explore our expanding network of pharmacies and partner laboratories across the region.</Text>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Main Branches</Text>
        
        <TouchableOpacity 
          style={styles.actionCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(drawer)/pharmacy')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="medical" size={24} color="#10b981" />
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>6 Locations</Text>
            </View>
          </View>
          
          <Text style={styles.cardTitle}>Pharmacy Directory</Text>
          <Text style={styles.cardDesc}>Browse our main pharmacy branches, view their live status, specific services offered, and get directions instantly.</Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.viewDetailsText}>Explore Directory</Text>
            <Ionicons name="arrow-forward" size={16} color="#10b981" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          activeOpacity={0.9}
          onPress={() => router.push('/(drawer)/laboratory')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleBlue}>
              <Ionicons name="flask" size={24} color="#3b82f6" />
            </View>
          </View>
          
          <Text style={styles.cardTitle}>Partner Laboratories</Text>
          <Text style={styles.cardDesc}>Find our certified partner laboratories for specialized diagnostic tests, home sample collection, and rapid results.</Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.viewDetailsTextBlue}>View Labs</Text>
            <Ionicons name="arrow-forward" size={16} color="#3b82f6" />
          </View>
        </TouchableOpacity>
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
    padding: 24, 
    paddingTop: 60, 
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
  title: { 
    fontSize: 28, 
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
    shadowColor: '#0ea5e9',
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
  content: {
    paddingHorizontal: 20
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 16,
    marginLeft: 4,
    letterSpacing: -0.5
  },
  actionCard: { 
    backgroundColor: '#ffffff', 
    padding: 24, 
    borderRadius: 24, 
    marginBottom: 16, 
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
    alignItems: 'center',
    marginBottom: 16
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCircleBlue: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569'
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 8,
    letterSpacing: -0.5
  },
  cardDesc: { 
    fontSize: 15, 
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  viewDetailsText: {
    color: '#10b981',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8
  },
  viewDetailsTextBlue: {
    color: '#3b82f6',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8
  }
});
