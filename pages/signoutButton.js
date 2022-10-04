// components/dashboard.js
import { Button } from 'react-native';
import firebase from '../database/firebase';
require('firebase/auth')

const SignOutButton = (props) => {
  const [displayName, setDisplayName] = useState(firebase.auth().currentUser.displayName);
  const [uid, setUid] = useState(firebase.auth().currentUser.uid);
  const [errorMessage, setErrorMessage] = useState('');

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
    })
    .catch(error => setErrorMessage(error.message))
  } 

  return (
      <Button
        color="#3740FE"
        title="Logout"
        onPress={() => this.signOut()}
      />
  );
}