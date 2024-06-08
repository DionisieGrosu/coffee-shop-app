import {Tuple, compose, configureStore} from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';
import FavoritesSlice from './slices/FavoritesSlice';
import UserSlice from './slices/UserSlice';
import Reactotron from '../../ReactotronConfig';

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    favorites: FavoritesSlice,
    user: UserSlice,
  },
  enhancers: getDefaultEnhancers => {
    return getDefaultEnhancers().concat(new Tuple(Reactotron.createEnhancer()));
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;
