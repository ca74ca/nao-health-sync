import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
// If you moved it to app/
import { syncAppleHealthToBackend } from './sync'; // now it's local

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.VO2Max,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
    write: [],
  },
};

export default function HealthSync() {
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.error('❌ HealthKit init failed', err);
        Alert.alert('Error', 'Apple Health permissions not granted');
        return;
      }

      console.log('✅ Apple Health permissions granted');

      AppleHealthKit.getStepCount({}, async (err, results) => {
        if (err) {
          console.error('🚫 Step fetch error', err);
          return;
        }

        const healthSummary = {
          steps: results.value,
          syncedAt: new Date().toISOString(),
        };

        try {
          const naoUser = await AsyncStorage.getItem("nao_user");
          const walletId = naoUser ? JSON.parse(naoUser).walletId : null;
          if (walletId) {
            await syncAppleHealthToBackend(walletId, healthSummary);
          } else {
            Alert.alert('Error', 'No wallet found. Please log in again.');
          }
        } catch (storageErr) {
          console.error('AsyncStorage error:', storageErr);
          Alert.alert('Error', 'Failed to access wallet info.');
        }
      });
    });
  }, []);

  return null;
}