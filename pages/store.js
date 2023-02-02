// components/store.js *Based from dashboard.js at the moment
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator , StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import { colors, SearchBar, Button} from 'react-native-elements';
import BookStoreTile from "../components/bookStoreTile.js";
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
    padding: 20,
    paddingTop: 10
  },
  grid: {
    width: '100%'
  },
  item: {
    width: "31.5%",
    alginItems: "center",
    margin: 5,
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
    marginVertical: 10,
  },
  emptyText: {
    color: "white",
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

  let recentData = 0//bookStoreData.filter(e => e.isRecent);
  const[bookData, setBooks] = useState([]);
  const[justForYou, setJustForYou] = useState([]);
  const[search, setSearch] = useState('');

  let componentList = [];
  const currentUid = auth().currentUser.uid;
  const db = firestore();

  const getJustForYou = (newlist, age) =>{
    let data = newlist;
    //console.log('data: ', data)
    let newData = data.filter((data) => data.age < age)
    setJustForYou(newData);
  }

  const getBooks = async() => {//Gets the books from the books Collection
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
          coverUrl:  Cover,
          age: Age,
          content: Content,
        })
      })
    });
    console.log('Current User', currentUid)
    let data = [];
    await db 
    .collection('Users')
    .doc(currentUid)
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);
      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
        let data = documentSnapshot.data();
        console.log('User Age ', data.age)
        getJustForYou(list, data.age);
      }
    });
    setBooks(list);

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
            (justForYou.length == 0)
            ? <Text style={styles.emptyText}>No Popular books currently.</Text>
        : <FlatList style={styles.grid}
                data={justForYou}
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
    </View>
  );
}


export default Store;