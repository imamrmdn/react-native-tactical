import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { getVideo } from '../../utils/getVideo';

import text from '../../../text.json';

export function VideoMateriScreen(){

    const route = useRoute();

    const { type, id, vid } = route?.params;

    return(
        <>
            <Video 
                key={id}
                source={ type === 'local' ? getVideo(vid) : {uri:vid}}
                poster={text.videoLoading}
                posterResizeMode="contain"
                style={styles.video}
                controls
                resizeMode='contain' 
                ref={(ref) => {
                    this.player = ref
                }}
                
            />
        </>
    )
}

const styles = StyleSheet.create({
    video: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})