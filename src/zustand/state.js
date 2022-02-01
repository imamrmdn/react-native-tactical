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
    dataMateri: [],

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
 
    errorSignUp: false,
    isLoadingSignUp: false,
    colorMessage: 'red',
    setColorMessage: () => set({ colorMessage: 'red' }),
    setIsLoadingSignUp: () => set({ isLoadingSignUp: false }),
    setErrorSignUp: () => set({ errorSignUp: false }),
   
    fetchAuthSignUp: async (nama, email, noTelp, password) => {

        let succesSignUp = false;

        set({ isLoadingSignUp: true });

        if(nama.length <= 0){ //<-- validation if username null
            set({ errorMessage: text.errorSignUpUsername })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 50)
            succesSignUp = false;
            return succesSignUp;
        }else if(email.length <= 0){ //<-- validation if email null
            set({ errorMessage: text.errorSignUpEmail })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else if(noTelp.length <= 10){ //<-- validation if phone number <= 10
            set({ errorMessage: text.errorSignUpNoTelp })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else if(password.length <= 0){ //<-- validation if password null
            set({ errorMessage: text.errorSignUpPassword })
            setTimeout(() => {
                set({ errorSignUp: true })
            }, 150)
            succesSignUp = false;
            return succesSignUp;
        }else{

            const objectPayload = { //<-- request payload to backend/server
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    namePodcast: nama,
                    email: email,
                    password: password,
                }),
            }

            const response = await fetch(`${baseURL}/user/auth/register`, objectPayload); 
            const data = await response.json(); //<-- parse response to .json()

            if(data){ //<-- validation if response data true

                const status = data?.status; //<-- response status

                if(status){ //<-- validation if status true
                  
                    set({ errorMessage: text.succesSignUpMessage })
                    setTimeout(() => {
                        set({ errorSignUp: true, colorMessage: 'green' })
                    }, 50)
                    succesSignUp = true;

                    return succesSignUp;
                }

                if(!status){ //<-- validation if status false

                    const error = data?.error; //<-- response error
                    const usr = error.replaceAll('\"namePodcast\"', 'Username') //<-- replace response

                    usr ? set({ errorMessage: `${usr} !` }) : set({ errorMessage: `${error} !` }) //<-- cek response error

                    setTimeout(() => {
                        set({ errorSignUp: true })
                    }, 100)
                    succesSignUp = false;

                    return succesSignUp;
                }

            }else{ //<-- validation if response data false
                set({ errorMessage: text.errorSignUpServer })
                setTimeout(() => {
                    set({ errorSignUp: true })
                }, 150)
            }   
        }
    },

    fetchDataMateri: async () => {

        const autToken = get().token;
       
        await api.get('/podcast/yourPodcast', {
            headers: {
                'auth-token': autToken
            }
        }).then(resp => {

            if(resp){
                const dataMateri = resp?.data?.podcast;
                set({ dataMateri })
            }

        }).catch(err => {
            console.log('err', err)
        })  
    },

    uploadMateri: async (
        title, description, audioPath, imgPath
    ) => {

        const formData = new FormData();

    }
}))