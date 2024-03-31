import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import Form from './Form'



export default function AddItem({ navigation }) {


    return (
        <View style={styles.main}>
            <Form />
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

