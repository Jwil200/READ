// components/afterSignup.js, what the user sees after signing up
import React from 'react';
import { View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import styles from './styles'

const Welcome = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container2}>
      <Text
      style={{textAlign:'center'}}>
        Account has been created! 
      </Text>

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Tap here to log in!
        </Text> 

    </View>
  );
}
export default Welcome;