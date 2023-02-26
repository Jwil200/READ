// components/cart.js *Based from store.js
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { bookStoreData } from "../components/storeBooks.js";
import { Divider } from "@rneui/themed";
import BookStoreTile from "../components/bookStoreTile.js";
import OrangeButton from '../assets/orangeButton.js';

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
    alignItems: "center",
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
    marginTop: 10,
    textAlignVer: 'center'
  },
  checkoutButton: {
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});

const Item = ({ item }) => (
  <View style={styles.item}>
    <BookStoreTile 
     key={"i" + item._id} 
     id={item._id}
     title= {item.title}
     isRecent={item.isRecent}
     rating={item.rating}
     isAddedtoCart={item.isAddedtoCart}
/>
  </View>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Cart = ({ navigation }) => {
  let recentData = bookStoreData.filter(e => e.isAddedtoCart);

  let componentList = [];

  componentList.push({
    _id: 1,
    jsx: 
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <Divider style={styles.divider} />
        
          {recentData.length == 0
          ? <Text style={styles.emptyText}>Your cart is empty!</Text>
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

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.9}}>
        <FlatList
          data={componentList}
          renderItem={ComponentItem}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={styles.checkoutButton}>
        <OrangeButton 
          title="Checkout ($0.00)" 
          size="sm"
          onPress={() => navigation.navigate('Checkout')}
          /> 
      </View>
    </View>
  );
}
export default Cart;