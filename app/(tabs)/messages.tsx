import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MessageSquare, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import SmsRetriever, { SmsListenerEvent } from 'react-native-sms-retriever';

interface Message {
  id: string;
  sender: string; 
  preview: string;
  timestamp: string;
  risk: 'high' | 'suspicious' | 'safe';
}

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Start listening to incoming SMS
    const startSmsListener = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener((event: SmsListenerEvent) => {
            const { message } = event;
            
            if (message) { // Check if message exists
              const timeStamp = Date.now();
              
              // Add new message to state
              // Risk level would need to be determined by your scanning logic
              const newMessage: Message = {
                id: timeStamp.toString(),
                sender: 'Unknown', // Sender info not available in event
                preview: message,
                timestamp: new Date(timeStamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                risk: 'suspicious' // Default to suspicious until scanned
              };
              
              setMessages(prevMessages => [newMessage, ...prevMessages]);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    startSmsListener();

    // Cleanup listener
    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);

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