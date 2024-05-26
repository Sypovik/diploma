import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { getDBConnection, CreateDefaultDB } from '../db/dbService';


export default function Main({ navigation }) {

    // useEffect(() => {
    //     // Usage Example
    //     const initializeDatabase = async () => {
    //         const db = await getDBConnection();
    //         await CreateDefaultDB(db);
    //         // await getAllCocktails(db); // Display all cocktails
    //         // await closeDatabase(db);
    //     };

    //     initializeDatabase();
    // }, []);

    return (
        <View style={styles.main}>
            <View style={styles.button}><Button title='Добавить' onPress={() => navigation.navigate('AddItem')} /></View>
            <View style={styles.button}><Button title='Показать' onPress={() => navigation.navigate('List', {Mode: "review"})} /></View>
            <View style={styles.button}><Button title='BD test' onPress={() => navigation.navigate('DB_test')} /></View>
            <View style={styles.button}><Button title='Home' onPress={() => navigation.navigate('List', {Mode: "edit"})} /></View>
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

