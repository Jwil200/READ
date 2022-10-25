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
    const navigation = useNavigation()
    const book = props.route.params.props;
  return (
    <View style={styles.bookPreviewContainer}>

      <View>
        <Text
        style={styles.bookTitle}>
        {book.title}
        </Text>

      <Tile
      imageSrc={{
          uri:'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'
      }}
      imageProps={{
        resizeMode:"cover"
      }}
      width={175}
      height={300}
      ></Tile>
      </View>

      <Text 
      style={styles.bookPreviewText}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      </Text>
    
      <Text
      style={{alignSelf: 'center'}}>
        Progress: {book.progress}% Complete
      </Text>
      
      <OrangeButton 
        title="Continue Reading" 
        size="sm" 
        />

      <Text 
        style={styles.loginText}
        onPress={() => navigation.goBack()}
       >
        Go Back
        </Text> 

    </View>
  );
}
export default BookPreview;
