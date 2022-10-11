// components/signup.js
import React, { Component, useEffect, useState  } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Text, View, TextInput, Alert, ActivityIndicator, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles'
import firebase from '../database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


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

const options = [
  { value: '1', label: '6 and under' },
  { value: '2', label: '7-12' },
  { value: '3', label: '13-17' },
  { value: '4', label: '18-26' },
  { value: '5', label: '25-39' },
  { value: '6', label: '40+' },

];
   
const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Age Range' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        
      />
    </View>
  );
};

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
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredenstials =>{
        const user = userCredenstials.user;

        //displays user email to terminal for testing
        console.log(user.email)
        
        userCredenstials.user.updateProfile({// needs testing
           displayName: displayname
        })
        
        
        navigation.navigate('Login')
        //displays username to terminal for testing
        console.log(user.displayName)
      })
      .catch(error => alert(error.message))
    } 
  }

  return (//Each component functionality
    <KeyboardAvoidingView
      style={{flex: 1}}
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
        <Text 
          style={styles.inputStyle}
        >
          <Text
          style={{ color: "blue" }}
          >
            Age
          </Text>
        </Text>

        <DropdownComponent/>
        

        <View style={styles.screenContainer}>
          <OrangeButton 
          title="Create an Account" 
          size="sm" 
          onPress={() => registerUser()}
        />
        </View>

        <Text 
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Already registered? Tap here to Log In
        </Text>                          
      </View>
    </KeyboardAvoidingView>
  );

}
  
export default Signup;