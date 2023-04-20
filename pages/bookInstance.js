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

const BookInstance = ({route, navigation}) => {
  const ref = useRef(null);
  const testPos = useRef(0);
  const [bookData, setBookData] = useState(null);
  const [page, setPage] = useState(1);

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

  const test = () => {
    ref.current.startSearchMode(bookData.content[testPos.current], false, false);
    console.log(`Index: ${testPos.current} | Content: ${bookData.content[testPos.current]}`);
    testPos.current += 1;
    if (testPos.current >= bookData.content.length)
      testPos.current -= 1;
  }

  const highlightLine = (pos) => {
    let text = bookData.content[pos];
    ref.current.startSearchMode(text, false, false);
  }

  const changePage = (pageNum) => {
    console.log(ref.current.setCurrentPage)
    ref.current.setCurrentPage(pageNum);
    //console.log(ref.current._viewerRef.viewConfig.NativeProps.pageNumber);
    //ref.current._viewerRef.viewConfig.NativeProps.pageNumber = pageNum;
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
        onLeadingNavButtonPressed={() => {
          //test();
          navigation.navigate("Dashboard")
        }}
        hideScrollbars={true}
        reflowOrientation={Config.ReflowOrientation.Horizontal} 
        layoutMode={Config.LayoutMode.Single}
        initialPageNumber={1}
        pageIndicatorEnabled={false}
        onPageChanged={({previousPageNumber, pageNumber}) => {
              /*
              console.log("Prev " + previousPageNumber);
              console.log("Page " + page);
              console.log("Curr " + pageNumber);
              console.log("\n");
              */
          //changePage(previousPageNumber);
        }}
        longPressMenuEnabled={true}
        onLongPressMenuPress = {({longPressMenu, longPressText}) => { 
          console.log('Long press menu item', longPressMenu, 'has been pressed');
          if (longPressText !== '') {
            console.log('The selected text is', longPressText);
          }
        }}
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
export default BookInstance;