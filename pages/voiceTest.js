import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import VoiceBar from "../components/voiceBar";
import Word from "../components/word";
import firestore from '@react-native-firebase/firestore';

let j = 0;

const Item = ({ item }) => (
    <View style={styles.sub_body}>
        {item.content.split(" ").map(e => <Word key={"w"+(j++)} text={e}/>)}
    </View>
);

const VoiceTest = (props) => {
    const [fullText, setFullText] = useState([]);
    const isInitialMount = useRef(true);

    console.log(fullText);

    let name = "Doing my Chores"; // Replace instances of name with props.name

    const getText = async () => {
        let content = [];
        await firestore()
        .collection("Books")
        .where("Name", "==", name)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { Content } = doc.data();
                content = Content;
            })
        });
        setFullText(content.filter(e => !(e === "")));
    }

    useEffect(() => {
        if (isInitialMount.current) {
            getText();
            isInitialMount.current = false;
        }
    }, []);

    let textArray = [];
    fullText.forEach(e => {
        e.split(" ").forEach(f => {
            textArray.push(f.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase());
        }); 
    });

    let i = 0;

    const fullTextObject = fullText.map(e => {
        return {
            _id: "p" + (i++),
            content: e
        }
    });

    return (
        <View>
            <View style={styles.main_body_container}>
                <FlatList
                    data={fullTextObject}
                    numColumns={1}
                    renderItem={Item}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={styles.voice_box_container}>
                <VoiceBar 
                    textArray={textArray.filter(e => !(e === ""))}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_body_container: {
        backgroundColor: '#fff'
    },
    sub_body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20
    },
    voice_box_container: {
        height: '10%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0
    },
});

export default VoiceTest;
