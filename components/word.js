import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dialog, Divider } from '@rneui/themed';
import { WORDNIK_API_KEY } from "@env";

const styles = StyleSheet.create({
    text: {
        fontSize: 15
    },
    container: {
        paddingRight: 5
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    divider: {
        marginVertical: 5
    }
});

const ERROR_MESSAGE = "Unable to get pronunciation at this time.";
const SEARCH_MESSAGE = "SEARCH";

const getPronunciation = async (word) => {
    pronunciation = "";

    const url = `https://api.wordnik.com/v4/word.json/${word}/pronunciations?useCanonical=true&limit=1&api_key=3zanqif2xwfhwlafs2krsy0iz5j5nx4uaf8dtxnldps1bkfvk`;
    const options = {
        headers: {
            Accept: 'application/json'
        }
    };

    await fetch(url, options)
    .then(res => {
        if (res.ok) return res.json();
        throw new Error("Error: Response Failed.");
    })
    .then(data => {
        pronunciation = data[0].raw;
    })
    .catch (error => {
        pronunciation = ERROR_MESSAGE;
    });

    return pronunciation;
}

const Word = (props) => {
    const [state, setState] = useState({
        wordSearch: false,
        pronunciation: ERROR_MESSAGE
    });

    let word = props.text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();

    if (state.wordSearch && state.pronunciation === SEARCH_MESSAGE) {
        // Make call to API here and set pronunciation.
        getPronunciation(word)
        .then(res => {
            setState({
                wordSearch: true,
                pronunciation: res
            });
        });
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setState({
                    wordSearch: true,
                    pronunciation: (state.pronunciation === ERROR_MESSAGE ? SEARCH_MESSAGE : state.pronunciation)
                })}
            >
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
            <Dialog
                isVisible={state.wordSearch}
                onBackdropPress={() => setState({
                    wordSearch: false,
                    pronunciation: state.pronunciation
                })}
            >
                <Text style={styles.heading}>{word}</Text>
                <Divider 
                    style={styles.divider}
                    width={1}
                />
                {(state.pronunciation === SEARCH_MESSAGE)
                ? 
                    <ActivityIndicator color="blue" />
                :
                    <Text>{state.pronunciation}</Text>
                }
            </Dialog>
        </View>
    );
};
export default Word;