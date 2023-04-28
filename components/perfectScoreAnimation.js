import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import Lottie from 'lottie-react-native';
import Sound from 'react-native-sound';

const PerfectScoreAnimation = ({ visible }) => {
  console.log(`==== PERFECT SCORE RENDER ${visible} ====\nWindow Height: ${windowHeight}`);

  const [isVisible, setIsVisible] = useState(visible);

  // Animation values
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible) {
      // Reset animation values
      scaleValue.setValue(0);
      opacityValue.setValue(0);

      // Start animation
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      // Play sound
      const sound = new Sound(require('../assets/children-yaysound-effect.mp3'), (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(() => {
          sound.release();
        });
      });

      // Hide animation after 5 seconds
      setTimeout(() => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 5000);
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animationContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Lottie
          source={require('../assets/Confetti2.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <Lottie
          source={require('../assets/award.json')}
          autoPlay
          loop={false}
          style={styles.animation2}
        />
      </Animated.View>
      <Animated.View
      style={[
            styles.textContainer,
        {
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
      ]}
    >
          <Text style={styles.text}>Perfect</Text>
    </Animated.View>
      
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: windowHeight / 2 - 100,
    left: windowWidth / 2 - 100,
    width: 200,
    height: 200,
    zIndex: 20
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    bottom: 0
  },
  animation: {//confetti
    width: windowWidth,
    height: windowHeight,
    top: -70,
  },
  animation2: {//award
    width: 250,
    height: 250,
    top: -400,
},
textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 20,
    top: -650,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default PerfectScoreAnimation;
