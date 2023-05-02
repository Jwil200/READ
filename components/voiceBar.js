import React, { Component, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
import { Divider, Button } from '@rneui/themed';
import LiveAudioStream from 'react-native-live-audio-stream';
import { ASSEMBLY_AI_API_KEY } from "@env";



// How similar two strings have to be in order to pass
// If there is less than 10 words defaults to 50%
const PERCENT_SIMILAR = 0.70;
const PERFECT_SCORE = 0.90;

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

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);          
}

function min (x, y) {
    if (x < y)
        return x;
    return y;
}
  
function distance (s1, s2) {
    let costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = min(min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
  
function longerShorterString (x, y) {
    if (x.length > y.length)
        return {longer: x, shorter: y};
    return {longer: y, shorter: x};
}
  
function similarity(s1, s2, longer, shorter, longerLength) {
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - distance(longer, shorter)) / parseFloat(longerLength);
}

// This can generate some false positives.
function isSimilar(spoken, text) {
    // We set a limit variable here, as the limit should be reduced for shorter sentences.
    let limit = PERCENT_SIMILAR;
    
    let s1 = "";
    spoken.forEach(e => s1 += e + " ");
    let s2 = "";
    text.forEach(e => s2 += e + " ");

    console.log(s1);
    console.log(s2);

    const {longer, shorter} = longerShorterString(s1, s2);
    const longerLength = longer.length;
    if (longerLength < 10)
        limit = 0.5;

    let percentSame = similarity(s1, s2, longer, shorter, longerLength);
    console.log(percentSame);
    return [(percentSame >= limit), (percentSame >= PERFECT_SCORE)];
}

const VoiceBar = (props) => {
    console.log("---VoiceBar---");
    console.log(props.readingData);
    const isInitialMount = useRef(true);
    const ws = useRef(null);
    
    const [dummy, setDummy] = useState(0);
    const rData = useRef({});
    rData.current = props.readingData;
    console.log(rData.current.position);
    const incorrectCounter = useRef(0);
    const respText = useRef("Waiting...");
    const [isListening, setListening] = useState(false); // Could consolidate into one state object with setState

    const fullText = [];
    props.textArray.forEach((e, index) => {
        fullText[index] = [];
        e.split(" ").forEach(word => {
            if (!isLetter(word.charAt(0))) word = word.substring(1);
            if (!isLetter(word.charAt(word.length - 1))) word = word.substring(0, word.length - 1);
            fullText[index].push(word.toLowerCase());
        });
    });

    //console.log(fullText);

    useEffect(() => {
        if (isInitialMount.current) return;
        respText.current = "Good!";
        setTimeout(() => {
            respText.current = "Waiting...";
            setDummy(dummy + 1);
        }, 2000);
        props.next(props.readingData.position);
    }, [props.readingData.position]);

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
                let texts = [];
                switch (data.message_type) {
                    case "PartialTranscript":
                        texts = data.words.map(w => w.text);
                        if (texts.length == 0)
                            break;
                        console.log(`Text: ${texts}`);
                        break;
                    case "FinalTranscript": // Use this to determine if we should proceed or not
                        if (data.text === "") return;
                        texts = data.words.map(word => {
                            word = word.text;
                            if (!isLetter(word.charAt(0))) word = word.substring(1);
                            if (!isLetter(word.charAt(word.length - 1))) word = word.substring(0, word.length - 1);
                            return word.toLowerCase();
                        });
                        console.log(rData.current);
                        let p = rData.current.position;
                        console.log("Final: " + texts + "\n");
                        console.log("Position: " + p);
                        console.log(fullText[p]);
                        let [isSame, isPerfect] = isSimilar(texts, fullText[p]);
                        console.log("Same?: " + isSame);
                        if (!isSame)
                            incorrectCounter.current += 1;
                        if (!isSame && incorrectCounter.current < 3) {
                            props.setReadingData({
                                ...rData.current,
                                incorrect: rData.current.incorrect + 1,
                                variant: ((incorrectCounter.current == 2) ? "oneMore" : "incorrect")
                            })
                            return;
                        }
                        let augmentIncorrect = false;
                        if (incorrectCounter.current == 3) {
                            incorrectCounter.current = 0;
                            augmentIncorrect = true;
                        }
                        console.log("Spoken and input match!");
                        props.setReadingData({
                            ...rData.current,
                            position: p + 1,
                            correct: rData.current.correct + 1,
                            variant: "correct",
                            incorrect: (augmentIncorrect ? rData.current.incorrect + 1 : rData.current.incorrect)
                        });
                        break;
                    case "SessionBegins":
                        console.log("Established connection to AssemblyAI");
                        break;
                    case "SessionTerminated":
                        console.log("Closed connection to AssemblyAI");
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

    return (<>
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
            >{respText.current}</Text>
        </View>
    </>);
};
export default VoiceBar;