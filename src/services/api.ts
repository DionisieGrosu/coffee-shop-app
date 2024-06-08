import Order from '../types/OrderType';
import apiClient from './apiClient';

export const getUser = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/user/view', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getCategories = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/category', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getCategory = async (
  id: number,
): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/category/' + id, {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getProducts = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/coffee', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getProductsByCategoryId = async (
  category_id,
): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/coffee', {
      category: category_id,
    });
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getProduct = async (
  id: number,
): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/coffee/' + id, {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getCart = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/cart/view', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getCartProducts = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/cart/products', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const makeOrder = async ({
  name,
  email,
  phone,
  address,
}: Order): Promise<string> => {
  try {
    let {post} = apiClient();
    let response = await post(
      'api/v1/cart/order',
      {name, email, phone, address},
      {},
    );
    if (response.status != 201) {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }

    return new Promise((resolve, reject) => {
      if (response?.data.success) {
        resolve(response?.data);
      } else {
        reject(response);
      }
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const addReview = async ({
  product_id,
  rate,
}: {
  product_id: number;
  rate: number;
}) => {
  try {
    let {post} = apiClient();
    let response = await post(
      'api/v1/review/create',
      {coffee_id: product_id, rate},
      {},
    );
    if (response.status != 201) {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }

    return new Promise((resolve, reject) => {
      if (response?.data.success) {
        resolve(response?.data);
      } else {
        reject(response);
      }
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getFavorites = async (): Promise<string | object | null> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/favorite/list', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getFavoritesProducts = async (): Promise<
  string | object | null
> => {
  try {
    let {get} = apiClient();
    let response = await get('api/v1/favorite/list/products', {});
    if (response.status == 200) {
      return new Promise((resolve, reject) => {
        if (response?.data.success) {
          if (response?.data.data) {
            resolve(response?.data.data);
          } else {
            reject(response);
          }
        } else {
          reject(response);
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(response);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
