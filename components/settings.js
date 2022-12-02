import React, { Component,useState  } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, FlatList, ImageStore, LogBox, ImageBackground, useColorScheme} from 'react-native';
import { Header, Divider, Tile, Switch} from "@rneui/themed";
import { Button } from 'react-native-elements/dist/buttons/Button.js';
import { useNavigation, NavigationContainer, Darktheme } from '@react-navigation/core';
import { colors, SearchBar} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  colorchange: {
    backgroundColor:'white'
  },
  tinylogo:{
      width:35,
      height:35,
      flex:1,
      position:"absolute",
      marginVertical: 10,
      marginLeft: 20
  },
  tinylogo2:{
    width:50,
    height:50,
    flex:1,
    position:"absolute",
    marginVertical: 60,
    marginLeft: 10
},
tinylogo3:{
  width:50,
  height:50,
  flex:1,
  position:"absolute",
  marginVertical: 120,
  marginLeft: 10
},
tinylogo4:{
  width:50,
  height:50,
  flex:1,
  position:"absolute",
  marginVertical: 180,
  marginLeft: 10
},
tinylogo5:{
  width:45,
  height:45,
  flex:1,
  position:"absolute",
  marginVertical: 410,
  marginLeft: 15
},
tinylogo6:{
  width:50,
  height:50,
  flex:1,
  position:"absolute",
  marginVertical: 520,
  marginLeft: 10
},
tinylogo7:{
  width:50,
  height:50,
  flex:1,
  position:"absolute",
  marginVertical: 460,
  marginLeft: 10
},
tinylogo8:{
  width:40,
  height:40,
  flex:1,
  position:"absolute",
  marginVertical: 240,
  marginLeft: 15
},
tinylogo9:{
  width:40,
  height:40,
  flex:1,
  position:"absolute",
  marginVertical: 300,
  marginLeft: 15
},
  toggle:{
    marginLeft: 300,
    marginVertical:240,
    flex:2,
    position:'absolute',
    zIndex:999
  },
  toggle2:{
    marginLeft: 300,
    marginVertical:300,
    flex:2,
    position:'absolute',
    zIndex:999
  }
});



const Settings = ({navigation}) => {

  const userSignOut = async() =>{
    auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
  
  });
  }
  const settingOptions=[
    {title: "Account Settings"},
    {title: "Purchase Settings"},
    {title: "Audio Settings"},
    {title: "Accessibility"},
    {title: "Read-Only Mode"},
    {title: "Dark Mode"},
    {},
    {title: "Parental Controls"}, 
    {title: "Help and Support"}, 
    {title: "Contact Us"},
    ]
  return (

    <ScrollView style={styles.colorchange}>
 
      <Image source={require('../assets/settingsicon.png')}
        style={styles.tinylogo}
       />
      <Image source={require('../assets/bag.jpg')}
        style={styles.tinylogo2}
       />
      <Image source={require('../assets/sound.png')}
        style={styles.tinylogo3}
       />
      <Image source={require('../assets/man.png')}
        style={styles.tinylogo4}
       />
      <Image source={require('../assets/parents.png')}
        style={styles.tinylogo5}
       />
      <Image source={require('../assets/phone.png')}
        style={styles.tinylogo6}
       />
      <Image source={require('../assets/question.png')}
        style={styles.tinylogo7}
       />       
      <Image source={require('../assets/book.png')}
        style={styles.tinylogo8}
       />    
      <Image source={require('../assets/darkmode.png')}
        style={styles.tinylogo9}
       /> 
      <Switch style={styles.toggle}>

         </Switch>
      <Switch style={styles.toggle2}>
        

      </Switch>
        {settingOptions.map(({title})=>
        <View key={title}>
            <View style={{
                paddingHorizontal:15,
                paddingBottom:20,
                paddingTop:15,
                paddingLeft:80
                      }
            }>
            <Text style={{fontSize:17}}>{title}</Text>

            </View>
            <View style={{height: 0.5, backgroundColor:colors.grey0}} />
        </View>)}
        <Button 
        title="Sign Out"
        titleStyle={{ fontWeight: '500' }}
        buttonStyle={{
        backgroundColor: 'blue',
        borderColor: 'transparent',
        borderWidth: 0,
        margin:140,
        alignSelf: "auto",
        bottom:100
        }}
         onPress={() => {
          userSignOut()
          navigation.navigate('Login');
          }
        }
         />


    </ScrollView>
  );
  
      
} 
export default Settings;