import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, LogBox } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Buffer } from 'buffer';
import LiveAudioStream from 'react-native-live-audio-stream';
import { ASSEMBLY_AI_API_KEY } from "@env";

const requestRecordPermissions = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "App Record Permission",
                message:
                    "Read App needs access to your microphone " +
                    "so you can use voice to text.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Initializing audio stream.");
            const options = {
                sampleRate: 16000, // default 44100
                channels: 1, // 1 or 2, default 1
                bitsPerSample: 16, // 8 or 16, default 16
                audioSource: 6, // android only (see below)
                bufferSize: 4096 * 2 // default is 2048
            }

            console.log(LiveAudioStream);
            LiveAudioStream.init(options);

            //const ws = new WebSocket("wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000");
            
            // We put this in open so that way we are only performing any actions if the
            // websocket was successfully opened.
            //ws.onopen = () => {
                LiveAudioStream.on('data', data => {
                    // base64-encoded audio data chunks
                    var chunk = Buffer.from(data, 'base64');
                    console.log("Listening to voice...");
                    console.log(chunk.toString("utf8"));
                    //ws.send(JSON.stringify({ "audio_data": chunk.toString("utf8") }));
                });
            //};

            //ws.onerror = (e) => {
                // If an error occurs the view should probably update.
                // Update a state in order to give a notifcation or use some sort
                // of live notif.
                // Also close the LiveAudioStream and disable it from opening again 
                // if possible.
            //};
        } else {
            console.log("Microphone permission denied.");
        }
    } catch (err) {
        console.warn(err);
    }
};


const VoiceTest = () => {
    const API_KEY = process.env.ASSEMBLY_AI_API_KEY;
    const isInitialMount = useRef(true);
    const [isListening, setListening] = useState(false);

    useEffect(() => {
        if (isInitialMount.current) {
            requestRecordPermissions();
            isInitialMount.current = false;
        }
    });

    function toggleListening () {
        if (isListening) {
            console.log("Turned off listening.");
            LiveAudioStream.stop();
        }
        else {
            console.log("Turned on listening.");
            LiveAudioStream.start();
        }
        setListening(!isListening);
    }

    return (
        <View style={styles.container}>
            <Button title="Solid" onPress={() => toggleListening()}>
                <Icon 
                    name={isListening ? "microphone" : "microphone-slash"} 
                    type="font-awesome"
                />
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default VoiceTest;
