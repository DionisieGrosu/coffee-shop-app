import {
  NavigationProp,
  RouteProp,
  useIsFocused,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {addReview, getProduct} from '../services/api';
import Loader from '../components/Loader';
import tx from '../libs/tailwind';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import {faHeart} from '@fortawesome/free-regular-svg-icons/faHeart';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
import Button from '../components/Button';
import {Shadow} from 'react-native-shadow-2';
import useAddToCart from '../hooks/useAddToCart';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {showMessage} from 'react-native-flash-message';
import {clearStates} from '../redux/slices/CartSlice';
import {addToFavorites} from '../redux/actions/favorites/AddToFavoritesAction';
import {removeFromFavorites} from '../redux/actions/favorites/RemoveFromFavoritesAction';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Alert from '../components/Alert';
import Rate from '../components/Rate';

type PropsType = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any>;
};
function Product({navigation, route}: PropsType) {
  const {token} = useSelector<RootState>(state => state.user);
  const {cart, error, success} = useSelector<RootState>(state => state.cart);
  const cartLoading = useSelector<RootState>(state => state.cart.loading);
  const {favorites} = useSelector<RootState>(state => state.favorites);
  const favoritesLoading = useSelector<RootState>(
    state => state.favorites.loading,
  );
  const favoritesError = useSelector<RootState>(state => state.favorites.error);
  const favoritesSuccess = useSelector<RootState>(
    state => state.favorites.success,
  );
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const productId = route?.params?.productId;
  const width = Dimensions.get('window').width;
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [cartBtnDisabled, setCartBtnDisabled] = useState(false);
  const [favoritesEnabled, setFavoritesEnabled] = useState(false);
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [showThankAlert, setShowThankAlert] = useState(false);
  const [ratevalue, setRateValue] = useState(0);
  const addToCart = useAddToCart();
  const dispatch = useDispatch();

  useEffect(() => {
    if (ratevalue > 0 && ratevalue <= 5) {
      addReview({product_id: product?.id, rate: ratevalue})
        .then(result => {
          setShowRateAlert(false);
          if (productId) {
            getProduct(productId)
              .then(result => {
                setLoading(false);
                setProduct(result);

                let disabledFilter = cart?.products?.filter(
                  item =>
                    item?.coffee_id == result?.id && item?.size_id == size,
                );
                if (disabledFilter && disabledFilter?.length > 0) {
                  setCartBtnDisabled(true);
                } else {
                  setCartBtnDisabled(false);
                }

                if (result?.sizes && result?.sizes?.length > 0) {
                  let sizeResult = result?.sizes?.filter(
                    item => item?.default === 1,
                  );
                  if (sizeResult && size?.length > 0) {
                    setSize(sizeResult[0]?.id);
                    setPrice(sizeResult[0]?.price);
                  } else {
                    setSize(result?.sizes[0]?.id ?? 0);
                    setPrice(result?.sizes[0]?.price ?? 0);
                  }
                }
              })
              .catch(error => {
                setLoading(false);
              });
          }
          setTimeout(() => {
            setShowThankAlert(true);
          }, 100);
          // setShowThankAlert(true);
        })
        .catch(error => {
          setShowRateAlert(false);
          showMessage({
            message: 'An error ocured while trying to send to review',
            type: 'danger',
          });
        });
    } else {
      setShowRateAlert(false);
      setShowThankAlert(false);
    }
  }, [ratevalue]);
  useEffect(() => {
    if (favoritesError) {
      showMessage({
        message: 'An error ocured while trying to add to favorites',
        type: 'danger',
      });
      dispatch(clearStates());
    }
  }, [favoritesError]);

  useEffect(() => {
    if (favorites) {
      if (favorites?.products?.length > 0) {
        let favoritesCheck = favorites?.products?.filter(
          item => item?.id == product?.id,
        );
        if (favoritesCheck.length > 0) {
          setFavoritesEnabled(true);
        } else {
          setFavoritesEnabled(false);
        }
      } else {
        setFavoritesEnabled(false);
      }
    } else {
      setFavoritesEnabled(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'An error ocured while trying to add to cart',
        type: 'danger',
      });
      dispatch(clearStates());
    }
  }, [error]);

  useEffect(() => {
    let disabledFilter = cart?.products?.filter(
      item => item?.coffee_id == product?.id && item?.size_id == size,
    );
    if (disabledFilter && disabledFilter?.length > 0) {
      setCartBtnDisabled(true);
    } else {
      setCartBtnDisabled(false);
    }
  }, [success]);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProduct(productId)
        .then(result => {
          setLoading(false);
          setProduct(result);

          let disabledFilter = cart?.products?.filter(
            item => item?.coffee_id == result?.id && item?.size_id == size,
          );
          if (disabledFilter && disabledFilter?.length > 0) {
            setCartBtnDisabled(true);
          } else {
            setCartBtnDisabled(false);
          }

          if (result?.sizes && result?.sizes?.length > 0) {
            let sizeResult = result?.sizes?.filter(item => item?.default === 1);
            if (sizeResult && size?.length > 0) {
              setSize(sizeResult[0]?.id);
              setPrice(sizeResult[0]?.price);
            } else {
              setSize(result?.sizes[0]?.id ?? 0);
              setPrice(result?.sizes[0]?.price ?? 0);
            }
          }
        })
        .catch(error => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    let fiteredSize = product?.sizes?.filter(item => item?.id == size);
    if (fiteredSize && fiteredSize?.length > 0) {
      setPrice(fiteredSize[0]?.price);
      let disabledFilter = cart?.products?.filter(
        item => item?.coffee_id == product?.id && item?.size_id == size,
      );
      if (disabledFilter && disabledFilter?.length > 0) {
        setCartBtnDisabled(true);
      } else {
        setCartBtnDisabled(false);
      }
    }
  }, [size]);

  if (loading || favoritesLoading) {
    return <Loader />;
  } else {
    return (
      <View style={tx`flex flex-1 w-full bg-white`}>
        <View style={tx`py-[16px] px-[30px] flex flex-row justify-between`}>
          <Pressable
            style={tx`w-[24px] h-[24px]`}
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} />
          </Pressable>
          <Text style={tx`text-black font-soraSemiBold text-[18px]`}>
            Detail
          </Text>
          <Pressable
            onPress={() => {
              if (favoritesEnabled) {
                dispatch(removeFromFavorites({coffee_id: product?.id, token}));
              } else {
                dispatch(addToFavorites({coffee_id: product?.id, token}));
              }
            }}>
            {favoritesEnabled ? (
              <FontAwesomeIcon icon={faHeartSolid} size={24} />
            ) : (
              <FontAwesomeIcon icon={faHeart} size={24} />
            )}
          </Pressable>
        </View>
        <ScrollView style={tx`px-[30px] mb-[100px]`}>
          {product?.img && (
            <Image
              source={{uri: product?.img}}
              style={[
                tx`w-full rounded-[16px] mt-[8px]`,
                {height: (width - 60) / 1.4},
              ]}
            />
          )}
          {product?.name && (
            <Text
              style={tx`font-soraSemiBold text-[20px] text-black mt-[20px]`}>
              {product?.name}
            </Text>
          )}
          {product?.topics && (
            <Text style={tx`font-soraRegular text-[12px] text-[#9B9B9B]`}>
              {product?.topics}
            </Text>
          )}
          <View style={tx`flex flex-row items-center gap-1 mt-[16px]`}>
            <FontAwesomeIcon icon={faStar} size={20} color={'#FBBE21'} />
            <Text style={tx`font-soraSemiBold text-[16px] text-black`}>
              {product?.rate ? product?.rate : 0}
            </Text>
            <Text style={tx`font-soraRegular text-[12px] text-[#808080]`}>
              ({product?.rate_count ? product?.rate_count : 0})
            </Text>

            {!product?.rate_exists && (
              <Pressable
                onPress={() => {
                  setShowRateAlert(true);
                }}
                style={tx`border-[1px] rounded-full border-[#EAEAEA] p-[5px] ml-[5px]`}>
                <FontAwesomeIcon icon={faPlus} size={10} color={'#C67C4E'} />
              </Pressable>
            )}
          </View>
          <View style={tx`h-[1px] w-full bg-[#EAEAEA] my-[20px]`} />

          <View>
            <Text
              style={tx`font-soraSemiBold text-[16px] text-black mb-[12px]`}>
              Description
            </Text>
            <Text
              style={tx`font-soraRegular text-[14px] text-[#9B9B9B] leading-relaxed text-justify mb-[20px]`}>
              {product?.description}
              {product?.description}
              {product?.description}
            </Text>
          </View>
          <View style={tx`mb-5`}>
            <Text
              style={tx`font-soraSemiBold text-[16px] text-black mb-[12px]`}>
              Size
            </Text>
            <View style={tx`flex flex-row gap-[12px] w-full justify-between`}>
              {product?.sizes &&
                product?.sizes?.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setSize(item?.id);
                      }}
                      style={[
                        tx`flex-1 border-[1px] border-[#DEDEDE] rounded-[12px] p-[10px]`,
                        size == item?.id
                          ? tx`border-orangeCustom bg-orangeCustom/10`
                          : {},
                      ]}>
                      <Text style={tx`text-center`}>{item?.name}</Text>
                    </Pressable>
                  );
                })}
            </View>
          </View>
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
                $ {price}
              </Text>
            </View>
            <View style={tx`flex-1`}>
              <Button
                loading={cartLoading}
                disabled={cartBtnDisabled}
                handler={() =>
                  addToCart({
                    id: product?.id,
                    size_id: size,
                    qt: 1,
                    token,
                  })
                }
                style={tx`w-full`}>
                Buy Now
              </Button>
            </View>
          </View>
        </View>
        <Alert
          show={showRateAlert ? true : false}
          component={<Rate value={ratevalue} handler={setRateValue} />}
          showConfirmButton={false}
          closeOnTouchOutside={true}
          cancelHandler={() => {
            setShowRateAlert(false);
          }}
        />
        <Alert
          show={showThankAlert ? true : false}
          title="Thank for your review!"
          confirmText="Ok"
          showConfirmButton={true}
          confirmHamdler={() => {
            setShowRateAlert(false);
            setShowThankAlert(false);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: 'red',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Product;
