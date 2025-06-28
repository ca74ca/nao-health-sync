import AppleHealthKit, {
    HealthInputOptions,
    HealthKitPermissions,
} from 'react-native-health';

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

    AppleHealthKit.getStepCount(options, (err, steps) => {
      if (err || !steps) return console.error("Step error:", err);

      AppleHealthKit.getActiveEnergyBurned(options, (err, energy) => {
        if (err || !energy) return console.error("Energy error:", err);

        AppleHealthKit.getVo2MaxSamples(options, (err, vo2) => {
          if (err) console.error("VO2 Max error:", err);

          AppleHealthKit.getHeartRateSamples(options, (err, hr) => {
            if (err) console.error("Heart rate error:", err);

            AppleHealthKit.getSamples(options, (err, workouts) => {
              if (err) console.error("Workout error:", err);

              // Callback with all collected data
              callback({
                steps,
                energy,
                vo2,
                heartRate: hr,
                workouts,
              });
            });
          });
        });
      });
    });
  });
}

