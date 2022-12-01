// components/dashboard.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "../components/bookTile.js";
import { SearchBar } from 'react-native-elements';
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
  },
  divider: {
    width: '98%',
    marginVertical: 5,
  },
  emptyText: {
    color: "grey",
    marginTop: 10
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

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Dashboard = ({ navigation }) => {
  let recentData = bookData.filter(e => e.isRecent);
  let favoriteData = bookData.filter(e => e.isFavorite);

  let componentList = [];

  const [search, setSearch] = useState('');

  componentList.push({
    _id: 1,
    jsx: 
      <View style={styles.container}>
        <Text style={styles.title}>Recent</Text>
        <Divider style={styles.divider} />
        {
          (recentData.length == 0)
          ? <Text style={styles.emptyText}>You haven't read anything recently.</Text>
          : <FlatList style={styles.grid}
              data={recentData}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "r" + item._id}
              listKey="r"
            />
        }
      </View>
  });
  componentList.push({
    _id: 2,
    jsx: 
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Divider style={styles.divider} />
        {
          (favoriteData.length == 0)
          ? <Text style={styles.emptyText}>You don't have anything favorited.</Text>
          : <FlatList style={styles.grid}
              data={favoriteData}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "f" + item._id}
              listKey="f"
            />
        }
      </View>
  });
  componentList.push({
    _id: 3,
    jsx:
      <View style={styles.container}>
        <Text style={styles.title}>All</Text>
        <Divider style={styles.divider} />
        {
          (bookData.length == 0)
          ? <Text style={styles.emptyText}>You don't have any books in your library.</Text>
          : <FlatList style={styles.grid}
              data={bookData}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "a" + item._id}
              listKey="a"
            />
        }
      </View>
  });

  const [filteredDataSource, setFilteredDataSource] = useState(componentList);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = bookData.filter(function (item) { //Create an array of newData that filters library data
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const filteredList = [];

      filteredList.push({ //Populate the filtered list with the book componenets
        _id: 1,
        jsx:
        <View style={styles.container}>
        {
          (newData.length == 0)
          ? <Text style={styles.emptyText}>Book not available.</Text>
          : <FlatList style={styles.grid}
              data={newData}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "a" + item._id}
              listKey="a"
            />
        }
      </View>
      });
      setFilteredDataSource(filteredList); //Update state variables
      setSearch(text);
    } else {
      setFilteredDataSource(componentList); //On clear, go back to og component list
      setSearch(text);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.9}}>
      <SearchBar round 
          cancelButtonTitle='X'
          lightTheme
          searchIcon={{ size: 20 }}
          inputStyle={{backgroundColor: 'white'}}
          placeholderTextColor={'#g5g5g5'}
          placeholder={'Search'}
          inputContainerStyle={{ 
            backgroundColor: 'white',
          }} 
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
        />
        <FlatList
          data={filteredDataSource}
          renderItem={ComponentItem}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
  );
}
export default Dashboard;