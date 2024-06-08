import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../../types/http/ErrorResponseType';
import {UpdateCartQtyType} from '../../../types/http/cart/request/UpdateCartQtyType';

const baseUrl = process.env.API_URL;

export const updateCartQty = createAsyncThunk(
  'cart/update_qty',
  async (
    {coffee_id, size_id, qt, token}: UpdateCartQtyType,
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
      const {data} = await axios.put(
        `${baseUrl}/api/v1/cart/update-qty`,
        {coffee_id, size_id, qt},
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
