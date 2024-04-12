import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import List from './componets/List';
import Page from './componets/Page';
import Main from './componets/Main';
import AddItem from './componets/AddItem';
import Recognition from './componets/Recognition';

const Stack = createStackNavigator();


export default function Navigate() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="AddItem" component={AddItem} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Page" component={Page} />
                <Stack.Screen name="Recognition" component={Recognition} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}