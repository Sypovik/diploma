import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'KoktelsDB',
    location: 'default',
  },
  () => { console.log('Database opened') },
  error => { console.log('Error: ', error) }
);

const HomeScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Cocktails', [], (tx, results) => {
        const cocktailsArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          cocktailsArray.push(results.rows.item(i));
        }
        setCocktails(cocktailsArray);
      });
    });
  };

  return (
    <View>
      <Text>Cocktails</Text>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditCocktail', { cocktailId: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
