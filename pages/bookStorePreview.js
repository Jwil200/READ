// components/bookStorePreview.js *Based on bookPreview.js currently
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { Tile } from "@rneui/themed";
import styles from '../assets/styles'

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

const BookStorePreview = (props) => {
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
              uri:'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. {"\n"}
      </Text>
    
      {book.isAddedtoCart ? 
          <OrangeButton 
          title="Remove from Cart" 
          size="sm"
          /> :
          <OrangeButton 
          title="Add to Cart" 
          size="sm" 
            />
        }

    </View>
  );
}
export default BookStorePreview;