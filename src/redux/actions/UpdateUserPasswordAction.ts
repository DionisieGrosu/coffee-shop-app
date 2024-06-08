import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../types/http/ErrorResponseType';

// const baseUrl = 'http://10.0.2.2:8000';
const baseUrl = process.env.API_URL;

type UserUpdateType = {
  password: string;
  newPassword: string;
  password_confirmation: string;
  token: string;
};

export const updateUserPassword = createAsyncThunk(
  'user/update-password',
  async (
    {password, newPassword, password_confirmation, token}: UserUpdateType,
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
      const {data, status} = await axios.put(
        `${baseUrl}/api/v1/user/password/update`,
        {old_password: password, password: newPassword, password_confirmation},
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
