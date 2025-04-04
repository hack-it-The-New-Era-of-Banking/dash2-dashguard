import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, MessageSquare, TrendingUp } from 'lucide-react-native';
import { useTheme } from './darktheme';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Type definition for report
type Report = {
  id: string;
  type: string;
  description: string;
  phoneNumber: string;
  severity: string;
  reportedAt: Timestamp;
};

export default function ReportsScreen() {
  const { isDarkMode, colors } = useTheme();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsRef = collection(db, 'reportedNumbers');
        const q = query(reportsRef, orderBy('reportedAt', 'desc'));
        const snapshot = await getDocs(q);
        const data: Report[] = snapshot.docs.map(doc => {
          const reportData = doc.data() as Omit<Report, 'id'>;
          return {
            id: doc.id,
            ...reportData,
          };
        });
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Scam Reports</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Community-reported scams</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <TrendingUp size={24} color={colors.primary} />
          <Text style={[styles.statNumber, { color: colors.text }]}>{reports.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Reports</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Reports</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 20 }} />
        ) : (
          reports.map((report) => (
            <TouchableOpacity key={report.id} style={[styles.reportItem, { backgroundColor: colors.surface }]}>
              <View style={styles.reportHeader}>
                <View style={styles.reportType}>
                  {report.type === 'Call' ? (
                    <Phone size={20} color={colors.primary} />
                  ) : (
                    <MessageSquare size={20} color={colors.primary} />
                  )}
                  <Text style={[styles.reportCategory, { color: colors.primary }]}>  
                    {report.type === 'Call' ? 'Call Scam' : 'SMS Scam'}
                  </Text>
                </View>
                <Text style={[styles.reportTime, { color: colors.textSecondary }]}>  
                  {report.reportedAt?.toDate().toLocaleString() ?? 'Unknown time'}
                </Text>
              </View>

              <Text style={[styles.reportDescription, { color: colors.text }]}>
                {report.description}
              </Text>

              <View style={styles.reportFooter}>
                <View style={styles.reportStatus}>
                  <AlertTriangle size={16} color="#DC2626" />
                  <Text style={styles.statusText}>{report.severity || 'Unknown'}</Text>
                </View>
                <Text style={[styles.reportNumber, { color: colors.textSecondary }]}>  
                  {report.phoneNumber}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <TouchableOpacity style={[styles.reportButton, { backgroundColor: colors.primary }]}>
        <AlertTriangle size={24} color="#fff" />
        <Text style={styles.reportButtonText}>Report New Scam</Text>
      </TouchableOpacity>
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
  statsContainer: {
    padding: 16,
  },
  statCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  reportItem: {
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
    marginLeft: 8,
  },
  reportTime: {
    fontSize: 12,
  },
  reportDescription: {
    fontSize: 14,
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
  },
  reportButton: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
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