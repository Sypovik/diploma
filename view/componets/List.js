import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, FlatList, Text, Button, TouchableHighlight } from 'react-native';
import data from '../data/koktels.json';
// const fs = require('fs');


export default function List({ navigation }) {

    const [listOfItems, setListOfItems] = useState(data);
    const [search, setSearch] = useState("");

    const onChangeText = () => {
        console.log(search);
        setListOfItems(data.filter(item => item.name.includes(search)));
    }


    return (
        <View style={{ flex: 1 }}>
            <TextInput
                // style={styles.input}
                onChangeText={setSearch}
                placeholder='Название коктейля'

                value={search}
            />
            <Button title='Поиск' onPress={onChangeText}/>
            <View>
                <TextInput
                    placeholder='Название коктейля'
                />
            </View>
            <FlatList
                data={listOfItems}

                renderItem={({ item }) =>
                    <View style={styles.text}>
                        <TouchableHighlight onPress={() => navigation.navigate('Page', { name: item.name, index: item.id, ingredients: item.ingredients, description: item.description })}>
                            <Text >{item.name}</Text>
                        </TouchableHighlight>

                    </View>
                }
            />

        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        color: 'blue',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#eee',
        borderWidth: 1,
        marginTop: 5,
        marginLeft: '20%',
        width: '60%',
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: 'red',
    }
});