import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Switch, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Icon, } from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      backgroundColor: '#fff',
    },
    bookTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      width: 150,
      marginBottom: 5,
      marginTop: 10,
    },
    coverImage: {
      width: 100,
      height: 140,
      resizeMode: 'cover',
      marginBottom: 10,
      marginTop: 0,
    },
    bookPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
      alignSelf: 'center',
    },
    title: {
      fontSize: 12,
      textAlign: 'left',
      width: '80%',
    },
    item: {
      width: "60%",
      marginLeft: 10,
      alignItems: "flex-start",
    },
    text: {
      fontSize: 12,
      alignSelf: 'flex-start',
      letterSpacing:0,
      paddingTop: 0,
      paddingRight: 0,
      marginLeft: 0,
    },
  });
  

const PurchaseHistory = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookData, setBookData] = useState([]);

    const toLocaleDateString = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
        };

    const Item = ({ item }) => (
        <Card style={{ flexDirection: 'column', elevation: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 }}> 
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
            <Text style={styles.text}>Date Purchased: {item.date}</Text>
          </View>
          <Text style={styles.bookPrice}>${item.price}</Text>
        </View>
      </Card>
      
    );


    const ComponentItem = ({ item }) => (
        <View>{item.jsx}</View>
      );

    const getUserInfo = async() => {
        const userId = auth().currentUser.uid;
        console.log(userId)
        return firestore().collection('Users').doc(userId).collection('Library');
    }

    const getHistory = async() => {
        let list = [];
        let dateList = [];
        const userRef = await getUserInfo();
        await userRef.where('bookTitle', '!=', 'Temp').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log('Doc: ', doc.id);
                const { PurchaseDate } = doc.data();
                list.push(doc.id);
                dateList.push({date: PurchaseDate});
            })
        });
        console.log('Date List: ', dateList);
        getBooks(list, dateList);

    }

    const getBooks = async(bookNameList, dateList) => {
        let bookList = [];
        console.log('Name List: ', bookNameList);
        if(bookNameList.length != 0) {
        const bookRef = firestore().collection('Books');
        await bookRef.where('Name', 'in', bookNameList).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const { Name, Price} = doc.data();
                bookList.push({
                    _id: doc.id,
                    title: Name,
                    price: Price,
                });
            })
        });
        let mergedArray = []//Merge progressList with bookDetails
        for(let i = 0; i < bookNameList.length; i++){
          let obj1 = bookList[i]
          let obj2 = dateList[i]
          let mergedObj = Object.assign(obj1, obj2)
          mergedArray.push(mergedObj)
        }
        console.log("Merged Array: ", mergedArray);
        setBookData(mergedArray);
        }else{
            setBookData([]);
        }
    
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            setIsLoading(true);
            await Promise.all([getHistory()])
            setIsLoading(false);

        });
        return () => {unsubscribe};
    }, [navigation]);

    let componentList = [];
    componentList.push({
        _id: 1,
        jsx:
        <View style={styles.container}>
        {bookData.length == 0
            ? <Text style={styles.emptyText}>Nothing to see here.</Text>
            : <FlatList style={styles.grid}
                  data={bookData}
                  renderItem={Item}
                  keyExtractor={item => "r" + item._id}
                  listKey="r"
                />
          }
        </View>

    });

    if (isLoading){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if(bookData.length == 0){
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flexDirection: 'column'}}>
              <Icon name="cart" type='ionicon' size={100} color="#FFA500"/>
             <Text style={{textalign: 'center'}}>Nothing to see Here</Text>
            </View>
          </View>
        );}
        else{
        return (
                <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <FlatList style={styles.grid}
                        data={componentList}
                        renderItem={ComponentItem}
                        keyExtractor={item => "r" + item._id}
                        listKey="r"
                    />
                </View>
        );

        }


    
}

export default PurchaseHistory;


