import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import Favorites from '../../types/FavoritesType.ts';
import {addToFavorites} from '../actions/favorites/AddToFavoritesAction.ts';
import {FavoritesResponseType} from '../../types/http/favorites/response/FavoritesResponseType.ts';
import {removeFromFavorites} from '../actions/favorites/RemoveFromFavoritesAction.ts';
import {syncFavorites} from '../actions/favorites/FavoritesSyncAction.ts';

type FavoriteSliceType = {
  name: string;
  initialState: InitialStateType;
  reducers: {
    setFavorites: (
      state: InitialStateType,
      action: PayloadAction<Favorites>,
    ) => void;
    clearFavorites: (state: InitialStateType) => void;
    clearStates: (state: InitialStateType) => void;
  };
  extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => void;
};

type InitialStateType = {
  loading: boolean;
  error: string | object | null;
  success: boolean;
  favorites: Favorites;
};

const initialFavorites = {
  products: [],
};

const slice: FavoriteSliceType = {
  name: 'Favorites',
  initialState: {
    loading: false,
    error: null,
    success: false,
    favorites: initialFavorites,
  },
  reducers: {
    setFavorites: function (
      state: InitialStateType,
      action: PayloadAction<Favorites>,
    ) {
      state.favorites.products = action?.payload.products;
    },
    clearFavorites: function (state: InitialStateType) {
      state.favorites.products = [];
    },
    clearStates: function (state: InitialStateType) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addToFavorites.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      addToFavorites.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      addToFavorites.fulfilled,
      (
        state: InitialStateType,
        action: PayloadAction<FavoritesResponseType>,
      ) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.favorites.products = action.payload?.data ?? [];
      },
    );
    builder.addCase(removeFromFavorites.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      removeFromFavorites.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      removeFromFavorites.fulfilled,
      (
        state: InitialStateType,
        action: PayloadAction<FavoritesResponseType>,
      ) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.favorites.products = action.payload?.data ?? [];
      },
    );

    builder.addCase(syncFavorites.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      syncFavorites.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      syncFavorites.fulfilled,
      (
        state: InitialStateType,
        action: PayloadAction<FavoritesResponseType>,
      ) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.favorites.products = action.payload?.data ?? [];
      },
    );
  },
};

export const favoritesSlice = createSlice(slice);

export const {setFavorites, clearFavorites, clearStates} =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
