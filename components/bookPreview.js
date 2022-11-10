// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from './styles';

const OrangeButton = ({ title }) => (
  <TouchableOpacity //onPress={loginUser}>
    ><LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer2}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);



const BookPreview = (props) => {
    const book = props.route.params.props;
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
          /> :
          <OrangeButton 
          title="Continue Reading" 
          size="sm" 
            />

        }
    </View>
  );
}
export default BookPreview;