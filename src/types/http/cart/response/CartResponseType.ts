import Product from '../../../ProductType';

export type CartResponseType = {
  success: boolean;
  data?: Product[];
  count?: number;
  total?: number;
  message?: string;
  error?: string;
  errors?: object[];
};
