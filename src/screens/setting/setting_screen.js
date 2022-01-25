import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserScreen } from './tabs/user_screen';
import { CreatorScreen } from './tabs/creator_screen';

const Tab = createMaterialTopTabNavigator();

export function SettingScreen(){

    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Creator" 
                component={CreatorScreen} 
                options={{
                    tabBarIndicatorStyle: { backgroundColor: 'green'}
                }}
            />
            <Tab.Screen 
                name="User" 
                component={UserScreen} 
                options={{
                    tabBarIndicatorStyle: { backgroundColor: 'green'}
                }}
            />
        </Tab.Navigator>
        
    )
}

