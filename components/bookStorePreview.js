// components/bookStorePreview.js *Based on bookPreview.js currently
import React,  { Component, useEffect, useState  } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const OrangeButton = ({ title }) => (
  <TouchableOpacity onPress={addBook}>
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

    const removeBook = async() => {//removes selected book from users library subcollection
      await db
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
      .delete()
      .then(() => {
        console.log('Book removed from your library!!')
      })
    }
    const checkForBook = async() => {//checks to see if the book is in users library
      await db
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
    }

    const addBook = async () => {//add selected book to user sub library
      await db
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
      .set({
        age: book.age,
        author: book.author,
        cover: book.coverUrl,
        description: book.description,
        name: book.title,

      })
      .then(()=>{
        console.log("Book added to your library!!");
      })
    }
      
  return (
    <View style={styles.bookPreviewContainer}>

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
    
      {book.isAddedtoCart ? 
          <OrangeButton 
          title="Remove from Library" 
          size="sm"
          /> :
          <OrangeButton 
          title="Add to Library" 
          size="sm" 
            />
        }

    </View>
  );

}
export default BookStorePreview;