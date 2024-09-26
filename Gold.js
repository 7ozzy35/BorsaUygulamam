import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const GoldPriceTracker = () => {
    const [goldTypes, setGoldTypes] = useState([]);
    const [selectedGold, setSelectedGold] = useState('XAU/USD');
    const [goldPrice, setGoldPrice] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchGoldTypes = () => {
        return [
            { label: '24K Altın', value: 'XAU/USD' },
            { label: '22K Altın', value: 'XAU/22K' },
            { label: '18K Altın', value: 'XAU/18K' },
        ];
    };

    useEffect(() => {
        setGoldTypes(fetchGoldTypes());
    }, []);

    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${selectedGold}&token=YOUR_API_KEY`);
                setGoldPrice(response.data);
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchGoldPrice();
    }, [selectedGold]);

    const selectGold = (value) => {
        setSelectedGold(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Altın Fiyatları</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Altın Seçin</Text>
            </TouchableOpacity>
            <Text style={styles.selectedGold}>
                Seçilen Altın: {selectedGold}
            </Text>
            {goldPrice && (
                <Text style={styles.price}>
                    Güncel Fiyat: ${goldPrice.c}
                </Text>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={goldTypes}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectGold(item.value)} style={styles.option}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                            <Text style={styles.buttonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 20 },
    selectedGold: { fontSize: 18, color: '#ffffff', marginTop: 20 },
    price: { fontSize: 18, color: '#ffffff', marginTop: 20 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: '80%', backgroundColor: '#2a2a2a', borderRadius: 10, padding: 20 },
    option: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    optionText: { fontSize: 18, color: '#ffffff' },
    button: { backgroundColor: '#4caf50', padding: 10, borderRadius: 5, marginTop: 20 },
    buttonText: { color: '#ffffff', fontSize: 18, textAlign: 'center' },
});

export default GoldPriceTracker;
