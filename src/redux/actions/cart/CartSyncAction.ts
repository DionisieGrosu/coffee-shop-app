import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../../types/http/ErrorResponseType';

const baseUrl = process.env.API_URL;

export const syncCart = createAsyncThunk(
  'cart/sync',
  async ({token}: {token: string}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const {data} = await axios.get(`${baseUrl}/api/v1/cart/view`, config);

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
