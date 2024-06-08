import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, ScrollView, Image} from 'react-native';
import Loader from '../components/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import tx from '../libs/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {getCartProducts, getFavoritesProducts} from '../services/api';
import RoundedButton from '../components/RoundedButton';
import {syncFavorites} from '../redux/actions/favorites/FavoritesSyncAction';
import {removeFromFavorites} from '../redux/actions/favorites/RemoveFromFavoritesAction';

export function Favorites({navigation}) {
  const {token} = useSelector<RootState>(state => state.user);
  const {loading, favorites, error, success} = useSelector<RootState>(
    state => state.favorites,
  );
  const [favoritesLoading, setCartLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncFavorites());
    getFavoritesProducts().then(result => {
      if (result && result?.length > 0) {
        setProducts(result);
      } else {
        setProducts([]);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(syncFavorites());
    getFavoritesProducts().then(result => {
      if (result && result?.length > 0) {
        setProducts(result);
      } else {
        setProducts([]);
      }
    });
  }, [favorites]);

  function remove({coffee_id, token}: {coffee_id: number; token: string}) {
    dispatch(removeFromFavorites({coffee_id, token}));
  }

  if (favoritesLoading) {
    return <Loader />;
  } else {
    return (
      <View style={tx`flex flex-1 w-full bg-white`}>
        <View style={tx`py-[16px] px-[30px] flex flex-row justify-center`}>
          <Text style={tx`text-black font-soraSemiBold text-[18px]`}>
            Favorites
          </Text>
        </View>
        <ScrollView style={tx`px-[30px] mb-[100px] mb-[110px]`}>
          {favorites &&
            products?.length > 0 &&
            products?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('Product', {
                      productId: item?.id,
                    });
                  }}
                  key={index}
                  style={tx`flex flex-row justify-between py-[20px] border-t-[1px] border-[#EAEAEA]`}>
                  <View style={tx`flex flex-row gap-[12px] items-center`}>
                    {item?.img && (
                      <Image
                        source={{uri: item?.img}}
                        style={tx`w-[54px] h-[54px] rounded-[12px]`}
                      />
                    )}

                    <View>
                      <Text
                        style={tx`font-soraSemiBold text-[16px] text-black`}>
                        {item?.name?.length > 15
                          ? item?.name?.slice(0, 15) + '...'
                          : item?.name}
                      </Text>
                      <Text
                        style={tx`font-soraRegular text-[12px] text-[#9B9B9B]`}>
                        {item?.topics}
                      </Text>
                    </View>
                  </View>
                  <View style={tx`flex flex-row items-center gap-[12px]`}>
                    <RoundedButton
                      handler={() => {
                        remove({
                          coffee_id: item?.id,
                          token,
                        });
                      }}>
                      <FontAwesomeIcon icon={faXmark} size={16} />
                    </RoundedButton>
                  </View>
                </Pressable>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

export default Favorites;
