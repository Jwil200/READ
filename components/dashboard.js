// components/dashboard.js
import React, { Component, useEffect, useState, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "../components/bookTile.js";
import Navbar from "../components/navbar";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
      progress={item.progress} 
      title={item.bookName}
      author={item.authorName}
      description={item.bookDes}
    />
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Dashboard = ({ navigation }) => {
  const[bookData, setBooks] = useState([]);
  const[favorite, setFavorite] = useState([]);
  const[recent, setRecent] = useState([]);
  const[fetches, setFetches] = useState(0);

  const user = auth().currentUser;

  let recentData = bookData.filter(e => recent.includes(e._id));
  let favoriteData = bookData.filter(e => favorite.includes(e._id));

  const add = () => {
    setFetches(fetches + 1);
  };

  const getFavoriteBooks = async () => {
    const list = [];
    await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Favorites').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push({
          _id: doc.id
        })
      })
    });
    setFavorite(list);
    add();
  }

  const getRecentBooks = async() => {
    const list = [];
    await firestore()
    .collections('Users')
    .doc(user.uid)
    .collections('Recent').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push({
          _id: doc.id
        })
      })
    });
    setRecent(list);
    add();
  }

  const getBooks = async() => {
    const list = [];
    await firestore()
    .collection('Books')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { Name, Author, Description } = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0.5,
          //coverUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mobileread.com%2Fforums%2Fshowthread.php%3Ft%3D222754&psig=AOvVaw00gGvqXjxv9l21L1AnzPTq&ust=1666400839332000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKDEkYOR8PoCFQAAAAAdAAAAABAF',
        })
      })
    });
    setBooks(list);
    add();
  }
  

  useEffect(() => {
    console.log("Book Data");
    console.log(...bookData.map(e => e.bookName));
    console.log("Favorites");
    console.log(...favoriteData);
    console.log("Recent")
    console.log(...recentData);
    getBooks();
    getFavoriteBooks();
    getRecentBooks();
  }, []);

  let componentList = [];
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

  return (
    (fetches < 3)
    ? 
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large"/>
      </View>
    :
      <View style={{flex: 1}}>
        <View style={{flex: 0.9}}>
          <FlatList
            data={componentList}
            renderItem={ComponentItem}
            keyExtractor={item => item._id}
          />
        </View>
        <View style={{flex: 0.1}}>
          <Navbar nav={navigation}></Navbar>
        </View>
      </View>
  );
}
export default Dashboard;
