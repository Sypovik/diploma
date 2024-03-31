import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import List from './componets/list';
// import Page from './componets/page';
import Main from './componets/Main';
import AddItem from './componets/AddItem';

const Stack = createStackNavigator();


export default function Navigate() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="AddItem" component={AddItem} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}