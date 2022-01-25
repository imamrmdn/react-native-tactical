/**
 * Zustand State Management
 * AsyncStorage
 */

import create from 'zustand'; 
import text from '../../text.json';
import { api, baseURL } from '../settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

//
export const useAuth = create((set, get) => ({
    response: {},
    isLoadingSignIn: false,
    isLoadingSignOut: false,
    setError: false,
    token: null,
    isLoad: true,
    errorMessage: '',
    setErrorSignIn: () => set({ setError: false }),
    setIsLoadingSignIn: () => set({ isLoadingSignIn: false }),
    disabled: false,
    fetchAuthSignIn: async (email, password) => {
       
        set({ isLoadingSignIn: true });

        if(email.length <= 0 || password.length <= 0){  //<-- validation if email null or password null
            
            set({ errorMessage: text.errorSignInEmpty })
            setTimeout(() => {
                set({ setError: true })
            }, 200)

        }else{
            //
            await api.post('/user/auth/login', {
                    email, password
                }).then(async(resp) => {
            
                    await AsyncStorage.setItem('token', resp?.data?.token); //<-- save token to local storage

                    const data = JSON.stringify(resp?.data); //<-- parse to object
                    await AsyncStorage.setItem('data', data); //<-- save response object to local storage
        
                    set({ isLoadingSignIn: false });

                    const token = await AsyncStorage.getItem('token'); //<-- get token when user sign in
                    set({ token });
                    set({ isLoad: false});

                }).catch(_ => { //<-- set error message if email or password wrong
                    //
                    set({ errorMessage: text.errorSignIn })
                    setTimeout(() => {
                        set({ setError: true })
                    }, 100)

                })
        }
    },
    setData: async () => {
        const response = await AsyncStorage.getItem('data') //<-- get response data user
        const data = JSON.parse(response); //<-- parse response
        set({ response: data });
    },
    setSignIn:  async () => {
        const token = await AsyncStorage.getItem('token'); //<-- get user token
        set({ token });
        set({ isLoad: false});
    },
    setSignOut: async () => {
        await AsyncStorage.removeItem('token'); //<-- remove user token
        await AsyncStorage.removeItem('data'); //<-- remove response data user
        set({ token: null });
        set({ response: {} });
    },
    // State Regis
    errorSignUp: false,
    isLoadingSignUp: false,
    colorMessage: 'red',
    setColorMessage: () => set({ colorMessage: 'red' }),
    setIsLoadingSignUp: () => set({ isLoadingSignUp: false }),
    setErrorSignUp: () => set({ errorSignUp: false }),
   
    fetchAuthSignUp: async (nama, email, noTelp, password) => {

        let succesSignUp = false;

        set({ isLoadingSignUp: true });

        if(nama.length <= 0){
            set({ errorMessage: 'Username Can Not be Empty!' })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 50)
            succesSignUp = false;
            return succesSignUp;
        }else if(email.length <= 0){
            set({ errorMessage: 'Email Can Not be Empty!' })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else if(noTelp.length <= 10){
            set({ errorMessage: 'Phone Number Must be Valid!' })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else if(password.length <= 0){
            set({ errorMessage: 'Password Can Not be Empty!' })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else{

            const objectPayload = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    namePodcast: nama,
                    email: email,
                    password: password,
                }),
            }

            const response = await fetch(`${baseURL}/user/auth/register`, objectPayload);

            const data = await response.json();
            console.log('response:', data);

            if(data){
                const status = data?.status;

                if(status){
                  
                    set({ errorMessage: 'Succes Register Account! Please Wait ...' })

                    setTimeout(() => {
                        set({ errorSignUp: true, colorMessage: 'green' })
                    }, 50)

                    succesSignUp = true;
                    return succesSignUp;
                }

                if(!status){

                    const error = data?.error;
                    const usr = error.replaceAll('\"namePodcast\"', 'Username')

                    console.log('error:', usr ? usr : error)

                    usr ? set({ errorMessage: `${usr} !` }) : set({ errorMessage: `${error} !` })

                    setTimeout(() => {
                        set({ errorSignUp: true })
                    }, 100)

                    succesSignUp = false;
                    return succesSignUp;
                }
            

            }else{
                set({ errorMessage: 'Something Error From Server!' })
                setTimeout(() => {
                    set({ errorSignUp: true })
                }, 150)
            }
            
        }
        
        
    }
}))