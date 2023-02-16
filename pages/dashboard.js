// components/dashboard.js
import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { Header, Divider, Tile } from "@rneui/themed";
import { SearchBar } from 'react-native-elements'
import BookTile from "../components/bookTile";
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
      content={item.content}
    />
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Dashboard = ({ navigation }) => {
  const[bookData, setBooks] = useState([]);
  const[isMount, setMount] = useState(false);
  const[favorite, setFavorite] = useState([]);
  const[recent, setRecent] = useState([]);
  
  const db = firestore();
  const currentUid = auth().currentUser.uid;

  const inLibrary = async() =>{ //Checks to see if data on this book in the library subcollection for the user
    firestore()
    .collection('Users/' + currentUid + '/Library')
    .doc(book.title)
    .get()
    .then(doc => {
      var dat = doc.data()
      console.log("In library: ", dat.Favorite);
      let check = dat.Favorite;
      return check
    })
  }
  const getLibraryBooks = async() =>{//getting books ID from the user/library subcollection
    /*
    const proglist = [];//gets the progress of all books from the User/Library subcollection
    await db
    .collection('Users/' + currentUid + '/Libray')
    .where('Name', '!=', 'Temp')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot =>{
        const { WordCount, Progress} = documentSnapshot.data();
        proglist.push({
          wordCount: WordCount,
          progress: Progress
        })
      })
    });
    console.log(proglist);
*/


   

    const list = [];
    await db
    .collection('Users/' + currentUid + '/Library')
    .where('inLibrary', '==', true)
    .get()
    .then(querySnapshot => {
      //console.log('Total books: ', querySnapshot.size);  
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id);
        list.push(documentSnapshot.id)
      })
    })

    let nameList = list.filter( e => e !== "Temp" );//nameList holds the a list of of books that has matching parameters
    console.log("What is in the namelist:  ", nameList);//console test
    
    let list2 = [];//list 2 will hold the objects from /library
    //can also reset list
    if(nameList.length != 0){
      await db.collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { Name, Author, Description, Cover, Progress } = doc.data();
          list2.push({
            _id: doc.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            progress: Progress,
            coverUrl:  Cover
          })
        })
      });

      //console.log("Result: ", list2);//test
      //Array.prototype.push.apply(list2, proglist); 
      //console.log(list2);
      
    }
    setBooks(list2);
    
  } 
  

  const getFavoriteBooks = async () => {//For getting favorite books
    const list = [];
    await db
    .collection('Users/' + currentUid + '/Library')
    .where('Favorite', '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push(doc.id)
      })
    });

    let nameList = list.filter( e => e._id !== "Temp" );//bootleg solution to remove test code

    let list2 = [];
    if(nameList.length != 0){
      await db
      .collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { Name, Author, Description, Cover } = doc.data();
          list2.push({
            _id: doc.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            progress: 0.5,
            coverUrl:  Cover
          })
        })
      });
      setFavorite(list2)
    }
  }
/*
  const getRecentBooks = async() => {//For getting recent books
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
    let tempList = list.filter( e => e._id !== "Temp" ); //bootleg solution to remvove temp file
    setRecent(tempList);
  }
*/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLibraryBooks();
      getFavoriteBooks();
      setMount(true);
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);


  let componentList = [];

  componentList.push({
    _id: 1,
    jsx: 
      <View style={styles.container}>
        <Text style={styles.title}>Recent</Text>
        <Divider style={styles.divider} />
        {
          (recent.length == 0)
          ? <Text style={styles.emptyText}>You haven't read anything recently.</Text>
          : <FlatList style={styles.grid}
              data={recent}
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
    (!isMount)//need to add search bar
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
      </View>
  );
}
export default Dashboard;
