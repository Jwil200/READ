// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "./bookTile.js";
import { bookData } from "./books.js";
//import firebase from '../database/firebase';
//require('firebase/auth')

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {


    let booksRender = [];
    for(i = 0; i < bookData.length; i++) {
      booksRender.push(<BookTile key={"book" + i}/>);
    }

    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>
        <View 
          style={{
            flexDirection:"row",
            justifyContent: 'space-between',
            height:400,
            width:'100%'
          }}
        >
          {booksRender}
        </View>
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
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});