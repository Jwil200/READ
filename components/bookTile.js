import React, { Component } from 'react';
import { Tile } from "@rneui/themed";

export default class BookTile extends Component {
  constructor() {
    super();
    this.state = {}
  }
  render() { 
    this.state = {}
    return (
        <Tile
            imageSrc={{
                uri:'https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png'
            }}
            width={'30%'}
            height={220}
        />
    );
  }
}