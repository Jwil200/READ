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
  console.log(Dimensions.get('window').height);

  const ref = useRef(null);
  const testPos = useRef(0);
  const [bookData, setBookData] = useState(null);
  const [readingData, setReadingData] = useState({
    position: 0,
    correct: 0,
    incorrect: 0,
    variant: "none",
    bookTitle: route.params.book.bookTitle,
    bookCover: route.params.book.Cover,
  });
  const initialPosition = 0;
  const pressedOnce = useRef(false);

  useEffect(() => {
    RNPdftron.initialize("Insert commercial license key here after purchase");
    RNPdftron.enableJavaScript(true);
    let book_data = {...route.params.book};
    let contents = [];
    book_data.Content.forEach(line => {
      line.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").forEach(e => {
        contents.push(e);
      });
    });
    book_data.Content = contents;
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
      {readingData.variant === "perfect" 
        ? <PerfectScoreAnimation visible={true} />
        : <BadgeAnimation variant={readingData.variant}/>
      }
      <DocumentView
        ref={(c) => ref.current = c}
        document={path}
        onLoadComplete={() => highlightLine(0)}
        disabledElements={Object.values(Config.Buttons)}
        onLeadingNavButtonPressed={() => {
          navigation.navigate("ResultPage", {...readingData, "total": bookData.Content.length});
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
          textArray={bookData.Content}
          next={highlightLine}
          readingData={readingData}
          setReadingData={setReadingData}
        />
      </View>
      </>
      : <Text>Sorry!</Text>
    );
}
export default BookInstance;