// components/dashboard.js
import React, { Component, useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import BookTile from "../components/bookTile.js";
import { bookData } from "../components/books.js";
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
    <BookTile key={"i" + item._id} progress={item.progress}/>
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Dashboard = ({ navigation }) => {
  const[books, setBooks] = useState();
  const[loading, setLoading] = useState(true);
  const[favBooks, setFav] = useState();
  const[isRecent, setRecent]= useState();
  const[user, getUser] = useState();

  let recentData = bookData.filter(e => e.isRecent);
  let favoriteData = bookData.filter(e => e.isFavorite);

  const userCred = async () => {//Get Current User Credentials
    getUser(auth().currentUser);
  }

  const getFavBooks = async() => {//Get Favorite books
    //const user = auth().currentUser;
    const favList = [];
    await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Favorites').get()
    .then(querySnapshot => {
      console.log('Total number of entries', querySnapshot.size);
      querySnapshot.forEach(doc =>{
        const{Name, Author} = doc.data();
        favList.push({
          bookName: Name,
          authorName: Author,
        })
      })
    });
    setFav(favList);//copies favList into favBooks
  }

  const getRecentBooks = async() => {//Gets all Recent Books
    const recentList = [];
    await firestore()
    .collections('Users')
    .doc(user.uid)
    .collections('Recent').get()
    .then(querySnapshot => {
      console.log('Total entries: ', querySnapshot.size);
      querySnapshot.forEach(doc =>{
        const{ Name, Author} = doc.data();
        recentList.push({
          bookName: Name,
          authorName: Author,
        })
      })
    });
    setRecent(recentList);//copies recentList into isRecent
  }

  const getBooks = async() =>{//Gets all books from database
    const list = [];
    await firestore()
    .collection('Books')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);//outputs the number of documents found in collection
      querySnapshot.forEach(doc => {
        const {Name, Author, Description} = doc.data();
        list.push({
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          //coverUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mobileread.com%2Fforums%2Fshowthread.php%3Ft%3D222754&psig=AOvVaw00gGvqXjxv9l21L1AnzPTq&ust=1666400839332000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKDEkYOR8PoCFQAAAAAdAAAAABAF',
        })
      })
    });
    //console.log('list size: ', list.size);// for testing
    //console.log('Lists: ',list);//prints out list to console

    setBooks(list);//Copies into books
    if(loading){
      setLoading(false);
    } 
  }
  

  useEffect(() => {
    getUser();
    getBooks();
    getFavBooks();
    //getComponents();
  }, []);
  
  console.log('Books', books);//for testing
  console.log('Favorite Books', favBooks);
  console.log('Recent Books:', isRecent);

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
              data={books}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "a" + item._id}
              listKey="a"
            />
        }
      </View>
  });

  return (
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
