import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider, Paragraph, Title } from 'react-native-paper';
import { getImage } from '../../utils/getImage';

import text from '../../../text.json';
import { colorScheme } from '../../components/theme/theme';

export function MateriDetailScreen(){

    const route = useRoute();
    const navigation = useNavigation();

    const { title, desc, pic, id } = route?.params;

    const onHandleVideoDetail = () => {

        navigation.navigate('Video Detail', {
            id,
            pic
        })
        
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <Card>
                    <Card.Content>
                        <Title>{title}</Title>
                        <Divider />
                        <Text style={styles.text} >{text.pelaksanaan}</Text>
                        <Paragraph textBreakStrategy="highQuality" >{desc}</Paragraph>

                        {/* Picture */}
                        <Image 
                            key={id}
                            style={styles.picture}
                            source={getImage(pic)}
                        />

                        {/* Video */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onHandleVideoDetail}
                        >
                            <Text style={styles.textVideo}>{text.seeVideo}</Text>
                        </TouchableOpacity>
                        
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { 
        margin: wp('2%') 
    },
    text: {
        marginTop: hp('4%'),
        color:'black',
    },
    picture: {
        marginTop: hp('5%'),
        width: wp('87%'), 
        height: hp('22%'),
        marginBottom: hp('3%')
    },
    textVideo: {
        color: colorScheme.white,
        fontSize: wp('4%')
    },
    video: {
        width: wp('87%'), 
        height: hp('22%'),
    },
    button: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#648DB5",
        padding: wp('1%'),
        width: wp('30%'),
        height: hp('4%'),
        borderRadius: wp('1%'),
    },
})