import React, {LegacyRef, createRef, useState} from 'react';
import {InputModeOptions, TextInput, View} from 'react-native';
import tx from '../libs/tailwind';

type InputProps = {
  placeholder: string;
  value: string | undefined;
  secure?: boolean;
  error?: boolean;
  style?: object;
  inputStyle?: object;
  inputMode?: InputModeOptions;
  handler?: any;
  email?: boolean;
};
const inputRef = createRef<HTMLInputElement>();

function Input({
  placeholder = '',
  value = '',
  secure = false,
  error = false,
  style = {},
  inputStyle = {},
  inputMode = 'text',
  handler = () => {},
  email = false,
}: InputProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  function setValue(value) {
    setInputValue(value);
    handler(value);
  }
  return (
    <View
      style={[
        tx`py-[5px] px-[10px] border-[1px] rounded-[16px] w-full text-black`,
        style,
        error
          ? tx`bg-[#ff0033]/10 border-[#ff0033]`
          : tx`bg-orangeCustom/10 border-orangeCustom`,
      ]}>
      {secure ? (
        <TextInput
          placeholder={placeholder}
          onChangeText={valueChanged => {
            setValue(valueChanged);
          }}
          placeholderTextColor={'#8e8e8e'}
          secureTextEntry={true}
          inputMode={'text'}
          style={[tx`text-black font-soraRegular text-[14px]`, inputStyle]}
          value={inputValue}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          onChangeText={valueChanged => {
            setValue(valueChanged);
          }}
          autoComplete={email ? 'email' : 'off'}
          autoCapitalize={email ? 'none' : 'words'}
          placeholderTextColor={'#8e8e8e'}
          inputMode={inputMode}
          style={[tx`text-black font-soraRegular text-[14px]`, inputStyle]}
          value={inputValue}
        />
      )}
    </View>
  );
}

export default Input;
