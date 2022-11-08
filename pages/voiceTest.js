import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, LogBox } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import LiveAudioStream from 'react-native-live-audio-stream';
import { ASSEMBLY_AI_API_KEY } from "@env";
import VoiceBar from "../components/voiceBar";

// Function for testing data against a RegEx Expression.
function getBase64_RegEx () {
    let regString = "(";
    for (let i = 65; i <= 90; i++) {
        regString += String.fromCharCode(i) + "+" + String.fromCharCode(i + 32) + "+"
    }
    for (let i = 0; i < 10; i++) {
        regString += "" + i + "+"
    }
    regString += "\\++\\/)*";
    return new RegExp(regString);
}

const requestRecordPermissions = async (setText) => {
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

            const ws = new WebSocket("wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000", "", {
                headers: {
                    Authorization: `1a3adb92e6054140b432532233275f27`
                }
            });
            
            // We put this in open so that way we are only performing any actions if the
            // websocket was successfully opened.
            ws.onopen = () => {
                LiveAudioStream.on('data', data => {
                    // base64-encoded audio data chunks
                    //console.log("Listening to voice...");
                    // Testing setting the text.
                    //setText("" + Math.floor(Math.random() * 10));
                    ws.send(JSON.stringify({ "audio_data": data }));
                });
            };

            ws.onmessage = (e) => {
                //console.log(e);
                let data = JSON.parse(e.data);
                switch (data.message_type) {
                    case "PartialTranscript":
                        let texts = data.words.map(w => w.text);
                        let text = (texts.length == 0) ? "" : texts[texts.length - 1];
                        setText(text);
                        console.log(`Text: ${text}`);
                        break;
                    case "SessionBegins":
                        console.log("Established connection to AssemblyAI");
                    default:
                        if (data.message_type === undefined)
                            console.log(`Error: ${data.error}`)
                        else
                            console.log(`Unknown Message Type: ${data.message_type}`);
                }
                //console.log(e);
            };
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
    const isInitialMount = useRef(true);
    const [text, setText] = useState("N/A");
    

    useEffect(() => {
        if (isInitialMount.current) {
            //requestRecordPermissions(setText);
            isInitialMount.current = false;
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.main_body_container}>
                <Text>Some text or a PDF will go here.</Text>
            </View>
            <View style={styles.voice_box_container}>
                <VoiceBar 
                    text={text} 
                    correct={1}

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
