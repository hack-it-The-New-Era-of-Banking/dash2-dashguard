import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MessageSquare, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './darktheme';

export default function MessagesScreen() {
  // Use the theme context to get colors and dark mode state
  const { isDarkMode, colors } = useTheme();

  // Risk scoring thresholds
  const RISK_THRESHOLDS = {
    HIGH_RISK: 7,
    SUSPICIOUS: 4
  };

  // Risk scoring patterns
  const riskPatterns = {
    highRisk: {
      urgentAction: /(click here|reply (now|immediately)|act now|urgent|limited time)/i,
      accountThreats: /(account.*(suspend|clos|block|terminat|deactivat))/i,
      bankImpersonation: /(BDO|BPI|Security Bank|Metrobank|UnionBank)/i,
      prizes: /(won|winner|prize|claim|reward|congratulation)/i,
      personalInfo: /(verify.*identity|send.*(password|pin|otp|cvv))/i,
      moneyRequests: /(send|transfer|payment|fee|charge)/i,
      legalThreats: /(legal|lawsuit|police|arrest|criminal)/i
    },
    suspicious: {
      genericGreeting: /(dear.*customer|valued.*client)/i,
      badGrammar: /(!+|\?+|[A-Z]{3,})/,
      unverifiedOffers: /(offer|promo|discount|deal|save)/i,
      verification: /(verify|confirm|validate|authenticate)/i,
      links: /(http|www|\.com|\.ph|bit\.ly)/i
    },
    safe: {
      transaction: /(received|sent|transferred|paid|purchased)/i,
      otpCode: /([0-9]{4,6}.*code|OTP|password)/i,
      knownSender: /(GCash|PayMaya|Maya|Globe|Smart|PLDT)/i
    }
  };

  // Message type definition
  interface Message {
    id: string;
    sender: string;
    preview: string;
    timestamp: string;
    risk: string;
  }

  // Risk analysis function
  const analyzeMessageRisk = (message: string, sender: string): string => {
    let riskScore = 0;
    
    // Check high risk patterns
    for (const pattern of Object.values(riskPatterns.highRisk)) {
      if (pattern.test(message) || pattern.test(sender)) {
        riskScore += 3;
      }
    }

    // Check suspicious patterns  
    for (const pattern of Object.values(riskPatterns.suspicious)) {
      if (pattern.test(message) || pattern.test(sender)) {
        riskScore += 2;
      }
    }

    // Check safe patterns
    for (const pattern of Object.values(riskPatterns.safe)) {
      if (pattern.test(message) || pattern.test(sender)) {
        riskScore -= 2;
      }
    }

    // Additional sender checks
    if (/^\+(?!(63))/.test(sender)) { // International number
      riskScore += 3;
    }
    if (/^\+?[0-9]{11,}$/.test(sender)) { // Unknown mobile number
      riskScore += 2;
    }

    // Determine risk level based on score
    if (riskScore >= RISK_THRESHOLDS.HIGH_RISK) {
      return 'high';
    } else if (riskScore >= RISK_THRESHOLDS.SUSPICIOUS) {
      return 'suspicious';
    }
    return 'safe';
  };

  const messages = [
    {
      id: '1',
      sender: '+63 912 345 6789',
      preview: 'Your BDO account has been temporarily suspended. Click here to...',
      timestamp: '2:30 PM',
      risk: analyzeMessageRisk('Your BDO account has been temporarily suspended. Click here to...', '+63 912 345 6789'),
    },
    {
      id: '3',
      sender: '+63 917 123 4567',
      preview: 'Congratulations! You\'ve won PHP 50,000. Reply YES to claim...',
      timestamp: '11:20 AM', 
      risk: analyzeMessageRisk('Congratulations! You\'ve won PHP 50,000. Reply YES to claim...', '+63 917 123 4567'),
    },
  ];
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import dayjs from 'dayjs';

type Message = {
  id: string;
  sender: string;
  preview: string;
  timestamp: string;
  severity: string; // Display severity directly
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
export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'flaggedMessages'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const fetchedMessages: Message[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            sender: data.phoneNumber,
            preview: data.message,
            timestamp: data.timestamp?.toDate ? dayjs(data.timestamp.toDate()).format('h:mm A') : 'N/A',
            severity: data.severity || 'Unknown', // Fetch severity directly
          };
        });
        setMessages(fetchedMessages);
        setLoading(false);
      },
      error => {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Scanned messages appear here</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.messageItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <View style={[styles.riskIndicator, getRiskStyle(item.risk)]}>
              {getRiskIcon(item.risk)}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={[styles.sender, { color: colors.text }]}>{item.sender}</Text>
                <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
              </View>
              <Text style={[styles.preview, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.preview}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.messageItem}>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.sender}>{item.sender}</Text>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={2}>
                  {item.preview}
                </Text>

                {/* Display Severity here */}
                <Text style={styles.severity}>
                  Severity: {item.severity}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.scanButton}>
        <MessageSquare size={24} color="#fff" />
        <Text style={styles.scanButtonText}>Scan New Message</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
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
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sender: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
  },
  severity: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4,
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
    shadowOffset: { width: 0, height: 4 },
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
