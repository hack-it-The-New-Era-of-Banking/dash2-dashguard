import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, MessageSquare, TrendingUp } from 'lucide-react-native';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scam Reports</Text>
        <Text style={styles.subtitle}>Community-reported scams</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#6366F1" />
          <Text style={styles.statNumber}>2,547</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Reports</Text>
        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity key={item} style={styles.reportItem}>
            <View style={styles.reportHeader}>
              <View style={styles.reportType}>
                {item % 2 === 0 ? (
                  <Phone size={20} color="#6366F1" />
                ) : (
                  <MessageSquare size={20} color="#6366F1" />
                )}
                <Text style={styles.reportCategory}>
                  {item % 2 === 0 ? 'Call Scam' : 'SMS Scam'}
                </Text>
              </View>
              <Text style={styles.reportTime}>2h ago</Text>
            </View>
            <Text style={styles.reportDescription}>
              {item % 2 === 0
                ? 'Caller claiming to be from BDO Bank requesting OTP'
                : 'SMS message about winning a prize and requesting personal information'}
            </Text>
            <View style={styles.reportFooter}>
              <View style={styles.reportStatus}>
                <AlertTriangle size={16} color="#DC2626" />
                <Text style={styles.statusText}>High Risk</Text>
              </View>
              <Text style={styles.reportNumber}>+63 912 XXX XXXX</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.reportButton}>
        <AlertTriangle size={24} color="#fff" />
        <Text style={styles.reportButtonText}>Report New Scam</Text>
      </TouchableOpacity>
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
  statsContainer: {
    padding: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
  reportItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 8,
  },
  reportTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportDescription: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#DC2626',
    marginLeft: 4,
  },
  reportNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportButton: {
    margin: 16,
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});