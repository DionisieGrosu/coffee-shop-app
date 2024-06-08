import React, {ReactNode} from 'react';
import {Pressable, Text, View} from 'react-native';
import tx from '../libs/tailwind';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LoaderKit from 'react-native-loader-kit';

type PropsType = {
  style?: object;
  textStyle?: object;
  handler: () => void;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
};
function Button({
  style = {},
  textStyle = {},
  handler = () => {},
  children,
  loading = false,
  disabled = false,
}: PropsType) {
  const opacityValue = useSharedValue(1);
  const pressInAnimation = () => {
    opacityValue.value = withSpring(0.8);
  };
  const pressOutAnimation = () => {
    opacityValue.value = withSpring(1);
  };
  const animatedStyle = useAnimatedStyle(
    () => ({opacity: opacityValue.value}),
    [],
  );
  return (
    <Pressable
      disabled={disabled || loading ? true : false}
      onPress={handler}
      onPressIn={() => {
        pressInAnimation();
      }}
      onPressOut={() => {
        pressOutAnimation();
      }}>
      <Animated.View style={[animatedStyle, disabled ? {opacity: 0.5} : {}]}>
        <View
          style={[
            tx`flex justify-center items-center bg-orangeCustom py-[21px] w-full focus:bg-primary-600 rounded-[16px]`,
            style,
          ]}>
          {loading && (
            <LoaderKit
              style={tx`absolute top-1/2 left-1/2.5 w-[40px] h-[40px]`}
              name={'BallClipRotateMultiple'} // Optional: see list of animations below
              color={'#fff'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          )}

          <Text
            style={[
              tx`text-white font-soraSemiBold text-[16px] text-center`,
              loading ? tx`text-transparent` : {},
              textStyle,
            ]}>
            {children}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
export default Button;
