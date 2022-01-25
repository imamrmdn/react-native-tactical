import React from 'react';
import { List } from 'react-native-paper';
import data from '../../../data.json';
import { useNavigation } from '@react-navigation/native';

export function MateriScreen(){

    const navigation = useNavigation();

    const onHandleDetail = (title, desc, pic, vid, id) => {
    
        navigation.navigate('Materi Detail', {
            title,
            desc,
            pic,
            vid,
            id
        })
    }

    return(
        <>
            <List.AccordionGroup >
                {data?.response.map(v => (
                    <List.Accordion
                        key={v?.key}
                        id={v?.key}
                        title={v?.materi_title}
                        left={props => <List.Icon {...props} icon={v?.icon} />}
                    >
                        {v?.sub_materi?.map(e => (
                            <List.Item 
                                key={e?.id} 
                                title={e?.materi} 
                                onPress={() => onHandleDetail(e?.title, e?.desc, e?.pic, e?.vid, e?.id)}
                            />
                        ))}
                    </List.Accordion>
                ))}
            </List.AccordionGroup>
        </>
    )
}
