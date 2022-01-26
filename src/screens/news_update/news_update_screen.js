import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Text } from 'react-native';
import { Card, Divider, Headline, Paragraph, Subheading } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import text from '../../../text.json';
import { colorScheme } from '../../components/theme/theme';

export function NewsUpdateScreen(){

    const onHandleOpenURL = () => {
        Linking.openURL(text.linkSumber)
    }

    return(
        <View style={styles.container} >
            <Card>
                <Card.Content>
                    <Headline style={styles.headline}>{text.headlineNews}</Headline>
                    <Divider />
                    <Paragraph style={styles.paragraph}>{text.paragraphNews}</Paragraph>
                    <View style={styles.sumber} >
                        <Subheading style={styles.textSumber} >{text.sumber}</Subheading>
                        <TouchableOpacity style={styles.url} onPress={onHandleOpenURL} >
                            <Text style={styles.text} >{text.sumberUrl}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: wp('3%')
    },
    text: {
        color: colorScheme.blueCustom,
        fontSize: wp('3.5%'),
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    headline: {
        marginBottom: hp('1%')
    },
    paragraph: {
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        fontSize: wp('3.5%'),
        fontFamily: 'sans-serif-light',
    },
    sumber: {
        flexDirection: 'row'
    },
    textSumber: {
        fontSize: wp('3.5%'),
        fontStyle: 'italic',
        fontFamily: 'sans-serif-light',
    },
    url: {
        justifyContent: 'center',
    }
})