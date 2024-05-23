
import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {View, FlatList, Button, TouchableOpacity} from 'react-native';

import Header from './header';
import ListItem from './listItem';
import Form from './form_tresh';

export default function List_tresh({navigation}) {

    const [listOfItems, setListOfItems] = useState([
        { text: 'Milk', index: '1' },
        { text: 'Eggs', index: '2' },
        { text: 'Bread', index: '3' },
        { text: 'Juice', index: '4' },
        { text: 'Coffee', index: '5' },
        { text: 'Tea', index: '6' },
    ]);

    const loadScene = () => {
        navigation.navigate('Page');
    };

    const addHandler = (text) => {
        setListOfItems([{ text: text, index: (listOfItems.length + 1).toString() }, ...listOfItems])
    }

    return (
        <View style={{flex: 1}}>
            <Header />
            <Button title='Load Page' onPress={loadScene} />
            <Form addHandler={addHandler} />
            <FlatList
                data={listOfItems}
                renderItem={({ item }) => <ListItem el={item} navigation={navigation}/>}
            />
        </View>
    );
}