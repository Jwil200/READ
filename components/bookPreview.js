// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';


const BookPreview = (props) => {
    const navigation = useNavigation()
    const book = props.route.params.props;
  return (
    <View style={styles.container2}>
      <Text
      style={{textAlign:'center'}}>
    {book.title}
      </Text>

    

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