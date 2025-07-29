import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#A2CFEC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepIndex: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077B6',
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});

export default function CameraStepsScreen() {
  const router = useRouter();
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula requisição ao backend para obter os passos
    const fetchSteps = async () => {
      try {
        // Substitua por sua chamada real ao backend se necessário
        const response = await fetch('http://192.168.0.154:5050/steps');
        const data = await response.json();
        setSteps(data.steps || []);
      } catch (error) {
        // Exemplo de passos caso o backend não responda
        setSteps([
          '1. Posicione o cubo com a face branca para cima',
          '2. Gire a face direita para cima',
          '3. Gire a face frontal para a esquerda',
          '4. Gire a face superior para trás',
          '5. Finalize com a face inferior para frente',
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passos para resolver o cubo</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00f" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={steps}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.stepItem}>
              <Text style={styles.stepIndex}>{index + 1}.</Text>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}
