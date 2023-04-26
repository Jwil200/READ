import React, { useState } from 'react';
import { Tile } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookStoreTile = (props) => {
  const navigation = useNavigation()
  const [height, setHeight] = useState(0);

  const handleImageLoad = ({ nativeEvent }) => {
    setHeight(nativeEvent.height);
  };

  return (
    <Tile
      imageSrc={{ uri: props.coverUrl }}
      imageProps={{ resizeMode: "cover" }}
      width={'100%'}
      height={height || 200}
      onPress={() => navigation.navigate('BookStorePreview', {props})}
      onImageLoad={handleImageLoad}
      containerStyle={{ overflow: 'hidden' }} // set to 'hidden'
    >   
    </Tile>
  );
}

export default BookStoreTile;