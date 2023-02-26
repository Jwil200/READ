// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Tile } from "@rneui/themed";
import styles from '../assets/styles';
import OrangeButton from '../assets/orangeButton';

const BookPreview = (props) => {
    const book = props.route.params.props;
  return (
    <ScrollView>
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

      <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. {"\n"}
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
    </ScrollView>
  );
}
export default BookPreview;