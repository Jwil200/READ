import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const userId = auth().currentUser.uid;

const AccountSettings = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        console.log(userData);
        if(userData){
            setName(userData.name);
            setEmail(userData.email);
            setPassword(userData.password);
        }
    }


    const handleSaveChanges = async() => {
    
    console.log('Changes saved');
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
          secureTextEntry
        />
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AccountSettings;