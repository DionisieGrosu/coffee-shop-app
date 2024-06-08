import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, ScrollView, Image} from 'react-native';
import Loader from '../components/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import tx from '../libs/tailwind';
import {Shadow} from 'react-native-shadow-2';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {syncCart} from '../redux/actions/cart/CartSyncAction';
import {getCartProducts, makeOrder} from '../services/api';
import RoundedButton from '../components/RoundedButton';
import {updateCartQty} from '../redux/actions/cart/UpdateCartQtyAction';
import LoaderKit from 'react-native-loader-kit';
import {showMessage} from 'react-native-flash-message';
import Alert from '../components/Alert';
import {clearCart} from '../redux/slices/CartSlice';

export function Order({navigation}) {
  const {token, user} = useSelector<RootState>(state => state.user);
  const {loading, cart, error, success} = useSelector<RootState>(
    state => state.cart,
  );
  const [cartLoading, setCartLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(0);
  const [loadingItemSize, setLoadingItemSize] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartLoading(true);
    dispatch(syncCart());
    getCartProducts()
      .then(result => {
        setCartLoading(false);
        if (result && result?.length > 0) {
          setProducts(result);
        } else {
          setProducts([]);
        }
      })
      .catch(error => {
        setCartLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(syncCart());
    getCartProducts().then(result => {
      setCartLoading(false);
      if (result && result?.length > 0) {
        setProducts(result);
      } else {
        setProducts([]);
      }
    });
  }, [cart]);

  function updateQty({
    coffee_id,
    size_id,
    qt,
    token,
  }: {
    coffee_id: number;
    size_id: number;
    qt: number;
    token: string;
  }) {
    setLoadingItem(coffee_id);
    setLoadingItemSize(size_id);
    dispatch(updateCartQty({coffee_id, size_id, qt, token}));
  }

  function makeOrderHandler({
    name,
    email,
    phone,
    address,
  }: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) {
    setCartLoading(true);
    makeOrder({name, email, phone, address})
      .then(result => {
        dispatch(clearCart());
        setCartLoading(false);
        setOrderSuccess(true);
      })
      .catch(error => {
        setCartLoading(false);
        showMessage({
          message: 'An error ocured while trying make order',
          type: 'danger',
        });
      });
  }

  if (cartLoading) {
    return <Loader />;
  } else {
    return (
      <View style={tx`flex flex-1 w-full bg-white`}>
        <View style={tx`py-[16px] px-[30px] flex flex-row justify-center`}>
          <Pressable
            style={tx`absolute left-5 top-4.5 w-[24px] h-[24px]`}
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} />
          </Pressable>
          <Text style={tx`text-black font-soraSemiBold text-[18px]`}>
            Order
          </Text>
          <View></View>
        </View>
        <View
          style={tx`flex flex-row flex-wrap gap-10 justify-between px-[30px] py-[24px]`}>
          <View>
            <Text style={tx`font-soraSemiBold text-[16px] text-[#808080]`}>
              Name
            </Text>
            {user?.name && (
              <Text
                style={tx`font-soraSemiBold text-black text-[14px] pb-[16px]`}>
                {user?.name}
              </Text>
            )}
          </View>
          <View>
            <Text style={tx`font-soraSemiBold text-[16px] text-[#808080]`}>
              Email
            </Text>
            {user?.email && (
              <Text
                style={tx`font-soraSemiBold text-black text-[14px] pb-[16px]`}>
                {user?.email}
              </Text>
            )}
          </View>
          <View>
            <Text style={tx`font-soraSemiBold text-[16px] text-[#808080]`}>
              Phone
            </Text>
            {user?.phone && (
              <Text
                style={tx`font-soraSemiBold text-black text-[14px] pb-[16px]`}>
                {user?.phone}
              </Text>
            )}
          </View>
          <View>
            <Text style={tx`font-soraSemiBold text-[16px] text-[#808080]`}>
              Delivery Address
            </Text>
            {user?.address && (
              <Text
                style={tx`font-soraSemiBold text-black text-[14px] pb-[16px]`}>
                {user?.address}
              </Text>
            )}
          </View>
        </View>
        <ScrollView style={tx`px-[30px] mb-[100px] mb-[110px]`}>
          {cart &&
            products?.length > 0 &&
            products?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('Product', {
                      productId: item?.coffee?.id,
                    });
                  }}
                  key={index}
                  style={tx`flex flex-row justify-between py-[20px] border-t-[1px] border-[#EAEAEA]`}>
                  <View style={tx`flex flex-row gap-[12px] items-center`}>
                    <Image
                      source={{uri: item?.coffee?.img}}
                      style={tx`w-[54px] h-[54px] rounded-[12px]`}
                    />
                    <View>
                      <Text
                        style={tx`font-soraSemiBold text-[16px] text-black`}>
                        {item?.coffee?.name?.length > 15
                          ? item?.coffee?.name?.slice(0, 15) + '...'
                          : item?.coffee?.name}
                      </Text>
                      <Text
                        style={tx`font-soraRegular text-[12px] text-[#9B9B9B]`}>
                        {item?.coffee?.topics}
                      </Text>
                    </View>
                  </View>

                  <View style={[tx`flex flex-row items-center gap-[12px]`]}>
                    {loading &&
                      loadingItem == item?.coffee?.id &&
                      loadingItemSize == item?.size?.id && (
                        <View
                          style={tx`absolute left-1/3.5 top-0 flex-1 flex flex-row gap-[12px] h-full`}>
                          <LoaderKit
                            style={tx`absolute top-1/7 left-1/3 w-[40px] h-[40px]`}
                            name={'BallClipRotateMultiple'} // Optional: see list of animations below
                            color={'#C67C4E'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                          />
                        </View>
                      )}
                    <View
                      style={[
                        tx`flex flex-row items-center gap-[12px]`,
                        loading &&
                        loadingItem == item?.coffee?.id &&
                        loadingItemSize == item?.size?.id
                          ? tx`opacity-0`
                          : {},
                      ]}>
                      <RoundedButton
                        handler={() => {
                          updateQty({
                            coffee_id: item?.coffee?.id,
                            size_id: item?.size?.id,
                            qt: Number(item?.qt) - 1,
                            token,
                          });
                        }}>
                        <FontAwesomeIcon icon={faMinus} size={16} />
                      </RoundedButton>
                      <Text>{item?.qt}</Text>
                      <RoundedButton
                        handler={() => {
                          updateQty({
                            coffee_id: item?.coffee?.id,
                            size_id: item?.size?.id,
                            qt: Number(item?.qt) + 1,
                            token,
                          });
                        }}>
                        <FontAwesomeIcon icon={faPlus} size={16} />
                      </RoundedButton>
                    </View>
                  </View>
                </Pressable>
              );
            })}
        </ScrollView>
        <View style={[tx`absolute bottom-0 left-0 right-0`]}>
          <Shadow distance={30} offset={[-15, 20]}></Shadow>
          <View
            style={[
              tx` flex flex-row justify-between items-center w-full h-full gap-10 py-[16px] px-[30px] rounded-t-[24px] bg-white z-10`,
            ]}>
            <View>
              <Text style={tx`font-soraRegular text-[14px] text-[#9B9B9B]`}>
                Price
              </Text>
              <Text style={tx`font-soraSemiBold text-[18px] text-orangeCustom`}>
                $ {cart?.total}
              </Text>
            </View>
            <View style={tx`flex-1`}>
              <Button
                handler={() => {
                  makeOrderHandler({
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    address: user?.address,
                  });
                }}
                style={tx`w-full`}>
                Order
              </Button>
            </View>
          </View>
        </View>
        <Alert
          show={orderSuccess ? true : false}
          title="Order was sent!"
          message="You order was sent successfully! Soon our operator wiil contact you!"
          confirmText="Ok"
          showConfirmButton={true}
          confirmHamdler={() => {
            navigation.navigate('Main');
          }}
        />
      </View>
    );
  }
}

export default Order;
