import React, { useState, } from 'react';
import { Tile, LinearProgress, } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import {View, TouchableOpacity} from 'react-native';

const BookTile = (props) => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(0);
  const [isLongPress, setIsLongPress] = useState(false);

  const handleImageLoad = ({ nativeEvent }) => {
    setHeight(nativeEvent.height);
  };

  const handleLongPress = () => {
    setTimeout(() => {
      navigation.navigate('BookPreview', { props });
    }, 1000); // Wait for 1 second before navigating
  };
  
  return (

   <View style={{ elevation: 10}}>
    <Tile
      featured = {false}
      imageSrc={{ uri: props.Cover }}
      imageProps={{ resizeMode: "cover" }}
      width={110}
      height={height || 200}
      onPress={() => navigation.navigate('BookPreview', { props })}
      disabled={props.disabled}
      onLongPress={() => handleLongPress()}
      onImageLoad={handleImageLoad}
      elevetion={10}
      containerStyle={{ overflow: 'hidden' }} // set to 'hidden'

    >
      {!props.disabled ? 
      <LinearProgress
        color='blue'
        trackColor='red'
        value={props.Progress/props.Content.length}
        variant="determinate"
        style={{ position: 'absolute', bottom: 50, left: 0, right: 0, width: 110 }}
      />
      : null}
    </Tile>
    </View>
  );
}

export default BookTile;
