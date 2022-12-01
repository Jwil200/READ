// components/bookStoreTiles.js *Based on bookTile.js currently, used for book store Tiles.
import React from 'react';
import { Tile } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookStoreTile = (props) => {
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
      onPress={() => navigation.navigate('BookStorePreview', {props})}
    >   
    </Tile>
  );
}
export default BookStoreTile;