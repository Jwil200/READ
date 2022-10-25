import React from 'react';
import { Tile, LinearProgress } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookTile = (props) => {
  const navigation = useNavigation()
  return (
    <Tile
      imageSrc={{
          uri:'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'
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