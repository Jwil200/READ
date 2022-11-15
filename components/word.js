import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dialog } from '@rneui/themed';

const styles = StyleSheet.create({
    text: {
        fontSize: 15
    },
    container: {
        paddingRight: 5
    }
});

const Word = (props) => {
    const [wordSearch, setWordSearch] = useState("");

    let word = props.text.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    let pronunciation = "Unable to get pronunciation at this time.";

    if (!wordSearch) { // Not sure if this works.
        // Make call to API here and set pronunciation.
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setWordSearch(word)}
            >
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
            <Dialog
                isVisible={!(wordSearch === "")}
                onBackdropPress={() => setWordSearch("")}
            >
                <Text>{pronunciation}</Text>
            </Dialog>
        </View>
    );
};
export default Word;