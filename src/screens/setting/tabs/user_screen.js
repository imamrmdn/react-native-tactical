import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Buttons } from '../../../components/button/button';
import { colorScheme } from '../../../components/theme/theme';
import { useAuth } from '../../../zustand/state';

import text from '../../../../text.json';

export function UserScreen(){

    const { setSignOut, response, setData } = useAuth();

    const getData = async () => {
        await setData();
    }

    useEffect(() => {
        getData();
    },[])

    return(
        <View style={styles.container} >
            <Card>
                <Card.Title
                    title={response?.email}
                    subtitle={response?.name}
                    leftStyle={styles.leftStyle}
                    left={(props) => <Avatar.Icon {...props} icon="account" size={wp('11%')} color={colorScheme.green} style={styles.icon} />}
            />
            </Card>
            <View style={styles.box} />
                <Buttons 
                    text={text.signOut}
                    mode="contained"
                    color={colorScheme.green}
                    styleButton={styles.button}
                    styleText={styles.text}
                    onPress={setSignOut}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        margin: wp('4%') 
    },
    button: {
        height: hp('6%'),
        justifyContent: 'center'
    },
    text: {
        color:'white'
    },
    icon: {
      backgroundColor: 'green'  
    },
    box: {
        height: hp('2%')
    },
    leftStyle: {
        marginRight: wp('6%')
    },
})