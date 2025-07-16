import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/camera')}
      >
        <Text style={styles.buttonText}>Abrir câmera</Text>
        <Ionicons name="camera" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/records')}
      >
        <Text style={styles.buttonText}>Abrir registros</Text>
        <MaterialIcons name="description" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 307,
    height: 158,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#A2CFEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
