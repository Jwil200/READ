// components/signup.js
import React, { Component, useEffect, useState  } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Text, View, TextInput, Alert,Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';


const OrangeButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={registerUser}>
    <LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayname, setName] = useState('')

  const navigation = useNavigation()

  registerUser = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter your details to sign up!')
    }
    else {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const currentuser = userCredentials.user;//gets current users credentials
        console.log('User account created & signed in!');
        
        firestore()//Creates new entry to the database
          .collection('Users')
          .add({
            email: currentuser.email,
            name: displayname,
            age: 18,
            password: password,
            userID: currentuser.uid,
          })
        console.log(currentuser);
        navigation.navigate('Login')
 })
  .catch(error => {//Error if email is already in use
    if (error.code === 'auth/email-already-in-use') {
      //console.log('That email address is already in use!');
      Alert.alert('That email address is already in use!')
    }

    if (error.code === 'auth/invalid-email') {//Invalid email error, needs testing
      console.log('That email address is invalid!');
      Alert.alert('That email address is invalid!')
    }
    console.error(error);
  });
  } 
}
  

  return (//Each component functionality
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      
      <View style={styles.container}>  
        <Image source={require('../assets/read-logo.png')} style={styles.logo} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          placeholderTextColor="blue"
          color= 'blue'
          value={displayname}
          onChangeText={text => setName(text)}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          placeholderTextColor="green"
          color= 'green'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor="orange"
          color= 'orange'
          value={password}
          onChangeText={text => setPassword(text)}
          maxLength={15}
          secureTextEntry={true}
        />   
        <TextInput
          style={styles.inputStyle}
          placeholder="(Birthday would go here?)"
          placeholderTextColor="blue"
          color= 'blue'
        /> 
        <View style={styles.screenContainer}>
          <OrangeButton 
          title="Create an Account" 
          size="sm" 
          onPress={() => registerUser()}
        />
        </View>

        <Text style={{textAlign: 'center', bottom: 20}}>
            Or sign up with:
          </Text>
        
        <SocialIcon
        title='Sign Up With Facebook'
        button type='facebook'
        style={{bottom: 20}}
        />

        <SocialIcon
        title='Sign Up With Google'
        button type='google'
        style={{bottom: 20}}
        />

        <Text 
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Already registered? Tap here to Log In
        </Text>                          
      </View>
    </KeyboardAvoidingView>
  );

};
  
export default Signup;
