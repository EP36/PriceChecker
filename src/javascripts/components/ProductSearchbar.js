import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';

const ProductSearchbar = (props) => {
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={props.handleChangeText}
        value={props.searchQuery}
      />
    </>
  );
};

export default ProductSearchbar;
