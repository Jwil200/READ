import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Sound from 'react-native-sound';
import OrangeButton from '../assets/orangeButton';
import PerfectScoreAnimation from '../components/perfectScoreAnimation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Divider, useTheme } from '@rneui/themed';


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
    const userRef = db.collection('Users').doc(currentUid).collection("Stats").doc("Stats");
    const bookref = db.collection('Users').doc(currentUid).collection("Library").doc(results.bookTitle);

    const updateStats = async () => {//update all book related stats

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
          <Text style={styles.bookTitle}>{results.bookTitle}</Text>    
          <Text style={styles.titleText}>Completion:</Text>
                <AnimatedCircularProgress
                    size={150}
                    width={15}
                    fill={progress}
                    tintColor="lightgreen" // Blue color for correct words
                    back
                    backgroundColor="grey" // Red color for incorrect words
                    backgroundWidth = {15}
                    lineCap="round"
                    rotation={0}
                arcSweepAngle={360}
                >
                {(fill) => <Text style={styles.progressText}>{Math.round(progress)}%</Text>}
                </AnimatedCircularProgress>
            <Text style={styles.titleText}>Results:</Text>

            <AnimatedCircularProgress
                    size={150}
                    width={15}
                    fill={progress}
                    tintColor="blue" // Blue color for correct words
                    back
                    backgroundColor="red" // Red color for incorrect words
                    backgroundWidth = {15}
                    lineCap="round"
                    rotation={0}
                arcSweepAngle={360}
                >
                {(fill) => <Text style={styles.progressText}>{Math.round(progress)}%</Text>}
                </AnimatedCircularProgress>

    
            
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
        fontFamily: 'monospace', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'black',
        textAlign: 'center',

    },
    bookTitle: {
        fontFamily: 'fantasy', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
    subTitleText: {
        fontFamily: 'monospace', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },

    contentContainer: {
        top: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        marginVertical: 5,
      },
      divider2: {
        top: -100,
        width: '100%',
        marginVertical: 5,
      },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '20%',
        resizeMode: "contain",
    },
    resultContainer: {
        flex: 1,
        top: -180,
        justifyContent: 'center',

    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    progressContainer: {
        top: -50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 1,
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
    buttonContainer: {
        top: 0,
    },

  });

export default ResultPage;
  
