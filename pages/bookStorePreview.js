// components/bookStorePreview.js *Based on bookPreview.js currently
import React,  { Component, useEffect, useState  } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';


const OrangeButton = ({ title, onPress }) => (
  <TouchableOpacity onPress= {onPress}>
    <LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer2}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);


const BookStorePreview = (props) => {
    const book = props.route.params.props;
    const db = firestore();
    const currentUid = auth().currentUser.uid;
    const navigation = useNavigation();

    const[isCheck, setCheck] = useState(false);

    const doesDocExist = async() => {//Checks to see if book is in users library
      return firestore()
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
      .get()
      .then((doc) => {
          console.log("In database: ", doc.exists);//console check
          setCheck(doc.exists)
          return doc.exists
      })
    }

    const isInLibrary = async() =>{ //Checks to see if the inLibrary field is true or false
      return db
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
      .get()
      .then(doc => {
        const dat = doc.data();
        console.log("In library: ", dat.inLibrary);//console check 
        let check = dat.inLibrary;
        return check
      })
    }

    
    const dashboard = () =>{
      navigation.navigate('Tabbar');
    }

    const addBook = async () => {//add selected book to user sub library
      if(isCheck == false) {
        await db
        .collection('Users/' + currentUid + '/Library')
        .doc(book.title)
        .set({
          Name: book.title,
          Progress: 0,
          WordCount: 0,
          Favorite: false,
          dateAdded: firestore.FieldValue.serverTimestamp(),
          inLibrary: true
        })
        .then(()=>{
          Alert.alert('Book added to your library!!')
        })
      }else if(isCheck == true){
        let check2 = await isInLibrary()
        if(check2 == false){
          await db
          .collection('Users/' + currentUid + '/Library' )
          .doc(book.title)
          .update({
            inLibrary: true
          })
          .then(() => {
            Alert.alert('Book added to your library!!')
          })
        }
        else{Alert.alert('Book is already in your library')}
      }
  }

  useEffect(() => {
    doesDocExist();
  }, [])
      
  return (
    <ScrollView style={styles.bookPreviewContainer}>

      <View>
        <Text
        style={styles.bookTitle}>
        {book.title}
        </Text>

        <View style={styles.bookPreviewImage}>
          <Tile  
          imageSrc={{
              uri: book.coverUrl
          }}
          imageProps={{
            resizeMode:"cover",
          }}
          width={250}
          height={400}
          ></Tile>
        </View>
      </View>

      <Text style={styles.bookPreviewProgress}>Rating: {book.rating}/5</Text>

      <Text>
      {book.description}{"\n"}
      </Text>
    
      {(isCheck) ? 
          <OrangeButton 
          title="add to Library" 
          size="sm"
          onPress = {() => addBook()}
          /> :
          <OrangeButton 
          title="Add to Library" 
          size="sm" 
          onPress = {() => addBook()}
            />
        }

    </ScrollView>
  );

}
export default BookStorePreview;