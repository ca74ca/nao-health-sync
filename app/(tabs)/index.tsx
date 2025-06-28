import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Import Apple HealthKit
// npm install react-native-health
// or use another HealthKit wrapper as needed
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
    write: [],
  },
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

  const syncAppleHealth = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Health only available on iOS');
      return;
    }
    setLoading(true);

    // Request permissions
    AppleHealthKit.initHealthKit(permissions, (err: any) => {
      if (err) {
        setLoading(false);
        Alert.alert('Error initializing HealthKit: ' + err.message);
        return;
      }

      // Example: fetch active energy burned today
      const today = new Date();
      const options = {
        date: today.toISOString(),
        includeManuallyAdded: false,
      };

      AppleHealthKit.getActiveEnergyBurned(options, async (err: any, results: any) => {
        if (err) {
          setLoading(false);
          Alert.alert('Could not fetch Apple Health data: ' + err.message);
          return;
        }

        // You can fetch more data as needed (steps, workouts, etc)
        const healthData = {
          date: today.toISOString(),
          calories_burned: results?.value ?? 0,
          // Optionally add steps, workouts, etc
        };

        // Send to your backend
        try {
          const res = await fetch('https://your-nao-backend.com/api/sync-apple', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(healthData),
          });
          if (res.ok) {
            Alert.alert('✅ Synced Apple Health data!');
          } else {
            Alert.alert('Failed to sync with NAO backend');
          }
        } catch (syncErr) {
          Alert.alert('Network error syncing health data');
        }
        setLoading(false);
      });
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sync your Apple Health</ThemedText>
        <Button
          title={loading ? "Syncing..." : "Sync Apple Health"}
          onPress={syncAppleHealth}
          disabled={loading}
        />
        {loading && (
          <View style={{ marginTop: 10 }}>
            <ActivityIndicator />
          </View>
        )}
      </ThemedView>
      {/* ...rest of your existing content */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});