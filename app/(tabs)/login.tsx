import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from './darktheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation type
type RootStackParamList = {
  ProfilePage: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfilePage'>;

export default function LoginPage() {
  const { isDarkMode, colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>DashGuard</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your Protection Against Scams
        </Text>
      </View>

      {/* Main Card with Gradient Background */}
      <LinearGradient
        colors={['#6366F1', '#4F46E5']}
        style={styles.mainCard}
      >
        <View style={styles.cardContent}>
          <Image
            source={require('../../assets/images/shield.png')}
            style={styles.appIcon}
          />
          <Text style={styles.cardTitle}>Secure Login</Text>
          <Text style={styles.cardSubtitle}>Enter your Philippine mobile number</Text>
          
          {/* Phone Number Input */}
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+63</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="9XX XXX XXXX"
              placeholderTextColor="#A0AEC0"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
          </View>
          
          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('ProfilePage')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
        
        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#E0F2FE' }]}>
            <Text style={[styles.featureEmoji, { color: '#0369A1' }]}>🔒</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Secure Messaging</Text>
            <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
              End-to-end protection for all your messages
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#FCE7F3' }]}>
            <Text style={[styles.featureEmoji, { color: '#BE185D' }]}>🛡️</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Real-time Alerts</Text>
            <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
              Instant notifications about potential scams
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
            <Text style={[styles.featureEmoji, { color: '#047857' }]}>📊</Text>
          </View>
          <View style={styles.featureText}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>Security Dashboard</Text>
            <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
              Track your protection history and stats
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  mainCard: {
    margin: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 32,
    alignItems: 'center',
  },
  appIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#E5E7EB',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    padding: 14,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    elevation: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
