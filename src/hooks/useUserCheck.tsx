import React, {useEffect} from 'react';
import {getUser} from '../services/api';
import {useDispatch} from 'react-redux';
import {clearUser} from '../redux/slices/UserSlice';
import {removeItem} from '../services/storage';

function useUserCheck() {
  const dispatch = useDispatch();
  function checkUserLogedIn() {
    getUser().catch(error => {
      dispatch(clearUser());
      removeItem('token');
    });
  }

  return checkUserLogedIn;
}

export default useUserCheck;
