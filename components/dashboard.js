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
      coverUrl={item.coverUrl} 
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
  const[isMount, setMount] = useState(false);
  const[filter, setFilter] = useState([]);
  
  const db = firestore();
  const currentUid = auth().currentUser.uid;

  //let recentData = bookData.filter(e => recent.includes(e._id));
  //let favoriteData = bookData.filter(e => favorite.includes(e._id));

  const filterBooks = async() => {
    const list = [];
    await db 
    .collection('Books')
    .where('Genre', 'array-contains-any', ['Children'])
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log('data', doc.data())  
        const { Name, Author, Description, Cover } = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0.5,
          coverUrl:  Cover,
        })
      })
    });
    setFilter(list)
    //console.log('flitered books', list);
  }

  const getBooks = async() => {
    const list = [];
    await db
    .collection('Books')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { Name, Author, Description, Cover } = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0.5,
          coverUrl:  Cover,
        })
      })
    });
    setBooks(list);
  }

  const getFavoriteBooks = async () => {
    const list = [];
    await db
    .collection('Users/' + currentUid + '/Favorite')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { Name, Author, Description, Cover } = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0.5,
          coverUrl:  Cover
          //coverUrl : 'http://tile.loc.gov/storage-services/service/rbc/rbc0001/2003/2003juv81093/0001r.jpg'
        })
      })
    });
    setFavorite(list);
  }

  const getRecentBooks = async() => {
    const list = [];
    await db
    .collection('Users/' + currentUid + '/Recent')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { Name, Author, Description, Cover } = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0.5,
          coverUrl:  Cover
        })
      })
    });
    setRecent(list);
  }

  useEffect(() => {
    getBooks();
    getFavoriteBooks();
    getRecentBooks();
    filterBooks();
    setMount(true);
  }, []);

  let componentList = [];

  componentList.push({
    _id: 1,
    jsx: 
      <View style={styles.container}>
        <Text style={styles.title}>Recent</Text>
        <Divider style={styles.divider} />
        {
          (filter.length == 0)
          ? <Text style={styles.emptyText}>You haven't read anything recently.</Text>
          : <FlatList style={styles.grid}
              data={filter}
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
          (favorite.length == 0)
          ? <Text style={styles.emptyText}>You don't have anything favorited.</Text>
          : <FlatList style={styles.grid}
              data={favorite}
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
    (!isMount)
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
