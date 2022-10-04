import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 35
    },
    text: {
        textAlign: "center",
        fontSize: 20
    }
  });

const VoiceTest = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello!</Text>
        </View>
    );
}
export default VoiceTest;