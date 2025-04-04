import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  MessageSquare,
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
} from 'lucide-react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import dayjs from 'dayjs';
import { useTheme } from './darktheme';

// ----------------------------
// Type Definitions
// ----------------------------
interface Message {
  id: string;
  sender: string;
  preview: string;
  timestamp: string;
  risk: string;
}

// ----------------------------
// Risk Analysis Logic
// ----------------------------
const RISK_THRESHOLDS = {
  HIGH_RISK: 7,
  SUSPICIOUS: 4,
};

const riskPatterns = {
  highRisk: {
    urgentAction: /(click here|reply (now|immediately)|act now|urgent|limited time)/i,
    accountThreats: /(account.*(suspend|clos|block|terminat|deactivat))/i,
    bankImpersonation: /(BDO|BPI|Security Bank|Metrobank|UnionBank)/i,
    prizes: /(won|winner|prize|claim|reward|congratulation)/i,
    personalInfo: /(verify.*identity|send.*(password|pin|otp|cvv))/i,
    moneyRequests: /(send|transfer|payment|fee|charge)/i,
    legalThreats: /(legal|lawsuit|police|arrest|criminal)/i,
  },
  suspicious: {
    genericGreeting: /(dear.*customer|valued.*client)/i,
    badGrammar: /(!+|\?+|[A-Z]{3,})/,
    unverifiedOffers: /(offer|promo|discount|deal|save)/i,
    verification: /(verify|confirm|validate|authenticate)/i,
    links: /(http|www|\.com|\.ph|bit\.ly)/i,
  },
  safe: {
    transaction: /(received|sent|transferred|paid|purchased)/i,
    otpCode: /([0-9]{4,6}.*code|OTP|password)/i,
    knownSender: /(GCash|PayMaya|Maya|Globe|Smart|PLDT)/i,
  },
};

const analyzeMessageRisk = (message: string, sender: string): string => {
  let riskScore = 0;

  Object.values(riskPatterns.highRisk).forEach((pattern) => {
    if (pattern.test(message) || pattern.test(sender)) riskScore += 3;
  });

  Object.values(riskPatterns.suspicious).forEach((pattern) => {
    if (pattern.test(message) || pattern.test(sender)) riskScore += 2;
  });

  Object.values(riskPatterns.safe).forEach((pattern) => {
    if (pattern.test(message) || pattern.test(sender)) riskScore -= 2;
  });

  if (/^\+(?!(63))/.test(sender)) riskScore += 3;
  if (/^\+?[0-9]{11,}$/.test(sender)) riskScore += 2;

  if (riskScore >= RISK_THRESHOLDS.HIGH_RISK) return 'high';
  if (riskScore >= RISK_THRESHOLDS.SUSPICIOUS) return 'suspicious';
  return 'safe';
};

// ----------------------------
// Risk Helpers
// ----------------------------
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

// ----------------------------
// Main Component
// ----------------------------
export default function MessagesScreen() {
  const { isDarkMode, colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'flaggedMessages'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages: Message[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const msg = data.message || '';
          const sender = data.phoneNumber || '';

          return {
            id: doc.id,
            sender,
            preview: msg,
            timestamp: data.timestamp?.toDate ? dayjs(data.timestamp.toDate()).format('h:mm A') : 'N/A',
            risk: data.risk || analyzeMessageRisk(msg, sender), // fallback to local risk analysis
          };
        });
        setMessages(fetchedMessages);
        setLoading(false);
      },
      (error) => {
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

      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.messageItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
              <View style={styles.riskIndicator}>{getRiskIcon(item.risk)}</View>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={[styles.sender, { color: colors.text }]}>{item.sender}</Text>
                  <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{item.timestamp}</Text>
                </View>
                <Text style={[styles.preview, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.preview}
                </Text>
                <Text style={[styles.riskLabel, getRiskLabelStyle(item.risk)]}>
                  Risk: {item.risk.toUpperCase()}
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

// ----------------------------
// Styles
// ----------------------------
const getRiskLabelStyle = (risk: string) => {
  switch (risk) {
    case 'high':
      return { color: '#DC2626' };
    case 'suspicious':
      return { color: '#D97706' };
    case 'safe':
      return { color: '#059669' };
    default:
      return {};
  }
};

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
  riskIndicator: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  riskLabel: {
    fontWeight: 'bold',
    marginTop: 6,
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
