// components/dashboard.js
import React, { useEffect, useState, useContext} from 'react';
import { ActivityIndicator, StyleSheet, View, Text, FlatList} from 'react-native';
import { Divider } from "@rneui/themed";
import BookTile from "../components/bookTile";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DarkModeContext from '../components/DarkModeContext';



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
    padding: 5,
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
    paddingTop: 10,

  },
  divider: {
    width: '98%',
    marginVertical: 5,
  },
  emptyText: {
    color: "grey",
    marginTop: 10,

  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },

});

const Item = ({ item }) => (
  <View style={[styles.item, {marginBottom: 0, height: 150}]}>
    <BookTile 
      key={"i" + item._id} 
      progress={item.progress}
      wordCount = {item.wordCount}
      coverUrl={item.coverUrl} 
      title={item.bookName}
      author={item.authorName}
      description={item.bookDes}
      content={item.content}
      favorite={item.favorite}
      link={item.link}

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
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkModeEnabled } = useContext(DarkModeContext);


  const db = firestore();
  const currentUid = auth().currentUser?.uid;


   
  const getLibraryBooks = async() =>{//getting books ID from the user/library subcollection   
    const nameList = [];
    await db
    .collection('Users/' + currentUid + '/Library')
    .where('inLibrary', '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        nameList.push(documentSnapshot.id)
      })
    })
    console.log('Name list: ', nameList)

    let bookDetails = [];//book details will hold the objects from /library
    
    let progressList = [];//word count, book progress

    if(nameList.length != 0){
      //console.log("What is in the namelist:  ", nameList);//console test
      //pushes word count and progress to the proglist array
      await db
      .collection('Users/' + currentUid + '/Library')
      .where('bookTitle', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document =>{
          const { WordCount, Progress} = document.data();
          progressList.push({
            wordCount: WordCount,
            progress: Progress
          })
        })
      });
      console.log("What is in the namelist:  ", nameList);//console test
      //console.log("What is in the progress list:  ", progressList);//console test
      //pushes other book details to bookDetails array
      await db
      .collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const { Name, Author, Description, Cover, Content, Favorite, Link } = documentSnapshot.data();          bookDetails.push({
            _id: documentSnapshot.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            coverUrl:  Cover,
            content: Content,
            favorite: Favorite,
            link: Link
          })
        })
      });
      bookDetails.sort((a, b) => (a.bookName > b.bookName) ? 1 : -1);

      //console.log('Book Details: ', bookDetails)
      //console.log('prog list: ', progressList)
      let mergedArray = []//Merge progressList with bookDetails
      for(let i = 0; i < nameList.length; i++){
        let obj1 = bookDetails[i]
        let obj2 = progressList[i]
        let mergedObj = Object.assign(obj1, obj2)
        mergedArray.push(mergedObj)
      }

    setBooks(mergedArray);//set the merged list
    }
  setBooks(bookDetails);//or set an empty list  
  } 

  const getRecentBooks = async () => {//For getting recent books  
    const nameList = [];
    await db
    .collection('Users/' + currentUid + '/Library')
    .where('Progress', '!=', 0)
    .limit(3)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        nameList.push(doc.id)
      })
    });
    let bookDetails = [];
    let progressList = [];

    if(nameList.length != 0){
      await db
      .collection('Users/' + currentUid + '/Library')
      .where('bookTitle', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { WordCount, Progress} = doc.data();
          progressList.push({
            wordCount: WordCount,
            progress: Progress
          })
        })
      });

      await db
      .collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { Name, Author, Description, Cover, Content, Link } = doc.data();          bookDetails.push({
            _id: doc.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            coverUrl:  Cover,
            content: Content,
            link: Link
          })
        })
      });
      bookDetails.sort((a, b) => (a.bookName > b.bookName) ? 1 : -1);

      let mergedArray = []//Merge progressList with bookDetails
      for(let i = 0; i < nameList.length; i++){
        let obj1 = bookDetails[i]
        let obj2 = progressList[i]
        let mergedObj = Object.assign(obj1, obj2)
        mergedArray.push(mergedObj)
      }
    setRecent(mergedArray);
    }
  setRecent(bookDetails);
  }

  const getFavoriteBooks = async () => {//For getting favorite books
    const nameList = [];
    await db
    .collection('Users/' + currentUid + '/Library')
    .where('Favorite', '==', true)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        nameList.push(doc.id)
      })
    });

    let bookDetails = [];
    let progressList = [];

    if(nameList.length != 0){
      await db
      .collection('Users/' + currentUid + '/Library')
      .where('bookTitle', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { WordCount, Progress} = doc.data();
          progressList.push({
            wordCount: WordCount,
            progress: Progress
          })
        })
      });
      
      await db
      .collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { Name, Author, Description, Cover, Content, Link } = doc.data();          bookDetails.push({
            _id: doc.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            coverUrl:  Cover,
            content: Content,
            link: Link
          })
        })
      });
      bookDetails.sort((a, b) => (a.bookName > b.bookName) ? 1 : -1);

      let mergedArray = []//Merge progressList with bookDetails
      for(let i = 0; i < nameList.length; i++){
        let obj1 = bookDetails[i]
        let obj2 = progressList[i]
        let mergedObj = Object.assign(obj1, obj2)
        mergedArray.push(mergedObj)
      }
    setFavorite(mergedArray);
      }
  setFavorite(bookDetails);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      setIsLoading(true);
      await Promise.all([getLibraryBooks(), getFavoriteBooks(), getRecentBooks()])
      setIsLoading(false);
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
        <Text style={{fontSize: 24,textAlign: 'left',width: '100%', paddingTop: 10, color: isDarkModeEnabled ? 'white' : 'black',

}}>Continue Reading</Text>
        <Divider style={styles.divider} />
        {
          (recent.length == 0)
          ? <Text style={{    color: "grey",
          marginTop: 10,
          color: isDarkModeEnabled ? 'white' : 'black',
      }}>You have no books open right Now</Text>
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
        <Text style={{ fontSize: 24,textAlign: 'left',width: '100%',paddingTop: 10,color: isDarkModeEnabled ? 'white' : 'black',

}}>Favorites</Text>
        <Divider style={styles.divider} />
        {
          (favorite.length == 0)
          ? <Text style={{    color: "grey",
          marginTop: 10,
          color: isDarkModeEnabled ? 'white' : 'black',
      }}>You don't have anything favorited.</Text>
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
        <Text style={{ fontSize: 24,textAlign: 'left',width: '100%',paddingTop: 10, color: isDarkModeEnabled ? 'white' : 'black',
}}>All</Text>
        <Divider style={styles.divider} />
        {
          (bookData.length == 0)
          ? <Text style={{color: "grey", marginTop: 10, color: isDarkModeEnabled ? 'white' : 'black',
      }}>You don't have any books in your library.</Text>
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
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
      <View style={{flex: 1,backgroundColor: isDarkModeEnabled ? '#303030' : 'white'}}>
        <View style={{flex: 1}}>
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
