import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.main}>
        <Text style={styles.text}>Список дел</Text>

    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        height: 70,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
        fontSize: 24,
        color: 'white',
    }
});