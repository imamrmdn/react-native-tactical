import React, { useState, useEffect } from 'react';

//component
import { WebView } from 'react-native-webview';
import { Loading } from '../../components/loading/loading';

import text from '../../../text.json';

export function HomeScreen(){

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        //
        setTimeout(() => {
            setVisible(true)
        },3000)

        //
        return () => {
            setVisible(false);
        }

    }, [])

    return(
        <>
            {/* Content WebView */}
            {(visible) ? (
                <WebView 
                    source={{ uri: text.webViewHome }} 
                    javaScriptEnabled={true} 
                    domStorageEnabled={true}
                />
            ) : (
                <Loading />
            )}
            
        </>
    )
}
