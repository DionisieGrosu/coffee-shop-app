import Product from './ProductType';

type Cart = {
  products: Product[];
  total: number;
  count: number;
};

export default Cart;
