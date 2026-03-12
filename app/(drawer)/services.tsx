import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ServicesScreen() {
  const services = [
    { 
      id: '1', 
      title: 'Prescription Refills', 
      icon: 'medical', 
      desc: 'Fast and reliable prescription handling, offering easy refills via our app or in-store.',
      color: ['#0ea5e9', '#0284c7'] as const
    },
    { 
      id: '2', 
      title: 'Blood Testing', 
      icon: 'water', 
      desc: 'Comprehensive blood panels and diagnostics with fast, accurate results sent directly to your phone.',
      color: ['#f43f5e', '#e11d48'] as const
    },
    { 
      id: '3', 
      title: 'Health Consultations', 
      icon: 'people', 
      desc: 'Expert advice and routine checkups from our certified medical professionals and pharmacists.',
      color: ['#10b981', '#059669'] as const
    },
    { 
      id: '4', 
      title: 'Vaccinations', 
      icon: 'shield-checkmark', 
      desc: 'Walk-in or scheduled immunizations for flu, travel, and routine health maintenance.',
      color: ['#8b5cf6', '#7c3aed'] as const
    },
  ] satisfies { id: string, title: string, icon: any, desc: string, color: string[] }[];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>Comprehensive healthcare solutions for you and your family.</Text>
      </View>

      <View style={styles.servicesList}>
        {services.map(s => (
          <TouchableOpacity key={s.id} activeOpacity={0.9}>
            <LinearGradient
              colors={s.color as string[]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <View style={styles.iconContainer}>
                <Ionicons name={s.icon as any} size={32} color={s.color[0]} />
              </View>
              <View style={styles.content}>
                <Text style={styles.title}>{s.title}</Text>
                <Text style={styles.desc}>{s.desc}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Bottom Padding */}
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc', 
  },
  headerContainer: {
    padding: 24,
    paddingTop: 32,
    marginBottom: 8
  },
  headerTitle: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 8,
    letterSpacing: -0.5
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24
  },
  servicesList: {
    paddingHorizontal: 20,
    gap: 16
  },
  card: { 
    flexDirection: 'row', 
    padding: 24, 
    borderRadius: 24, 
    elevation: 6, 
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, 
    shadowRadius: 16, 
    alignItems: 'center',
    overflow: 'hidden'
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  content: { 
    flex: 1 
  },
  title: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#ffffff', 
    marginBottom: 6,
    letterSpacing: -0.5
  },
  desc: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    fontWeight: '500'
  }
});
