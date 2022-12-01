import React, { Component, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20
    }
});

const Sentence = (props) => {
    const [isHighlighted, setHighlighted] = useState(false);

    highlight = {}
    
    if (isHighlighted) {
        highlight.backgroundColor = "yellow";
    }

    return (
        <View style={{...styles.container, highlight}}>
            {item.content.split(" ").map(e => <Word key={"w"+(j++)} text={e}/>)}
        </View>
    );
};
export default Sentence;