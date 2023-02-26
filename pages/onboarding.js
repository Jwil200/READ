import { Alert, StatusBar } from 'react-native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import Login from './login';
import { Image } from '@rneui/themed';


const Slideshow = ({navigation}) => (
  <Onboarding
    showDone={false}
    transitionAnimationDuration= {350}
    bottomBarHeight={40}
    skipToPage={4}
    pages={[
      {
        title: 'Hello!',
        subtitle: 'Welcome to READ!',
        backgroundColor: '#003c8f',
        image: (
          <Image
          style={{
            marginLeft:58,
            resizeMode:'cover',
            top:-78,
            height: 200,
            width: 380,
          }}
          source={require('../assets/read-logo.png')}
          />
        ),
      },
      {
        title: 'Choose A Book!',
        subtitle: 'Select from a wide variety of different books and find your favorites',
        backgroundColor: '#6364A7',
        image: (
          <Image
          style={{
            height: 250,
            width: 250,
          }}
          source={require('../assets/choose.jpg')}
          />
        ),
      },
      {
        title: 'Buy a book!',
        subtitle: 'Select a book to add to your cart!',
        backgroundColor: '#E4F7FB',
        image: (
          <Image
          style={{
            height: 400,
            marginBottom: -100,
            width: 350,
          }}
          source={require('../assets/buying.jpg')}
          />
        ),
      },
      {
        title: 'Find A Quiet Place to READ!',
        subtitle: 'find a nice and quiet place to begin reading your wonderful stories!',
        backgroundColor: '#3F47CC',
        image: (
          <Image
          style={{
            height: 200,
            width: 350,
          }}
          source={require('../assets/kid-readinn.jpg')}
          />
        ),
      },
      {
        title: "...",
        subtitle: (
          <Button
            title={'Login And Get Started!'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={() => navigation.navigate('Login')}
          />
        ),
        backgroundColor: '#003c8f',
        image: (
          <Icon name="book" type="font-awesome" size={100} color="white" />
        ),
      },
    ]}
  />
);

export default Slideshow;