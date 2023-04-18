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
import { DocumentView, RNPdftron, PDFViewCtrl, Config } from "@pdftron/react-native-pdf";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import VoiceBar from "../components/voiceBar";

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

const PDFTest = ({route, navigation}) => {
  //const [ref, setRef] = useState(null);
  const ref = useRef(null);
  const [bookData, setBookData] = useState(null);
  const [page, setPage] = useState(1);

  //console.log(route)
  //console.log(navigation)

  useEffect(() => {
    RNPdftron.initialize("Insert commercial license key here after purchase");
    RNPdftron.enableJavaScript(true);
    let book_data = {...route.params.book};
    let contents = [];
    book_data.content.forEach(line => {
      line.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").forEach(e => {
        contents.push(e);
      });
    });
    book_data.content = contents;
    console.log(book_data);
    setBookData(book_data);
    //console.log(data);
  }, []);

  const removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }

  const highlightLine = (pos) => {
    ref.current.startSearchMode(bookData.content[pos], false, false);
  }
  
  const path = bookData ? bookData.link : "https://www.cdc.gov/ncbddd/actearly/documents/amazing_me_final_version_508.pdf";

    return (
      bookData
      ? <>
          <DocumentView
            ref={(c) => ref.current = c}
            document={path}
            onLoadComplete={() => highlightLine(0)}
            disabledElements={Object.values(Config.Buttons)}
            onLeadingNavButtonPressed={() => navigation.navigate("Dashboard")}
            hideScrollbars={true}
            reflowOrientation={Config.ReflowOrientation.Horizontal} 
            layoutMode={Config.LayoutMode.Single}
            initialPageNumber={1}
            pageIndicatorEnabled={false}
          />
        <View style={styles.voice_box_container}>
          <VoiceBar 
            textArray={bookData.content}
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