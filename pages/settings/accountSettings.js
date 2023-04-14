import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import DarkModeContext from '../../components/DarkModeContext';

const AccountSettings = ({ navigation }) => {
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkModeEnabled ? '#303030' : '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkModeEnabled ? 'white' : 'black',
    },
    form: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: isDarkModeEnabled ? 'white' : 'black',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: isDarkModeEnabled ? '#444' : '#fff',
      color: isDarkModeEnabled ? 'white' : 'black',
    },
  });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getUserRef = () => {
        const userId = auth().currentUser.uid;
        console.log(userId)
        return firestore().collection('Users').doc(userId);
      };

    const getInformation = async() => {
        const userRef = getUserRef();
        const user = await userRef.get();
        const userData = user.data();
        const email = await auth().currentUser.email;
        const password = await auth().currentUser.password;
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log(userData);
        if(userData){
            setName(userData.name);
            setEmail(userData.email);
            setPassword(userData.password);
        }
    }

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleSaveChanges = async() => {
    if(name == '' || email == '' || password == ''){
        alert('Please fill out all fields');
    }
    else{
        //update user information
        await auth().currentUser.updateEmail(email).catch(error => {
            console.log(error);
            alert(error);
        });

        await auth().currentUser.updatePassword(password).catch(error => {
            console.log(error);
            alert(error);
        });

        const userRef = getUserRef();
        await userRef.update({
            name: name,
            email: email,
            password: password,
        });
        console.log('Changes saved');
        alert('Your information has been updated!!');
    }
  }

    useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() =>{
        setIsLoading(true);
        await Promise.all([getInformation()]);
        setIsLoading(false);
    });
    return () => {
        unsubscribe;
    };
 }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account Settings</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry = {!showPassword}
        />
        <Icon
          name={showPassword ? 'eye-slash' : 'eye'}
          size={20}
          color={'grey'}
          onPress={toggleShowPassword}
          style={{ padding: 10 }}
        />
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
        />
      </View>
    </View>
  );
};



export default AccountSettings;