// components/dashboard.js
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "./bookTile.js";
import { bookData } from "./books.js";
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
    alginItems: "center",
    margin: 3,
    backgroundColor: '#e9eef1'
  }
});

const Item = ({ item }) => (
  <View style={styles.item}>
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
        renderItem={Item}
        keyExtractor={item => item._id}
      />
    </View>
  );
}
export default Dashboard;