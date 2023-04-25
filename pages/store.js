// components/store.js *Based from dashboard.js at the moment
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator , StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import { Divider, Dialog, ListItem, Avatar } from "@rneui/themed";
import { SearchBar, Button, Icon} from 'react-native-elements';
import BookStoreTile from "../components/bookStoreTile.js";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DarkModeContext from '../components/DarkModeContext.js';





const genreList = [
  {
    name: 'Fantasy',
    avatar_url: 'https://img.icons8.com/color/48/null/magic-crystal-ball.png',
    subtitle: 'Wizzard, Knights, and Magic!!',
  },
  {
    name: 'Children',
    avatar_url: 'https://img.icons8.com/fluency/48/null/children.png',
    subtitle: 'Book for younger Children',
  },
  {
    name: 'Animal',
    avatar_url:
      'https://img.icons8.com/external-justicon-flat-justicon/64/null/external-dog-dog-and-cat-justicon-flat-justicon-4.png',
    subtitle: 'For those who love Animals.',
  },
  {
    name: 'Culture',
    avatar_url:
      'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-culture-archaeology-flaticons-lineal-color-flat-icons.png',
    subtitle: 'Experience Different Cultures',
  },
];

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
    paddingTop: 0,
    backgroundColor: 'background-basic-color-1'
    
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
    color: "white",
    marginTop: 10
  }
});


const Item = ({ item }) => (
  <View style={[styles.item, {marginBottom: 0, height: 150}]}>
    <BookStoreTile 
     key={"i" + item._id} 
     coverUrl={item.coverUrl} 
     author={item.authorName}
     id={item._id}
     description={item.bookDes}
     title= {item.bookName}
     content={item.content}
     price={item.price}
/>
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);


const Store = ({ navigation }) => {
  const[bookData, setBooks] = useState([]);
  const[justForYou, setJustForYou] = useState([]);
  const[search, setSearch] = useState('');
  const[visible, setVisible] = useState(false);
  const[selectedGenre, setSelectedGenre] = useState("")
  const[filteredBooks, setFilteredBooks] = useState("")
  const[isLoading, setIsLoading] = useState(true);

  let recentData = 0;

  let componentList = [];
  const currentUid = auth().currentUser.uid;
  const db = firestore();

  const filterBooks = () =>{
    setVisible(true);
  }

  const handleCancel = () =>{
    setVisible(false);
  }

  const clearFilter = () =>{
    setSelectedGenre('');
    setVisible(false);
  }

  const handleGenreSelection = async(genre) =>{
    setVisible(false);
    await handleFilter(genre);
  }

  const handleFilter = async(genre) => {
    console.log("selected Genre: ", genre);
    await db
    .collection('Books')
    .where('Genre', 'array-contains', genre)
    .get()
    .then(querySnapshot => {
      const books = []
      querySnapshot.forEach(documentSnapshot =>{
        const { Name, Author, Description, Cover, Age, Content, Price} = documentSnapshot.data();
        books.push({
          _id: documentSnapshot.id,
          bookName: Name,
          authorName: Author,
          bookDes: Description,
          coverUrl:  Cover,
          age: Age,
          content: Content,
          price: Price,
        })
      })
      console.log("books: ", books);
      setSelectedGenre(genre);
      setFilteredBooks(books);
    })
  }

  const getJustForYou = (newlist, age) =>{
    let data = newlist;
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
        const { Name, Author, Description, Cover, Age, Price, Genre} = doc.data();
        list.push({
          _id: doc.id,
          bookName: Name,
          bookGenre: Genre,
          authorName: Author,
          bookDes: Description,
          coverUrl:  Cover,
          age: Age,
          price: Price,
        })
      })
    });

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
        getJustForYou(list, data.age);
      }
    });
    console.log("Book Genres: ", list.bookGenre )
    setBooks(list);
  }

  if (search) {//Search function
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
  else if(selectedGenre){
    componentList.push({ //Populate the filtered list with the book componenets
      _id: 1,
      jsx:
        <View style={styles.container}>
          {
      (filteredBooks.length == 0)
      ? <Text style={styles.emptyText}>Book not available.</Text>
            : <FlatList style={styles.grid}
          data={filteredBooks}
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
    const unsubscribe = navigation.addListener('focus', async() => {
      setIsLoading(true);
      await Promise.all([getBooks()])
      setIsLoading(false);
    });
    return () => {unsubscribe;
    };
  }, [navigation]);

  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', backgroundColor: 'orange'}}>
        <SearchBar round 
          cancelButtonTitle='X'
          lightTheme
          searchIcon={{ size: 20 }}
          inputStyle={{backgroundColor: 'white'}}
          placeholderTextColor={'#g5g5g5'}
          placeholder={'Search'}
          containerStyle={{
            backgroundColor: 'orange',
            width: '90%',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{ 
            backgroundColor: '#fff',
          }} 
          value={search}
          onChangeText={(text) => setSearch(text)}
          onClear={(text) => setSearch('')}
        />
        <Icon 
          name='filter'
          type='font-awesome'
          color='black'
          onPress={() => setVisible(true)}
          title="Filter Genre" 
          containerStyle={{paddingTop: 10, marginTop: 10, marginRight: 5, marginLeft: 5 }}
          style={{paddingTop: 10, marginTop: 10, marginRight: 10 }}
        />

        </View>
        <FlatList
          data={componentList}
          renderItem={ComponentItem}
          keyExtractor={item => item._id}
        />
          <Dialog isVisible ={visible} onBackdropPress={handleCancel}>
          <Dialog.Title title= "Genre Selection" />
        <View style={{height: 300}}>
        <ScrollView>
        {genreList.map((genre, i) => (
        <ListItem
          key={i}
          containerStyle={{
            marginHorizontal: -10,
            borderRadius: 8,
          }}
          onPress={() => handleGenreSelection(genre.name)}
        >
          <Avatar rounded source={{ uri: genre.avatar_url }} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700' }}>
              {genre.name}
            </ListItem.Title>
            <ListItem.Subtitle>{genre.subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        
      ))}
     </ScrollView>
    </View>
        <Dialog.Button title="Reset" onPress={clearFilter} />
        </Dialog>
      </View>
    </View>
  );
}


export default Store