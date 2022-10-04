import React, { Component } from 'react';
import { Tile, LinearProgress } from "@rneui/themed";

const BookTile = (props) => {
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
    >
      <LinearProgress
        value={props.progress}
        variant="determinate"
      />
    </Tile>
  );
}
export default BookTile;