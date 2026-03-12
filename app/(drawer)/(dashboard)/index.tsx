import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomeDashboard() {
  const [userName, setUserName] = useState('User');

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('user_profile');
      if (data) {
        const user = JSON.parse(data);
        setUserName(`${user.firstName} ${user.lastName}`);
      } else {
        setUserName('User');
      }
    } catch (e) {
      console.error('Failed to load profile');
      setUserName('User');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Brand Header */}
      <LinearGradient
        colors={['#1a6b2f', '#2d8c49']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>{userName}</Text>
          </View>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => router.push('/profile')}
          >
            <Image 
              source={{ uri: `https://ui-avatars.com/api/?name=${userName.replace(' ', '+')}&background=f97316&color=fff&size=128` }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </View>

        {/* App Brand in header */}
        <View style={styles.brandRow}>
          <Text style={styles.brandName}>Xerion & Doxa</Text>
          <Text style={styles.brandSub}>Panacea of Health</Text>
        </View>
        
        {/* Quick Action Bar in Header */}
        <View style={styles.quickActionBar}>
          <TouchableOpacity style={styles.quickAction}>
            <Ionicons name="scan-outline" size={24} color="#f97316" />
            <Text style={styles.quickActionText}>Scan</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/branches')}>
            <Ionicons name="location-outline" size={24} color="#f97316" />
            <Text style={styles.quickActionText}>Locate</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/help')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#f97316" />
            <Text style={styles.quickActionText}>Support</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Main Services</Text>

      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push('/pharmacy')}
        >
          <LinearGradient
            colors={['#1a6b2f', '#2d8c49']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.serviceCard}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardTitle}>Pharmacy</Text>
                <Text style={styles.cardDesc}>Prescriptions & Meds</Text>
              </View>
              <View style={styles.iconCircle}>
                <Ionicons name="medical" size={32} color="#1a6b2f" />
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.7)" style={styles.cardArrow} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push('/laboratory')}
        >
          <LinearGradient
            colors={['#f97316', '#ea580c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.serviceCard}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardTitle}>Laboratory</Text>
                <Text style={styles.cardDesc}>Tests & Diagnostics</Text>
              </View>
              <View style={styles.iconCircle}>
                <Ionicons name="flask" size={32} color="#f97316" />
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.7)" style={styles.cardArrow} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
          <Ionicons name="shield-checkmark" size={24} color="#1a6b2f" />
          <Text style={styles.infoTitle}>Xerion & Doxa Promise</Text>
        </View>
        <Text style={styles.infoText}>We are committed to providing the best healthcare, pharmacy, and laboratory services across all our state-of-the-art branches.</Text>
        <TouchableOpacity style={styles.outlineButton} onPress={() => router.push('/about')}>
          <Text style={styles.outlineButtonText}>Learn More About Us</Text>
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
    backgroundColor: '#f1f5f9' 
  },
  header: { 
    padding: 24, 
    paddingTop: 32,
    paddingBottom: 20,
    borderBottomLeftRadius: 32, 
    borderBottomRightRadius: 32, 
    shadowColor: '#1a6b2f', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 16, 
    elevation: 8,
    marginBottom: 8
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  greeting: { 
    fontSize: 15, 
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500'
  },
  name: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#ffffff', 
    marginTop: 2,
    letterSpacing: -0.5
  },
  avatarContainer: {
    padding: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#f97316',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#f97316',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  brandSub: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
  },
  quickActionBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 6
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#1a6b2f', 
    marginHorizontal: 24, 
    marginTop: 28, 
    marginBottom: 16,
    letterSpacing: -0.5
  },
  cardsContainer: { 
    paddingHorizontal: 24, 
    gap: 16 
  },
  serviceCard: { 
    padding: 24, 
    borderRadius: 24, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 16, 
    elevation: 8, 
    overflow: 'hidden' 
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: { 
    width: 56,
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  cardTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#ffffff', 
    marginBottom: 4,
    letterSpacing: -0.5
  },
  cardDesc: { 
    color: 'rgba(255,255,255,0.9)', 
    fontSize: 15, 
    fontWeight: '500'
  },
  cardArrow: {
    position: 'absolute',
    bottom: 20,
    right: 24,
  },
  infoSection: { 
    margin: 24, 
    padding: 24, 
    backgroundColor: '#ffffff', 
    borderRadius: 24, 
    shadowColor: '#1a6b2f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  infoTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#1a6b2f', 
    marginLeft: 8,
    letterSpacing: -0.3
  },
  infoText: { 
    color: '#475569', 
    lineHeight: 24,
    fontSize: 15,
    marginBottom: 20
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#1a6b2f',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  outlineButtonText: {
    color: '#1a6b2f',
    fontWeight: '700',
    fontSize: 15
  }
});
