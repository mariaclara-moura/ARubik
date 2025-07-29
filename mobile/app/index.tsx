import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          setModalVisible(true);
          try {
            const response = await fetch('http://192.168.0.154:5050/solve-cube', {
              method: 'POST',
            });

            const data = await response.text();
            console.log('✅ Resposta do servidor:', data);

            // Depois da requisição, pode navegar pra tela da câmera
          } catch (error) {
            console.error('❌ Erro ao tentar iniciar Qbr:', error);
          } finally {
            setTimeout(() => {
              setModalVisible(false);
              router.push('/camera');
            }, 2000);
          }
        }}
      >
        <Text style={styles.buttonText}>Abrir câmera</Text>
        <Ionicons name="camera" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>A câmera está rodando no computador...</Text>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
