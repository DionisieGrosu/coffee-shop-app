import React from 'react';
import tx from '../libs/tailwind';
import LoaderKit from 'react-native-loader-kit';
import {View} from 'react-native';
function Loader() {
  return (
    <View style={tx`flex flex-1 bg-white justify-center items-center`}>
      <LoaderKit
        style={{width: 100, height: 100}}
        name={'BallClipRotatePulse'} // Optional: see list of animations below
        color={'#C67C4E'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      />
    </View>
  );
}

export default Loader;
