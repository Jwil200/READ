// components/cart.js *Based from store.js
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import { Divider } from "@rneui/themed";
import { Card, Icon, Dialog } from 'react-native-elements';
import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import OrangeButton from '../assets/orangeButton.js';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();
const currentUid = auth().currentUser.uid;


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
    width: "39%",
    alignItems: "center",
    margin: -20,
    backgroundColor: '#e9eef1',
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


const Cart = ({ navigation }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const[bookData, setBooks] = useState([]);
  const[isMount, setMount] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
 

  
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
    });

    let nameList = list.filter( e => e !== "Temp" );//nameList holds the a list of of books that has matching parameters

    let bookDetails = [];// gets book details from the library collection

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
      console.log("Book details: ", bookDetails)
      setBooks(bookDetails)
    }
    setBooks(bookDetails)
  }

  //Stripe Payment
  const initializePaymentSheet = async () => {
    const paymentIntent = stripe.paymentIntents.create({
      amount: 2099, //dummy info
      currency: 'usd',
      customer: 1,
      payment_method_types: ['card']
    });

    const { error } = await initPaymentSheet({
      customerId: 1, //dummy info
      customerEphemeralKeySecret: 1234, 
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'READ Mobile App',
    });

    if (error){
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  }

  const buy = async () => {
    const { error } = await presentPaymentSheet();

    if (error){
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Payment confirmed successfully');
      setReady(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartBooks();
      getCheckoutAmount();
      initializePaymentSheet();
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
      <StripeProvider publishableKey={'pk_test_51Me1uSKEBCZYewMa90gWv5uMmNtQ0svMhPNpc8uHHC1sfWssMTjFoFehcUts9Ovl5VxZtfoJkMEzlj7Ipg9AjwdG00Wjt7V1uz'}>
        <View style={{flex: 0.95}}>
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
            disabled={loading || !ready}
            /> 
        </View>
        </StripeProvider>
    </View>
  );
}
export default Cart;