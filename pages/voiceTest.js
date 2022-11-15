import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import VoiceBar from "../components/voiceBar";
import Word from "../components/word";

const textContent = "This is a string of text.";
const textArray = textContent.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().split(" ");

const VoiceTest = () => {
    let i = 0;

    return (
        <View style={styles.container}>
            <View style={styles.main_body_container}>
                {textContent.split(" ").map(e => <Word key={"w"+(i++)} text={e}/>)}
            </View>
            <View style={styles.voice_box_container}>
                <VoiceBar 
                    textArray={textArray}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main_body_container: {
        flex: 0.9,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 20
    },
    voice_box_container: {
        flex: 0.1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default VoiceTest;
