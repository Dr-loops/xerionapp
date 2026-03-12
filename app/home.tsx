import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const DRUGS = [
  {
    name: 'Paracetamol',
    icon: 'medkit' as const,
    color: '#1a6b2f',
    use: 'Pain & Fever Relief',
    desc: 'Used to relieve mild to moderate pain and reduce fever. Safe for adults and children when taken as directed.',
    dosage: 'Adults: 500–1000mg every 4–6 hrs. Max 4g/day.',
    warning: 'Avoid alcohol. Do not exceed recommended dose.',
  },
  {
    name: 'Amoxicillin',
    icon: 'flask' as const,
    color: '#f97316',
    use: 'Antibiotic',
    desc: 'A broad-spectrum antibiotic used to treat bacterial infections. Requires a prescription.',
    dosage: '250–500mg every 8 hrs for 5–10 days as prescribed.',
    warning: 'Complete the full course. Not for viral infections.',
  },
  {
    name: 'Metformin',
    icon: 'pulse' as const,
    color: '#0ea5e9',
    use: 'Diabetes Management',
    desc: 'Used to control blood sugar levels in type 2 diabetes alongside diet and exercise.',
    dosage: '500–850mg with meals, 2–3 times daily.',
    warning: 'Monitor kidney function regularly. Report lactic acidosis symptoms.',
  },
  {
    name: 'Amlodipine',
    icon: 'heart' as const,
    color: '#e11d48',
    use: 'Blood Pressure',
    desc: 'A calcium channel blocker used to treat high blood pressure and chest pain (angina).',
    dosage: '5–10mg once daily. Dose adjusted by physician.',
    warning: 'Do not stop suddenly. May cause ankle swelling.',
  },
  {
    name: 'Omeprazole',
    icon: 'water' as const,
    color: '#7c3aed',
    use: 'Acid Reflux / Ulcers',
    desc: 'Reduces stomach acid production. Used for heartburn, GERD, and peptic ulcers.',
    dosage: '20–40mg once daily, 30 mins before food.',
    warning: 'Long-term use may affect magnesium and B12 levels.',
  },
  {
    name: 'Artemether',
    icon: 'bug' as const,
    color: '#d97706',
    use: 'Malaria Treatment',
    desc: 'An antimalarial used in combination therapy (ACT) for uncomplicated malaria.',
    dosage: 'As per body weight, over 3 days. Follow prescriber instructions.',
    warning: 'Not for prevention. Complete full course even if feeling better.',
  },
];

type Section = 'about' | 'services' | 'help' | null;

export default function HomeScreen() {
  const [expanded, setExpanded] = useState<Section>(null);
  const [expandedDrug, setExpandedDrug] = useState<number | null>(null);

  const toggle = (section: Section) =>
    setExpanded(expanded === section ? null : section);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── HERO HEADER ── */}
        <LinearGradient colors={['#0f4c23', '#1a6b2f', '#2d8c49']} style={styles.hero}>
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.brandText}>
              <Text style={styles.brandName}>Xerion &amp; Doxa</Text>
              <Text style={styles.brandSub}>CHEMIST LIMITED</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Your Trusted{'\n'}Healthcare Partner</Text>
          <Text style={styles.heroSub}>
            Quality pharmacy &amp; laboratory services across all our branches. Your health, our priority.
          </Text>

          {/* NAV BAR */}
          <View style={styles.navBar}>
            {[
              { label: 'About', icon: 'information-circle-outline', section: 'about' as Section },
              { label: 'Services', icon: 'grid-outline', section: 'services' as Section },
              { label: 'Help', icon: 'help-circle-outline', section: 'help' as Section },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.navBtn, expanded === item.section && styles.navBtnActive]}
                onPress={() => toggle(item.section)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={expanded === item.section ? '#1a6b2f' : '#ffffff'}
                />
                <Text style={[styles.navBtnText, expanded === item.section && styles.navBtnTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* ── ABOUT SECTION ── */}
        {expanded === 'about' && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark" size={22} color="#1a6b2f" />
              <Text style={styles.sectionTitle}>About Us</Text>
            </View>
            <Text style={styles.sectionText}>
              Xerion &amp; Doxa Chemist Limited is a leading healthcare company operating across multiple branches in Nigeria.
              Founded on the values of integrity, compassion, and excellence, we deliver world-class pharmacy and laboratory services.
            </Text>
            <Text style={styles.sectionText}>
              Our dedicated team of pharmacists and lab scientists work around the clock to ensure every patient receives personalised, accurate, and affordable care.
            </Text>
            <View style={styles.statRow}>
              {[['10+', 'Branches'], ['50K+', 'Patients'], ['15+', 'Years'], ['24/7', 'Support']].map(([num, label]) => (
                <View key={label} style={styles.stat}>
                  <Text style={styles.statNum}>{num}</Text>
                  <Text style={styles.statLabel}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── SERVICES SECTION ── */}
        {expanded === 'services' && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="grid" size={22} color="#1a6b2f" />
              <Text style={styles.sectionTitle}>Our Services</Text>
            </View>
            {[
              { icon: 'medical', color: '#1a6b2f', title: 'Pharmacy', desc: 'Dispensing of prescription and OTC medications with professional counselling.' },
              { icon: 'flask', color: '#f97316', title: 'Laboratory', desc: 'Full-spectrum diagnostic tests: blood, urine, malaria, typhoid, HIV, and more.' },
              { icon: 'home-outline', color: '#0ea5e9', title: 'Home Delivery', desc: 'Get your medications and test results delivered to your doorstep.' },
              { icon: 'calendar-outline', color: '#7c3aed', title: 'Appointments', desc: 'Book pharmacist or lab consultations online — no queues.' },
              { icon: 'locate-outline', color: '#e11d48', title: 'Find a Branch', desc: 'Locate the nearest Xerion & Doxa branch with live directions.' },
            ].map((s) => (
              <View key={s.title} style={styles.serviceRow}>
                <View style={[styles.serviceIcon, { backgroundColor: s.color + '1a' }]}>
                  <Ionicons name={s.icon as any} size={22} color={s.color} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>{s.title}</Text>
                  <Text style={styles.serviceDesc}>{s.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── HELP SECTION ── */}
        {expanded === 'help' && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle" size={22} color="#1a6b2f" />
              <Text style={styles.sectionTitle}>Help &amp; FAQs</Text>
            </View>
            {[
              { q: 'Do I need a prescription?', a: 'Some medications require a valid prescription. Our pharmacists will guide you on prescription requirements.' },
              { q: 'How do I get test results?', a: 'Lab results are available in the app under "Laboratory" once signed in. You can also collect at the branch.' },
              { q: 'Can I order medications online?', a: 'Yes! After signing in, use the Pharmacy section to browse and request medication delivery.' },
              { q: 'What are your opening hours?', a: 'Most branches operate 7AM – 10PM daily. Some branches offer 24-hour services.' },
              { q: 'How do I contact support?', a: 'Call us on +234 800 000 0000 or email support@xerion-doxa.com. We respond within 2 hours.' },
            ].map((faq, i) => (
              <TouchableOpacity
                key={i}
                style={styles.faqItem}
                onPress={() => setExpandedDrug(expandedDrug === i ? null : i)}
              >
                <View style={styles.faqQ}>
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <Ionicons
                    name={expandedDrug === i ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#1a6b2f"
                  />
                </View>
                {expandedDrug === i && (
                  <Text style={styles.faqAnswer}>{faq.a}</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => Linking.openURL('tel:+2348000000000')}
            >
              <Ionicons name="call" size={18} color="#ffffff" />
              <Text style={styles.contactBtnText}>Call Us Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── DRUG EDUCATION ── */}
        <View style={styles.eduSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="book-outline" size={22} color="#1a6b2f" />
            <Text style={styles.sectionTitle}>Drug Education</Text>
          </View>
          <Text style={styles.eduSubtitle}>
            Learn about commonly used medications — how they work, correct dosage, and safety tips.
          </Text>

          {DRUGS.map((drug, i) => (
            <TouchableOpacity
              key={drug.name}
              style={styles.drugCard}
              activeOpacity={0.88}
              onPress={() => setExpandedDrug(expandedDrug === 100 + i ? null : 100 + i)}
            >
              <View style={styles.drugHeader}>
                <View style={[styles.drugIcon, { backgroundColor: drug.color + '20' }]}>
                  <Ionicons name={drug.icon} size={26} color={drug.color} />
                </View>
                <View style={styles.drugInfo}>
                  <Text style={styles.drugName}>{drug.name}</Text>
                  <View style={[styles.drugBadge, { backgroundColor: drug.color + '18' }]}>
                    <Text style={[styles.drugUse, { color: drug.color }]}>{drug.use}</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedDrug === 100 + i ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#94a3b8"
                />
              </View>

              {expandedDrug === 100 + i && (
                <View style={styles.drugBody}>
                  <Text style={styles.drugDesc}>{drug.desc}</Text>
                  <View style={styles.drugDetail}>
                    <Ionicons name="clipboard-outline" size={16} color="#1a6b2f" />
                    <Text style={styles.drugDetailText}><Text style={styles.drugDetailLabel}>Dosage: </Text>{drug.dosage}</Text>
                  </View>
                  <View style={[styles.drugDetail, styles.warningRow]}>
                    <Ionicons name="warning-outline" size={16} color="#f97316" />
                    <Text style={styles.drugDetailText}><Text style={[styles.drugDetailLabel, { color: '#f97316' }]}>Warning: </Text>{drug.warning}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── SIGN IN / SIGN UP CTA ── */}
        <View style={styles.ctaSection}>
          <LinearGradient colors={['#0f4c23', '#1a6b2f']} style={styles.ctaCard}>
            <Ionicons name="shield-checkmark" size={36} color="#f97316" style={{ marginBottom: 12 }} />
            <Text style={styles.ctaTitle}>Ready to get started?</Text>
            <Text style={styles.ctaSub}>
              Access your prescriptions, lab results, and personalised health services.
            </Text>

            <TouchableOpacity
              style={styles.signInBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/sign-in')}
            >
              <LinearGradient
                colors={['#f97316', '#ea580c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Ionicons name="log-in-outline" size={20} color="#ffffff" />
                <Text style={styles.signInBtnText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/register')}
            >
              <Ionicons name="person-add-outline" size={20} color="#ffffff" />
              <Text style={styles.signUpBtnText}>Create an Account</Text>
            </TouchableOpacity>

            <Text style={styles.ctaNote}>
              New user? Sign up to register and access all features.
            </Text>
          </LinearGradient>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Xerion &amp; Doxa Chemist Limited</Text>
          <Text style={styles.footerSub}>Quality Care. Trusted Service.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f4c23' },
  container: { flex: 1, backgroundColor: '#f1f5f9' },

  // HERO
  hero: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  logo: { width: 52, height: 52, borderRadius: 14, borderWidth: 2, borderColor: '#f97316', backgroundColor: '#ffffff' },
  brandText: { marginLeft: 12 },
  brandName: { fontSize: 22, fontWeight: '900', color: '#f97316', letterSpacing: 0.3 },
  brandSub: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 2 },
  heroTitle: { fontSize: 34, fontWeight: '900', color: '#ffffff', lineHeight: 42, marginBottom: 10, letterSpacing: -0.5 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 22, marginBottom: 24, fontWeight: '500' },

  // NAV BAR
  navBar: { flexDirection: 'row', gap: 10 },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  navBtnActive: { backgroundColor: '#ffffff', borderColor: '#ffffff' },
  navBtnText: { fontSize: 13, fontWeight: '700', color: '#ffffff' },
  navBtnTextActive: { color: '#1a6b2f' },

  // SECTIONS
  sectionCard: {
    margin: 16,
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1a6b2f', marginLeft: 8 },
  sectionText: { fontSize: 14.5, color: '#475569', lineHeight: 22, marginBottom: 10, fontWeight: '500' },

  // STATS
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  stat: { alignItems: 'center', flex: 1 },
  statNum: { fontSize: 22, fontWeight: '900', color: '#1a6b2f' },
  statLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 2 },

  // SERVICES
  serviceRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  serviceIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  serviceInfo: { flex: 1 },
  serviceTitle: { fontSize: 15, fontWeight: '800', color: '#1e293b', marginBottom: 3 },
  serviceDesc: { fontSize: 13.5, color: '#64748b', lineHeight: 20, fontWeight: '500' },

  // FAQ / HELP
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 12,
  },
  faqQ: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 14.5, fontWeight: '700', color: '#1e293b', flex: 1, paddingRight: 8 },
  faqAnswer: { fontSize: 14, color: '#475569', lineHeight: 21, marginTop: 8, fontWeight: '500' },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a6b2f',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 18,
  },
  contactBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },

  // DRUG EDUCATION
  eduSection: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  eduSubtitle: { fontSize: 14, color: '#64748b', lineHeight: 20, marginBottom: 16, fontWeight: '500', marginTop: 4 },
  drugCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  drugHeader: { flexDirection: 'row', alignItems: 'center' },
  drugIcon: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  drugInfo: { flex: 1 },
  drugName: { fontSize: 16, fontWeight: '800', color: '#1e293b', marginBottom: 4 },
  drugBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  drugUse: { fontSize: 12, fontWeight: '700' },
  drugBody: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  drugDesc: { fontSize: 14, color: '#475569', lineHeight: 21, marginBottom: 12, fontWeight: '500' },
  drugDetail: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  warningRow: { backgroundColor: '#fff7ed', padding: 10, borderRadius: 10 },
  drugDetailText: { flex: 1, fontSize: 13, color: '#475569', lineHeight: 19, fontWeight: '500' },
  drugDetailLabel: { fontWeight: '700', color: '#1e293b' },

  // CTA
  ctaSection: { padding: 16 },
  ctaCard: { borderRadius: 28, padding: 28, alignItems: 'center' },
  ctaTitle: { fontSize: 24, fontWeight: '900', color: '#ffffff', textAlign: 'center', marginBottom: 10, letterSpacing: -0.5 },
  ctaSub: { fontSize: 14.5, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 22, marginBottom: 28, fontWeight: '500' },
  signInBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  btnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  signInBtnText: { fontSize: 17, fontWeight: '800', color: '#ffffff' },
  signUpBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 18,
  },
  signUpBtnText: { fontSize: 17, fontWeight: '800', color: '#ffffff' },
  ctaNote: { fontSize: 13, color: 'rgba(255,255,255,0.55)', textAlign: 'center', fontWeight: '500' },

  // FOOTER
  footer: { alignItems: 'center', paddingVertical: 24 },
  footerText: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  footerSub: { fontSize: 12, color: '#cbd5e1', fontWeight: '500', marginTop: 4 },
});
