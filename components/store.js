// components/store.js *Based from dashboard.js at the moment
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator , StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import { bookStoreData } from "../components/storeBooks.js";
import { colors, SearchBar} from 'react-native-elements';
import BookStoreTile from "../components/bookStoreTile.js";
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
    <BookStoreTile 
     key={"i" + item._id} 
     coverUrl={item.coverUrl} 
     author={item.authorName}
     id={item._id}
     description={item.bookDes}
     title= {item.bookName}
     isRecent={item.isRecent}
     rating={item.rating}
     isAddedtoCart={item.isAddedtoCart}
     content={item.content}
/>
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);


const Store = ({ navigation }) => {
  let isInitialMount = useRef(true);

  let recentData = bookStoreData.filter(e => e.isRecent);
  let ratingData = bookStoreData.filter(e => e.rating > 3.00);
  const[bookData, setBooks] = useState([]);
  const[userData, setUserData] = useState([]);
  const[jfuBooks, setJfu] = useState([]);
  const[search, setSearch] = useState('');

  let componentList = [];
  const currentUid = auth().currentUser.uid;
  const db = firestore();

  const getUserData = async() =>{
    const list = []
    await db 
    .collection('Users')
    .doc(currentUid)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log('User Data exists', documentSnapshot.exists)
        var data = doc.data();
        var Name = data.Name;
        var Age = data.age;
        list.push({
          name: Name,
          age: Age,
        })
        
        });
      });
      setUserData(list);
    }
  

  const getBooks = async() => {
    const list = [];
    await db
    .collection('Books')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const { Name, Author, Description, Cover, Age, Content} = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          progress: 0,
          coverUrl:  Cover,
          age: Age,
          content: Content,
        })
      })
    });
    setBooks(list);
    const list2 = list.filter(list => list.age < userData.age);
    console.log('book list', list2)
    setJfu(list2);
  }

  if (search) {
    const newData = bookData.filter(function (item) { //Create an array of newData that filters library data
      const itemData = item.bookName
        ? item.bookName.toUpperCase()
        : ''.toUpperCase();
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    componentList.push({ //Populate the filtered list with the book componenets
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
  }
  else {
    componentList.push({
      _id: 1,
      jsx: 
        <View style={styles.container}>
          <Text style={styles.title}>New</Text>
          <Divider style={styles.divider} />
          {
            (recentData.length == 0)
            ? <Text style={styles.emptyText}>No books have been added recently.</Text>
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
          <Text style={styles.title}>Just for You</Text>
          <Divider style={styles.divider} />
          {
            (setJfu.length == 0)
            ? <Text style={styles.emptyText}>No Popular books currently.</Text>
            : <FlatList style={styles.grid}
                data={setJfu}
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
            ? <Text style={styles.emptyText}>The store is empty...</Text>
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
  }
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log('GetUserData')
      getUserData();
      console.log('GetBooks')
      getBooks();
    }
  }, []);

  console.log(isInitialMount.current);
  return (
    (!isInitialMount)
    ? 
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large"/>
      </View>
    :
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
          onChangeText={(text) => setSearch(text)}
          onClear={(text) => setSearch('')}
        />
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


export default Store;