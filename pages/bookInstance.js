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
  Dimensions,
} from "react-native";
import { DocumentView, RNPdftron, PDFViewCtrl, Config } from "@pdftron/react-native-pdf";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import VoiceBar from "../components/voiceBar";
import PerfectScoreAnimation from "../components/perfectScoreAnimation";
import BadgeAnimation from "../components/badgeAnimation";

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
  const [bookData, setBookData] = useState({...route.params.book});
  const initialPosition = bookData.Progress;
  const [readingData, setReadingData] = useState({
    position: initialPosition,
    correct: 0,
    incorrect: 0,
    variant: "none",
    bookTitle: route.params.book.bookTitle,
    bookCover: route.params.book.Cover,
  });
  const pressedOnce = useRef(false);

  useEffect(() => {
    RNPdftron.initialize("Insert commercial license key here after purchase");
    RNPdftron.enableJavaScript(true);
  }, []);

  useEffect(() => {
    if ((readingData.position) === bookData.Content.length) {
      navigation.navigate("ResultPage", {...readingData, "total": bookData.Content.length, "initial": initialPosition});
    }
  }, [readingData]);

  const test = () => {
    ref.current.startSearchMode(bookData.Content[testPos.current], false, false);
    console.log(`Index: ${testPos.current} | Content: ${bookData.Content[testPos.current]}`);
    testPos.current += 1;
    if (testPos.current >= bookData.Content.length)
      testPos.current -= 1;
  }

  const highlightLine = (pos) => {
    let text = bookData.Content[pos];
    ref.current.startSearchMode(text, false, false);
  }
  
  const path = bookData ? bookData.Link : "https://www.cdc.gov/ncbddd/actearly/documents/amazing_me_final_version_508.pdf";

  return (
    bookData
    ? <>
      { <BadgeAnimation variant={readingData.variant}/> }
      <DocumentView
        ref={(c) => ref.current = c}
        document={path}
        onLoadComplete={() => highlightLine(initialPosition)}
        disabledElements={Object.values(Config.Buttons)}
        onLeadingNavButtonPressed={() => {
          navigation.navigate("ResultPage", {...readingData, "total": bookData.Content.length, "initial": initialPosition});
        }}
        hideScrollbars={true}
        reflowOrientation={Config.ReflowOrientation.Horizontal} 
        layoutMode={Config.LayoutMode.Single}
        initialPageNumber={1}
        pageIndicatorEnabled={false}
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
          textArray={bookData.Content}
          next={highlightLine}
          readingData={readingData}
          setReadingData={setReadingData}
          totalLines={bookData.Content.length}
        />
      </View>
      </>
      : <Text>Sorry!</Text>
    );
}
export default BookInstance;