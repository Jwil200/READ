// components/dashboard.js
import React, { useState  } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "./bookTile.js";
import { bookData } from "./books.js";
import { MaterialIcons } from '@expo/vector-icons';
//import { NavigationHelpersContext } from '@react-navigation/native';

// Not using firebase at the moment, all content stored in books.js
//import firebase from '../database/firebase';
//require('firebase/auth')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 35,
    backgroundColor: '#fff'
  },
  item: {
    width: "31.5%",
    alignItems: "flex-end",
    margin: 3,
    backgroundColor: '#e9eef1'
  }
});

const Item = ({ item }) => (
  <View style={styles.item}>
    <TouchableOpacity
      onPress={() => item.isFavorite ? item.isFavorite = false : item.isFavorite = true}
    >
    <MaterialIcons
      name={item.isFavorite ? 'favorite' : 'favorite-outline'}
      size={32}
      color={'red'}
    />
    </TouchableOpacity>
    <BookTile 
    key={"i" + item._id} 
    id={item._id}
    title= {item.title}
    progress={item.progress}
    isRecent={item.isRecent}
    isFavorite={item.isFavorite}
    />
    
  </View>
);

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={bookData}
        numColumns={3}
        keyExtractor={item => item._id}
        renderItem={ Item }    
      />
    </View>
    
  );
}
export default Dashboard;