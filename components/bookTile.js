import React from 'react';
import { Tile, LinearProgress } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';

const BookTile = (props) => {
  const navigation = useNavigation()
  const test = props.coverUrl
  console.log('COverURL', test)
  return (
    <Tile
      imageSrc={{
          uri: props.coverUrl//'http://tile.loc.gov/storage-services/service/rbc/rbc0001/2003/2003juv81093/0001r.jpg'
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
