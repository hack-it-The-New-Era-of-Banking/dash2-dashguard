import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Shield as ShieldIcon, TriangleAlert as AlertTriangle, MessageSquare } from 'lucide-react-native';
import { useTheme } from './darktheme'; // Update with correct path
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export default function ProtectScreen() {
  // Use the theme context to get colors and dark mode state
  const { isDarkMode, colors } = useTheme();

  // State to manage protection status
  const [isProtectionActive, setIsProtectionActive] = useState(true);

  // Reanimated shared values for animations
  const scalePulse = useSharedValue(1); // For glowing effect
  const scaleClick = useSharedValue(1); // For click effect
  const rotate = useSharedValue(0); // For rotation effect

  // Function to toggle protection status
  const toggleProtection = () => {
    setIsProtectionActive((prev) => !prev);
  };

  // Start pulsating and rotation animations when protection is active
  React.useEffect(() => {
    if (isProtectionActive) {
      scalePulse.value = withRepeat(
        withTiming(1.3, { duration: 1000 }), // Scale up
        -1, // Repeat infinitely
        true // Reverse direction
      );
      rotate.value = withRepeat(withTiming(360, { duration: 4000 }), -1, false); // Rotate 360 degrees
    } else {
      scalePulse.value = withTiming(1, { duration: 300 }); // Reset scale
      rotate.value = withTiming(0, { duration: 300 }); // Reset rotation
    }
  }, [isProtectionActive]);

  // Animated style for the glow effect
  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scalePulse.value }],
      opacity: 1 - (scalePulse.value - 1) / 0.3, // Fade out as it scales up
    };
  });

  // Animated style for the button (click effect)
  const animatedClickStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleClick.value }],
    };
  });

  // Animated style for the shield icon (rotation effect)
  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }], // Rotate based on shared value
    };
  });

  // Handle press-in event
  const onPressIn = () => {
    scaleClick.value = withSpring(0.95); // Scale down slightly
  };

  // Handle press-out event
  const onPressOut = () => {
    scaleClick.value = withSpring(1); // Return to original size
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>DashGuard</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your Protection Against Scams</Text>
      </View>

      {/* Protection Toggle Section */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={toggleProtection}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          activeOpacity={1} // Prevent default opacity animation
        >
          <Animated.View style={[styles.toggleButton, animatedClickStyle]}>
            {/* Glowing Circle */}
            <Animated.View style={[styles.glow, animatedGlowStyle]} />
            {/* Shield Icon */}
            <Animated.View style={[styles.shieldIconContainer, animatedRotationStyle]}>
              <ShieldIcon
                size={48}
                color={isProtectionActive ? '#fff' : '#6366F1'} // Color changes based on state
                fill={isProtectionActive ? '#fff' : 'none'} // Fill changes based on state
                strokeWidth={isProtectionActive ? undefined : 2} // Stroke width for hollow state
              />
            </Animated.View>
            <Text style={styles.toggleButtonText}>
              {isProtectionActive ? 'Protection Active' : 'Protection Inactive'}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

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
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  toggleButton: {
    width: 170,
    height: 170,
    borderRadius: 75, // Half of width/height for a perfect circle
    backgroundColor: '#6366F1', // Primary color for the button
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure glowing circle stays within bounds
  },
  glow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 75, // Half of width/height for a perfect circle
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
  },
  shieldIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
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