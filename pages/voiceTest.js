import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, FlatList } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import VoiceBar from "../components/voiceBar";
import firestore from '@react-native-firebase/firestore';
import Sentence from "../components//sentence";


const VoiceTest = (props) => {
    const [fullText, setFullText] = useState([]);
    const [position, setPosition] = useState(0); // Sentence Position

    const next = () => {
        if (fullText.length - 1 > position)
            setPosition(position + 1);
    }

    const isInitialMount = useRef(true);

    let name = "Doing my Chores"; // Replace instances of name with props.name

    useEffect(() => {
        if (isInitialMount.current) {
            setFullText(props.route.params.book.content.filter(e => !(e === "")));
            isInitialMount.current = false;
        }
    }, []);

    let textArray = [];

    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);          
    }

    fullText.forEach((e, index) => {
        textArray[index] = [];
        e.split(" ").forEach(word => {
            if (!isLetter(word.charAt(0))) word = word.substring(1);
            if (!isLetter(word.charAt(word.length - 1))) word = word.substring(0, word.length - 1);
            textArray[index].push(word.toLowerCase());
        });
    });

    let j = 0;
    console.log(j);

    const Item = ({ item }) => (
        <Sentence content={item.content} pos={item._id} num={position} key={item._id} />
    );

    let i = 0;

    const fullTextObject = fullText.map(e => {
        return {
            _id: i++,
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
                    keyExtractor={item => "p" + item._id}
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
