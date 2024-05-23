import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Search from './Search';
import { openDatabaseKocktails } from '../db/dbService';

const db = openDatabaseKocktails();

export default function List({ route, navigation }) {
    const { Mode } = route.params;
    const [listOfItems, setListOfItems] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Cocktails', [], (tx, results) => {
                const items = [];
                for (let i = 0; i < results.rows.length; i++) {
                    const row = results.rows.item(i);
                    items.push(row);
                }
                setListOfItems(items);
                setLoading(false);
            });
        });
    };

    const filterList = (text) => {
        setLoading(true);
        setSearch(text);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Cocktails WHERE name LIKE ?', [`%${text}%`], (tx, results) => {
                const filteredItems = [];
                for (let i = 0; i < results.rows.length; i++) {
                    const row = results.rows.item(i);
                    filteredItems.push(row);
                }
                setListOfItems(filteredItems);
                setLoading(false);
            });
        });
    };

    const navigateToPage = (item, mode) => {
        if (mode === "edit") navigation.navigate('EditCocktail', { cocktailId: item.id });
        if (mode === "review") navigation.navigate('Page', { cocktailId: item.id });
    };

    const deleteCocktail = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Cocktails WHERE id = ?', [id], (tx, results) => {
                if (results.rowsAffected > 0) {
                    fetchData();
                }
            });
            tx.executeSql('DELETE FROM Ingredients WHERE cocktail_id = ?', [id], (tx, results) => {
                console.log('Deleted Ingredients:', results.rowsAffected);
            });
        });
    };

    const addNewCocktail = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Cocktails (name, description) VALUES (?, ?)',
                ['Новый коктейль', 'Описание нового коктейля'],
                (tx, results) => {
                    if (results.insertId) {
                        navigation.navigate('EditCocktail', { cocktailId: results.insertId });
                    }
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={filterList}
                placeholder='Название коктейля'
                value={search}
            />
            <Search setSearch={setSearch} handleSpeechEnd={filterList} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonClear} onPress={() => filterList("")}>
                    <Text style={styles.buttonText}>Очистить</Text>
                </TouchableOpacity>
                {Mode === "edit" ? <TouchableOpacity style={styles.buttonAdd} onPress={addNewCocktail}>
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>: null}
            </View>
            {isLoading
                ? <ActivityIndicator size="large" color="black" style={styles.loadingIndicator} />
                : <FlatList
                    data={listOfItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.itemContainer}>
                            <TouchableHighlight
                                style={styles.itemTextContainer}
                                onPress={() => navigateToPage(item, Mode)}
                                underlayColor="#ddd"
                            >
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableHighlight>
                            {Mode === "edit" ? <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteCocktail(item.id)}>
                                <Text style={styles.buttonDeleteText}>Удалить</Text>
                            </TouchableOpacity> : null}
                        </View>
                    }
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 10,
        fontSize: 18,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonClear: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#5bc0f0',
    },
    buttonAdd: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#4caf50',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    buttonDelete: {
        backgroundColor: '#ff5252',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    buttonDeleteText: {
        color: '#fff',
        fontSize: 16,
    },
});
