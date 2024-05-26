import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function form({addHandler}) {

    const [text, setText] = useState('');

    const onChange = (text) => {
        setText(text);
    }

  return (
    <View style={styles.main}>
        <Text style={styles.text}>Название коктейля</Text>
        <TextInput style={styles.input} onChangeText={onChange} placeholder='Название коктейля'/>
        <Button title='Добавить' onPress={() => addHandler(text)}/>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10,
        width: '60%',  
    }
});