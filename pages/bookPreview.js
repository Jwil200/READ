// components/bookPreview.js, what the user is taken to when they tap on a book.
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Tile, Divider } from "@rneui/themed";
import { ProgressButton } from 'react-native-progress-button';
import styles from '../assets/styles';
import OrangeButton from '../assets/orangeButton';

const BookPreview = (props) => {
    const book = props.route.params.props;
  return (
    <ScrollView>
    <View style={styles.bookPreviewContainer}>
      <View>
        <Text
        style={styles.bookTitle}>
        {book.title}
        </Text>

        <View style={styles.bookPreviewImage}>
          <Tile  
          imageSrc={{
              uri:'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'
          }}
          imageProps={{
            resizeMode:"cover",
          }}
          width={250}
          height={400}
          ></Tile>
        </View>
      </View>
     
      {book.progress == 0.00 ? 
          <OrangeButton 
          title="Begin Reading" 
          size="sm" 
          /> :
          <OrangeButton 
          title="Continue Reading" 
          size="sm" 
            />
        }

      <Text style={{paddingTop: 30}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
      in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. {"\n"}
      </Text>
      <Divider style={styles.divider} />
    
      {book.progress == 0.00 ? 
      <Text style={styles.bookPreviewProgress}>Progress: Not Yet Started</Text> : 
      <View style={styles.progress}>
        <Text style={styles.bookPreviewProgress}>Progress:</Text>
       <ProgressButton 
          progress={book.progress * 100}
          text={book.progress*100 + "% Complete"}
          buttonState="progress"
          useNativeDriver= {true}
          progressColor="#00579d"
          textStyle={{color: 'black', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5,}}
          />        
      </View>
      }
      <Divider style={styles.divider} />
      <Text style={styles.statText2}>🏆 Achievements For {book.title}: 🏆</Text>
      <Divider style={styles.divider} />
      <Text style={styles.descriptionText}>
        <Text style={{fontWeight: 'bold'}}>📖 Words Read:</Text> 200/600 {"\n"}{"\n"}
        <Text style={{fontWeight: 'bold'}}>⏰ Time Read:</Text> 5 hours, 6 minutes{"\n"}
      </Text>
   
      </View>
    </ScrollView>
  );
}
export default BookPreview;