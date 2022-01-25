import React, { useEffect } from 'react';

//third party
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//state
import { useAuth } from '../zustand/state';

//routes
import { routesAuth } from './routes.auth';
import { Root } from './routes.root';
import { 
    MateriDetailScreen, 
    OnLoadingScreen,
    VideoMateriScreen, 
} from '../screens';

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
                   <>
                        <Stack.Screen 
                            name="Root"
                            component={Root}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name="Materi Detail"
                            component={MateriDetailScreen}
                        />
                        <Stack.Screen 
                            name="Video Detail"
                            component={VideoMateriScreen}
                        />
                   </>
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