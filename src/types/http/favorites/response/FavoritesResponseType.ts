import Product from '../../../ProductType';

export type FavoritesResponseType = {
  success: boolean;
  data?: Product[];
  message?: string;
  error?: string;
  errors?: object[];
};
