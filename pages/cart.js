// components/cart.js *Based from store.js
import React, { useEffect, useState, useRef } from 'react';
import { Button, ActivityIndicator, StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { bookStoreData } from "../components/storeBooks.js";
import { Divider } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import BookStoreTile from "../components/bookStoreTile.js";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const OrangeButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={["orange","#e65c00"]}
      style={styles.appButtonContainer2}
    >  
      <Text style={styles.appButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);


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
    alignItems: 'center',
  },
  appButtonContainer2:{
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 100,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

const Item = ({ item }) => (
  <View style={styles.item}>
    <BookStoreTile 
     coverUrl={item.coverUrl}
     author={item.authorName}
     description={item.bookDes}
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
  let isInitialMount = useRef(true);
  const[bookData, setBooks] = useState([]);
  const[isMount, setMount] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const db = firestore();
  const currentUid = auth().currentUser.uid;

  const getCheckoutAmount = async() =>{
    await db
    .collection('Users/' + currentUid + '/Cart')
    .where('Name', '!=', 'Temp')
    .onSnapshot(querySnapshot => {
      let totalamount = 0;
      querySnapshot.forEach(doc => {
        
        const item = doc.data()
        console.log(item.Name, ' ' , item.Price)
        totalamount += parseFloat(item.Price);
      });
      console.log("Total:" , totalamount)
      setCheckoutAmount(totalamount)
    })
  }

  const getCartBooks = async() =>{
    const list = [];
    await db
    .collection('Users/' + currentUid + '/Cart')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push(doc.id)
      })
    })

    let nameList = list.filter( e => e !== "Temp" );//nameList holds the a list of of books that has matching parameters

    let bookDetails = [];

    if(nameList.length != 0){
      console.log("What is in the namelist:  ", nameList);//console test
      await db
      .collection('Books')
      .where('Name', 'in', nameList)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { Name, Author, Description, Cover, Price } = doc.data();
          bookDetails.push({
            _id: doc.id,
            bookName: Name,
            authorName: Author,
            bookDes: Description,
            coverUrl:  Cover,
            price: Price
          })
        })
      });
      setBooks(bookDetails)
    }
    setBooks(bookDetails)
  }



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartBooks();
      getCheckoutAmount();
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
        <Text style={styles.title}>Your Cart</Text>
        <Divider style={styles.divider} />
        
          {bookData.length == 0
          ? <Text style={styles.emptyText}>Your cart is empty!</Text>
          : <FlatList style={styles.grid}
              data={bookData}
              numColumns={3}
              renderItem={Item}
              keyExtractor={item => "r" + item._id}
              listKey="r"
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
      <View style={styles.checkoutButton}>
      <OrangeButton 
          title ={`Checkout ($${checkoutAmount})`}
          size="sm"
          onPress={() => navigation.navigate('Checkout')}
          />
      </View>
    </View>
  );
}
export default Cart;