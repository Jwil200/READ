import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";

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
    const recorder = useRef(null) //Recorder
    const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
    const [blobURL, setBlobUrl] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const [isRecording, setIsRecording] = useState(null)

    useEffect(() => {
        recorder.current = new MicRecorder({bitRate: 128});
    }, []); 
    
    const startRecording = () => {
        recorder.current.start().then(() => {
          ;
    }

    const stopRecording = () => {
        recorder.current.stop()
        .getMp3()
        .then(([buffer, blob]) => {
            const file = new File(buffer, "audio.mp3", {
                type: blob.type,
                lastModified: Date.now()
            });
            const newBlobUrl = URL.createObjectURL(blob);
            setBlobUrl(newBlobUrl);
            setIsRecording(false);
            setAudioFile(file);
        })
        .catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello!</Text>
        </View>
    );
}
export default VoiceTest;