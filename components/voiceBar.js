import React, { Component, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import { Divider, Button } from '@rneui/themed';
import LiveAudioStream from 'react-native-live-audio-stream';
import { ASSEMBLY_AI_API_KEY } from "@env";

// Options for LiveAudioStream
const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    bufferSize: 4096 * 2 // default is 2048
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'blue',
        border: 1,
        borderRadius: 10,
        padding: 5,
        
        elevation: 3
    },
    button: {
        flex: 0.15
    },
    divider: {
        marginLeft: 5,
        marginRight: 5
    },
    text: {
        flex: 0.75,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

// Potentially move this to App.js so permissions are asked upon launch of the app.
// That way if permissions aren't granted we can block opening books, and can init the audio stream
// first and use it throughout the program.
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Initializing audio stream.");
            LiveAudioStream.init(options); // Audio Stream is setup once the voiceBar is instanced.
        } else {
            console.log("Microphone permission denied.");
        }
    } catch (err) {
        console.warn(err);
    }
};

const VoiceBar = (props) => {
    const isInitialMount = useRef(true);
    const ws = useRef(null);
    
    const [position, setPosition] = useState(0); // Which sentence are we on
    const [isListening, setListening] = useState(false); // Could consolidate into one state object with setState

    useEffect(() => {
        if (isInitialMount.current) {
            requestRecordPermissions();
            isInitialMount.current = false;
            return;
        }
        if (isListening) {
            ws.current = new WebSocket("wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000", "", {
                headers: {
                    Authorization: `${ASSEMBLY_AI_API_KEY}`
                }
            });

            ws.current.onopen = () => {
                LiveAudioStream.on('data', data => {
                    // base64-encoded audio data chunks
                    ws.current.send(JSON.stringify({ "audio_data": data }));
                });
            };

            // Move this function outside for clarity.
            ws.current.onmessage = (e) => {
                let data = JSON.parse(e.data);
                switch (data.message_type) {
                    case "PartialTranscript":
                        let texts = data.words.map(w => w.text);
                        console.log(`Text: ${texts}`);
                        break;
                    case "SessionBegins":
                        console.log("Established connection to AssemblyAI");
                        break;
                    case "FinalTranscript": // Use this to determine if we should proceed or not
                        if (data.text === "") return;
                        let texts = data.words.map(w => w.text);
                        let isSame = true;
                        texts.forEach((e, index) => {
                            if (!(e === props.textArray[position][index])) isSame = false;
                        });
                        if (!isSame) return;
                        console.log("Spoken and input match!");
                        setPosition(position + 1);
                        break;
                    default:
                        if (data.message_type === undefined)
                            console.log(`Error: ${data.error}`)
                        else
                            console.log(`Unknown Message Type: ${data.message_type}`);
                }
            };
            LiveAudioStream.start();
        }
        else {
            LiveAudioStream.stop();
            ws.current.send(JSON.stringify({
                "terminate_session": true
            }));
        }
    }, [isListening]);

    return (
        <View style={styles.container}>
            <Button 
                style={styles.button}
                onPress={() => { setListening(!isListening); }}
                icon={{
                    name: isListening ? "microphone" : "microphone-slash",
                    type: 'font-awesome',
                    size: 25,
                    color: 'white',
                }}
                buttonSize='md'
            />
            <Divider 
                style={styles.divider}
                orientation="vertical" 
                width={2}
                color='white'
            />
            <Text 
                style={styles.text}
            >{props.textArray[position]}</Text>
        </View>
    );
};
export default VoiceBar;