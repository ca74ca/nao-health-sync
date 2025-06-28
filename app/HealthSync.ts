import AppleHealthKit, { HealthInputOptions, HealthKitPermissions } from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.Vo2Max,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
  },
};

export async function syncAppleHealth(callback: (data: any) => void) {
  AppleHealthKit.initHealthKit(permissions, (err: Object) => {
    if (err) {
      console.error("❌ Error initializing HealthKit:", err);
      return;
    }

    const options: HealthInputOptions = {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), // Today 12AM
    };

    AppleHealthKit.getActiveEnergyBurned(options, (err, energy) => {
      AppleHealthKit.getStepCount(options, (err, steps) => {
        AppleHealthKit.getVo2MaxSamples(options, (err, vo2max) => {
          AppleHealthKit.getHeartRateSamples(options, (err, heartRate) => {
            AppleHealthKit.getWorkoutSamples(options, (err, workouts) => {
              const summary = {
                calories: energy?.value || 0,
                steps: steps?.value || 0,
                vo2Max: vo2max?.[0]?.value || null,
                heartRate: heartRate?.[0]?.value || null,
                workouts: workouts || [],
              };
              console.log("🧠 Synced Apple Health:", summary);
              callback(summary);
            });
          });
        });
      });
    });
  });
}
