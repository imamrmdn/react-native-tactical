import React, { useState } from 'react';
import { 
    Text, StyleSheet, View, SafeAreaView, 
    ScrollView, Keyboard, TouchableOpacity,
    ToastAndroid 
} from 'react-native';
import { IconButton, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Buttons } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Loading } from '../../components/loading/loading';
import { colorScheme } from '../../components/theme/theme';
import { useAuth } from '../../zustand/state';

import text from '../../../text.json';
import { baseURL } from '../../settings';

export function MateriUploadScreen(){

    const { token } = useAuth();

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [colorError, setColorError] = useState(colorScheme.red);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fileNameVideo, setFileNameVideo] = useState(null);
    const [fileNameGambar, setFileNameGambar] = useState(null);
    const [fileUriVideo, setFileUriVideo] = useState('');
    const [fileUriGambar, setFileUriGambar] = useState('');
    const [buttonGambar, setButtonGambar] = useState(false);
    const [buttonVideo, setButtonVideo] = useState(false);

    const onHandleDismiss = () => {
        setVisible(false)
    }

    // select image
    const onHandleUploadImage = () => {
  
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        }, (response) => {
            
            if(response?.didCancel){
                ToastAndroid.show('Cancel', ToastAndroid.SHORT);
            }

            if(response.assets){
              
                const fileUriGambar = response.assets[0].uri;
                const fileNameGambar = response.assets[0].fileName;
                console.log({ fileUriGambar, fileNameGambar });
                setFileNameGambar(fileNameGambar);
                setFileUriGambar(fileUriGambar);
                setButtonGambar(!buttonGambar);

            }
        })
    }

    // select video
    const onHandleUploadVideo = () => {
        
        ImagePicker.launchImageLibrary({
            mediaType: 'video',
            includeBase64: true,
        }, (response) => {
            
            if(response?.didCancel){
                ToastAndroid.show('Cancel', ToastAndroid.SHORT);
            }

            if(response.assets){
                
                const fileUriVideo = response.assets[0].uri;
                const fileNameVideo = response.assets[0].fileName;
                console.log({ fileUriVideo, fileNameVideo })
                setFileNameVideo(fileNameVideo);
                setFileUriVideo(fileUriVideo);
                setButtonVideo(!buttonVideo);
            }
         
        })
    }

    const cancelPickFile = (type) => {

        switch (type) {
            case 'gambar':
                setFileNameGambar(null);
                setButtonGambar(false);
                setFileUriGambar('');
                break;
            case 'video':
                setFileNameVideo(null);
                setButtonVideo(false);
                setFileUriVideo('');
                break;
        }
        
    }

    const onHandleUploadMateri = async () => {
        
        if(title.length <= 0 || description.length <= 0 || 
            fileUriGambar.length <=0 || fileUriVideo.length <= 0){
                setColorError(colorScheme.red);
                setVisible(!visible)
                setErrorMessage('Field Can Not be Empty!')
        }else{

            console.log({
                title,
                description,
                fileUriGambar,
                fileUriVideo
            });

            let formData = new FormData();

            formData.append('title', title);
            formData.append('audio', description);
            formData.append('coverImage', fileUriVideo);
            formData.append('description', fileUriGambar);

            const objectPayload = {
                method: "post",
                headers: { "auth-token": token },
                body: formData
            }

            setLoading(true);

            await fetch(`${baseURL}/podcast`, objectPayload)
                .then(resp => {

                    if(resp){

                        setLoading(false)
                        console.log('response', resp);
                        //
                        setTitle('');
                        setDescription('');
                        setFileUriGambar(null);
                        setFileUriVideo(null);
                        setFileNameGambar(null);
                        setFileNameVideo(null);
                        setColorError(colorScheme.green)
                        setVisible(!visible);
                        setErrorMessage('Save');

                        //if succes save redirect to
                        //navigation.navigate('Materi');
                    }

                }).catch(err => {

                    console.log({err});
                })
        }
    }
    
    return(
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Input 
                        theme={styles.themeInput}
                        label="Title"
                        placeholder="Type your Title Materi"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <View style={styles.box} />

                    <Input 
                        theme={styles.themeInput}
                        textContentType="fullStreetAddress"
                        keyboardType="default"
                        label="Description"
                        multiline={true}
                        placeholder="Type your Description Materi"    
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={styles.box} />

                    <View style={styles.rowUpload}  >
                        <TouchableOpacity 
                            style={[styles.buttonUpload, { backgroundColor: fileNameGambar ? colorScheme.greyCustom : colorScheme.grey, }]} 
                            disabled={buttonGambar}
                            onPress={onHandleUploadImage}
                        >
                            <Text style={styles.textUpload} >{text.uploadGambar}</Text>
                        </TouchableOpacity>
                        {(fileNameGambar) && (
                            <>
                                <Text numberOfLines={2} style={styles.textFileName} >{fileNameGambar}</Text>
                                <IconButton icon="close-circle" color={colorScheme.red} onPress={() => cancelPickFile('gambar')}/>
                            </>
                        )}
                    </View>

                    <View style={styles.box} />

                    <View style={styles.rowUpload} >
                        <TouchableOpacity 
                            style={[styles.buttonUpload, { backgroundColor: fileNameVideo ? colorScheme.greyCustom : colorScheme.grey, }]} 
                            disabled={buttonVideo}
                            onPress={onHandleUploadVideo} 
                        >
                            <Text  style={styles.textUpload} >{text.uploadVideo}</Text>
                        </TouchableOpacity>
                        {(fileNameVideo) && (
                            <>
                                <Text numberOfLines={2} style={styles.textFileName} >{fileNameVideo}</Text>
                                <IconButton icon="close-circle" color={colorScheme.red} onPress={() => cancelPickFile('video')}/>
                            </>
                        )}
                    </View>
                    
                    <View style={styles.box1} />

                    <Buttons 
                        text='Save Materi'
                        disabled={loading}
                        styleButton={styles.button}
                        styleText={styles.textButton}
                        mode='contained'
                        color={colorScheme.green}
                        onPress={onHandleUploadMateri}
                    />

                    {(loading) && (
                        <Loading />
                    )}
                </ScrollView>
            </SafeAreaView>
            <Snackbar 
                style={{ backgroundColor: colorError }}
                duration={800}
                visible={visible}
                onDismiss={onHandleDismiss}
            >
                <Text>{errorMessage}</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: wp('4%')
    },
    box: {
        height: hp('2%') 
    },
    box1: {
        height: hp('5%')
    },
    text: {
        color: colorScheme.black
    },
    themeInput: {
        colors: { primary: colorScheme.green }
    },
     button: {
        height: hp('6%'),
        justifyContent: 'center',
        marginBottom: hp('3%')
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
        flexDirection: 'column',
    },
    buttonUpload: {
        width: wp('30%'),
        height: hp('4%'),
        borderRadius: wp('1%'),
        justifyContent: 'center',
        alignItems: "center",
        marginRight: wp('2%')
    },
    textUpload: {
        color: colorScheme.white,
        fontSize: wp('4%')
    },
    textFileName: {
        flex: 1,
        color: colorScheme.black,
        fontSize: wp('3.5%'),
        fontFamily: 'sans-serif-light',

    },
    rowUpload: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
})