import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {
  getCart,
  getCategories,
  getProductsByCategoryId,
  getUser,
} from '../services/api';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Loader from '../components/Loader';
import tx from '../libs/tailwind';
import {clearUser} from '../redux/slices/UserSlice';
import {removeItem} from '../services/storage';
import useUserCheck from '../hooks/useUserCheck';
import {NavigationProp, useIsFocused} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import ProductItem from '../components/ProductItem';
import {syncCart} from '../redux/actions/cart/CartSyncAction';
import {syncUser} from '../redux/actions/SyncUserAction';
import {addToCart} from '../redux/actions/cart/AddToCartAction';
import {AddToCartType} from '../types/http/cart/request/AddToCartType';
import {showMessage} from 'react-native-flash-message';
import {clearStates} from '../redux/slices/CartSlice';

type PropsType = {
  navigation: NavigationProp<any, any>;
};

function Main({navigation}: PropsType) {
  const {user, error, success, token} = useSelector<RootState>(
    state => state.user,
  );

  const {cart} = useSelector<RootState>(state => state.cart);
  const cartLoading = useSelector<RootState>(state => state.cart.loading);
  const cartError = useSelector<RootState>(state => state.cart.error);
  const [loading, setLoading] = useState(
    useSelector<RootState>(state => state.user.loading),
  );
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [productViewWidth, setProductViewWidth] = useState(0);
  const [widthIsSet, setWidthIsSet] = useState(false);
  const [loadingItem, setLoadingItem] = useState(0);
  const dispatch = useDispatch();
  const checkUser = useUserCheck();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && token) {
      dispatch(syncCart({token}));
      dispatch(syncUser({token}));
    }
  }, [isFocused]);

  useEffect(() => {
    if (cartError) {
      showMessage({
        message: 'An error ocured while trying to add to cart',
        type: 'danger',
      });
      dispatch(clearStates());
    }
  }, [cartError]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);

      getCategories()
        .then(result => {
          setLoading(false);
          if (result?.length && result?.length > 0) {
            setCategories(result);
            if (result[0].id) {
              setActiveCategory(result[0].id);
            }
          } else {
            setCategories([]);
          }
        })
        .catch(error => {
          setLoading(true);
          checkUser();
        });
    }
  }, [isFocused]);

  useEffect(() => {
    if (activeCategory) {
      getProductsByCategoryId(activeCategory)
        .then(result => {
          if (result?.length && result?.length > 0) {
            setProducts(result);
          } else {
            setProducts([]);
          }
        })
        .catch(error => {
          checkUser();
        });
    }
  }, [activeCategory]);

  function addToCartHandler(item) {
    setLoadingItem(item?.id);
    dispatch(
      addToCart({
        coffee_id: item?.id,
        size_id: item?.sizes[0]?.id,
        qt: 1,
        token: token,
      }),
    );
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      // <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={tx`flex flex-1`}>
        <View
          style={tx`absolute top-0 left-0 w-full h-[30%] bg-[#131313]`}></View>
        <View style={tx`px-[30px] pt-[20px]`}>
          <View style={tx`flex flex-row justify-between items-center`}>
            <View>
              <Text style={tx`font-soraRegular text-[12px] text-[#B7B7B7]`}>
                {user?.address}
              </Text>
              <Text style={tx`font-soraSemiBold text-[14px] text-white`}>
                {user?.name}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={tx`w-[44px] h-[44px] rounded overflow-hidden`}>
              {user?.avatar ? (
                <Image style={tx`w-full h-full`} source={{uri: user?.avatar}} />
              ) : (
                <Image
                  style={tx`w-full h-full`}
                  source={require('../../assets/images/default-avatar.jpg')}
                />
              )}
            </Pressable>
          </View>

          <View style={tx`mt-[24px]`}>
            <FlatList
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={true}
              data={categories}
              keyExtractor={item => item?.id}
              renderItem={({item}) => {
                return (
                  <Pressable
                    onPress={() => {
                      setActiveCategory(item.id);
                    }}
                    style={[
                      tx`px-[16px] py-[10px] rounded-[12px] bg-white mr-[8px]`,
                      item.id == activeCategory ? tx`bg-orangeCustom` : {},
                    ]}>
                    <Text
                      style={[
                        tx`text-black text-[14px] font-soraSemiBold`,
                        item.id == activeCategory ? tx`text-white` : {},
                      ]}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>

          <ScrollView
            style={tx`mt-[28px] mb-[130px]`}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={tx`flex flex-1 flex-row flex-wrap gap-[16px]`}>
              {products.map((item, index) => {
                return (
                  <ProductItem
                    disabled={cart?.products?.some(
                      cartItem =>
                        cartItem?.coffee_id == item?.id &&
                        cartItem?.size_id == item?.sizes[0]?.id,
                    )}
                    loading={cartLoading && loadingItem == item?.id}
                    key={index}
                    data={item}
                    handler={id =>
                      navigation.navigate('Product', {productId: id})
                    }
                    addCartHandler={() => {
                      addToCartHandler(item);
                    }}
                    index={index}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      // </ScrollView>
    );
  }
}

export default Main;
