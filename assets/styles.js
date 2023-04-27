//Global Stylesheet. To use in a page, make sure to add " import styles from './styles' "

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container1: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 15,
      backgroundColor: '#fff',
    },
    container2: {
      flex: 1,
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      paddingTop: 35,
      backgroundColor: '#fff'
    },
    bookPreviewContainer:{
      padding: 10, 
    },
    bookPreviewImage: {
      width: 300,
      height: 300,
      alignSelf: 'center',
      borderRadius: 10,
      marginBottom: 10,
      elevation: 100
    },
    bookTitle:{
      fontSize: 26,
      paddingBottom: 10
    },
    bookPreviewProgress:{
      alignSelf: 'center', 
      fontWeight: 'bold',
      paddingBottom: 5
    },
    bookPreviewDescription:{
      //alignSelf: 'flex-end',
      //position: 'absolute',
     // width: 200,
      //paddingTop: 80
      
    },
    icon: {
      //position: 'absolute',
      //bottom: 160,
      //right: 5,
    },
    bookPreviewText:{
      alignSelf: 'flex-end',
      position: 'absolute',
      width: 200,
      paddingTop: 80
      
    },
    inputStyle: {
      width: '100%',
      marginBottom: 15,
      paddingBottom: 15,
      alignSelf: "stretch",
      borderColor: "#ccc",
      borderBottomWidth: 1,
      bottom: 80,
      fontSize: 18,
    },
    loginText: {
      color: '#3740FE',
      marginTop: 20,
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
    favoriteIcon: {
      position: 'absolute',
      top: 5,
      right: 15,
    },
    
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 100,
      paddingVertical: 15,
      paddingHorizontal: 12,
      bottom: 60,
    },
    appButtonContainer2:{
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 100,
      paddingVertical: 15,
      paddingHorizontal: 12,
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },

    dropdown: {
      bottom: 100,
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    label: {
      position: 'absolute',
    },
    cardField: {
      width: '100%',
      height: 50,
      marginVertical: 10,
    },
    checkoutImage: {
      width: '110%',
      height: '40%',
      resizeMode: 'contain',
      position: 'absolute',
    },
    checkoutDivider: {
      width: '98%',
      height: '35%',
      marginVertical: 5,
    },
    checkOutText: {
      textAlign: 'center',
      padding: 20, 
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 20
    },
    checkOutName: {
      width: '100%',
      marginBottom: 15,
      padding: 15,
      alignSelf: "stretch",
      borderColor: "#ccc",
      borderBottomWidth: 1,
    },
  progress:{
    alignSelf: 'center',
    padding: 10,
  },
  divider: {
    width: '90%',
    alignSelf: 'center'
  },
  divider2: {
    width: '60%',
    marginTop: 10,
    alignSelf: 'left'
  },
  statText: {
    paddingTop: 15,
    alignSelf: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statText2: {
    padding: 15,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  descriptionText: { 
    padding: 15,
    alignSelf: 'left',
    fontSize: 16,
    letterSpacing: 0.5
  },
  orangeButton: {
   padding: 10,
  }


  
  });
