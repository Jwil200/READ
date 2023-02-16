// pages/checkout.js, Checkout page
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import styles from '../assets/styles'

const Checkout = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container2}>
      <Text
      style={{textAlign:'center'}}>
        Hi 
      </Text>

    </View>
  );
}
export default Checkout;