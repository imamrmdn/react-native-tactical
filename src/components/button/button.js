import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

export function Buttons({
    text,
    styleButton,
    color,
    mode,
    onPress,
    styleText,
    disabled,
    loading
}){
    return(
        <Button
            style={styleButton}
            color={color}
            mode={mode}
            onPress={onPress}
            disabled={disabled}
            loading={loading}
        >
            <Text style={styleText} >{text}</Text>
        </Button>
    )
}