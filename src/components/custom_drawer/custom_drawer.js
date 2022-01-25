import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import text from '../../../text.json';


export function CustomDrawer(props){

    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props} > 
                <Image 
                    source={require('../../../assets/images/unj-logo.png')}  
                    style={styles.image}
                />
                <Title style={styles.title}>{text.app}</Title>
                <Divider style={styles.divider} />
                <View style={styles.box}  />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View>
                <Text style={styles.copyright} >{text.copyright}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        //width: wp('10%')
    },
    title: {
        textAlign: 'center',
        fontSize: wp('6%'),
        fontFamily: 'Poppins'
    },  
    box: {
        marginBottom: hp('2%')
    },
    copyright: {
        textAlign: 'center',
        marginBottom: wp('4%')
    },
    divider: {
        borderColor: 'black',
        height: 1,
        margin: wp('2%')
    }
})