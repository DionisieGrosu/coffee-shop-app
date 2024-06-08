import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../../types/http/ErrorResponseType';
import {ClearCartType} from '../../../types/http/cart/request/ClearCartType';

const baseUrl = process.env.API_URL;

export const clearCartAction = createAsyncThunk(
  'cart/clear',
  async ({token}: ClearCartType, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const {data} = await axios.delete(`${baseUrl}/api/v1/cart/clear`, config);

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
