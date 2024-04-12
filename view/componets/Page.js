
import React from 'react';
import { View, Text, StyleSheet, Button, FlatList} from 'react-native';

export default function Page({route, navigation}) {

    const loadScene = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.page}>
            <Button  title='Go Back' onPress={loadScene}/>
            <Text style={styles.text}>{route.params.name}</Text>
            <FlatList
                data={route.params.ingredients}
                style={styles.FlatList}
                renderItem={({ item }) =>
                    <View style={styles.ingredients}>
                        <Text style={styles.ingredient}>{item.name}</Text>
                        <Text style={styles.ingredient}>{item.amt}</Text>
                    </View>
                }
            />
            <View style={styles.description}><Text>{route.params.description}</Text></View> 
        </View>
    );


}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems : 'center',
        justifyContent: 'space-between',
        display: 'flex',

    },
    text:{
        fontSize: 30
    },
    ingredients:{
        flex: 1,
        borderBottomWidth: 1,
        width: '90%',
        marginLeft: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    ingredient:{
        // display: 'flex',
        // flexDirection: 'row',
        // marginRight: 5,
        // marginLeft: 5
    },
    description:{
        borderWidth: 1,
        flex: 1,

        
    },
    FlatList:{
        borderWidth: 1,
        flex: 0,
    }
});