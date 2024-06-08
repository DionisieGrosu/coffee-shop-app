import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tx from '../../libs/tailwind';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {NavigationProp, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Loader from '../../components/Loader';
import {showMessage} from 'react-native-flash-message';
import {register} from '../../redux/actions/RegisterAction';
import Alert from '../../components/Alert';
import {clearStates} from '../../redux/slices/UserSlice';

type PropsType = {
  navigation: NavigationProp<any, any>;
};

function Register({navigation}: PropsType) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  type ReduxSelectorType = {
    loading: boolean;
    error: string;
    success?: boolean;
  };
  const {loading, error, success}: ReduxSelectorType = useSelector<RootState>(
    state => state.user,
  ) as ReduxSelectorType;

  useEffect(() => {
    return () => {
      dispatch(clearStates());
    };
  }, []);

  useEffect(() => {
    if (success || isFocused) {
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');
      setNameError(false);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
    }
  }, [success, isFocused]);

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
            if (parsedError?.data?.errors?.password) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
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
              : 'Something went wrong while trying to register user',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong while trying to register user',
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
            message: 'Something went wrong while trying to register user',
            type: 'danger',
          });
        }
      }
    } else {
      setNameError(false);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
    }
  }, [error]);

  function signUp() {
    dispatch<any>(
      register({
        name,
        email,
        phone,
        address,
        password,
        password_confirmation: confirmPassword,
      }),
    );
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={0}>
        <ScrollView>
          <View
            style={[
              tx`flex flex-1 items-center justify-center px-[30px] pt-10`,
              {minHeight: windowHeight},
            ]}>
            <View style={tx`flex-1 items-center w-full h-full justify-end`}>
              <Text style={tx`font-soraSemiBold text-[34px] text-orangeCustom`}>
                Create Account
              </Text>
              <Text
                style={tx`font-soraSemiBold text-[16px] max-w-[80%] text-black text-center mt-7 font-black mb-10`}>
                Create an account so you can use our coffee shop
              </Text>
            </View>
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
              <Input
                error={passwordError}
                value={password}
                placeholder={'Password'}
                handler={setPassword}
                secure={true}
                style={tx`mb-7`}
              />
              <Input
                error={confirmPasswordError}
                value={confirmPassword}
                placeholder={'Confirm Password'}
                handler={setConfirmPassword}
                secure={true}
                style={tx`mb-7`}
              />

              <Button handler={signUp}>Sign Up</Button>

              <Text
                onPress={() => {
                  navigation.navigate('Login');
                }}
                style={tx`text-black text-center mt-10 text-[16px] font-soraRegular`}>
                Already have an account
              </Text>
            </View>
          </View>
        </ScrollView>
        <Alert
          show={success ? success : false}
          title="Success registration!"
          message="You registered successfully! You can sign in"
          confirmText="Sign In"
          showConfirmButton={true}
          confirmHamdler={() => {
            navigation.navigate('Login');
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Register;
