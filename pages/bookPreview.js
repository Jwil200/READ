// components/bookPreview.js, what the user is taken to when they tap on a book.
import React, { useState, useEffect} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrangeButton from '../assets/orangeButton';
import { Tile, Divider } from "@rneui/themed";
import { ProgressButton } from 'react-native-progress-button';



const BookPreview = (props) => {
  console.log(props);
  const book = props.route.params.props;
  const db = firestore();
  const currentUid = auth().currentUser.uid;
  const navigation = useNavigation();

  const [isFavorite, setISFavorite] = useState(book.favorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavoriteStatus();
  }, []);

  const fetchFavoriteStatus = () => {
    try {
      setIsLoading(true);
      db.collection('Users/' + currentUid + '/Library')
        .doc(book.title)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setISFavorite(data.Favorite);
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log('Favorite status: ', isFavorite);
  };

const toggleFavorite = async () => {
  if(isFavorite) {
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      Favorite: false
      });
    setISFavorite(false);
    //navigation.goBack();
    }
      
  else {
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      Favorite: true,
    });
    setISFavorite(true);
  }
};
  

  
  //console tests
  //console.log('Book details', book)
  //console.log('word Count: ', book.wordCount)
  //console.log("Book progres", book.progress)
  console.log("Book link", book.link)
  
  const removeBook = async() => {//changes the inLibrary to false for this book
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .update({
      inLibrary: false
    })
    .then(() => {
      console.log('Book removed from your library!!');
    })
    Alert.alert("Book Removed from your Library")
  }


 

  return (
    <ScrollView style={styles.bookPreviewContainer}>
    <View style={{alignItems: 'center'}}>
    <Image  
          source={{uri: book.coverUrl}}
          style={styles.bookPreviewImage}
          resizeMode="contain"
      />
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={50} color="#FFA500" />
        </TouchableOpacity>
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
      <OrangeButton title="Begin Reading" size="sm" onPress={() => navigation.navigate('BookInstance', {book})} />
    ) : (
      <OrangeButton title="Continue Reading" size="sm" onPress={() => navigation.navigate('BookInstance', {book})} />
    )}
  </ScrollView>
  );
}
export default BookPreview;