import React from 'react';
import { StyleSheet, Text, TouchableHighlight} from 'react-native';

export default function ListItem({el, navigation}) {
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Page', {text: el.text, index: el.index})}>
        <Text style={styles.text}>{el.text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  text:{
    color: 'blue',
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#eee',
    borderWidth: 1,
    marginTop: 5,
    marginLeft:'20%',
    width:'60%'
  }
});