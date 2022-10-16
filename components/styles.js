//Global Stylesheet. To use in a page, make sure to add " import styles from './styles' "

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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