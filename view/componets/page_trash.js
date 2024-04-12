
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Page({route, navigation}) {

    const loadScene = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.page}>
            <Button  title='Go Back' onPress={loadScene}/>
            <Text style={styles.text}>{route.params.text}</Text>
        </View>
    );


}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems : 'center',
        justifyContent: 'space-evenly',
    },
    text:{
        fontSize: 30
    }
});