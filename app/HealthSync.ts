import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthPermission,
} from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Vo2Max,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Workout,
    ] as HealthPermission[],
    write: [] as HealthPermission[], // Required even if empty
  },
};

export type HealthSummary = {
  calories: number;
  steps: number;
  vo2Max: number | null;
  heartRate: number | null;
  workouts: any[];
};

export function syncAppleHealth(
  walletId: string,
  callback: (data: HealthSummary | null, error?: any) => void
) {
  AppleHealthKit.initHealthKit(permissions, (err: string, result: boolean) => {
    if (err) {
      console.error('❌ Error initializing HealthKit:', err);
      callback(null, err);
      return;
    }

    const options: HealthInputOptions = {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, energy) => {
      if (err) return callback(null, err);
      AppleHealthKit.getStepCount(options, (err, steps) => {
        if (err) return callback(null, err);
        AppleHealthKit.getVo2MaxSamples(options, (err, vo2max) => {
          if (err) return callback(null, err);
          AppleHealthKit.getHeartRateSamples(options, (err, heartRate) => {
            if (err) return callback(null, err);
            AppleHealthKit.getWorkoutSamples(options, (err, workouts) => {
              if (err) return callback(null, err);

              const summary: HealthSummary = {
                calories: energy?.value || 0,
                steps: steps?.value || 0,
                vo2Max: vo2max?.[0]?.value ?? null,
                heartRate: heartRate?.[0]?.value ?? null,
                workouts: workouts || [],
              };

              console.log('🧠 Synced Apple Health:', summary);
              callback(summary);

              // Optional: auto-send to NAO backend
              fetch('https://nao-v2.onrender.com/api/sync-apple', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletId, healthSummary: summary }),
              })
                .then((res) => res.json())
                .then((data) => console.log('✅ Synced to backend:', data))
                .catch((err) => console.error('❌ Backend sync failed:', err));
            });
          });
        });
      });
    });
  });
}
