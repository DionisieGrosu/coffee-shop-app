import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import User from '../../types/UserType.ts';
import {login} from '../actions/LoginAction.ts';
import {UserResponseType} from '../../types/http/UserResponseType.ts';
import {logout} from '../actions/LogoutAction.ts';
import {register} from '../actions/RegisterAction.ts';
import {updateUser} from '../actions/UpdateUserAction.ts';
import {updateUserPassword} from '../actions/UpdateUserPasswordAction.ts';
import {syncUser} from '../actions/SyncUserAction.ts';
import {updateUserAvatar} from '../actions/UpdateUserAvatarAction.ts';

type InitialStateType = {
  loading: boolean;
  error: string | object | null;
  success: boolean;
  user: User;
  token: string;
};

type UserSliceType = {
  name: string;
  initialState: InitialStateType;
  reducers: {
    setUser: (state: InitialStateType, action: PayloadAction<User>) => void;
    setToken: (state: InitialStateType, action: PayloadAction<string>) => void;
    clearUser: (state: InitialStateType) => void;
    clearStates: (state: InitialStateType) => void;
  };
  extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => void;
};

const initialUser = {
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
};
const slice: UserSliceType = {
  name: 'User',
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: initialUser,
    token: '',
  },
  reducers: {
    setUser: function (state: InitialStateType, action: PayloadAction<User>) {
      state.user.name = action?.payload?.name;
      state.user.email = action?.payload?.email;
      state.user.phone = action?.payload?.phone;
      state.user.address = action?.payload?.address;
      state.user.avatar = action?.payload?.avatar;
    },
    setToken: function (
      state: InitialStateType,
      action: PayloadAction<string>,
    ) {
      state.token = action?.payload;
    },
    clearUser: function (state: InitialStateType) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user.name = '';
      state.user.email = '';
      state.user.phone = '';
      state.user.address = '';
      state.user.avatar = '';
      state.token = '';
    },
    clearStates: function (state: InitialStateType) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(login.rejected, (state: InitialStateType, action: any) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(
      login.fulfilled,
      (state: InitialStateType, action: PayloadAction<UserResponseType>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload?.data ?? initialUser;
        state.token = action.payload?.token ?? '';
      },
    );
    builder.addCase(logout.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(logout.rejected, (state: InitialStateType, action: any) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state: InitialStateType) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = initialUser;
      state.token = '';
    });

    builder.addCase(register.pending, (state: InitialStateType) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      register.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
    );
    builder.addCase(register.fulfilled, (state: InitialStateType) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });

    builder.addCase(updateUser.pending, (state: InitialStateType) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      updateUser.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
    );
    builder.addCase(
      updateUser.fulfilled,
      (state: InitialStateType, action: PayloadAction<UserResponseType>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload?.data ?? initialUser;
      },
    );
    builder.addCase(updateUserPassword.pending, (state: InitialStateType) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      updateUserPassword.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
    );
    builder.addCase(
      updateUserPassword.fulfilled,
      (state: InitialStateType, action: PayloadAction<UserResponseType>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload?.data ?? initialUser;
      },
    );
    builder.addCase(syncUser.pending, (state: InitialStateType) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(syncUser.rejected, (state: InitialStateType) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      syncUser.fulfilled,
      (state: InitialStateType, action: PayloadAction<UserResponseType>) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.user = action.payload?.data ?? initialUser;
      },
    );
    builder.addCase(updateUserAvatar.pending, (state: InitialStateType) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(
      updateUserAvatar.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      },
    );
    builder.addCase(
      updateUserAvatar.fulfilled,
      (state: InitialStateType, action: PayloadAction<UserResponseType>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload?.data ?? initialUser;
      },
    );
  },
};

export const userSlice = createSlice(slice);

export const {setUser, setToken, clearUser, clearStates} = userSlice.actions;
export default userSlice.reducer;
