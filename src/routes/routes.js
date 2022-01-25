import React, { useEffect } from 'react';

//third party
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//state
import { useAuth } from '../zustand/state';

//routes
import { routesAuth } from './routes.auth';
import { routesApp } from './routes.app';
import { OnLoadingScreen } from '../screens';

//
const Stack = createNativeStackNavigator();

//
export default function Routes(){

    const { token, isLoad, setSignIn } = useAuth();

    const checkToken = async () => {
        await setSignIn();
    }

    useEffect(() => {
        checkToken();
    },[])

    return(
       <NavigationContainer>
           <Stack.Navigator>
               {(token) ? (
                   routesApp.map(e => (
                       <Stack.Screen 
                            key={e?.id}
                            name={e?.name}
                            component={e?.component}
                            options={{ headerShown: e?.id === 0 ? false : true }}
                       />
                   ))
               ) : isLoad ? (
                    <Stack.Screen 
                        name="OnLoading"
                        component={OnLoadingScreen}
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
               )}
           </Stack.Navigator>
       </NavigationContainer>
    )

}