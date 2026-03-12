import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0ea5e9', '#0369a1']}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join the Xerion & Doxa family</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.formCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Details</Text>
              <View style={styles.titleDivider} />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>First Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={[styles.input, { paddingHorizontal: 16 }]} 
                    placeholder="John" 
                    placeholderTextColor="#94a3b8"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Last Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={[styles.input, { paddingHorizontal: 16 }]} 
                    placeholder="Doe" 
                    placeholderTextColor="#94a3b8"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call" size={20} color="#0ea5e9" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="+233 XX XXX XXXX" 
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Login Credentials</Text>
              <View style={styles.titleDivider} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="#0ea5e9" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="name@example.com" 
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#0ea5e9" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="Create a strong password" 
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>
              <Text style={styles.inputHint}>Must be at least 8 characters</Text>
            </View>

            <TouchableOpacity 
              style={styles.primaryButton}
              activeOpacity={0.9}
              onPress={() => router.replace('/(drawer)')}
            >
              <LinearGradient
                colors={['#0ea5e9', '#0284c7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.primaryButtonText}>Create Account</Text>
                <Ionicons name="checkmark-circle" size={20} color="#ffffff" style={{marginLeft: 8}} />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  headerGradient: {
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: -30,
  },
  scrollContent: { 
    paddingHorizontal: 24, 
    flexGrow: 1,
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 15, 
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500'
  },
  formCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 32,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginRight: 12,
  },
  titleDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#1e293b', 
    marginBottom: 8,
    marginLeft: 4
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    height: 56,
  },
  inputIcon: {
    paddingHorizontal: 16,
  },
  input: { 
    flex: 1,
    height: '100%',
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '500'
  },
  eyeIcon: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  inputHint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    marginLeft: 4,
  },
  primaryButton: { 
    height: 60, 
    borderRadius: 18, 
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  primaryButtonText: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: '800',
    letterSpacing: 0.5
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 32,
    marginBottom: 10
  },
  footerText: { 
    color: '#64748b',
    fontSize: 15,
    fontWeight: '500'
  },
  linkText: { 
    color: '#0ea5e9', 
    fontWeight: '800',
    fontSize: 15
  }
});
