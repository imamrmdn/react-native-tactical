import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Divider, Headline, Paragraph, Subheading } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import text from '../../../text.json';

export function NewsUpdateScreen(){
    return(
        <View style={styles.container} >
            <Card>
                <Card.Content>
                    <Headline style={styles.headline}>{text.headlineNews}</Headline>
                    <Divider />
                    <Paragraph style={styles.paragraph}>{text.paragraphNews}</Paragraph>
                    <Subheading>sumber: {text.sumberUrl}</Subheading>
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: wp('3%')
    },
    headline: {
        marginBottom: hp('1%')
    },
    paragraph: {
        marginBottom: hp('2%')
    }
})