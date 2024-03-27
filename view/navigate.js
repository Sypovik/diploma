import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import List from './componets/list';
import Page from './componets/page';

const Stack = createStackNavigator();


export default function Navigate() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Page" component={Page} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}