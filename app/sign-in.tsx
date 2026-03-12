import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a6b2f', '#2d8c49', '#166534']}
        style={styles.backgroundGradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../assets/icon.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.appBrand}>Xerion & Doxa</Text>
              <Text style={styles.appSub}>Chemist Limited</Text>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to your account to continue</Text>
            </View>

            <View style={styles.formCard}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail" size={20} color="#1a6b2f" style={styles.inputIcon} />
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
                  <Ionicons name="lock-closed" size={20} color="#1a6b2f" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="••••••••" 
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.primaryButton}
                activeOpacity={0.9}
                onPress={() => router.replace('/(drawer)')}
              >
                <LinearGradient
                  colors={['#1a6b2f', '#2d8c49']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Sign In</Text>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" style={{marginLeft: 8}} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.linkText}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#166534' 
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.4,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center' 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 48 
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appBrand: {
    fontSize: 36,
    fontWeight: '900',
    color: '#f97316',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 2,
  },
  appSub: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: -0.5
  },
  subtitle: { 
    fontSize: 15, 
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500'
  },
  formCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#1e293b', 
    marginBottom: 10,
    marginLeft: 4
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    height: 60,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#1a6b2f',
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButton: { 
    height: 60, 
    borderRadius: 18, 
    overflow: 'hidden',
    shadowColor: '#1a6b2f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
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
    marginTop: 40 
  },
  footerText: { 
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    fontWeight: '500'
  },
  linkText: { 
    color: '#ffffff', 
    fontWeight: '800',
    fontSize: 15,
    textDecorationLine: 'underline'
  }
});
