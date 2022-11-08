import React, { Component, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { Divider, Button } from '@rneui/themed';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'blue',
        border: 1,
        borderRadius: 10,
        padding: 5
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

const VoiceBar = (props) => {
    // Default Props
    let [text, error, correct] = [props.text, props.error, props.correct];
    if (text === undefined) text = "N/A";
    if (error === undefined) error = 0;
    if (error === undefined) correct = 0;

    const [isListening, setListening] = useState(false);
    const colorAnim = useRef(new Animated.Value(1)).current;
    const anim = (error && correct) ? 0 : (error ? 1 : (correct ? 2 : 0));

    useEffect(() => {
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
                onPress={() => setListening(!isListening)}
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
            >{text}</Animated.Text>
        </View>
    );
};
export default VoiceBar;