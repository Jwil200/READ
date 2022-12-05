import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import VoiceBar from "../components/voiceBar";
import firestore from '@react-native-firebase/firestore';
import Sentence from "../components//sentence";


const VoiceTest = (props) => {
    const [fullText, setFullText] = useState([]);
    const [position, setPosition] = useState(2); // Sentence Position

    const next = () => {
        if (fullText.length - 1 > position)
            setPosition(position + 1);
    }

    const isInitialMount = useRef(true);

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
            function isLetter(str) {
                return str.length === 1 && str.match(/[a-z]/i);
            }
            if (!isLetter(f.charAt(0))) {
                f = f.substring(1);
            }
            textArray.push(f.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase());
        }); 
    });
    for (index in fullText) {
        textArray.push()
    }

    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);          
    }

    fullText.forEach(sentence => {
        textArray.push(sentence.split(" ").map(word => {
            if (!isLetter(e.charAt(0))) e = e.substring(1);
            if (!isLetter(e.charAt(e.length - 1))) e = e.substring(0, e.length - 1);
            return e.toLowerCase();
        }));
    });

    let j = 0;

    const Item = ({ item }) => (
        <Sentence content={item.content} pos={j++} num={position} key={item._id} />
    );

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
                    ListFooterComponent={() => <View style={{height: 80}}/>}
                />
            </View>
            <View style={styles.voice_box_container}>
                <VoiceBar 
                    textArray={textArray}
                    next={next}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_body_container: {
        backgroundColor: '#fff'
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
