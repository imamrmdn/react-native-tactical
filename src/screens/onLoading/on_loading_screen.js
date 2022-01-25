import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colorScheme } from '../../components/theme/theme';

import text from '../../../text.json';

export function OnLoadingScreen(){

    return(
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../../assets/images/logo.png')}
            />
            <Text style={styles.text} >{text.support}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        height: wp('35%'),
        width: wp('35%'),
        borderRadius: wp('30%'),
    },
    text: {
        fontSize: wp('4%'),
        marginTop: wp('5%'),
        fontWeight: '300',
        color: colorScheme.grey
    }
})