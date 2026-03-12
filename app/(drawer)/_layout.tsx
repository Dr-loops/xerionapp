import { Drawer } from 'expo-router/drawer';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScroll}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.companyName}>Xerion & Doxa</Text>
        <Text style={styles.companyTagline}>Panacea of Health</Text>
      </View>
      <View style={styles.drawerDivider} />
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#1a6b2f',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          color: '#ffffff',
        },
        drawerActiveTintColor: '#1a6b2f',
        drawerActiveBackgroundColor: '#e8f5e9',
        drawerInactiveTintColor: '#475569',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: -8,
        },
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
        },
        headerRight: () => (
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => router.replace('/sign-in')}
          >
            <Ionicons name="log-out-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen 
        name="index" 
        options={{ 
          title: 'Xerion & Doxa',
          drawerLabel: 'Home',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="home-outline" size={22} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="about" 
        options={{ 
          title: 'About Xerion & Doxa',
          drawerLabel: 'About Us',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="information-circle-outline" size={22} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="services" 
        options={{ 
          title: 'Our Services',
          drawerLabel: 'All Services',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="medkit-outline" size={22} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="branches" 
        options={{ 
          title: 'Branch Network',
          drawerLabel: 'Our Locations',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="business-outline" size={22} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="help" 
        options={{ 
          title: 'Help Center',
          drawerLabel: 'Support',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="help-buoy-outline" size={22} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="social-media" 
        options={{ 
          title: 'Connect',
          drawerLabel: 'Social Media',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="share-social-outline" size={22} color={color} />
        }} 
      />
      
      {/* Hide the nested routes from the drawer menu */}
      <Drawer.Screen 
        name="pharmacy" 
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} 
      />
      <Drawer.Screen 
        name="laboratory" 
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} 
      />
      <Drawer.Screen 
        name="profile" 
        options={{ 
          title: 'My Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ color }: { color: string }) => <Ionicons name="person-outline" size={22} color={color} />
        }} 
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerScroll: {
    paddingBottom: 24,
  },
  drawerHeader: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 28,
    backgroundColor: '#1a6b2f',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: {
    width: 90,
    height: 90,
    marginBottom: 14,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  companyName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#f97316',
    letterSpacing: 0.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  companyTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  drawerItemsContainer: {
    paddingHorizontal: 8,
  },
  signOutButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  }
});
