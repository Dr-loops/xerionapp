import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function HelpScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    { id: '1', question: 'How do I refill a prescription?', icon: 'medical-outline' },
    { id: '2', question: 'Where is my lab results?', icon: 'flask-outline' },
    { id: '3', question: 'Find nearest open branch', icon: 'location-outline' },
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Help Center</Text>
          <Text style={styles.headerSubtitle}>We're here to help you with any questions or concerns.</Text>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.faqScroll}>
          {faqs.map(faq => (
            <TouchableOpacity key={faq.id} style={styles.faqCard} activeOpacity={0.8}>
              <Ionicons name={faq.icon as any} size={24} color="#0ea5e9" style={styles.faqIcon} />
              <Text style={styles.faqText}>{faq.question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.contactForm}>
          <View style={styles.formHeader}>
            <Ionicons name="chatbubbles" size={24} color="#0ea5e9" />
            <Text style={styles.formTitle}>Contact Support</Text>
          </View>
          <Text style={styles.formDesc}>Can't find what you're looking for? Send us a message and our team will get back to you shortly.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <View style={styles.inputWrapper}>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Question about Lab Test" 
                placeholderTextColor="#94a3b8"
                value={subject}
                onChangeText={setSubject}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="How can we help you today?" 
                placeholderTextColor="#94a3b8"
                multiline 
                numberOfLines={6}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9}>
            <Text style={styles.primaryButtonText}>Send Message</Text>
            <Ionicons name="paper-plane-outline" size={20} color="#ffffff" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 40
  },
  headerContainer: {
    marginBottom: 24
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    letterSpacing: -0.5
  },
  faqScroll: {
    marginBottom: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  faqCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    width: 160,
    marginRight: 12,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  faqIcon: {
    marginBottom: 12,
  },
  faqText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    lineHeight: 20
  },
  contactForm: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginLeft: 8,
    letterSpacing: -0.5
  },
  formDesc: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 22
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#334155', 
    marginBottom: 8,
    marginLeft: 4
  },
  inputWrapper: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    minHeight: 56,
  },
  textAreaWrapper: {
    minHeight: 120,
  },
  input: { 
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#0f172a',
    fontSize: 16,
  },
  textArea: {
    paddingTop: 16,
  },
  primaryButton: { 
    backgroundColor: '#0ea5e9', 
    height: 56, 
    borderRadius: 16, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700',
    letterSpacing: 0.5
  },
});
