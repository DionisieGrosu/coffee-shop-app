import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Loader from '../components/Loader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faEdit,
  faGear,
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
import Input from '../components/Input';
import {syncUser} from '../redux/actions/SyncUserAction';
import {updateUser} from '../redux/actions/UpdateUserAction';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {logout} from '../redux/actions/LogoutAction';
import {clearStates} from '../redux/slices/UserSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUserAvatar} from '../redux/actions/UpdateUserAvatarAction';

export function Profile({navigation}) {
  const {loading, success, error, token, user} = useSelector<RootState>(
    state => state.user,
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && success) {
      showMessage({
        message: 'Data was edited successfully!',
        type: 'success',
      });
    }
  }, [user]);

  useEffect(() => {
    return () => dispatch(clearStates());
  }, []);

  useEffect(() => {
    if (avatar) {
      dispatch(updateUserAvatar({avatar, token}));
      setAvatar(null);
    }
  }, [avatar]);

  useEffect(() => {
    dispatch(syncUser());
    if (user) {
      if (user?.name) {
        setName(user?.name);
      }
      if (user?.email) {
        setEmail(user?.email);
      }
      if (user?.phone) {
        setPhone(user?.phone);
      }
      if (user?.address) {
        setAddress(user?.address);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user?.name) {
        setName(user?.name);
      }
      if (user?.email) {
        setEmail(user?.email);
      }
      if (user?.phone) {
        setPhone(user?.phone);
      }
      if (user?.address) {
        setAddress(user?.address);
      }
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      let parsedError = JSON.parse(error);
      if (parsedError?.status == 401 || parsedError?.status == 422) {
        if (parsedError?.data?.message) {
          if (parsedError?.data?.errors) {
            if (parsedError?.data?.errors?.name) {
              setNameError(true);
            } else {
              setNameError(false);
            }
            if (parsedError?.data?.errors?.email) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
            if (parsedError?.data?.errors?.phone) {
              setPhoneError(true);
            } else {
              setPhoneError(false);
            }
            if (parsedError?.data?.errors?.address) {
              setAddressError(true);
            } else {
              setAddressError(false);
            }
          }
          showMessage({
            message: parsedError?.data?.message
              ? parsedError?.data?.message
              : 'Something went wrong while trying to edit user',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong while trying to edit user',
            type: 'danger',
          });
        }
      } else {
        if (parsedError?.message) {
          showMessage({
            message: parsedError?.message,
            type: 'danger',
          });
        } else if (parsedError?.error) {
          showMessage({
            message: parsedError?.error,
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong while trying to edit user',
            type: 'danger',
          });
        }
      }
    } else {
      setNameError(false);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
    }
  }, [error]);

  function editUser() {
    dispatch<any>(
      updateUser({
        name,
        email,
        phone,
        address,
        token,
      }),
    );
  }

  if (loading) {
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
            Profile
          </Text>
          <View>
            <Menu>
              <MenuTrigger>
                <FontAwesomeIcon icon={faGear} size={20} color="#000" />
              </MenuTrigger>

              <MenuOptions
                customStyles={{
                  optionsContainer: {marginTop: 40, borderRadius: 10},
                }}>
                <MenuOption
                  style={tx`py-[10px] px-[20px] border-[1px] border-[#EAEAEA]`}
                  onSelect={() => {
                    navigation.navigate('EditPassword');
                  }}>
                  <Text style={tx`text-black font-soraRegular text-[16px]`}>
                    EditPassword
                  </Text>
                </MenuOption>
                <MenuOption
                  style={tx`py-[10px] px-[20px] border-[1px] border-[#EAEAEA]`}
                  onSelect={() => {
                    dispatch(logout({token}));
                  }}>
                  <Text style={tx`text-black font-soraRegular text-[16px]`}>
                    Exit
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={tx`flex justify-center items-center mt-[20px]`}>
          <View>
            <View style={tx`w-[140px] h-[140px] rounded-full overflow-hidden`}>
              {user?.avatar ? (
                <Image source={{uri: user?.avatar}} style={tx`w-full h-full`} />
              ) : (
                <Image
                  source={require('../../assets/images/default-avatar.jpg')}
                  style={tx`w-full h-full`}
                />
              )}
            </View>
            <Pressable
              onPress={() => {
                launchImageLibrary({noData: true}, response => {
                  if (response) {
                    setAvatar(response);
                  }
                });
              }}
              style={tx`absolute bottom-0 right-2 bg-orangeCustom p-[7px] rounded-full`}>
              <View>
                <FontAwesomeIcon icon={faEdit} size={18} color="#fff" />
              </View>
            </Pressable>
          </View>
          <View style={tx`my-[18px]`}>
            <Text
              style={tx`font-soraSemiBold text-black text-[14px] text-center`}>
              {user?.name}
            </Text>
            <Text
              style={tx`font-soraRegular text-[#B7B7B7] text-[12px] text-center`}>
              {user?.address}
            </Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={-180}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={tx`mb-[100px]`}>
            <View
              style={[
                tx`flex flex-1 items-center h-full justify-center px-[30px] pt-10`,
              ]}>
              <View style={tx`w-full flex-1 pb-10 justify-start`}>
                <Input
                  error={nameError}
                  value={name}
                  placeholder={'Name'}
                  handler={setName}
                  style={tx`mb-7`}
                />
                <Input
                  email={true}
                  error={emailError}
                  value={email}
                  placeholder={'Email'}
                  handler={setEmail}
                  style={tx`mb-7`}
                />
                <Input
                  error={phoneError}
                  value={phone}
                  placeholder={'Phone'}
                  handler={setPhone}
                  style={tx`mb-7`}
                />
                <Input
                  error={addressError}
                  value={address}
                  placeholder={'Address'}
                  handler={setAddress}
                  style={tx`mb-7`}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={tx`absolute bottom-0 left-0 w-full px-[30px] py-[20px] bg-white`}>
          <Button handler={editUser}>Edit</Button>
        </View>
      </View>
    );
  }
}

export default Profile;
