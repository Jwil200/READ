import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Header, Divider, Tile } from '@rneui/themed';
import BookTile from '../components/bookTile.js';
import { SearchBar, Icon } from 'react-native-elements';
import { bookData } from '../assets/books.js';




const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  grid: {
    width: '100%',
  },
  item: {
    width: '31.5%',
    alignItems: 'center',
    margin: 3,
    backgroundColor: '#e9eef1',
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
    color: 'grey',
    marginTop: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});




const Item = ({ item, updateFavorites }) => (
  <View style={styles.item}>
    <BookTile
      key={'i' + item._id}
      id={item._id}
      title={item.title}
      progress={item.progress}
      isRecent={item.isRecent}
      isFavorite={item.isFavorite}
    />
    <TouchableOpacity
      style={styles.favoriteIcon}
      onPress={() => updateFavorites(item._id)}
    >
      <Icon
        name={item.isFavorite ? 'heart' : 'heart-o'}
        type='font-awesome'
        color={item.isFavorite ? 'red' : 'grey'}
      />
    </TouchableOpacity>
  </View>
);




const ComponentItem = ({ item }) => <View>{item.jsx}</View>;




const Dashboard = ({ navigation }) => {
  let recentData = bookData.filter((e) => e.isRecent);
  let favoriteData = bookData.filter((e) => e.isFavorite);




  let componentList = [];




  const [search, setSearch] = useState('');




  const updateFavorites = (bookId) => {
    const updatedBookData = bookData.map((book) => {
      if (book._id === bookId) {
        book.isFavorite = !book.isFavorite;
      }
      return book;
    });




    const updatedFavoriteData = updatedBookData.filter(
      (book) => book.isFavorite,
    );




    componentList[1].jsx = (
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Divider style={styles.divider} />
        {updatedFavoriteData.length === 0 ? (
          <Text style={styles.emptyText}>
            You don't have anything favorited.
          </Text>
        ) : (
          <FlatList
            style={styles.grid}
            data={updatedFavoriteData}
            numColumns={3}
            renderItem={({ item }) => (
              <Item item={item} updateFavorites={updateFavorites} />
            )}
            keyExtractor={(item) => 'f' + item._id}
            listKey='f'
          />
        )}
      </View>
    );




    setFilteredDataSource([...componentList]);
  };




  componentList.push({
    _id: 1,
    jsx: (
      <View style={styles.container}>
        <Text style={styles.title}>Recent</Text>
        <Divider style={styles.divider} />
        {recentData.length === 0 ? (
          <Text style={styles.emptyText}>
            You haven't read anything recently.
          </Text>
        ) : (
          <FlatList
            style={styles.grid}
            data={recentData}
            numColumns={3}
            renderItem={({ item }) => (
              <Item item={item} updateFavorites={updateFavorites} />
            )}
            keyExtractor={(item) => 'r' + item._id}
            listKey='r'
          />
        )}
      </View>
    ),
  });
  componentList.push({
    _id: 2,
    jsx: (
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Divider style={styles.divider} />
        {favoriteData.length === 0 ? (
          <Text style={styles.emptyText}>
            You don't have anything favorited.
          </Text>
        ) : (
          <FlatList
            style={styles.grid}
            data={favoriteData}
            numColumns={3}
            renderItem={({ item }) => (
              <Item item={item} updateFavorites={updateFavorites} />
            )}
            keyExtractor={(item) => 'f' + item._id}
            listKey='f'
          />
        )}
      </View>
    ),
  });
  componentList.push({
    _id: 3,
    jsx: (
      <View style={styles.container}>
        <Text style={styles.title}>All</Text>
        <Divider style={styles.divider} />
        {bookData.length === 0 ? (
          <Text style={styles.emptyText}>
            You don't have any books in your library.
          </Text>
        ) : (
          <FlatList
            style={styles.grid}
            data={bookData}
            numColumns={3}
            renderItem={({ item }) => (
              <Item item={item} updateFavorites={updateFavorites} />
            )}
            keyExtractor={(item) => 'a' + item._id}
            listKey='a'
          />
        )}
      </View>
    ),
  });




  const [filteredDataSource, setFilteredDataSource] = useState(componentList);




  const searchFilterFunction = (text) => {
    if (text) {
      const newData = bookData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });




      const filteredList = [];




      filteredList.push({
        _id: 1,
        jsx: (
          <View style={styles.container}>
            {newData.length === 0 ? (
              <Text style={styles.emptyText}>Book not available.</Text>
            ) : (
              <FlatList
                style={styles.grid}
                data={newData}
                numColumns={3}
                renderItem={({ item }) => (
                  <Item item={item} updateFavorites={updateFavorites} />
                )}
                keyExtractor={(item) => 'a' + item._id}
                listKey='a'
              />
            )}
          </View>
        ),
      });
      setFilteredDataSource(filteredList);
      setSearch(text);
    } else {
      setFilteredDataSource(componentList);
      setSearch(text);
    }
  };




  return (
    <View style={styles.screen}>
      <Header
        containerStyle={{
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: -95
        }}
      />
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder='Search books...'
        value={search}
        containerStyle={{ backgroundColor: 'transparent' }}
        inputContainerStyle={{ backgroundColor: '#e9eef1' }}
        inputStyle={{ color: 'black' }}
      />
      <ScrollView style={{ width: '100%', marginTop: 10 }}>
        <FlatList
          data={filteredDataSource}
          renderItem={({ item }) => <ComponentItem item={item} />}
          keyExtractor={(item) => 'c' + item._id}
          listKey='c'
        />
      </ScrollView>
    </View>
  );
};




export default Dashboard;









