import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MessageSquare, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

const messages = [
  {
    id: '1',
    sender: '+63 912 345 6789',
    preview: 'Your BDO account has been temporarily suspended. Click here to...',
    timestamp: '2:30 PM',
    risk: 'high',
  },
  {
    id: '2',
    sender: 'GCash',
    preview: 'Your account has received PHP 1,000.00 from Juan Dela Cruz',
    timestamp: '1:45 PM',
    risk: 'safe',
  },
  {
    id: '3',
    sender: '+63 917 123 4567',
    preview: 'Congratulations! You\'ve won PHP 50,000. Reply YES to claim...',
    timestamp: '11:20 AM',
    risk: 'suspicious',
  },
];

export default function MessagesScreen() {
  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle size={20} color="#DC2626" />;
      case 'suspicious':
        return <AlertTriangle size={20} color="#D97706" />;
      case 'safe':
        return <CheckCircle size={20} color="#059669" />;
      default:
        return null;
    }
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'high':
        return styles.highRisk;
      case 'suspicious':
        return styles.suspicious;
      case 'safe':
        return styles.safe;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Scanned messages appear here</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageItem}>
            <View style={[styles.riskIndicator, getRiskStyle(item.risk)]}>
              {getRiskIcon(item.risk)}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
              <Text style={styles.preview} numberOfLines={2}>
                {item.preview}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.scanButton}>
        <MessageSquare size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Scan New Message</Text>
      </TouchableOpacity>
    </View>
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
  messageItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  riskIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  highRisk: {
    backgroundColor: '#FEE2E2',
  },
  suspicious: {
    backgroundColor: '#FEF3C7',
  },
  safe: {
    backgroundColor: '#D1FAE5',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sender: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  preview: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  scanButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});