import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, ImageStore, LogBox} from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import { Button } from 'react-native-elements/dist/buttons/Button.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core'
import { Switch } from '@rneui/themed';
import { ScreenHeight } from '@rneui/base';
import { colors, SearchBar} from 'react-native-elements';

const styles = StyleSheet.create({
  home: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: -5,
    // position: 'absolute', ------ add if dont work with above
  },
  tinylogo:{
      width: 30,
      height: 35,
      alignSelf:'flex-start',
      
  }
});


const Settings = ({navigation}) => {
    const settingOptions=[
  
    {title: "Account Settings", onPress:()=>{}},
    {title: "Purchase Settings", onPress:()=>{}},
    {title: "Audio Settings",  onPress:()=>{}},
    {title: "Accessibility", onPress:()=>{}},
    {title: "Read-Only Mode", onPress:()=>{}},
    {title: "Dark Mode", onPress:()=>{}},
    {title: "Parental Controls",  onPress:()=>{}},
    {title: "Help and Support",  onPress:()=>{}},
    {title: "Contact Us", onPress:()=>{}},
    ]

    
  return (
    <View style={styles.home}></View>,    
    <View>
     <SearchBar round 
        cancelButtonTitle='X'
        lightTheme
        searchIcon={{ size: 20 }}
        inputStyle={{backgroundColor: 'white'}}
        placeholderTextColor={'#g5g5g5'}
        placeholder={'    Search'}
      />
        <Button 
        title="Home"
        titleStyle={{ fontWeight: '500' }}
        buttonStyle={{
        backgroundColor: 'rgba(199, 43, 98, 1)',
        borderColor: 'transparent',
        borderWidth: 0,
        alignSelf: "flex-start"
        }}
         onPress={() => navigation.navigate('Dashboard')}
         />
        {settingOptions.map(({title,onPress,})=>
        <TouchableOpacity key={title}>
            <View style={{
                paddingHorizontal:20,
                paddingBottom:20,
                paddingTop:20,
                paddingLeft:75
            }}>
                <Text style={{fontSize:17}}>{title}</Text>
            </View>
            <View style={{height: 0.5, backgroundColor:colors.grey0}} />
        </TouchableOpacity>)}
        <Button 
        title="SignOut"
        titleStyle={{ fontWeight: '500' }}
        buttonStyle={{
        backgroundColor: 'rgba(199, 43, 98, 1)',
        borderColor: 'transparent',
        borderWidth: 0,
        margin:160,
        alignSelf: "auto",
        bottom:120
        }}
         onPress={() => navigation.navigate('Login')}
         />
        <Text style={{bottom:400,margin:160,fontSize:17}}> {'\u00A9'}Read 2022 </Text>
    </View>
  );
  

} 
export default Settings;