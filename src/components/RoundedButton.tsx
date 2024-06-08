import React, {ReactNode} from 'react';
import {Pressable} from 'react-native';
import tx from '../libs/tailwind';

type PropsType = {
  children: ReactNode | string;
  handler: () => void;
};
function RoundedButton({children, handler}: PropsType) {
  return (
    <Pressable
      onPress={handler}
      style={tx`p-[6px] rounded-full border-[1px] border-[#EAEAEA]`}>
      {children}
    </Pressable>
  );
}

export default RoundedButton;
