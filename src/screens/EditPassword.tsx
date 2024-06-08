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
import {updateUserPassword} from '../redux/actions/UpdateUserPasswordAction';
import {clearStates} from '../redux/slices/UserSlice';

export function EditPassword({navigation}) {
  const {loading, success, error, token, user} = useSelector<RootState>(
    state => state.user,
  );
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      showMessage({
        message: 'Password was edited successfully!',
        type: 'success',
      });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      let parsedError = JSON.parse(error);
      if (parsedError?.status == 401 || parsedError?.status == 422) {
        if (parsedError?.data?.message) {
          if (parsedError?.data?.errors) {
            if (parsedError?.data?.errors?.old_password) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
            }
            if (parsedError?.data?.errors?.password) {
              setNewPasswordError(true);
            } else {
              setNewPasswordError(false);
            }
            if (parsedError?.data?.errors?.password_confirmation) {
              setConfirmPasswordError(true);
            } else {
              setConfirmPasswordError(false);
            }
          }
          showMessage({
            message: parsedError?.data?.message
              ? parsedError?.data?.message
              : 'Something went wrong while trying to edit password',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong while trying to edit password',
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
            message: 'Something went wrong while trying to edit password',
            type: 'danger',
          });
        }
      }
    } else {
      setPasswordError(false);
      setConfirmPasswordError(false);
      setNewPasswordError(false);
    }
  }, [error]);

  function editPasswordHandler() {
    dispatch<any>(
      updateUserPassword({
        password,
        newPassword,
        password_confirmation: confirmPassword,
        token,
      }),
    );
  }

  useEffect(() => {
    return () => {
      dispatch(clearStates());
    };
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <View style={tx`flex flex-1 w-full bg-white`}>
        <View style={tx`py-[16px] px-[30px] flex flex-row justify-center`}>
          <Pressable
            style={tx`absolute left-5 top-4.5 w-[24px] h-[24px]`}
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} />
          </Pressable>
          <Text style={tx`text-black font-soraSemiBold text-[18px]`}>
            Edit Password
          </Text>
          <View></View>
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
                  error={passwordError}
                  value={password}
                  placeholder={'Password'}
                  handler={setPassword}
                  style={tx`mb-7`}
                  secure={true}
                />

                <Input
                  error={newPasswordError}
                  value={newPassword}
                  placeholder={'New Password'}
                  handler={setNewPassword}
                  style={tx`mb-7`}
                  secure={true}
                />

                <Input
                  error={confirmPasswordError}
                  value={confirmPassword}
                  placeholder={'Confirm Password'}
                  handler={setConfirmPassword}
                  style={tx`mb-7`}
                  secure={true}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={tx`absolute bottom-0 left-0 w-full px-[30px] py-[20px] bg-white`}>
          <Button handler={editPasswordHandler}>Edit</Button>
        </View>
      </View>
    );
  }
}

export default EditPassword;
