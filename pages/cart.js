// components/cart.js *Based from store.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { bookStoreData } from "../components/storeBooks.js";
import { Divider } from "@rneui/themed";
import { Card } from 'react-native-elements';
import BookStoreTile from "../components/bookStoreTile.js";
import OrangeButton from '../assets/orangeButton.js';
import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';

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
    width: "39%",
    alignItems: "center",
    margin: -5,
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
    flexWrap: 'wrap'
  },
  cartText: {
    alignSelf: 'flex-end',
    position: 'absolute',
    letterSpacing: 1,
    paddingTop: 40,
    paddingRight: 10
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20
  }
});

const Item = ({ item }) => (
  <Card style={styles.card}>
    <View style={styles.item}>
      <BookStoreTile 
      key={"i" + item._id} 
      id={item._id}
      title= {item.title}
      author={item.author}
      price={item.price}
      isRecent={item.isRecent}
      rating={item.rating}
      isAddedtoCart={item.isAddedtoCart}
      disabled={true}
      />
    </View>

      <Text style={styles.cartText}>
        <Text style={styles.h1}>
          {item.title}{"\n"}
        </Text>
        <Text style={styles.h2}>
          {item.author}{"\n"}{"\n"}
        </Text>

        <Text style={styles.h1}>
          ${item.price}
        </Text>
        
        
      </Text>
  </Card>
);

const ComponentItem = ({ item }) => (
  <View>{item.jsx}</View>
);

const Cart = () => {
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  const initializePaymentSheet = async () => {
    const paymentIntent = stripe.paymentIntents.create({
      amount: 2099, //dummy info
      currency: 'usd',
      customer: 1,
      payment_method_types: ['card']
    });

    
    useEffect(() => {
      initializePaymentSheet();
    }, []);

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
          : 
            <FlatList style={styles.grid}
                data={recentData}
                renderItem={Item}
                keyExtractor={item => "r" + item._id}
                listKey="r"
              />
        }
      </View>
  });

  return (
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
            title="Checkout ($0.00)" 
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