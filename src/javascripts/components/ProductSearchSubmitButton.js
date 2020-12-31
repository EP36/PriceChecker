import React from 'react';
import {Button} from 'react-native-paper';

const ProductSearchSubmitButton = props => {
  return (
    <>
      <Button 
        icon="camera" 
        mode="contained" 
        onPress={props.handleSearchSubmit}
      >{props.placeholder}</Button>
    </>
  )
};

export default ProductSearchSubmitButton;