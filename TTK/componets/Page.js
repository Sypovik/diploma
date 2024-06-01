import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, LogBox } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Search from './Search';
import { openDatabaseKocktails } from '../db/dbService';

const db = openDatabaseKocktails();

export default function Page({ route, navigation }) {
    const { cocktailId } = route.params;
    const [cocktail, setCocktail] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    console.log('cocktailId:', cocktailId);
    console.log('route.params:', route.params);
    useEffect(() => {
        fetchCocktail();
    }, [cocktailId]); // Добавляем cocktailId в зависимости useEffect

    const fetchCocktail = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Cocktails WHERE id = ?', [cocktailId], (tx, results) => {
                if (results.rows.length > 0) {
                    const row = results.rows.item(0);
                    setCocktail(row);
                }
            });

            tx.executeSql('SELECT * FROM Ingredients WHERE cocktail_id = ?', [cocktailId], (tx, results) => {
                const ingredientsArray = [];
                for (let i = 0; i < results.rows.length; i++) {
                    ingredientsArray.push(results.rows.item(i));
                }
                setCocktail(prev => ({ ...prev, ingredients: ingredientsArray }));
                setLoading(false);
            });
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Search setSearch={setSearch} searchButton={false} handleSpeechEnd={(searchText) => {
                    console.log('Speech ended with text:', searchText);
                    filterList(searchText);
                }} />
            ),
        });
    }, [navigation]);

    const filterList = (text) => {
        setLoading(true);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Cocktails WHERE name LIKE ?', [`%${text}%`], (tx, results) => {
                const filteredItems = [];
                for (let i = 0; i < results.rows.length; i++) {
                    const row = results.rows.item(i);
                    filteredItems.push(row);
                }
                console.log("filteredItems.length:", filteredItems.length);
                if (filteredItems.length === 2) {
                    console.log("filteredItems[0].id:", filteredItems[0].id);
                    console.log("filteredItems[0].name:", filteredItems[0].name);
                    navigation.navigate('Page', { cocktailId: filteredItems[0].id });
                }
                setLoading(false);
            });
        });
    };

    const renderHeader = () => (
        <View>
            <Text style={styles.title}>{cocktail.name}</Text>
            <Text style={styles.subtitle}>Ингредиенты:</Text>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{cocktail.description}</Text>
        </View>
    );

    if (isLoading || !cocktail) {
        return <ActivityIndicator size="large" color="black" style={styles.loadingIndicator} />;
    }

    return (
        <FlatList
            ListHeaderComponent={renderHeader}
            data={cocktail.ingredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.ingredientContainer}>
                    <Text style={styles.ingredient}>{item.name}</Text>
                    <Text style={styles.amount}>{item.amt}</Text>
                </View>
            )}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.flatListContent}
        />
    );
}

const styles = StyleSheet.create({
    flatListContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    ingredient: {
        fontSize: 18,
    },
    amount: {
        fontSize: 18,
        color: '#666',
    },
    descriptionContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f8f8f8',
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});
