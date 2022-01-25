import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colorScheme } from '../theme/theme';

import text from '../../../text.json';

export function Loading(){
    return(
        <View style={styles.container} >
            <ActivityIndicator 
                size="large"
                color={colorScheme.green}
            />
            <Text style={styles.loading} >{text.loading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading:{
        marginTop: 5,
        color: 'black'
    }
})