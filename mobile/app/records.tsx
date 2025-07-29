import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const data = [
  { id: '1', date: '20/03/2025', time: '00:59:35', moves: 30 },
  { id: '2', date: '20/03/2025', time: '00:59:35', moves: 30 },
  { id: '3', date: '20/03/2025', time: '00:59:35', moves: 30 },
];

export default function RegistrosScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Registros</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.record}>
            <Image
              source={require('../assets/images/cube.png')}
              style={styles.cube}
            />
            <View>
              <Text>{item.date}</Text>
              <Text>{item.time}</Text>
              <Text>{item.moves} movimentos</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 258,
    height: 141,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'medium',
    backgroundColor: '#606060',
    color: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  record: {
    flexDirection: 'row',
    backgroundColor: '#A2CFEC',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  cube: {
    width: 113,
    height: 113,
    marginRight: 20,
  },
});
