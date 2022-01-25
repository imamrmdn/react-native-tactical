import React from 'react';
import { TextInput } from 'react-native-paper';

export function Input({
    theme,
    textContentType,
    keyboardType,
    error,
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    icon,
    onPress,
    style,
    multiline
}){
    return(
        <TextInput 
            style={style}
            theme={theme}
            mode="outlined"
            textContentType={textContentType}
            keyboardType={keyboardType}
            error={error}
            multiline={multiline}
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            right={
                <TextInput.Icon name={icon} onPress={onPress} />
            }
        />
    )
}