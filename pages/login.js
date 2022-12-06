// components/login.js
import React, { Component, useEffect, useState  } from 'react';
import { Platform, TouchableWithoutFeedback, Keyboard, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import styles from '../assets/styles'
import auth from '@react-native-firebase/auth';




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

  loginUser = async() => {
    if(email === '' || password === '') {
      Alert.alert('Please enter your credentials')
    }
    else {
      await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('Tabbar');
        console.log('Logged in with', user.email);
      })
      .catch(error => alert(error.message))
    }
  }
  return (
    <View style={{flex: 1}}>
      
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


    <View style={styles.container1}>  
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
        />
      </View>

      <Text style={{textAlign: 'center'}}>
        Or log in with:
      </Text>



      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Tap here to sign up
      </Text>                          
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
  );

}

export default Login;
