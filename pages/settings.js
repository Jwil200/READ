import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ImageStore, LogBox, ImageBackground, useColorScheme, ScrollView } from 'react-native';
import { Header, Divider, Tile, Switch, Icon } from "@rneui/themed";
import { Button } from 'react-native-elements/dist/buttons/Button.js';
import { useNavigation, NavigationContainer, Darktheme } from '@react-navigation/core';
import { colors, SearchBar } from 'react-native-elements';
import SettingsOption from "../components/settingsOption";

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
  const settingOptions = [
    {
      title: "Account Settings",
      icon: "gear",
      type: "nav"
    },
    {
      title: "Purchase Settings",
      icon: "shopping-bag",
      type: "nav"
    },
    {
      title: "Audio Settings",
      icon: "volume-up",
      type: "nav"
    },
    {
      title: "Accessibility",
      icon: "universal-access",
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
      title: "Parental Controls",
      icon: "group",
      type: "nav"
    }, 
    {
      title: "Help and Support",
      icon: "phone",
      type: "nav"
    }, 
    {
      title: "Contact Us",
      icon: "envelope",
      type: "nav"
    }
  ]
  i = 0
  return (
    <ScrollView>
      <View style={{flexDirection: 'column'}}>
      {settingOptions.map(e => <SettingsOption styles={styles} icon={e.icon} title={e.title} isSwitch={e.type === "toggle"} key={"o" + (++i)}/>)}
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
          onPress={() => navigation.navigate('Login')}
        />
        <Text style={{marginTop:30, fontSize:17, marginBottom: 20}}> {'\u00A9'}Read 2022 </Text>
      </View>
    </ScrollView>
  );
} 
export default Settings;