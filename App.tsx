import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { syncAppleHealth } from './app/HealthSync';

const { width, height } = Dimensions.get("window");

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data,    setData]    = useState<any | null>(null);

  const handleSync = () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Health only works on iOS');
      return;
    }
    setLoading(true);

    syncAppleHealth('demo-wallet', (summary, error) => {
      setLoading(false);
      if (error || !summary) {
        Alert.alert('Sync failed', String(error));
        return;
      }
      setData(summary);
      Alert.alert('✅ Apple Health synced!');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fullscreen NAO image */}
      <Image
        source={require('./assets/images/nao-model.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={2}
      />

      {/* Overlay for content */}
      <View style={styles.overlay}>
        <Pressable
          style={({ pressed }) => [
            styles.activateButton,
            pressed && { opacity: 0.8 },
            loading && { opacity: 0.5 }
          ]}
          onPress={handleSync}
          disabled={loading}
        >
          <Text style={styles.activateText}>
            {loading ? 'ACTIVATING…' : data ? 'ACTIVATED ✅' : 'ACTIVATE NOW'}
          </Text>
        </Pressable>

        {loading && <ActivityIndicator style={{ marginTop: 18 }} color="#0FF" />}
        {data && (
          <View style={styles.results}>
            <Text style={styles.result}>Calories   {data.calories}</Text>
            <Text style={styles.result}>Steps      {data.steps}</Text>
            <Text style={styles.result}>VO₂ Max    {data.vo2Max}</Text>
            <Text style={styles.result}>Heart Rate {data.heartRate}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    zIndex: 2,
  },
  activateButton: {
    width: '80%',
    backgroundColor: 'rgba(0,255,255,0.85)',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: "#0ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  activateText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  results: {
    marginTop: 14,
    backgroundColor: 'rgba(0,0,0,0.72)',
    padding: 14,
    borderRadius: 10,
    width: '85%',
  },
  result: {
    color: '#0ff',
    fontSize: 16,
    marginVertical: 2,
    fontWeight: '500',
  },
});
