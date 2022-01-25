import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { IconButton, Snackbar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Buttons } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { colorScheme } from '../../components/theme/theme';

export function MateriUploadScreen(){

    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onHandleUploadMateri = () => {
        Keyboard.dismiss();
        console.log('Upload Materi')
        setVisible(!visible)
        setErrorMessage('Save Materi Error')
    }

    const onHandleDismiss = () => {
        setVisible(false)
    }

    const onHandleUploadImage = () => {
        setVisible(!visible)
        setErrorMessage('Upload Image Error')
    }

    const onHandleUploadVideo = () => {
        setVisible(!visible)
        setErrorMessage('Upload Video Error')
    }
    
    return(
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Input 
                        theme={styles.themeInput}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        //error={error}
                        label="Title"
                        placeholder="Type your Title Materi"
                        //value={email}
                        //onChangeText={setEmail}
                    />

                    <View style={{ height: hp('2%') }} />

                    <Input 
                        theme={styles.themeInput}
                        textContentType="fullStreetAddress"
                        keyboardType="default"
                        label="Description"
                        multiline={true}
                        //disableFullscreenUI={true}
                        placeholder="Type your Description Materi"    
                    
                    />

                    <View style={styles.upload}>

                        <View style={styles.column} >
                            <IconButton
                                icon="image-plus"
                                color={colorScheme.grey}
                                rippleColor={colorScheme.green}
                                size={wp('15%')}
                                onPress={onHandleUploadImage}
                            />
                            <Text style={styles.text}>Upload Image</Text>
                        </View>
                        
                        <View style={styles.column} >
                            <IconButton
                                icon="video-plus"
                                color={colorScheme.grey}
                                rippleColor={colorScheme.green}
                                size={wp('15%')}
                                onPress={onHandleUploadVideo}
                            />
                            <Text style={styles.text}>Upload Video</Text>
                        </View>
                    </View>
                    
                    <View style={{ height: hp('5%') }} />

                    <Buttons 
                        text='Save Materi'
                        styleButton={styles.button}
                        styleText={styles.textButton}
                        mode='contained'
                        color={colorScheme.green}
                        onPress={onHandleUploadMateri}
                    />
                </ScrollView>
            </SafeAreaView>
            <Snackbar 
                style={{ backgroundColor: colorScheme.red }}
                duration={800}
                visible={visible}
                onDismiss={onHandleDismiss}
            >
                <Text>{errorMessage} From Server !</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: wp('4%')
    },
    text: {
        color: colorScheme.black
    },
    themeInput: {
        colors: { primary: colorScheme.green }
    },
     button: {
        height: hp('6%'),
        justifyContent: 'center'
    },
    textButton: {
        color: 'white'
    },
    upload: {
        flexDirection:'row', 
        marginTop: hp('2%'), 
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'column'
    }
})