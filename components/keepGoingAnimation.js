import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Sound from 'react-native-sound'; // Import react-native-sound

const keepGoingAnimation = ({ visible }) => {
  // Animation values
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
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
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Play sound
      const sound = new Sound(require('../assets/ding-sound-effect.mp3'), (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(() => {
          sound.release();
        });
      });

      // Hide animation after 2 seconds
      setTimeout(() => {
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }
  }, [visible, scaleValue, opacityValue]);

  return (
    <View style={styles.container}>
      {visible && (
        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
            },
          ]}
        >
          <Text style={styles.text}>Keep Going!</Text>
        </Animated.View>
      )}
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
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default keepGoingAnimation;
