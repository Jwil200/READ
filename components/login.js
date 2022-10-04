// components/login.js
import React, { Component, useEffect, useState  } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import styles from './styles'
import firebase from '../database/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';


//find a way to put this in a stylesheet
const OrangeButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={loginUser}>
    <LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  loginUser = () => {
    if(email === '' && password === '') {
      Alert.alert('Please enter your credentials')
    }
    else {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('Dashboard');
        console.log('Logged in with', user.email);
      })
      .catch(error => alert(error.message))
    }
  }
  return (
    <View style={styles.container}>  
    <Image source={require('../assets/read-logo.png')} style={styles.logo} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        placeholderTextColor="green"
        color= 'green'
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
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

      <View style={styles.screenContainer}>
        <OrangeButton 
        title="Log In" 
        size="sm" 
        onPress={() => loginUser()}
        />
      </View>

      <Text style={{textAlign: 'center', bottom: 20}}>
        Or log in with:
      </Text>

      <SocialIcon
      title='Facebook'
      button type='facebook'
      style={{bottom: 20}}
      />

      <SocialIcon
      title='Google'
      button type='google'
      style={{bottom: 20}}
      />

      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Tap here to sign up
      </Text>                          
    </View>
  );

}

export default Login;
