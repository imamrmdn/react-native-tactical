import React, { useEffect } from 'react';

//third party
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from "@react-native-community/netinfo";

//state
import { useAuth } from '../zustand/state';

//routes
import { routesAuth } from './routes.auth';
import { routesApp } from './routes.app';
import { NetworkConnection, OnLoadingScreen } from '../screens';

//
const Stack = createNativeStackNavigator();

//
export default function Routes(){

    const { token, isLoad, setSignIn } = useAuth();

    const netInfo = useNetInfo();

    const checkToken = async () => {
        await setSignIn();
    }

    console.log('Connection Internet?', netInfo.isInternetReachable);

    useEffect(() => {
        checkToken();
    },[])

    return(
       <NavigationContainer>
           <Stack.Navigator>
               {(token) ? (

                   (!netInfo.isInternetReachable) ? (
                        <Stack.Screen 
                            name="NetworkConnection"
                            component={NetworkConnection}
                            options={{ headerShown: false }}
                        />
                   ) : (
                       routesApp.map(e => (
                            <Stack.Screen 
                                    key={e?.id}
                                    name={e?.name}
                                    component={e?.component}
                                    options={{ headerShown: e?.id === 0 ? false : true }}
                            />
                        ))
                   )

               ) : isLoad ? (
                    <Stack.Screen 
                        name="OnLoading"
                        component={OnLoadingScreen}
                        options={{ headerShown: false }}
                    />
               ) : (

                    (!netInfo.isInternetReachable) ? (
                        <Stack.Screen 
                            name="NetworkConnection"
                            component={NetworkConnection}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        routesAuth.map(v => (
                            <Stack.Screen 
                                key={v?.id}
                                name={v?.name}
                                component={v?.component}
                                options={{ headerShown: false }}
                            />
                        ))
                    )
               )}
           </Stack.Navigator>
       </NavigationContainer>
    )

}