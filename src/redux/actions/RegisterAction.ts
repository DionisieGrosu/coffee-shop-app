import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import Register from '../../types/RegisterType';
import {ErrorResponseType} from '../../types/http/ErrorResponseType';

const baseUrl = process.env.API_URL;

export const register = createAsyncThunk(
  'auth/register',
  async (
    {name, email, address, phone, password, password_confirmation}: Register,
    {rejectWithValue},
  ) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const {data, status} = await axios.post(
        `${baseUrl}/api/v1/register`,
        {name, email, address, phone, password, password_confirmation},
        config,
      );

      if (status == 201) {
        if (data.success) {
          return data;
        } else {
          return rejectWithValue(data);
        }
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
