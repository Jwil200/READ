// components/signup.js
import React, { Component, useEffect, useState  } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
//import firebase from '../database/firebase';
//import { createUserWithEmailAndPassword } from 'firebase/auth';

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
      .then(() => {
      console.log('User account created & signed in!');
 })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
      navigation.navigate('Login')
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

//Style sheet to customize indiviual parts.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "stretch",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    bottom: 80,
    fontSize: 18
  },
  loginText: {
    color: '#3740FE',
    marginBottom: 20,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    left: 20,
    bottom: 60,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 12,
    bottom: 60,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})
