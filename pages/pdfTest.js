import React, { Component, useState, useEffect, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
  NativeModules,
  Alert,
} from "react-native";

import VoiceBar from "../components/voiceBar";

import { DocumentView, RNPdftron, PDFViewCtrl, Config } from "@pdftron/react-native-pdf";

import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  main_body_container: {
      backgroundColor: '#fff'
  },
  voice_box_container: {
      height: '10%',
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
      bottom: 0
  },
});

const PDFTest = (props) => {
  //const [ref, setRef] = useState(null);
  const ref = useRef(null);
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    RNPdftron.initialize("Insert commercial license key here after purchase");
    RNPdftron.enableJavaScript(true);
    let data = {};
    firestore()
      .collection("Books")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc._data.Name === "Ginger the Giraffe") {
            let contents = [];
            doc._data.Content.forEach(line => {
              line.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").forEach(e => {
                contents.push(e);
              });
            });
            doc._data.Content = contents;
            setBookData(doc._data);
          }
        })
      });
    console.log(data);
  }, []);

  const removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }

  const highlightLine = (pos) => {
    ref.current.startSearchMode(bookData.Content[pos], false, false);
  }
  
  const path = bookData ? bookData.Link : "https://www.cdc.gov/ncbddd/actearly/documents/amazing_me_final_version_508.pdf";

    return (
      bookData
      ? <>
          <DocumentView
            ref={(c) => ref.current = c}
            document={path}
            onLoadComplete={() => highlightLine(0)}
            disabledElements={Object.values(Config.Buttons)}
          />
        <View style={styles.voice_box_container}>
          <VoiceBar 
            textArray={bookData.Content}
            next={highlightLine}
          />
        </View>
        </>
      : <Text>Sorry!</Text>
    );
}
export default PDFTest;

/*
<View style={styles.voice_box_container}>
          <VoiceBar 
            textArray={bookData.Content}
            next={() => {}}
          />
        </View>
*/

/*
  const onLeadingNavButtonPressed = () => {
    ref.startSearchMode("Joey", false, false);
    console.log("Starting Selection!");
    
    this._viewer.selectAll().then(() => {
      this._viewer.getPageCount().then((pageCount) => {
        for (let i = 1; i <= pageCount; i++) {
          this._viewer.getSelection(i).then((e) => {
            console.log(this.removeTags(e.html));
          });
        }
      });
    });
    
  };
*/