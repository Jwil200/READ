// components/bookStorePreview.js *Based on bookPreview.js currently
import React,  { Component, useEffect, useState  } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const OrangeButton = ({ onPress, title }) => (
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
    const[isCheck, setCheck] = useState(false);
    console.log(isCheck);
    console.log(book.title);

    const doesDocExist = async() => {//Checks to see if book is in users library
      return firestore()
      .collection('Users/' + currentUid + '/Library')
      .doc(book.title)
      .get()
      .then((doc) => {
          setCheck(doc.exists)
          return doc.exists
      })
    }

    addBook = async () => {//add selected book to user sub library
      let doesbookExist = await doesDocExist();
      if(isCheck == false) {
        console.log('name: ', book._id);
        console.log('age: ', book.age);
        console.log('cover url: ', book.coverUrl);
        console.log('description: ', book.description);
        console.log('Author: ', book.author);
        console.log('Content: ', book.content)
        await db
        .collection('Users/' + currentUid + '/Library')
        .doc(book.title)
        .set({
          Author: book.author,
          Cover: book.coverUrl,
          Description: book.description,
          Name: book.title,
          Progress: 0,
          Content: book.content,
        })
        .then(()=>{
          Alert.alert('Book added to your library!!')
        })
      }else{
        Alert.alert('Book is already in your library')
      }
  }

  useEffect(() => {
    doesDocExist();
  }, [])
      
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