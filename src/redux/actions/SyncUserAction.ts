import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../types/http/ErrorResponseType';

// const baseUrl = 'http://10.0.2.2:8000';
const baseUrl = process.env.API_URL;

export const syncUser = createAsyncThunk(
  'user/sync',
  async ({token}: {token: string}, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const {data, status} = await axios.get(
        `${baseUrl}/api/v1/user/view`,
        config,
      );

      if (status == 200) {
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
