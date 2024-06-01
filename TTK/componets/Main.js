import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { openDatabaseKocktails, clearDatabaseKoktels, createTable, insertData, fetchData, getTableCount } from '../db/dbService';

export default function Main({ navigation }) {

    useEffect(async () => {
        if (await getTableCount() == 1) {
            console.log('Таблица уже существует');
            openDatabaseKocktails();
            createTable();
            insertData();

        };
        fetchData();
        navigation.setOptions({
            headerTitle: 'Главная',
            headerTitleAlign: 'center', // Выровнять название topBar посередине

        });
    }, []);

    useEffect(() => {

        getTableCount();
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.button}><Button title='Посмотреть' onPress={() => navigation.navigate('List', { Mode: "review" })} /></View>
            <View style={styles.button}><Button title='Редактировать' onPress={() => navigation.navigate('List', { Mode: "edit" })} /></View>
            <View style={styles.button}><Button title='удалить бд' onPress={() => {
                clearDatabaseKoktels();
            }} /></View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150,
        // alignItems: 'center',
    },
    button: {
        color: 'red',
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 50,
        marginRight: 50,
    }
});

