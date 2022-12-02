import React from 'react';
import { Tile, LinearProgress } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookTile = (props) => {
  const navigation = useNavigation()
  const test = props.coverUrl
  return (
    <Tile
      imageSrc={{
        uri: props.coverUrl
      }}
      imageProps={{
        resizeMode:"stretch"
      }}
      width={'100%'}
      height={200}
      onPress={() => navigation.navigate('BookPreview', {props})}
    >
      <LinearProgress
        value={props.progress}
        variant="determinate"
      />
    </Tile>
  );
}
export default BookTile;
