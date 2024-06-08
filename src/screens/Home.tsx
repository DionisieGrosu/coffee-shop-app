import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import tx from '../libs/tailwind';
import Button from '../components/Button';
import {NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Loader from '../components/Loader';

type PropsType = {
  navigation: NavigationProp<any, any>;
};
function Home({navigation}: PropsType) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <View style={tx`bg-black flex flex-1`}>
        <ImageBackground
          style={tx`flex flex-1 justify-center items-center`}
          source={require('../../assets/images/home_background.png')}
          imageStyle={tx`h-[70%]`}>
          <View
            style={tx`absolute bottom-[24px] w-full flex justify-center items-center`}>
            <Text
              style={tx`text-white font-soraSemiBold text-[34px] max-w-[80%] text-center mt-100`}>
              Coffee so good, your taste buds will love it.
            </Text>
            <Text
              style={tx`text-[#A9A9A9] font-soraRegular text-[14px] text-center mt-1 max-w-[70%] mb-[24px]`}>
              The best grain, the finest roast, the powerful flavor.
            </Text>
            <View style={tx`w-full px-[30px] mb-[24px]`}>
              <Button
                handler={() => {
                  navigation.navigate('Login');
                }}>
                Get Started
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Home;
