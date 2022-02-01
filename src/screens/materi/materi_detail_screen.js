import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider, Paragraph, Title } from 'react-native-paper';
import { getImage } from '../../utils/getImage';
import { colorScheme } from '../../components/theme/theme';

import text from '../../../text.json';

export function MateriDetailScreen(){

    const route = useRoute();
    const navigation = useNavigation();

    const { type, title, desc, pic, vid, id, created } = route?.params;

    const onHandleVideoDetail = () => {

        navigation.navigate('Video Detail', { type, id, vid });
        
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <Card>
                    <Card.Content>
                        <Title style={styles.title} >{title}</Title>
                        <Divider />
                        <Text style={styles.text} >{text.pelaksanaan}</Text>
                        <Paragraph 
                            style={styles.paragraph}
                            lineBreakMode="middle" 
                            textBreakStrategy="highQuality"
                            selectable 
                        >
                            {desc}
                        </Paragraph>

                        {/* Picture */}
                        <Image 
                            key={id}
                            style={styles.picture}
                            source={ type === 'local' ? getImage(pic) : {uri:pic}}
                        />

                        {/* Video */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}} >
                            <Text ellipsizeMode='tail' numberOfLines={3} style={styles.created}>
                                CreatedBy: {type === 'local' ? 'Creator' : created }
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onHandleVideoDetail}
                            >
                                <Text style={styles.textVideo}>{text.seeVideo}</Text>
                            </TouchableOpacity>
                        </View>
                        
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
    title: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'bold'
    },  
    text: {
        marginTop: hp('4%'),
        marginBottom: hp('1%'),
        fontSize: wp('3.5%'),
        color:'black',
        fontFamily: 'sans-serif-light',
    },
    paragraph: {
        fontSize: wp('3.5%'),
        fontWeight: '300',
        fontFamily: 'sans-serif-light',
    },
    picture: {
        marginTop: hp('3.5%'),
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
        backgroundColor: colorScheme.blueCustom,
        padding: wp('1%'),
        width: wp('30%'),
        height: hp('4%'),
        borderRadius: wp('1%'),
    },
    created: {
        flex: 1,
        color: colorScheme.black
    }
})