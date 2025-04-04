import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, MessageSquare } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './darktheme'; // Update with correct path

export default function ProtectScreen() {
  // Use the theme context to get colors and dark mode state
  const { isDarkMode, colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>DashGuard</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your Protection Against Scams</Text>
      </View>

      <LinearGradient
        colors={['#6366F1', '#4F46E5']}
        style={styles.statsCard}>
        <View style={styles.statsContent}>
          <Shield size={32} color="#fff" />
          <Text style={styles.statsTitle}>Protection Active</Text>
          <Text style={styles.statsSubtitle}>Monitoring messages and calls</Text>
        </View>
      </LinearGradient>

      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <View style={[styles.statBox, { backgroundColor: isDarkMode ? '#3F3F46' : '#FEF3C7' }]}>
            <AlertTriangle size={24} color="#D97706" />
            <Text style={[styles.statNumber, { color: isDarkMode ? '#FBBF24' : '#D97706' }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Threats Blocked</Text>
          </View>
        </View>
        <View style={styles.gridItem}>
          <View style={[styles.statBox, { backgroundColor: isDarkMode ? '#3F3F46' : '#E0E7FF' }]}>
            <MessageSquare size={24} color="#4F46E5" />
            <Text style={[styles.statNumber, { color: isDarkMode ? '#818CF8' : '#4F46E5' }]}>48</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Messages Scanned</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        <View style={styles.activityList}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={[styles.activityItem, { 
              backgroundColor: colors.surface,
              borderColor: colors.border
            }]}>
              <View style={[styles.activityIcon, { backgroundColor: colors.iconBackground }]}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: colors.text }]}>Suspicious Message Blocked</Text>
                <Text style={[styles.activityTime, { color: colors.textSecondary }]}>2 hours ago</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Safety Tips</Text>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1586892477838-2b96f85b0085?q=80&w=2340&auto=format&fit=crop' }}
          style={styles.tipsImage}
        />
        <Text style={[styles.tipsText, { color: colors.textSecondary }]}>
          Never share your OTP or banking credentials. Legitimate banks will never ask for this information.
        </Text>
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
  statsCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsContent: {
    padding: 24,
    alignItems: 'center',
  },
  statsTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },
  statsSubtitle: {
    color: '#E5E7EB',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },
  statBox: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  activityTime: {
    marginTop: 4,
    fontSize: 14,
  },
  tipsImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipsText: {
    lineHeight: 24,
  },
});