import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import {useColorScheme} from 'react-native';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const SettingsScreen = ({navigation}) => {
  const currentUser = auth().currentUser.uid;
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const colorScheme = useColorScheme ();
  const isSystemDarkModeEnabled = colorScheme === 'dark';
  useEffect(() => {
    setDarkModeEnabled(isSystemDarkModeEnabled);
  }, [isSystemDarkModeEnabled]);
  

  const signOut = async() => {
    await auth().signOut().then(() => {
      console.log("User signed out!!", currentUser)
      navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  } 

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };


  return (
    <ScrollView style={[styles.container, darkModeEnabled ? styles.darkMode : styles.lightMode]}>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/darkmode.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Dark Mode</Text>
        <Switch style={styles.switchloco} value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/parents.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Parental Controls</Text>
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/man.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Accessibility</Text>
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/settingsicon.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Account Settings</Text>
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/bag.jpg')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Purchase Settings</Text>
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/question.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Help and Support</Text>
      </View>
      <View style={styles.itemContainer}>
      <Image source={require('../assets/phone.png')}
        style={styles.tinylogo}
       /> 
        <Text style={[styles.itemTitle, { color: darkModeEnabled ? '#fff' : '#000' }]}>Contact Us</Text>
      </View>
      <TouchableOpacity style={styles.signOutButton}
                         onPress={() => signOut()}> 
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  darkMode: {
    backgroundColor: '#222',

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tinylogo:{
    width:30,
    height:30,
    position:"relative",
    marginLeft: 10,
    marginRight: 20,
    marginTop: 0,
    resizeMode: "center",
    paddingVertical: 10,
  
  },
  switchloco:{
    position: "relative",
    marginLeft: 150
  
  },
});

export default SettingsScreen;
