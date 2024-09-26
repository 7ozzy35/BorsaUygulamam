import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borsa İstanbul Verileri</Text>
      {/* Hisse verileri burada gösterilecek */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1e1e1e' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
});

export default StockList;
