import React from 'react';

import { Image, StyleSheet, View, Text } from 'react-native';
import { Card, Divider, List } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colorScheme } from '../../../components/theme/theme';
import { desc } from '../../../utils/biografi';

import text from '../../../../text.json';

export function CreatorScreen(){

    return(
        <View style={styles.container} >
            <Card>
                <Card.Title
                    leftStyle={styles.leftStyle} 
                    title={text.author}
                    subtitle={text.jurusan}
                    left={(props) => <Image {...props} source={require('../../../../assets/images/profile.jpg')} style={styles.profile}  />}
                />
                <Divider style={styles.divider} />
                <Card.Content style={styles.content} >
                    {(desc.map(v => (
                        <List.Item
                           key={v?.key}
                           title={v?.ket}
                           titleStyle={styles.desc}
                           left={props => <List.Icon {...props} icon={v?.icon} />}
                        />
                    )))}
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        margin: wp('4%') 
    },
    text: {
        color: colorScheme.black
    },
    profile: {
        height: wp('15%'),
        width: wp('15%'),
        borderRadius: wp('10%'),
        marginTop: wp('2%'),
    },
    leftStyle: {
        marginRight: wp('8%')
    },
    content: {
        marginTop: hp('2%'),
    },
    desc: {
        fontWeight: '300',
        color: colorScheme.black,
        fontFamily: 'poppins'
    },
    row: {
        flexDirection: 'row',
        marginBottom: hp('2%')
    },
    divider: {
        margin: wp('2%')
    }
})
