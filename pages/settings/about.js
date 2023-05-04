import React, {useContext} from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import DarkModeContext from '../../components/DarkModeContext';

const About = () => {
const { isDarkModeEnabled } = useContext(DarkModeContext);
const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',

  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: isDarkModeEnabled ? '#303030' : '#fff',
  },
  blackContainer: {
     paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'black',
    color: isDarkModeEnabled ? 'white' : 'black',
    },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkModeEnabled ? 'white' : 'black',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: isDarkModeEnabled ? 'white' : 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
    color: isDarkModeEnabled ? 'white' : 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: -10,
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'contain',

  },
});

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
            style={styles.image}
            source={require('../../assets/read-logo.png')}
            />
        </View>
        <View styles={styles.blackContainer}>
            <Text style={styles.heading}>About Us</Text>
            </View>
            <Text style={styles.text}>
              Read is a revolutionary reading tool designed to help kids learn to read, spell, and pronounce words with ease. Our mission is to create a world where every child can read confidently, express themselves fluently, and excel in their studies.
            </Text>
            <Text style={styles.subHeading}>Our Team</Text>
            <Text style={styles.text}>
              Our team is made up of experienced educators, developers, and designers who are passionate about using technology to enhance education. We believe that every child has the potential to succeed, and we are committed to providing them with the tools they need to reach their full potential.
            </Text>
            <Text style={styles.subHeading}>Our Vision</Text>
            <Text style={styles.text}>
              Our vision is to create a world where every child has access to quality education and can reach their full potential. We believe that technology has the power to transform education, and we are dedicated to harnessing that power to make a positive impact in the world.
            </Text>
          </View>
        </ScrollView>
      );
    };
    


export default About;