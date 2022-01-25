import React, { useState } from 'react';

//component
import { Image, SafeAreaView, StyleSheet, Text, View, Keyboard } from 'react-native';
import { Snackbar, Title } from 'react-native-paper';
import { colorScheme } from '../../components/theme/theme';
import { Input } from '../../components/input/input';
import { Buttons } from '../../components/button/button';

//third party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

//state
import { useAuth } from '../../zustand/state';

//
import text from '../../../text.json';

export function SignInScreen(){

    const { 
      fetchAuthSignIn, setError, 
      setErrorSignIn, isLoadingSignIn, 
      setIsLoadingSignIn, errorMessage
    } = useAuth();

    const navigation = useNavigation();

    //
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');

    const onHandleSignIn = async () => {
      Keyboard.dismiss();
      await fetchAuthSignIn(email, password);
    }

    const onHandleSignUp = () => {
      setEmail('')
      setPassword('')
      navigation.navigate('SignUp')
    }

    const onHandleDismiss = () => {
      setErrorSignIn();
      setIsLoadingSignIn();
    }

    return(
        <>
          {/*  */}
          <SafeAreaView style={styles.container}>
            
            {/* Logo Aplikasi */}
            <View style={styles.centerLogo}>
              <View style={styles.logoContainer} >
                <Image 
                    style={styles.logo}
                    source={require('../../../assets/images/logo.png')}
                />
              </View>
            </View>

            {/* Title */}
            <Title style={styles.title}>{text.app}</Title>

            {/* Email */}
            <Input
              theme={styles.themeInput}
              textContentType="emailAddress"
              keyboardType="email-address"
              //error={error}
              label="Email"
              placeholder="Type your email"
              value={email}
              onChangeText={setEmail}
              icon="email"
            /> 

            {/* Password */}
            <Input
              theme={styles.themeInput}
              textContentType="password"
              //error={error}
              label="Password"
              placeholder="Type your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visible}
              icon={visible ? 'eye' : 'eye-off'}
              onPress={() => setVisible(!visible)}
            /> 
            
            <View style={styles.box1} />

            {/* Sign In Button */}
            <Buttons 
                text={text.signIn}
                styleButton={styles.button}
                styleText={styles.text}
                color={colorScheme.green}
                mode="contained"
                disabled={isLoadingSignIn}
                loading={isLoadingSignIn}
                onPress={onHandleSignIn}
            />

            <View style={styles.box} />

            {/* Sign Up Button */}
            <Buttons 
                text={text.signUp}
                styleButton={styles.button}
                color={colorScheme.green}
                mode="outlined"
                disabled={isLoadingSignIn}
                onPress={onHandleSignUp}
            />

            <Text style={styles.version}>{text.app} {text.version}</Text>
          </SafeAreaView>

          {/* Notif */}
            <Snackbar
              style={{ backgroundColor: colorScheme.red }}
              duration={800}
              visible={setError}
              onDismiss={onHandleDismiss}
            >
              <Text>{errorMessage}</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: wp('5%')
  },
  box: {
    padding: hp('1%')
  },
  box1: {
    padding: hp('3%')
  },
  title: {
    fontSize: wp('5%'),
    color: colorScheme.green,
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'center'
  },    
  button: {
    height: hp('6%'),
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  },
  themeInput: {
    colors: { primary: colorScheme.green }
  },
  version: {
    marginTop: hp('15%'),
    marginBottom: hp('10%'),
    textAlign: 'center',
    color: 'black'
  },
  centerLogo: {
    alignItems: 'center'
  },
  logoContainer: {
    height: wp('32%'),
    width: wp('32%'),
    borderRadius: wp('30%'),
    overflow: 'hidden',
    borderColor: colorScheme.green,
    borderWidth: 1,
  },
  logo: {
    height: wp('32%'),
    width: wp('32%'),
    borderRadius: wp('30%'),
  },
  
});