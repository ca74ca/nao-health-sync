import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { syncAppleHealth } from '../HealthSync';

export default function HealthScreen() {
  const [loading, setLoading]   = useState(false);
  const [data,    setData]      = useState<any | null>(null);

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
      Alert.alert('✅  Apple Health synced!');
    });
  };

  return (
    <View style={styles.container}>
      {/* NAO avatar */}
      <Image
        source={require('../../assets/images/nao-model.png')}
        style={styles.avatar}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome, I’m NAO 👋</Text>
      <Text style={styles.subtitle}>Tap below to sync your Apple Health</Text>

      <View style={{ marginTop: 24, width: '70%' }}>
        <Button
          title={loading ? 'Syncing…' : data ? 'Synced ✅' : 'Sync Apple Health'}
          color="#0A84FF"
          onPress={handleSync}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 16 }} color="#0A84FF" />}

      {data && (
        <View style={styles.results}>
          <Text style={styles.result}>Calories  {data.calories}</Text>
          <Text style={styles.result}>Steps     {data.steps}</Text>
          <Text style={styles.result}>VO2 Max   {data.vo2Max}</Text>
          <Text style={styles.result}>HR        {data.heartRate}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 220,
    height: 220,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    color: '#bbb',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 6,
  },
  results: {
    marginTop: 26,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 10,
    width: '100%',
  },
  result: {
    color: '#0ff',
    fontSize: 14,
    marginVertical: 2,
  },
});
