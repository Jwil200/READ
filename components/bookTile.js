import React, { useState, } from 'react';
import { Tile, LinearProgress, } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import {View} from 'react-native';

const BookTile = (props) => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(0);

  const handleImageLoad = ({ nativeEvent }) => {
    setHeight(nativeEvent.height);
  };

  return (
   <View style={{ elevation: 10}}>
    <Tile
      featured = {false}
      imageSrc={{ uri: props.coverUrl }}
      imageProps={{ resizeMode: "cover" }}
      width={110}
      height={height || 200}
      onPress={() => navigation.navigate('BookPreview', { props })}
      onImageLoad={handleImageLoad}
      elevetion={10}
      containerStyle={{ overflow: 'hidden' }} // set to 'hidden'

    >
      <LinearProgress
        color='orange'
        trackColor='primary'
        value={props.progress}
        variant="determinate"
        style={{ position: 'absolute', bottom: 50, left: 0, right: 0, width: 110 }}
      />
    </Tile>
    </View>
  );
}

export default BookTile;
