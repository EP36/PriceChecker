import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';

const ProductSearchbar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeText = (query) => setSearchQuery(query);

  
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={handleChangeText}
        value={searchQuery}
      />
    </>
  );
};

export default ProductSearchbar;
