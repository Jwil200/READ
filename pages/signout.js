// components/dashboard.js
import React, { Component } from 'react';
import { Button } from 'react-native';
import firebase from '../database/firebase';
require('firebase/auth')

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => this.signOut()}
        />
    );
  }
}