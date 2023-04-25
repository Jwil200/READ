import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Sound from 'react-native-sound';


const ResultPage = () => {//props) => {
  const dummyCorrectWords = 50;
  const dummyIncorrectWords = 5;
  const dummyTimeRead = 120;
  const dummyPagesRead = 20;
  const dummyLinesRead = 100;

 

  const progress = (dummyCorrectWords / (dummyCorrectWords + dummyIncorrectWords)) * 100;

  useEffect(() => {
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
        source={require('../assets/kid-readinn.jpg')} // use a png/jpg or a url 
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
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
            
          <Text style={styles.corectWordsText}>Correct Words: {dummyCorrectWords}</Text>
          <Text style={styles.incorrectWordsText}>Incorrect Words: {dummyIncorrectWords}</Text>
          <Text style={styles.timeReadText}>Reading Time: {dummyTimeRead} seconds</Text>
          <Text style={styles.pagesReadText}> Pages Read {dummyPagesRead}</Text>
        <Text style={styles.linesReadText}>Lines Read: {dummyLinesRead} seconds</Text>
        </View>
      </ImageBackground>
     
    </View>
  );
};

const styles = StyleSheet.create({
    titleText: {
        top: 10,
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        },
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '25%',
      resizeMode: 'cover',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Add a transparent black background to the content
    },
    progressContainer: {
      marginVertical: 16,
    },
    progressText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    corectWordsText: {
        top: 10,
    fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
      fontSize: 20,
      color: 'blue',
      textAlign: 'center',
    },
    pagesReadText: {
        top: 10,
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
        fontSize: 20,
        color: 'blue',
        textAlign: 'center',
        },

    incorrectWordsText: {
        top: 10,
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
      fontSize: 20,
      color: '#ff4d4f',
      textAlign: 'center',
    },
    timeReadText: {
        top: 10,
        fontFamily: 'serif', // 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy
      fontSize: 20,
      color: 'green',
      textAlign: 'center',
    },
    linesReadText: {
        top: 10,
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
      backgroundColor: 'white',
    },
    dividerTitle: {
      fontSize: 18,
      color: 'white',
      marginHorizontal: 16,
    },
    text: {
      fontSize: 16,
      color: 'white',
      marginVertical: 8,
    },
  });

export default ResultPage;
  
