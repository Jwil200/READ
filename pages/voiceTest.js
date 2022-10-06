import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, PermissionsAndroid } from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';

const options = {
    sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    bufferSize: 4096    // default is 2048
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 35
    },
    text: {
        textAlign: "center",
        fontSize: 20
    }
});

const requestPerms = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.RECORD_AUDIO, {
            title: "Hey we need to use audio!",
            message: "Please... ;-;",
            buttonNeutral: "Maybe",
            buttonNegative: "No",
            buttonPositive: "Ok"
        });
        if (granted) {
            const options = {
                sampleRate: 16000, // default 44100
                channels: 1, // 1 or 2, default 1
                bitsPerSample: 16, // 8 or 16, default 16
                audioSource: 6, // android only (see below)
                bufferSize: 4096 * 2 // default is 2048
            };
            AudioRecord.init(options);
            AudioRecord.start();
            LiveAudioStream.on('data', data => {
                console.log("Something is happening!!!");
            });
        }
        }
        catch (err) {
            console.log(err);
        }
}

const VoiceTest = () => {
    requestPerms();

    return (
        <View style={styles.container}>
            <Button title="Solid" type="solid" loading="true" />
        </View>
    );
}
export default VoiceTest;