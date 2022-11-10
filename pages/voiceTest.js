import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import VoiceBar from "../components/voiceBar";

const textContent = "This is a string of text.".replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
const textArray = textContent.split(" ");

const VoiceTest = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main_body_container}>
                <Text>Some text or a PDF will go here.</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    voice_box_container: {
        flex: 0.1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default VoiceTest;
