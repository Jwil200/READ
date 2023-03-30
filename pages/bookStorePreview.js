// components/bookStorePreview.js *Based on bookPreview.js currently
import React,  { useEffect, useState  } from 'react';
import { ScrollView, View, Text, Alert, Image } from 'react-native';
import { Tile } from "@rneui/themed";
import styles from '../assets/styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import OrangeButton from '../assets/orangeButton';


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

    /*
    const dashboard = () =>{
      navigation.navigate('Tabbar');
    }*/

    const addBook = async () => {//add selected book to user sub library
      if(isCheck == false) {
        await db 
        .collection('Users/' + currentUid + '/Cart')
        .doc(book.title)
        .set({
          Name: book.title,
          Price: book.price
        })
        .then(() =>{
          Alert.alert('Book has been added to your cart')
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
      {(isCheck) ? 
          <OrangeButton 
          title="Add to Library" 
          size="sm"
          onPress = {() => addBook()}
          /> :
          <OrangeButton 
          title="Add to Cart" 
          size="sm" 
          onPress = {() => addBook()}
            />
        }

    </ScrollView>
  );

}
export default BookStorePreview;