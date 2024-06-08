import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import tx from '../libs/tailwind';
import {faPlus, faStar} from '@fortawesome/free-solid-svg-icons';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import LoaderKit from 'react-native-loader-kit';

type PropsType = {
  data: object;
  handler: () => void;
  addCartHandler: () => void;
  loading?: boolean;
  disabled?: boolean;
};
function ProductItem({
  handler = () => {},
  addCartHandler = () => {},
  data,
  loading = false,
  disabled = false,
}: PropsType) {
  const [productViewWidth, setProductViewWidth] = useState(0);
  const [widthIsSet, setWidthIsSet] = useState(false);

  return (
    <Pressable
      onPress={() => handler(data?.id)}
      onLayout={event => {
        if (event.nativeEvent.layout.width && !widthIsSet) {
          if (!isNaN(event.nativeEvent.layout.width)) {
            setProductViewWidth(event.nativeEvent.layout.width);
            setWidthIsSet(true);
          }
        }
      }}
      style={tx`relative bg-white w-1/2.2 rounded-[16px] overflow-hidden`}>
      <View
        style={tx`absolute top-1 left-1 z-10 flex flex-row items-center gap-1`}>
        <FontAwesomeIcon icon={faStar} size={20} color={'#FBBE21'} />
        <Text style={tx`font-soraSemiBold text-[16px] text-white`}>
          {data?.rate ? data?.rate : 0}
        </Text>
      </View>
      <Image
        source={{uri: data?.img}}
        style={[
          tx`rounded-[16px]`,
          {
            width: productViewWidth ? productViewWidth : 0,
            height: productViewWidth ? productViewWidth : 0,
          },
        ]}
      />
      <View style={tx`p-[12px] flex-1 justify-end`}>
        <Text style={tx`text-[#2F2D2C] text-[16px] font-soraSemiBold`}>
          {data?.name}
        </Text>
        <Text style={tx`text-[#9B9B9B] text-[12px] font-soraRegular`}>
          {data?.topics}
        </Text>
        <View style={tx`mt-[12px] flex flex-row justify-between`}>
          <Text style={tx`text-black text-[18px] font-soraSemiBold`}>
            $ {data?.sizes[0]?.price}
          </Text>
          <Pressable
            disabled={disabled}
            onPress={addCartHandler}
            style={[
              tx`p-[8px] rounded-[10px] bg-orangeCustom`,
              disabled ? {opacity: 0.5} : {},
            ]}>
            {loading && (
              <LoaderKit
                style={tx`absolute top-0.3 left-0.3 w-[30px] h-[30px]`}
                name={'BallClipRotateMultiple'} // Optional: see list of animations below
                color={'#fff'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            )}
            <FontAwesomeIcon
              size={16}
              icon={faPlus}
              color={loading ? 'transparent' : '#ffffff'}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

export default ProductItem;
