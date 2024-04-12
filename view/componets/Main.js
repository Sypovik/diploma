import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';



export default function Main({navigation}) {


    return (
        <View style={styles.main}>
            <View style={styles.button}><Button title='Добавить' onPress={() => navigation.navigate('AddItem')}/></View>
            <View style={styles.button}><Button title='Показать' onPress={() => navigation.navigate('List')}/></View>
            <View style={styles.button}><Button title='Recognition' onPress={() => navigation.navigate('Recognition')}/></View>
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

