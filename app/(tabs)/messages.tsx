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
  },
  timestamp: {
    fontSize: 12,
  },
  preview: {
    fontSize: 14,
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
