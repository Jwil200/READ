import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Sound from 'react-native-sound';
import OrangeButton from '../assets/orangeButton';
import PerfectScoreAnimation from '../components/perfectScoreAnimation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const ResultPage = ({route, navigation}) => {//props) => {
    const results = {...route.params};
    console.log(results);
    const sentencesCorrect = results.correct;
    const sentencesIncorrect = results.incorrect;
    const sentencesRead = results.position;
    const total = results.total;
    const bookCover = results.bookCover;

    const db = firestore();
    const currentUid = auth().currentUser.uid;

    const updateStats = async () => {//update all book related stats
        const userRef = await db.collection('Users').doc(currentUid).collection("Stats").doc("Stats");
        const bookref = await db.collection('Users').doc(currentUid).collection("Library").doc(results.bookTitle);

        const updatedProgress = (sentencesRead / total);


        await bookref.update({//update book stats
            Progress: updatedProgress,
            TotalSentenceCount: total,
            CorrectSentenceCount: sentencesCorrect,
            IncorrectSentenceCount: sentencesIncorrect,
        });

        await userRef.update({//update user stats
            SentenesRead: firestore.FieldValue.increment(sentencesRead),
            CorrectSentencesRead: firestore.FieldValue.increment(sentencesCorrect),

        });

        if(sentencesRead == total){//if book was completed, update the fields accordiningly
            console.log("Book Completed");
            await bookref.update({
                Completed: true,
                TimesRead: firestore.FieldValue.increment(1),
            });
        }

    }


 

  const progress = (sentencesRead / total) * 100;

  useEffect(() => {
    updateStats();
    if (sentencesIncorrect === 0)
      return;

    // Play sound when the page is first rendered
    const sound = new Sound(require('../assets/correct-ding2.mp3'), (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      } else {
        sound.play();
      }
    });

    // Clean up the sound when the component unmounts
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }

    };
  
    }, []);

  return (
    <View style={styles.container}>

        
      <ImageBackground
        source={{uri: bookCover}} // use a png/jpg or a url 
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Completion </Text>
          <View style={styles.progressContainer}>

            <AnimatedCircularProgress
              size={120}
              width={8}
              fill={progress}
              tintColor="#339af0" // Blue color for correct words
              backgroundColor="#ff4d4f" // Red color for incorrect words
              lineCap="round"
              rotation={0}
              arcSweepAngle={360}
            >
              {(fill) => <Text style={styles.progressText}>{Math.round(progress)}%</Text>}
            </AnimatedCircularProgress>
          </View>
        <Text style={styles.titleText}>Results</Text>
            
        <Text style={styles.corectWordsText}>Correct Sentences: {sentencesCorrect}</Text>
        <Text style={styles.incorrectWordsText}>Incorrect Sentences: {sentencesIncorrect}</Text>
        <Text style={styles.timeReadText}>Sentences Read: {sentencesRead}</Text>
        {
          (sentencesIncorrect === 0) ? <PerfectScoreAnimation visible={true}/> : ""
        }

        <View style={styles.buttonContainer}>
            <OrangeButton title = "Back to Dashboard" size = 'sm' onPress={() => navigation.navigate('Tabbar')}></OrangeButton>
        </View>


        </View>

      </ImageBackground>

     
    </View>
  );
};

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '25%',
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
      marginVertical: 16,
    },
    progressText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    corectWordsText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'blue',
        textAlign: 'center',
    },
    pagesReadText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'blue',
        textAlign: 'center',
        },

    incorrectWordsText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: '#ff4d4f',
        textAlign: 'center',
    },
    timeReadText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
    },
    linesReadText: {
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'red',
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    dividerTitle: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 16,
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginVertical: 8,
    },

  });

export default ResultPage;
  
