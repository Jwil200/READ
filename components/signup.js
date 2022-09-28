// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SocialIcon } from 'react-native-elements';
import firebase from '../database/firebase';

const OrangeButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter your details to sign up!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>
        <Image source={require('../assets/read-logo.png')} style={styles.logo} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          placeholderTextColor="blue"
          color= 'blue'
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          placeholderTextColor="green"
          color= 'green'
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          placeholderTextColor="orange"
          color= 'orange'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
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
          onPress={() => this.registerUser()}
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
          onPress={() => this.props.navigation.navigate('Login')}>
          Already registered? Tap here to Log In
        </Text>                          
      </View>
    );
  }
}
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
  }

});