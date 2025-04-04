import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import { MessageSquare, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import * as SMS from 'expo-sms';

interface Message {
  id: string;
  sender: string; 
  preview: string;
  timestamp: string;
  risk: 'high' | 'suspicious' | 'safe';
}

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check if SMS is available on the device
    const checkSmsAvailability = async () => {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
      
      if (!isSmsAvailable) {
        console.log('SMS is not available on this device');
      }
    };

    checkSmsAvailability();
  }, []);

  // Function to handle scanning (in Expo, we'll need to manually add messages for demo)
  const handleScanMessage = async () => {
    if (!isAvailable) {
      Alert.alert('Not Available', 'SMS functionality is not available on this device');
      return;
    }
    
    // In a real app, you'd integrate with a phishing detection API here
    // For demo purposes, we'll add a mock message
    const mockMessage = {
      id: Date.now().toString(),
      sender: '+1234567890',
      preview: 'Your account has been locked. Click here to verify: bit.ly/suspicious-link',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      risk: ['high', 'suspicious', 'safe'][Math.floor(Math.random() * 3)] as 'high' | 'suspicious' | 'safe'
    };
    
    setMessages(prevMessages => [mockMessage, ...prevMessages]);
  };

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

      {!isAvailable && (
        <View style={styles.notSupportedBanner}>
          <AlertTriangle size={18} color="#DC2626" />
          <Text style={styles.notSupportedText}>SMS functionality is not available on this device</Text>
        </View>
      )}

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages scanned yet</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={[styles.scanButton, !isAvailable && styles.disabledButton]} 
        onPress={handleScanMessage}
        disabled={!isAvailable}
      >
        <MessageSquare size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Add Demo Message</Text>
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
  notSupportedBanner: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notSupportedText: {
    color: '#B91C1C',
    marginLeft: 8,
    fontSize: 14,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
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
  disabledButton: {
    backgroundColor: '#9CA3AF',
    shadowColor: '#9CA3AF',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});