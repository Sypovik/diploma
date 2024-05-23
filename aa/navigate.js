import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import List from './componets/List';
import Page from './componets/Page';
import Main from './componets/Main';
import DB_test from './componets/DB_test';
import EditCocktail from './componets/EditCocktail';
import { Text } from 'react-native';
import Search from './componets/Search';

const Stack = createStackNavigator();



export default function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Page" component={Page} />
                <Stack.Screen name="DB_test" component={DB_test} />
                <Stack.Screen name="EditCocktail" component={EditCocktail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}