import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const cameraRef = useRef<Camera>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.02;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.overlay}>
        <Text style={styles.text}>Gire seu cubo lentamente!</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ color: '#fff', fontSize: 24 }}>←</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { flex: progress }]} />
          <View style={{ flex: 1 - progress }} />
        </View>
        <Text style={styles.loadingText}>CARREGANDO...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 5,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  progressBarBackground: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    backgroundColor: '#00f',
  },
  loadingText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
