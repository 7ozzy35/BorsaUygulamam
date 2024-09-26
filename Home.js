import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { API_KEY } from './config';

const Home = ({ navigation }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async () => {
    try {
      const symbols = ['BIST:DOAS', 'BIST:THYAO', 'BIST:GARAN', 'BIST:AKBNK', 'BIST:EREGL', 'BIST:KCHOL', 'BIST:ASELS', 'BIST:TUPRS', 'BIST:SISE', 'BIST:BIMAS'];
      const stockPromises = symbols.map(symbol => 
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
      );
      const responses = await Promise.all(stockPromises);
      const stockData = responses.map((response, index) => ({
        id: index.toString(),
        symbol: symbols[index].split(':')[1],
        price: response.data.c ?? 'Veri Yok',
        change: response.data.d ?? 'Veri Yok',
        percentChange: response.data.dp ?? 'Veri Yok'
      }));
      setStocks(stockData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.price}>{item.price} TL</Text>
      <Text style={[styles.change, item.change >= 0 ? styles.positive : styles.negative]}>
        {item.change > 0 ? '+' : ''}{item.change} ({item.percentChange}%)
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hisse Senetleri</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StockList')}>
          <Image source={require('./assets/plus.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={stocks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1e1e1e' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  list: { flex: 1 },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, padding: 20, backgroundColor: '#2a2a2a', borderRadius: 10 },
  symbol: { fontSize: 22, fontWeight: 'bold', width: '30%', color: '#ffffff' },
  price: { fontSize: 20, width: '30%', textAlign: 'right', color: '#ffffff' },
  change: { fontSize: 20, width: '40%', textAlign: 'right' },
  positive: { color: '#4caf50' },
  negative: { color: '#f44336' },
  addIcon: { width: 30, height: 30 }
});

export default Home;
