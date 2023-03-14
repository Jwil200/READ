import React, { useState } from 'react';
import { Tile, LinearProgress } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookTile = (props) => {
  const navigation = useNavigation();
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
      onPress={() => navigation.navigate('BookPreview', { props })}
      onImageLoad={handleImageLoad}
      containerStyle={{ overflow: 'hidden' }} // set to 'hidden'

    >
      <LinearProgress
        value={props.progress}
        variant="determinate"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
      />
    </Tile>
  );
}

export default BookTile;
