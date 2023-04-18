// components/signup.js
import React, { useState  } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Platform, Keyboard, Text, View, TextInput, Alert,Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../assets/styles';
import OrangeButton from '../assets/orangeButton.js';



//React-Native dependencies needed
const options = [
  { value: '3', label: '3 and under' },
  { value: '7', label: '4-7' },
  { value: '11', label: '8-11' },
  { value: '16', label: '12-15' },
  { value: '18', label: '16+' },
];


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayname, setName] = useState('')
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const navigation = useNavigation()

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        </Text>
      );
    }
  }
  registerUser = async() => {
    if(displayname == '' || email === '' || password === '') {
      Alert.alert('Enter your details to sign up!')
    }
    else {
      await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const currentuser = userCredentials.user;//gets current users credentials
        console.log('User account created & signed in!');
        const db = firestore();
        console.log(currentuser.uid);
        //currentuser.sendEmailVerification()//for email verification
        db//Creates new entry to the database
          .collection('Users')
          .doc(currentuser.uid)//Sets name of document with userID instead of random generate
          .set({
            email: currentuser.email,
            name: displayname,
            age: value,
            password: password,
            userID: currentuser.uid,
            newUser: 'True',
          })
          

          db//add user library subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Library')
          .doc('Temp')
          .set({
            Name: 'Temp'
          })

          db//adds a cart subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Cart')
          .doc('Temp')
          .set({
            Name:'Temp'
          })

          db// adds Settings subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Settings')
          .doc('Settings')
          .set({
            DarkMode: 'False',
            Notifications: 'True',
            Language: 'English',
            Font: 'Default',
            FontSize: 'Default',
            TextToSpeech: 'False',
            TextToSpeechLanguage: 'English',
          })

          db// adds User Statistics subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Stats')
          .doc('Stats')
          .set({
            Name: displayname,
            TimeTimeSpentReading: 0,
            TotalBooksRead: 0,
            TotalWordsRead: 0,
          })

          db// adds a user purchase history subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Purchase History')
          .doc('Temp')
          .set({
            Name: 'Temp'
          })

          db// adds User Payment options subcollection
          .collection('Users')
          .doc(currentuser.uid)
          .collection('Payment Options')
          .doc('Temp')
          .set({
            Name: 'Temp'
          })
          
        navigation.navigate('Onboarding')
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
<View style={{flex: 1}}>
<KeyboardAvoidingView
  style={styles.container1}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  
  <View style={styles.container1}>  
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
        <View>
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
    <View style={styles.screenContainer}>
      <OrangeButton 
      title="Create an Account" 
      size="sm" 
      onPress={() => registerUser()}
    />
    </View>

    {/* <Text style={{textAlign: 'center'}}>
        Or sign up with:
      </Text> */}
    

    <Text 
      style={styles.loginText}
      onPress={() => navigation.navigate('Login')}>
      Already registered? Tap here to Log In
    </Text>                          
  </View>
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>
</View>
);

};

export default Signup;

