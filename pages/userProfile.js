import React, { useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { Divider } from '@rneui/themed';
import { Button } from '@rneui/base';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ProgressButton } from 'react-native-progress-button';
import { bookData } from "../assets/books.js"; //dummy data for books
import BookTile from "../components/bookTile.js"; //dummy book tile
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore()
const currentUid = auth().currentUser.uid


const UserProfile = () => {
  const [Name, setName] = useState('');
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState([]);

  const getBookData = async () => {//gets the most read book
    try {
      const querySnapshot = await db.collection('Users/' + currentUid + '/Library').get();
      const data = querySnapshot.docs.map(doc => doc.data());
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getUserStats = async() => {//gets user book stats
    let data = [];
    try {
      const querySnapshot = await db.collection('Users/' + currentUid + '/Stats').get()
      .then(querySnapshot => {
        const { TotalWordsRead, TotalBooksRead, TotalTimeSpentReading, Name } = querySnapshot.docs[0].data();
        data.push({TotalWords: TotalWordsRead, TotalBooks: TotalBooksRead, TotalTimeSpent: TotalTimeSpentReading, Name: Name});
      })

      setUserStats(data);

    }
    catch (error) {
      console.log(error);
    }
  }

  const getMostRead = async() => {
    try{
      await db.collection('Users/' + currentUid + '/Library').orderBy("TimesRead", "desc").limit(1).get()
      .then(querySnapshot => {
        const { bookTitle, TimesRead, Name } = querySnapshot.docs[0].data();
        const data = ({bookTitle: bookTitle, timesOpened: TimesRead});
        getBookImage(data);
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  const getBookImage = async(data) => {
    console.log(data.bookTitle);
    try {
      await db.collection('Books').where("Name", "==", data.bookTitle).get()
      .then(querySnapshot => {
        const { Cover } = querySnapshot.docs[0].data();
        data.Image = Cover;
        console.log(Cover);
      })
      console.log(data)
      setBookData(data);
    }
    catch (error) {
      console.log(error);
    }

  }

const getName = async() => {
  console.log('here')
  try {
    await db.collection('Users').doc(currentUid).get()
    .then(doc => {
      const data = doc.data();
      setName(data.name);
      console.log(data.name);
    })
  }
  catch (error) {
    console.log(error);
  }

}





  useEffect(() => {
    setIsLoading(true);
    getUserStats();
    getMostRead();
    getName();
    setIsLoading(false);
  }, []);

  const CircularProgress = () => (
    <AnimatedCircularProgress
      padding={10}
      size={100}
      width={10}
      fill={20}
      tintColor="#00e0ff"
      backgroundColor="#3d5875">
      {
        () => (
          <Text style={{textAlign: 'center'}}>
            {"hello"}
          </Text>
        )
      }
    </AnimatedCircularProgress>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://picsum.photos/200' }}
        />

        <Text style={styles.nameText}>{Name}</Text>

      <View style={styles.button}>
        <Button
          buttonStyle={{ 
            width: 150, 
            backgroundColor: '#f29716',
          }}
          containerStyle={{ margin: 5 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F"
          }}
          disabledTitleStyle={{ color: "#00F" }}
          iconContainerStyle={{ background: "#000" }}
          loadingProps={{ animating: true }}
          onPress={() => alert("Hi")}
          title="Edit Profile"
          titleStyle={{ marginHorizontal: 5 }}
        />
      </View>    
    
      <Divider style={styles.divider} />


          <Text style={styles.statText}>Your Statistics (Last 7 Days)</Text>
          <Divider style={styles.divider2} />
          <Text style={styles.descriptionText}>250 Words Read, 2 Books Completed</Text>
          <Divider style={styles.divider2} />
          <Text style={styles.statText}>This Week's Goals</Text>
          <Divider style={styles.divider2} />

          <View style={{ flex: 1, flexDirection: "row"}}>
            <CircularProgress
              text= {'250/700\nWords'}
              progress= {30}/>
            <CircularProgress
              text= {'2/5\nBooks'}
              progress= {40}/>
            <CircularProgress
              text= {'30/40\nWPM'}
              progress= {75}/>
          </View>

          <Divider style={styles.divider} />
          <Text style={styles.statText2}>Your Most Read Book</Text>
          <Divider style={styles.divider} />


          <View style={styles.item}>
            <BookTile 
            key={"i" + bookData._id}
            coverUrl={bookData.Image} 
            title= {bookData.bookTitle}
            disabled={true}
            />
          </View>


          <Text style={styles.descriptionText2}>{bookData.title}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.statText}>You are 8 books away from unlocking your FREE book!{'\n'}</Text> 
          <ProgressButton 
          progress={80}
          text="2 Book(s) Left!"
          buttonState="progress"
          useNativeDriver= {true}
          progressColor="#00579d"
          />        
        </View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1000
  },
  header: {
    backgroundColor: '#66bc8b',
    height: 100,
  },
  profileContainer: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
  },
  button: {
    padding: 10,
  },
  nameText: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  statText: {
    paddingTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  statText2: {
    padding: 15,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  descriptionText: { 
    paddingTop: 15,
    fontSize: 14,
    letterSpacing: 0.5
  },
  descriptionText2: { 
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0.5
  },
  divider: {
    width: '90%',
    alignSelf: 'center'
  },
  divider2: {
    width: '60%',
    marginTop: 10,
  },
  item: {
    width: "39%",
    alignItems: "center",
    margin: 10,
    backgroundColor: '#e9eef1',
  },
});

export default UserProfile;
