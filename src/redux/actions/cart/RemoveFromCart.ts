import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../../types/http/ErrorResponseType';
import {DeleteFromCartType} from '../../../types/http/cart/request/DeleteFromCartType';

const baseUrl = process.env.API_URL;

export const removeFromCart = createAsyncThunk(
  'cart/delete',
  async (
    {coffee_id, size_id, token}: DeleteFromCartType,
    {rejectWithValue},
  ) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const {data} = await axios.post(
        `${baseUrl}/api/v1/cart/delete`,
        {coffee_id, size_id},
        config,
      );

      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error: any) {
      if (!error?.response) {
        return rejectWithValue(JSON.stringify(error));
      } else {
        const response: ErrorResponseType = error?.response;
        if (response?.message) {
          return rejectWithValue(JSON.stringify(response?.message));
        } else {
          return rejectWithValue(JSON.stringify(response));
        }
      }
    }
  },
);
