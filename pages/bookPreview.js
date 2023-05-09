// components/bookPreview.js, what the user is taken to when they tap on a book.
import React, { useState, useEffect, useContext} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrangeButton from '../assets/orangeButton';
import { Tile, Divider } from "@rneui/themed";
import { ProgressButton } from 'react-native-progress-button';
import DarkModeContext from '../components/DarkModeContext';



const BookPreview = (props) => {
  console.log(props);
  const book = props.route.params.props;
  const db = firestore();
  const currentUid = auth().currentUser.uid;
  const navigation = useNavigation();
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const [isFavorite, setISFavorite] = useState(book.Favorite);
  const [isLoading, setIsLoading] = useState(false);

  const dynamicStyles = {
    backgroundColor: isDarkModeEnabled ? '#303030' : 'white',
    color: isDarkModeEnabled ? 'white' : 'black',
  };

  useEffect(() => {
    fetchFavoriteStatus();
  }, []);

  const fetchFavoriteStatus = () => {
    try {
      setIsLoading(true);
      db.collection('Users/' + currentUid + '/Library')
        .doc(book.bookTitle)
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
    .doc(book.bookTitle)
    .update({
      Favorite: false
      });
    setISFavorite(false);
    //navigation.goBack();
    }
      
  else {
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.bookTitle)
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
    .doc(book.bookTitle)
    .update({
      inLibrary: false
    })
    .then(() => {
      console.log('Book removed from your library!!');
    })
    Alert.alert("Book Removed from your Library")
  }


  let progress = book.Progress;
  if (book.Completed) {
    progress = book.Content.length;
  }
  else if (book.ReadOnce && progress == 0) {
    progress = 1;
  }

  return (
    <ScrollView style={{padding: 10, backgroundColor: isDarkModeEnabled ? '#303030' : 'white'}}>
    <View style={{alignItems: 'center'}}>
    <Image  
          source={{uri: book.Cover}}
          style={styles.bookPreviewImage}
          resizeMode="contain"
      />
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={50} color="#FFA500" />
        </TouchableOpacity>
    </View>
    <Text style={[styles.bookTitle, {color: dynamicStyles.color}]}>{book.bookTitle}</Text>
    <Text style={[styles.bookPreviewDescription, {color: dynamicStyles.color}]}>{book.Author}</Text>
    <Text style={[styles.bookPreviewDescription, {color: dynamicStyles.color}]}>{book.Description}</Text>

    {progress == 0 ? (
      <Text style={styles.bookPreviewProgress}>Progress: Not Yet Started</Text>
    ) : (
      <Text style={styles.bookPreviewProgress}>Progress: {Math.floor((book.Progress/book.Content.length) * 100)}% Complete</Text>
    )}
    {progress == 0 ? (
      <OrangeButton title="Begin Reading" size="sm" onPress={() => navigation.navigate('BookInstance', {book})} />
    ) : (
      <OrangeButton title="Continue Reading" size="sm" onPress={() => navigation.navigate('BookInstance', {book})} />
    )}
  </ScrollView>
  );
}
export default BookPreview;