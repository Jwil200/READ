import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, PermissionsAndroid } from 'react-native';
import { Button } from "@rneui/themed";
import AudioRecord from 'react-native-live-audio-stream';


const styles = StyleSheet.create({
    container: {
        paddingTop: 35
    },
    button: {
        width: 20
    }
});

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
        const options = {
            sampleRate: 16000, // default 44100
            channels: 1, // 1 or 2, default 1
            bitsPerSample: 16, // 8 or 16, default 16
            audioSource: 6, // android only (see below)
            bufferSize: 4096 * 2 // default is 2048
        }

        console.log(AudioRecord);
        AudioRecord.init(options);
        
        AudioRecord.start();

        AudioRecord.on('data', data => {
            // base64-encoded audio data chunks
            console.log("Stuff is happening!!!");
        });
        AudioRecord.start();
      } else {
        console.log("Microphone permission denied.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

const VoiceTest = () => {
    requestRecordPermissions();

    return (
        <View style={styles.container}>
            <Button style={styles.container}
                title="Solid" 
                type="solid" 
                loading="true" 
            />
        </View>
    );
}
export default VoiceTest;