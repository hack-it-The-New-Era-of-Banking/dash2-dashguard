import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Bell, Shield, Database, MessageSquare, Phone, CircleHelp as HelpCircle, Sun, Moon } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from './darktheme'; // Update with correct path

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const [autoBlockEnabled, setAutoBlockEnabled] = useState(false); // Initial state for auto-block
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Initial state for notifications
  const [smsProtectionEnabled, setSmsProtectionEnabled] = useState(true); // Initial state for SMS protection
  const [callProtectionEnabled, setCallProtectionEnabled] = useState(true); // Initial state for call protection  

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Customize your protection</Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        
        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            {isDarkMode ? <Moon size={24} color={colors.primary} /> : <Sun size={24} color={colors.primary} />}
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Switch between light and dark themes
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
            thumbColor={isDarkMode ? colors.primary : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Protection Settings</Text>
        
        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <Shield size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Auto-Block Mode</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Automatically block high-risk messages and calls
            </Text>
          </View>
          <Switch
            value={autoBlockEnabled}
            onValueChange={setAutoBlockEnabled}
            trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
            thumbColor={autoBlockEnabled ? colors.primary : '#F3F4F6'}
          />
        </View>

        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <Bell size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Notifications</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Get alerts for suspicious activities
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
            thumbColor={notificationsEnabled ? colors.primary : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Scan Settings</Text>
        
        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <MessageSquare size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>SMS Protection</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Scan incoming messages for threats
            </Text>
          </View>
          <Switch
            value={smsProtectionEnabled}
            onValueChange={setSmsProtectionEnabled}
            trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
            thumbColor={smsProtectionEnabled ? colors.primary : '#F3F4F6'}
          />
        </View>

        <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <Phone size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Call Protection</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Screen incoming calls for scams
            </Text>
          </View>
          <Switch
            value={callProtectionEnabled}
            onValueChange={setCallProtectionEnabled}
            trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
            thumbColor={callProtectionEnabled ? colors.primary : '#F3F4F6'}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
        
        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <Database size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Offline Database</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Update scam patterns database
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
          <View style={[styles.settingIcon, { backgroundColor: colors.iconBackground }]}>
            <HelpCircle size={24} color={colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>Help & Support</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
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