// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "../components/bookTile";
import { bookData } from "../assets/books";

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
    <BookTile key={"i" + item._id} progress={item.progress}/>
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
};
export default Dashboard;