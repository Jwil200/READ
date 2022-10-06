import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import LiveAudioStream from 'react-native-live-audio-stream';

const options = {
    sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    bufferSize: 4096    // default is 2048
};

LiveAudioStream.init(options);
LiveAudioStream.on('data', data => {
    console.log("Something is happening!!!");
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 35
    },
    text: {
        textAlign: "center",
        fontSize: 20
    }
});

const VoiceTest = () => {
    return (
        <View style={styles.container}>
            <Button title="Solid" type="solid" loading="true" />
        </View>
    );
}
export default VoiceTest;