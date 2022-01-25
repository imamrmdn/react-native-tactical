import React, { useState } from 'react';

//component
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { Title, Snackbar } from 'react-native-paper';
import { colorScheme } from '../../components/theme/theme';
import { Input } from '../../components/input/input';
import { Buttons } from '../../components/button/button';
import text from '../../../text.json';

//third party
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../zustand/state';

export function SignUpScreen(){

    const { 
      errorMessage, 
      fetchAuthSignUp ,
      isLoadingSignUp,
      setErrorSignUp, setIsLoadingSignUp,
      errorSignUp, colorMessage, setColorMessage
    } = useAuth();

    const navigation = useNavigation();

    //
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');

    const onHandleSignUp = async () => {
      Keyboard.dismiss();
      await fetchAuthSignUp(nama, email, noTelp, password).then(resp => {
        if(resp){
          setTimeout(() => {
            navigation.goBack();
            setErrorSignUp();
            setIsLoadingSignUp();
            setColorMessage();
          },1500)
        }
        if(!resp) console.log('failed signup')
      })
    }

    const onHandleBackSignIn = () => {
      navigation.goBack();
    }

    const onHandleDismiss = () => {
      setErrorSignUp()
      setIsLoadingSignUp()
    }

    return(
        <>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              {/* Logo Aplikasi */}
              <View style={styles.logoContainer}>
                <Image 
                  style={styles.logo}
                  source={require('../../../assets/images/logo.png')}
                />
              </View>
              {/* Title */}
              <Title style={styles.subTitle}>{text.subTitleSignUp}</Title>

              {/* Nama */}
              <Input 
                  theme={styles.themeInput}
                  mode="outlined"
                  textContentType='name'
                  label="Username"
                  placeholder="Type your Username"
                  value={nama}
                  onChangeText={setNama}
                  icon="account"
              />
              
              {/* Email */}
              <Input 
                  theme={styles.themeInput}
                  mode="outlined"
                  textContentType='emailAddress'
                  keyboardType="email-address"
                  label="Email"
                  placeholder="Type your email"
                  value={email}
                  onChangeText={setEmail}
                  icon="email"
              />

              {/* No Telp */}
              <Input 
                  theme={styles.themeInput}
                  mode="outlined"
                  textContentType='telephoneNumber'
                  keyboardType="phone-pad"
                  label="Phone Number"
                  placeholder="Type your Phone Number"
                  value={noTelp}
                  onChangeText={setNoTelp}
                  icon="phone"
              />

              {/* Password */}
              <Input 
                  theme={styles.themeInput}
                  mode="outlined"
                  textContentType='password'
                  label="Password"
                  placeholder="Type your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!visible}
                  icon={visible ? 'eye' : 'eye-off'}
                  onPress={() => setVisible(!visible)}
              />
              
              <View style={styles.box1} />

              {/* SIgn Up Button */}
              <Buttons 
                  text={text.signUp}
                  styleButton={styles.button}
                  styleText={styles.text}
                  mode="contained"
                  loading={isLoadingSignUp}
                  disabled={isLoadingSignUp}
                  color={colorScheme.green}
                  onPress={onHandleSignUp}
              />
              
              <TouchableOpacity  
                style={styles.buttonAlready}
                disabled={isLoadingSignUp}
                onPress={onHandleBackSignIn}
              >
                <Text style={styles.already} >{text.already}</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
          {/* Notif */}
          <Snackbar 
            style={{ backgroundColor: colorMessage}}
            duration={800}
            visible={errorSignUp}
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
    marginTop: hp('5%'),
    fontSize: wp('7%'),
  },    
  subTitle: {
    fontSize: wp('4%'),
    color: 'grey',
    marginBottom: hp('3%')
  },   
  button: {
    height: hp('6%'),
    justifyContent: 'center',
    marginBottom: hp('5%')
  },
  text: {
    color: 'white'
  },
  themeInput: {
    colors: { primary: colorScheme.green }
  },
  already: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: 'black'
  },
  logoContainer: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: wp('10%'),
    overflow: 'hidden',
    borderColor: colorScheme.green,
    borderWidth: 1,
  },
  logo: {
    height: wp('15%'),
    width: wp('15%'),
    borderRadius: wp('10%'),
  },
  buttonAlready: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: hp('4%'), 
    padding: wp('1%') 
  }
}); 