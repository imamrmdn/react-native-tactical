import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorScheme } from "../../components/theme/theme";
import text from '../../../text.json';

export function NetworkConnection() {

  return (
    <View style={styles.container}>
        <Icon name="access-point-network-off" size={wp('15%')} color={colorScheme.red} />
        <Text style={styles.text} >{text.networkConnection}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: hp('3%'),
    color: colorScheme.black,
    fontSize: wp('4%')
  }
})