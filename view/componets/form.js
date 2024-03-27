import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function Form({addHandler}) {

    const [text, setText] = useState('');

    const onChange = (text) => {
        setText(text);
    }

  return (
    <View style={styles.main}>
        <TextInput style={styles.input} onChangeText={onChange} placeholder='Enter text'/>
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