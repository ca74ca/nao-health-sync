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
    write: [] as HealthPermission[],          // required (can stay empty)
  },
};

export type HealthSummary = {
  calories:  number;
  steps:     number;
  vo2Max:    number | null;
  heartRate: number | null;
  workouts:  any[];          // empty for now
};

/** 1️⃣  Sync Apple Health and (optionally) push to NAO backend */
export function syncAppleHealth(
  walletId: string,
  callback: (data: HealthSummary | null, error?: any) => void
) {
  AppleHealthKit.initHealthKit(permissions, (err: string | null) => {
    if (err) {
      console.error('❌ Error initializing HealthKit:', err);
      callback(null, err);
      return;
    }

    const options: HealthInputOptions = {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), // midnight today
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, energy) => {
      if (err) return callback(null, err);

      AppleHealthKit.getStepCount(options, (err, steps) => {
        if (err) return callback(null, err);

        AppleHealthKit.getVo2MaxSamples(options, (err, vo2max) => {
          if (err) return callback(null, err);

          AppleHealthKit.getHeartRateSamples(options, (err, heartRate) => {
            if (err) return callback(null, err);

            // ‼️ NO getWorkoutSamples in current library version
            const summary: HealthSummary = {
              calories:  energy?.value          ?? 0,
              steps:     steps?.value           ?? 0,
              vo2Max:    vo2max?.[0]?.value     ?? null,
              heartRate: heartRate?.[0]?.value  ?? null,
              workouts:  [],                    // fill later if you add routes
            };

            console.log('🧠 Synced Apple Health:', summary);
            callback(summary);

            // Auto-push to NAO backend
            fetch('https://nao-v2.onrender.com/api/sync-apple', {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify({ walletId, healthSummary: summary }),
            })
              .then((r) => r.json())
              .then((d) => console.log('✅ Synced to backend:', d))
              .catch((e) => console.error('❌ Backend sync failed:', e));
          });
        });
      });
    });
  });
}

/** 2️⃣  A helper to prompt Health-kit permissions only */
export function requestHealthPermissions(
  callback: (granted: boolean, error?: string) => void
) {
  AppleHealthKit.initHealthKit(permissions, (err: string | null) => {
    if (err) {
      console.error('❌ HealthKit permissions error:', err);
      callback(false, err);
      return;
    }
    console.log('✅ HealthKit permissions granted');
    callback(true);
  });
}
