import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ErrorResponseType} from '../../types/http/ErrorResponseType';
import {Platform} from 'react-native';

// const baseUrl = 'http://10.0.2.2:8000';
const baseUrl = process.env.API_URL;

type UserUpdateAvatarType = {
  avatar: string | object;
  token: string;
};

export const updateUserAvatar = createAsyncThunk(
  'user/update/avatar',
  async ({avatar, token}: UserUpdateAvatarType, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      };
      let formData = new FormData();
      formData.append('avatar', {
        name: avatar?.assets[0]?.fileName,
        type: avatar?.assets[0]?.type,
        uri:
          Platform.OS === 'ios'
            ? avatar?.assets[0]?.uri.replace('file://', '')
            : avatar?.assets[0]?.uri,
      });
      const {data, status} = await axios.post(
        `${baseUrl}/api/v1/user/avatar/update`,
        formData,
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
