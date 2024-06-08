import React from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/actions/cart/AddToCartAction';

type PropsAddToCartHookType = {
  id: number;
  size_id: number;
  qt: number;
  token: string;
};
function useAddToCart() {
  const dispatch = useDispatch();
  return ({id, size_id, qt, token}: PropsAddToCartHookType) => {
    dispatch(addToCart({coffee_id: id, size_id, qt, token}));
  };
}

export default useAddToCart;
