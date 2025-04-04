import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, MessageSquare } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProtectScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DashGuard</Text>
        <Text style={styles.subtitle}>Your Protection Against Scams</Text>
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
          <View style={[styles.statBox, { backgroundColor: '#FEF3C7' }]}>
            <AlertTriangle size={24} color="#D97706" />
            <Text style={[styles.statNumber, { color: '#D97706' }]}>12</Text>
            <Text style={styles.statLabel}>Threats Blocked</Text>
          </View>
        </View>
        <View style={styles.gridItem}>
          <View style={[styles.statBox, { backgroundColor: '#E0E7FF' }]}>
            <MessageSquare size={24} color="#4F46E5" />
            <Text style={[styles.statNumber, { color: '#4F46E5' }]}>48</Text>
            <Text style={styles.statLabel}>Messages Scanned</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Suspicious Message Blocked</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1586892477838-2b96f85b0085?q=80&w=2340&auto=format&fit=crop' }}
          style={styles.tipsImage}
        />
        <Text style={styles.tipsText}>
          Never share your OTP or banking credentials. Legitimate banks will never ask for this information.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },
  statsSubtitle: {
    color: '#E0E7FF',
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
    color: '#4B5563',
    marginTop: 4,
    fontSize: 12,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  tipsImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  tipsText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});