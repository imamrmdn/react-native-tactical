import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import data from '../../../data.json';
import { colorScheme } from '../../components/theme/theme';
import { useAuth } from '../../zustand/state';

import text from '../../../text.json';

export function MateriScreen(){

    const navigation = useNavigation();

    const { dataMateri, fetchDataMateri } = useAuth();

    const onHandleDetail = (type, title, desc, pic, vid, id, created) => {
    
        navigation.navigate('Materi Detail', { type, title, desc, pic, vid, id, created });

    }

    const fetchData = async () => {
        await fetchDataMateri();
    }

    useEffect(() => {
        fetchData();
    },[])

    console.log(dataMateri)

    return(
        <>
            <List.AccordionGroup 
                //onAccordionPress={} 
                //expandedId={} 
            >
                {data?.response?.map(v => (
                    <List.Accordion
                        key={v?.key}
                        id={v?.key}
                        title={v?.materi_title}
                        left={props => <List.Icon {...props} icon={v?.icon} />}
                        //expanded={}
                        //onPress={}
                    >
                        {v?.sub_materi?.map(e => (
                            <List.Item 
                                key={e?.id} 
                                title={e?.materi} 
                                rippleColor={colorScheme.blueCustom}
                                onPress={() => {
                                    onHandleDetail('local', e?.title, e?.desc, e?.pic, e?.vid, e?.id, 'Creator')
                                }}
                            />
                        ))}
                    </List.Accordion>
                    
                ))}

                {/* Materi UPload */}
                <List.Accordion
                    id="1"
                    title="Materi Upload"
                    left={props => <List.Icon {...props} 
                    icon="folder-open" />}
                >
                    {/* if dataMateri length = 0 then not display materi upload */}
                </List.Accordion>
            </List.AccordionGroup>
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colorScheme.black
    }
})