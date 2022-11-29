import React, { Component, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import { Divider, Button } from '@rneui/themed';
import LiveAudioStream from 'react-native-live-audio-stream';
import { ASSEMBLY_AI_API_KEY } from "@env";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'blue',
        border: 1,
        borderRadius: 10,
        padding: 5,
        
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
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

const requestRecordPermissions = async (textArray, setPosition) => {
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
                    Authorization: `${ASSEMBLY_AI_API_KEY}`
                }
            });
            
            // We put this in open so that way we are only performing any actions if the
            // websocket was successfully opened.
            ws.onopen = () => {
                LiveAudioStream.on('data', data => {
                    // base64-encoded audio data chunks
                    ws.send(JSON.stringify({ "audio_data": data }));
                });
            };

            let position = 0;

            ws.onmessage = (e) => {
                let data = JSON.parse(e.data);
                switch (data.message_type) {
                    case "PartialTranscript":
                        let texts = data.words.map(w => w.text);
                        let text = (texts.length == 0) ? "" : texts[texts.length - 1];
                        if (textArray[position].toLowerCase() === text) {
                            position++;
                            setPosition(position);
                        }
                        else if (!(text === "")) {
                            console.log(`Got: ${text} | Looking For: ${textArray[position].toLowerCase()}`);
                        }
                        console.log(`Text: ${texts}`);
                        break;
                    case "SessionBegins":
                        console.log("Established connection to AssemblyAI");
                        break;
                    case "FinalTranscript":
                        if (!(data.text === ""))
                            console.log(`Final: ${data.text}`);
                        break;
                    default:
                        if (data.message_type === undefined)
                            console.log(`Error: ${data.error}`)
                        else
                            console.log(`Unknown Message Type: ${data.message_type}`);
                }
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

const VoiceBar = (props) => {
    const isInitialMount = useRef(true);
    const textArray = useRef(props.textArray).current;

    const [isListening, setListening] = useState(false); // Could consolidate into one state object with setState
    const [position, setPosition] = useState(0);

    const colorAnim = useRef(new Animated.Value(1)).current;
    const anim = 1;

    if (isListening) LiveAudioStream.start(); else {
        // Close the Websocket somehow.
        LiveAudioStream.stop();
    }

    useEffect(() => {
        if (isInitialMount.current) {
            //requestRecordPermissions(textArray, setPosition);
            isInitialMount.current = false;
        }
    }, []);

    useEffect(() => { // We can have this outside of useEffect, so inside a function for onPress
        if (anim == 0)
            return;
        Animated.timing(
            colorAnim,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }
        ).start(() => Animated.timing(
            colorAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }
        ).start());
    }, [colorAnim]);

    const colorVal = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [anim == 1 ? '#ff0000' : '#00ff00', '#ffffff']
    });
    
    const animatedColor = {
        color: colorVal
    }

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
            <Animated.Text 
                style={{...styles.text, ...animatedColor}}
            >{textArray[position]}</Animated.Text>
        </View>
    );
};
export default VoiceBar;