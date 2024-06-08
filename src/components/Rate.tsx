import {faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, View} from 'react-native';
import tx from '../libs/tailwind';

type PropsType = {
  value: number;
  handler: (value: number) => void;
};

function Rate({value = 0, handler}: PropsType) {
  return (
    <View style={tx`flex flex-row gap-5 justify-center items-center`}>
      <Pressable
        onPress={() => {
          handler(1);
        }}>
        {value >= 1 ? (
          <FontAwesomeIcon icon={faStar} size={20} color="#FBBE21" />
        ) : (
          <FontAwesomeIcon icon={faStar} size={20} color="#F2F2F2" />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          handler(2);
        }}>
        {value >= 2 ? (
          <FontAwesomeIcon icon={faStar} size={20} color="#FBBE21" />
        ) : (
          <FontAwesomeIcon icon={faStar} size={20} color="#F2F2F2" />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          handler(3);
        }}>
        {value >= 3 ? (
          <FontAwesomeIcon icon={faStar} size={20} color="#FBBE21" />
        ) : (
          <FontAwesomeIcon icon={faStar} size={20} color="#F2F2F2" />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          handler(4);
        }}>
        {value >= 4 ? (
          <FontAwesomeIcon icon={faStar} size={20} color="#FBBE21" />
        ) : (
          <FontAwesomeIcon icon={faStar} size={20} color="#F2F2F2" />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          handler(5);
        }}>
        {value >= 5 ? (
          <FontAwesomeIcon icon={faStar} size={20} color="#FBBE21" />
        ) : (
          <FontAwesomeIcon icon={faStar} size={20} color="#F2F2F2" />
        )}
      </Pressable>
    </View>
  );
}

export default Rate;
