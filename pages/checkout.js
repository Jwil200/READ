// pages/checkout.js, Checkout page
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { StripeProvider, CardField, usePaymentSheet } from '@stripe/stripe-react-native';
import { Divider } from '@rneui/themed';
import styles from '../assets/styles'
import OrangeButton from "../assets/orangeButton"

const Checkout = () => {
  const [name, setName] = useState('');

  return (
    <StripeProvider publishableKey={'pk_test_51Me1uSKEBCZYewMa90gWv5uMmNtQ0svMhPNpc8uHHC1sfWssMTjFoFehcUts9Ovl5VxZtfoJkMEzlj7Ipg9AjwdG00Wjt7V1uz'}>
      <View style={styles.bookPreviewContainer}>
        <Image source={require('../assets/read-logo.png')} style={styles.checkoutImage}/>
        <Divider style={styles.checkoutDivider} />
        <Text style={styles.checkOutText}>2 books ($25.00)</Text>
        <Text style={{color: 'green', paddingLeft: 15}}>Card Details</Text>
        <CardField
          style={styles.cardField}
          cardStyle={{
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 8
          }}
          />
          <TextInput
            style={styles.checkOutName}
            placeholder="Name on Card"
            placeholderTextColor="blue"
            color= 'blue'
            onChange={(value) => setName(value.nativeEvent.text)}
            autoCapitalize='none'
          />
          <OrangeButton 
            title="Pay $25.00" 
            size="sm"
            onPress={() => Alert.alert("Success!")}
            />   
      </View>
    </StripeProvider>
  );
}
export default Checkout;