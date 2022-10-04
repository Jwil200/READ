// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "../components/bookTile.js";
import { bookData } from "../assets/books.js";

// Not using firebase at the moment, all content stored in books.js
//import firebase from '../database/firebase';
//require('firebase/auth')

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    paddingTop: 25,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0
  },
  grid: {
    width: '100%'
  },
  item: {
    width: "31.5%",
    alginItems: "center",
    margin: 3,
    backgroundColor: '#e9eef1'
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    width: '100%',
    paddingTop: 10
  }
});

const Item = ({ item }) => (
  <View style={styles.item}>
    <BookTile key={"i" + item._id} progress={item.progress}/>
  </View>
);

const Dashboard = () => {
  let recentData = bookData.filter(e => e.isRecent);
  let favoriteData = bookData.filter(e => e.isFavorite);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Recent</Text>
        <FlatList style={styles.grid}
          data={recentData}
          numColumns={3}
          renderItem={Item}
          keyExtractor={item => "r" + item._id}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <FlatList style={styles.grid}
          data={favoriteData}
          numColumns={3}
          renderItem={Item}
          keyExtractor={item => "r" + item._id}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>All</Text>
        <FlatList
          data={bookData}
          numColumns={3}
          renderItem={Item}
          keyExtractor={item => item._id}
        />
      </View>
    </ScrollView>
  );
}
export default Dashboard;