// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "./bookTile.js";
import { bookData } from "./books.js";

// Not using firebase at the moment, all content stored in books.js
//import firebase from '../database/firebase';
//require('firebase/auth')

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    const Item = ({ item }) => (
      <View style={styles.item}>
        <BookTile key={"i" + item._id} progress={item.progress}/>
      </View>
    );

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
}
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
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  item: {
    width: "32.5%",
    alginItems: "center",
    padding: 5
  }
});