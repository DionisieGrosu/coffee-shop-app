import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import Auth from '../../types/AuthType';
import {ErrorResponseType} from '../../types/http/ErrorResponseType';
import {Platform} from 'react-native';

// const baseUrl = 'http://10.0.2.2:8000';
const baseUrl = process.env.API_URL;

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: Auth, {rejectWithValue}) => {
    try {
      let device = Platform.OS == 'ios' ? 'ios' : 'android';
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const {data, status} = await axios.post(
        `${baseUrl}/api/v1/authonticate`,
        {email, password, device_name: device},
        config,
      );

      if (status == 201) {
        if (data.success) {
          return data;
        } else {
          return rejectWithValue(data);
        }
      } else {
        return rejectWithValue({data, status});
      }
    } catch (error: any) {
      // return rejectWithValue(JSON.stringify(error));
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
