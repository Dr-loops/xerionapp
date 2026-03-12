import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SocialMediaScreen() {
  const links = [
    { id: '1', platform: 'Facebook', icon: 'logo-facebook', color: '#1877F2', handle: '@xeriondoxa' },
    { id: '2', platform: 'Twitter', icon: 'logo-twitter', color: '#1DA1F2', handle: '@XerionDoxaChem' },
    { id: '3', platform: 'Instagram', icon: 'logo-instagram', color: '#E4405F', handle: '@xerion_doxa_health' },
    { id: '4', platform: 'LinkedIn', icon: 'logo-linkedin', color: '#0A66C2', handle: 'Xerion & Doxa Chemist Ltd' },
  ] as const;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.headerContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="share-social" size={36} color="#0ea5e9" />
        </View>
        <Text style={styles.headerTitle}>Connect With Us</Text>
        <Text style={styles.headerSubtitle}>Follow our social channels for the latest health tips, news, and updates.</Text>
      </View>
      
      <View style={styles.linksContainer}>
        {links.map(link => (
          <TouchableOpacity key={link.id} style={styles.card} activeOpacity={0.8}>
            <View style={[styles.platformIconContainer, { backgroundColor: link.color + '15' }]}>
              <Ionicons name={link.icon as any} size={28} color={link.color} />
            </View>
            <View style={styles.content}>
              <Text style={styles.platform}>{link.platform}</Text>
              <Text style={styles.handle}>{link.handle}</Text>
            </View>
            <View style={styles.actionIcon}>
              <Ionicons name="open-outline" size={20} color="#94a3b8" />
            </View>
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
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
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
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: 12,
    letterSpacing: -0.5
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20
  },
  linksContainer: {
    paddingHorizontal: 24,
    gap: 16
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#ffffff', 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center', 
    shadowColor: '#0f172a', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  platformIconContainer: { 
    width: 56,
    height: 56,
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16 
  },
  content: { 
    flex: 1 
  },
  platform: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#0f172a', 
    marginBottom: 4,
    letterSpacing: -0.5
  },
  handle: { 
    fontSize: 14, 
    color: '#64748b',
    fontWeight: '500'
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
