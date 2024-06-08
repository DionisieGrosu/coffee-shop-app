import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import Cart from '../../types/CartType.ts';
import {addToCart} from '../actions/cart/AddToCartAction.ts';
import {CartResponseType} from '../../types/http/cart/response/CartResponseType.ts';
import {updateCartQty} from '../actions/cart/UpdateCartQtyAction.ts';
import {removeFromCart} from '../actions/cart/RemoveFromCart.ts';
import {clearCartAction} from '../actions/cart/ClearCartAction';
import {syncCart} from '../actions/cart/CartSyncAction.ts';

type InitialStateType = {
  loading: boolean;
  error: string | object | null;
  success: boolean;
  cart: Cart;
};

type CartSliceType = {
  name: string;
  initialState: InitialStateType;
  reducers: {
    setProducts: (state: InitialStateType, action: PayloadAction<Cart>) => void;
    setTotal: (state: InitialStateType, action: PayloadAction<number>) => void;
    setCount: (state: InitialStateType, action: PayloadAction<number>) => void;
    clearCart: (state: InitialStateType) => void;
    clearStates: (state: InitialStateType) => void;
  };
  extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => void;
};

const initialCart = {
  products: [],
  total: 0,
  count: 0,
};

const slice: CartSliceType = {
  name: 'Cart',
  initialState: {
    loading: false,
    error: null,
    success: false,
    cart: initialCart,
  },
  reducers: {
    setProducts: function (
      state: InitialStateType,
      action: PayloadAction<Cart>,
    ) {
      state.cart.products = action?.payload?.products;
    },
    setTotal: function (
      state: InitialStateType,
      action: PayloadAction<number>,
    ) {
      state.cart.total = action?.payload;
    },
    setCount: function (
      state: InitialStateType,
      action: PayloadAction<number>,
    ) {
      state.cart.count = action?.payload;
    },
    clearCart: function (state: InitialStateType) {
      state.cart.products = [];
      state.cart.count = 0;
      state.cart.total = 0;
    },
    clearStates: function (state: InitialStateType) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(addToCart.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      addToCart.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      addToCart.fulfilled,
      (state: InitialStateType, action: PayloadAction<CartResponseType>) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.cart.products = action.payload?.data ?? [];
        state.cart.total = action.payload?.total ?? 0;
        state.cart.count = action.payload?.count ?? 0;
      },
    );
    builder.addCase(updateCartQty.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      updateCartQty.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      updateCartQty.fulfilled,
      (state: InitialStateType, action: PayloadAction<CartResponseType>) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.cart.products = action.payload?.data ?? [];
        state.cart.total = action.payload?.total ?? 0;
        state.cart.count = action.payload?.count ?? 0;
      },
    );

    builder.addCase(removeFromCart.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      removeFromCart.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(
      removeFromCart.fulfilled,
      (state: InitialStateType, action: PayloadAction<CartResponseType>) => {
        state.error = null;
        state.loading = false;
        state.success = true;
        state.cart.products = action.payload?.data ?? [];
        state.cart.total = action.payload?.total ?? 0;
        state.cart.count = action.payload?.count ?? 0;
      },
    );

    builder.addCase(clearCartAction.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      clearCartAction.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      },
    );
    builder.addCase(clearCartAction.fulfilled, (state: InitialStateType) => {
      state.error = null;
      state.loading = false;
      state.success = true;
      state.cart.products = [];
      state.cart.total = 0;
      state.cart.count = 0;
    });
    builder.addCase(syncCart.pending, (state: InitialStateType) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(
      syncCart.rejected,
      (state: InitialStateType, action: any) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      },
    );
    builder.addCase(
      syncCart.fulfilled,
      (state: InitialStateType, action: PayloadAction<CartResponseType>) => {
        state.error = null;
        state.loading = false;
        state.success = false;
        state.cart.products = action.payload?.data ?? [];
        state.cart.total = action.payload?.total ?? 0;
        state.cart.count = action.payload?.count ?? 0;
      },
    );
  },
};

export const cartSlice = createSlice(slice);

export const {setProducts, setTotal, setCount, clearCart, clearStates} =
  cartSlice.actions;
export default cartSlice.reducer;
