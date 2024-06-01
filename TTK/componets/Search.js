import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Voice from '@react-native-community/voice';

export default function Search({ setSearch, handleSpeechEnd, searchButton = true }) {
    const [isLoading, setLoading] = useState(false);

    const startListening = () => {
        setLoading(true);
        Voice.start('ru-RU');
    };

    const stopListening = () => {
        setLoading(false);
        Voice.stop();
    };

    const _onSpeechStart = () => {
        setSearch('');
    };

    const _onSpeechEnd = () => {
        setLoading(false);
        handleSpeechEnd();
    };

    const _onSpeechResults = (e) => {
        setSearch(e.value[0]);
        console.log(e.value[0]);
        setLoading(false);
        handleSpeechEnd(e.value[0]);
    };

    const _onSpeechError = (event) => {
        console.log(event.error);
        setLoading(false);
    };

    useEffect(() => {
        Voice.onSpeechStart = _onSpeechStart;
        Voice.onSpeechEnd = _onSpeechEnd;
        Voice.onSpeechResults = _onSpeechResults;
        Voice.onSpeechError = _onSpeechError;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const buttonWidth = searchButton ? "48%" : "97%";

    return (
        <View style={styles.search}>
            {isLoading ? (
                <ActivityIndicator size="large" color="black" style={styles.loadingIndicator} />
            ) : (
                <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={startListening}>
                    <Text style={styles.buttonText}>🎙</Text>
                </TouchableOpacity>
            )}
            {isLoading ? (
                <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={stopListening}>
                    <Text style={styles.buttonText}>Стоп</Text>
                </TouchableOpacity>
            ) : (

                searchButton
                    ? (
                        <TouchableOpacity style={[styles.button, styles.searchButton]} onPress={() => handleSpeechEnd()}>
                            <Text style={styles.buttonText}>Поиск</Text>
                        </TouchableOpacity>)
                    : (<></>)

            )}
        </View >
    );
}
const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        width: "48%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#5bc0de', // Default background color
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    loadingIndicator: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopButton: {
        width: "68%",
        backgroundColor: '#d9534f',
    },
    searchButton: {
        backgroundColor: '#5bc0de',
    },
});
