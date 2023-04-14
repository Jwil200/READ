// components/cart.js *Based from store.js
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import { Divider } from "@rneui/themed";
import { Card, Icon, } from 'react-native-elements';
import { usePaymentSheet, StripeProvider, useStripe, CardField } from '@stripe/stripe-react-native';
import OrangeButton from '../assets/orangeButton.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useContext } from 'react';
import DarkModeContext from '../components/DarkModeContext.js';
import axios  from 'axios';


const db = firestore()
const currentUid = auth().currentUser.uid





const Cart = ({ navigation }) => {
  const [key, setKey] = useState(null);
  const[bookData, setBooks] = useState([]);
  const[nameList, setNameList] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const [checkoutAmount, setCheckoutAmount] = useState(1);
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    bookTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      width: '10%',
      marginTop: 10,
      marginLeft: 10,
  
    },
    coverImage: {
      width: 100,
      height: 140,
      resizeMode: 'cover',
      marginBottom: 10,
      marginTop: 0,

    },
    bookPrice: {
      fontSize: 30,
      fontWeight: 'bold',
      marginLeft: 10,


    },
    bookAuthor: {

  
    },
    screen: {
      height: '100%',
      width: '100%',
      paddingTop: 25,

    },
    container: {
      flex: 1,
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      paddingTop: 0,


    },
    grid: {
      width: '100%',


    },
    item: {
      width: "39%",
      alignItems: "center",
      margin: -20,

    },
    title: {
      fontSize: 24,
      textAlign: 'left',
      width: '100%',
      paddingTop: 10,
      color: isDarkModeEnabled ? 'white' : 'black',

  
    },
    divider: {
      width: '98%',
      marginVertical: 5,

    },
    emptyText: {
      color: "grey",
      marginTop: 10,
      textAlignVer: 'center',
  
    },
    checkoutButton: {
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    card: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'space-between',
      paddingHorizontal: 10,

    },
    cartText: {
      fontSize: 16,
      alignSelf: 'flex-end',
      position: 'absolute',
      letterSpacing:0,
      paddingTop: 0,
      paddingRight: 0,
      marginLeft: 110,
    },
  });
  //get cart books
  const Item = ({ item }) => (
    <Card style={styles.card} >
      <View style={{flexDirection: 'row'}}>
        <Card.Image source={{uri: item.coverUrl}} style={styles.coverImage} resizeMode="contain" />
        <Card.Divider/>
        <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode='tail'>
          <Card.Title style={styles.bookTitle}> 
            {item.bookName}
          </Card.Title>
        </Text>
        <Text style={styles.cartText}>
          <Text style={styles.bookAuthor}>
            {item.authorName}{"\n"}{"\n"}
          </Text>
          <Text style={styles.bookPrice}>
            ${item.price}
          </Text>
        </Text>
        <Icon
        name='close-o'
        type='evilicon'
        color='red'
        onPress={() => {
          Alert.alert(
            'Remove Item',
            'Remove from cart?',
            [
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => {
                  removeBook(item.bookName);
                  // handle remove action here
                }
              }
            ],
            { cancelable: false }
          )
        }
      }
      containerStyle={{ position: 'absolute', top: -6, right: 0 }}
      />
      </View>
      {/* <View style={styles.item}> */}
        {/* <BookStoreTile 
        coverUrl={item.coverUrl}
        author={item.authorName}
        description={item.bookDes}
        key={"i" + item._id} 
        id={item._id}
        title= {item.bookName}
        price={item.price}
        isRecent={item.isRecent}
        rating={item.rating}
        isAddedtoCart={item.isAddedtoCart}
        disabled={true}
        /> */}
      {/* </View> */}
  
        {/* <Text style={styles.cartText}>
          <Text style={styles.bookPrice}>
            {item.bookName}{"\n"}
          </Text>
          <Text style={styles.h2}>
            {item.authorName}{"\n"}{"\n"}
          </Text>
  
          <Text style={styles.bookPrice}>
            ${item.price}
          </Text>
        </Text> */}
    </Card>
  );
  
  const ComponentItem = ({ item }) => (
    <View>{item.jsx}</View>
  );

  const removeBook = async (bookName) => {
    console.log(bookName);
    await db.collection('Users/' + currentUid + '/Cart').doc(bookName).delete();
    getCartBooks();
  }
  
  const getCheckoutAmount = async() =>{
    await db
    .collection('Users/' + currentUid + '/Cart')
    .where('Name', '!=', 'Temp')
    .onSnapshot(querySnapshot => {
      let totalAmount = 0;
      querySnapshot.forEach(doc => {
        
        const item = doc.data()
        console.log(item.Name, ' ' , item.Price)
        totalAmount += parseFloat(item.Price);
      });
      console.log("Total:" , totalAmount)
      setCheckoutAmount(totalAmount);
      if(totalAmount != 0){
        initializePaymentSheet(totalAmount);
      }
    })
  }

  const checkoutAmountToIntger = () =>{
    const integerNumber = Math.round(checkoutAmount * 100);
    return integerNumber;
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
    });

    let bookNameList = list.filter( e => e !== "Temp" );//nameList holds the a list of of books that has matching parameters
    setNameList(bookNameList);//used for post Payment

    let bookDetails = [];// gets book details from the library collection

    if(bookNameList.length != 0){
      console.log("What is in the namelist:  ", bookNameList);//console test
      await db
      .collection('Books')
      .where('Name', 'in', bookNameList)
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
      console.log("Book details: ", bookDetails)
      setBooks(bookDetails)
    }
    setBooks(bookDetails)
  }

  //Stripe Payment

const initializePaymentSheet = async (totalAmount) => {
  const clientSecret = await fetchPaymentIntent(totalAmount);

  console.log("CLient key: ", clientSecret)
  //const ephemeralKey = await fetchEphemeralKey();
  const { error } = await initPaymentSheet({
    merchantDisplayName: 'Read',
    paymentIntentClientSecret: clientSecret,
  });

  if (error){
    Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  }

  const fetchPaymentIntent = async (totalAmount) => {
    //console.log("Amount: ", checkoutAmount)
    const integerNumber = Math.round(totalAmount * 100);
    console.log("Integer: ", integerNumber)
    const  response  = await axios.post(
      'https://us-central1-read-1992f.cloudfunctions.net/createPaymentIntent',
      {
        amount: integerNumber,
        currency: 'usd',
        customer: 'cus_NZ6sCuy9M9CKeO', //dummy info
        payment_method_types: ['card'],
      }
    );
    const clientSecret = response.data.client_secret;
    setKey(clientSecret);
    return clientSecret;
    
  };
  
   const buy = async () => {
    console.log('buying')
     const {error} = await presentPaymentSheet();
     if (error){
       Alert.alert(`Error code: ${error.code}`, error.message);
     } else {
      postPayment();
       Alert.alert('Success', 'Payment confirmed successfully');
       setReady(false);
     }
   };

  //post payment
  const postPayment = async () => {
    setIsLoading(true);
    //delete from cart page
    console.log('Namelist: ', nameList);
    const cartRef = db.collection('Users').doc(currentUid).collection('Cart');
    nameList.forEach(async (name) => {
      const querySnapshot = await cartRef.where('Name', '==', name).get();
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });

    //add to library

    //handles date 
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() returns 0-based index, so add 1 to get the actual month
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const date = `${month}/${day}/${year}`;
    const libraryRef = db.collection('Users').doc(currentUid).collection('Library');
    nameList.forEach(async (name) => {
      libraryRef.doc(name).set({
        bookTitle: name,
        Progress: 0,
        WordCount: 0,
        inLibrary: true,
        Favorite: false,
        PurchaseDate: date
      }).then(() => {
        console.log("Book added to library!");
      }
      ).catch((error) => {
        console.error("Error writing document: ", error);
      }
      );
    });
    setBooks([]);
    setIsLoading(false);
  }  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      setIsLoading(true);
      await Promise.all([getCartBooks(), getCheckoutAmount()]);

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
        <Text style={styles.title}>Your Cart</Text>
        <Divider style={styles.divider} />
        
          {bookData.length == 0
          ? <Text style={styles.emptyText}>Your cart is empty!</Text>
          : <FlatList style={styles.grid}
                data={bookData}
                renderItem={Item}
                keyExtractor={item => "r" + item._id}
                listKey="r"
              />
        }
      </View>
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if(bookData.length == 0){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  backgroundColor: isDarkModeEnabled ? '#303030' : 'white',
    }}>
        <View style={{flexDirection: 'column',
}}>
          <Icon name="cart" type='ionicon' size={100} color="#FFA500"/>
         <Text style={{textalign: 'center', color: isDarkModeEnabled ? 'white' : 'black'}}>Your cart is empty!</Text>
        </View>
      </View>
    );

  } else {

  return (
    <View style={{flex: 1 ,backgroundColor: isDarkModeEnabled ? '#303030' : 'white'
  }}>
      <StripeProvider publishableKey={'pk_test_51MnuFXEtUzCDwLJQuJqtaWMuaCfWONYj3xWD0XKGTkFJgxbAu7w2UzcXmyhPIDtvvNC7LQYtvkK6qi8cjtBbBtNb00g8oYHhMV'}>
        <View style={{flex: 0.95,
}}>
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
            onPress={buy}
            disabled={!ready}
            /> 
        </View>
        
        </StripeProvider>
    </View>
  );
  }
}
export default Cart;