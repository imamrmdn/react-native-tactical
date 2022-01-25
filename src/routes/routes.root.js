import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CustomDrawer } from '../components/custom_drawer/custom_drawer';
import { colorScheme } from '../components/theme/theme';

import { routesApp } from './routes.app';

const Drawer = createDrawerNavigator();

//
export function Root(){
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{drawerActiveBackgroundColor: colorScheme.green}}
        >
            {(routesApp.map(v => (
                <Drawer.Screen
                    key={v.id} 
                    name={v.name}
                    component={v.component}
                    options={{
                        title: v.title,
                        drawerIcon: ({size,color}) => <Icon name={v.icon} size={size} color={color} />
                    }}
                />
            )))}
        </Drawer.Navigator> 
    )
}
