import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ImageStore, LogBox, ImageBackground, useColorScheme, ScrollView } from 'react-native';
import { Header, Divider, Tile, Switch, Icon } from "@rneui/themed";
import { Button } from 'react-native-elements/dist/buttons/Button.js';
import { colors, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SettingsOption from '../../components/settingsOptions.js';
import auth from '@react-native-firebase/auth';
const styles = StyleSheet.create({
  rowContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    marginTop: 10,
    elevation: 10,
    shadowColor: '#52006A',
  },
  icon: {
    margin: 5,
    marginLeft: 5
  },
  text: {
  },
  divider: {
    width: '98%',
    marginVertical: 5,
  },
});

const Settings = ({navigation}) => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {console.log('User signed out!')
      navigation.navigate('Login')});
  }


  const settingOptions = [
    {
      title: "Account Settings",
      icon: "gear",
      type: "screen",
      screenName: "AccountSettings",
      navigation: navigation

    },
    {
      title: "Notifications",
      icon: "bell-o",
      type: "screen",
      screenName: "NotificationSettings",
      navigation: navigation
    },
    {
      title: "Audio Settings",
      icon: "volume-up",
      type: "nav"
    },
    {
      title: "Read Only",
      icon: "book",
      type: "toggle"
    },
    {
      title: "Dark Mode",
      icon: "moon-o",
      type: "toggle"
    },
    {
      title: "Purcahse History",
      icon: "shopping-cart",
      type: "screen",
      screenName: "PurchaseHistory",
      navigation: navigation
    }, 
    {
      title: "About",
      icon: "info",
      type: "screen",
      screenName: "About",
      navigation: navigation
    }
  ]
  i = 0
  return (
    <ScrollView>
      <View style={{flexDirection: 'column'}}>
      {settingOptions.map(e => <SettingsOption styles={styles} navigation={e.navigation} icon={e.icon} title={e.title} isSwitch={e.type === "toggle"} screenName={e.screenName} key={"o" + (++i)}/>)}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button 
          title="Sign Out"
          titleStyle={{ fontWeight: '500' }}
          buttonStyle={{
            backgroundColor: 'blue',
            borderColor: 'transparent',
            borderWidth: 0,
            width: 100,
            alignSelf: "auto",
            marginTop: 30,
          }}
          onPress={() => signOut()}
        />
        <Text style={{marginTop:30, fontSize:17, marginBottom: 20}}> {'\u00A9'}Read 2022 </Text>
      </View>
    </ScrollView>
  );
} 
export default Settings;
