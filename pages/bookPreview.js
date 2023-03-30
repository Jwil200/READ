// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrangeButton from '../assets/orangeButton';


const BookPreview = (props) => {
  const book = props.route.params.props;
  const db = firestore();
  const currentUid = auth().currentUser.uid;
  const navigation = useNavigation();


  
  //console tests
  console.log('Book details', book)
  console.log('word Count: ', book.wordCount)
  console.log("Book progres", book.progress)
  
  const removeBook = async() => {//changes the inLibrary to false for this book
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      inLibrary: false
    })
    .then(() => {
      console.log('Book removed from your library!!')
      navigation.navigate('Tabbar');

    })
    Alert.alert("Book Removed from your Library")
  }

  const addFavorite = async() =>{// adds to favorite
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      'Favorite': true
    })
  }

  const removeFavorite = async() => {//removes from favorites
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      'Favorite': false
    })
  }

  return (
    <ScrollView style={styles.bookPreviewContainer}>
    <View style={{alignItems: 'center'}}>
    <Image  
          source={{uri: book.coverUrl}}
          style={styles.bookPreviewImage}
          resizeMode="contain"
      />
            
    </View>
    <Text style={styles.bookTitle}>{book.title}</Text>
    <Text style={styles.bookPreviewDescription}>{book.author}</Text>
    <Text style={styles.bookPreviewDescription}>{book.description}</Text>
    {book.progress == 0.00 ? (
      <Text style={styles.bookPreviewProgress}>Progress: Not Yet Started</Text>
    ) : (
      <Text style={styles.bookPreviewProgress}>Progress: {book.progress}% Complete</Text>
    )}
    {book.progress == 0.00 ? (
      <OrangeButton title="Begin Reading" size="sm" onPress={() => navigation.navigate('Book View', {book})} />
    ) : (
      <OrangeButton title="Continue Reading" size="sm" onPress={() => navigation.navigate('Book View', {book})} />
    )}
  </ScrollView>
  );
}
export default BookPreview;