// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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



const BookPreview = (props) => {
  const book = props.route.params.props;
  const db = firestore();
  const currentUid = auth().currentUser.uid;
  const navigation = useNavigation();
  console.log('Book details', book)
  const removeBook = async() => {//removes selected book from users library subcollection
    await db
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .delete()
    .then(() => {
      console.log('Book removed from your library!!')
      navigation.navigate('Dashboard');

    })
    Alert.alert("Book Removed from your Library")
  }
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

      <Text>
        {book.description}{"\n"}
      </Text>
    
      {book.progress == 0.00 ? 
      <Text style={styles.bookPreviewProgress}>Progress: Not Yet Started</Text> : 
      <Text style={styles.bookPreviewProgress}>Progress: {book.progress}% Complete</Text> }
        
      {book.progress == 0.00 ? 
          <OrangeButton 
          title="Begin Reading" 
          size="sm" 
          onPress ={() => navigation.navigate('Dashboard', {props})}
          /> :
          <OrangeButton 
          title="Continue Reading" 
          size="sm" 
          onPress ={() => navigation.navigate('Dashboard', {props})}
            />

        }
      <Text 
      style={styles.loginText}
      onPress={removeBook}>
      Remove Book?
    </Text> 
    </ScrollView>
  );
}
export default BookPreview;