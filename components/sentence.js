import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Word from "./word";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 18,
        padding: 2
    }
});

const Sentence = (props) => {

    let highlight = {}
    
    if (props.num == props.pos) {
        highlight.backgroundColor = "yellow";
    }

    let j = 0;

    return (
        <View style={{...styles.container, ...highlight}}>
            {props.content.split(" ").map(e => <Word key={"w"+props.pos+""+(j++)} text={e}/>)}
        </View>
    );
};
export default Sentence;