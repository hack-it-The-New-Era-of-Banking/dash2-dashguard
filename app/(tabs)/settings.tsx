import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Bell, Shield, Database, MessageSquare, Phone, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your protection</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protection Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Shield size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Auto-Block Mode</Text>
            <Text style={styles.settingDescription}>
              Automatically block high-risk messages and calls
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
            thumbColor={true ? '#6366F1' : '#F3F4F6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Bell size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Get alerts for suspicious activities
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
            thumbColor={true ? '#6366F1' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scan Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <MessageSquare size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>SMS Protection</Text>
            <Text style={styles.settingDescription}>
              Scan incoming messages for threats
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
            thumbColor={true ? '#6366F1' : '#F3F4F6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Phone size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Call Protection</Text>
            <Text style={styles.settingDescription}>
              Screen incoming calls for scams
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: '#D1D5DB', true: '#818CF8' }}
            thumbColor={true ? '#6366F1' : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Database size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Offline Database</Text>
            <Text style={styles.settingDescription}>
              Update scam patterns database
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <HelpCircle size={24} color="#6366F1" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Help & Support</Text>
            <Text style={styles.settingDescription}>
              Get help with DashGuard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});