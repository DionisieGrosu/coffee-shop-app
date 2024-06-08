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
import {showMessage} from 'react-native-flash-message';
import Loader from '../../components/Loader';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/actions/LoginAction';
import {clearStates} from '../../redux/slices/UserSlice';

type PropsType = {
  navigation: NavigationProp<any, any>;
};

type ReduxSelectorType = {
  loading: boolean;
  user?: object;
  error: string;
  success?: boolean;
  token?: string;
};

function Login({navigation}: PropsType) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {loading, error, success}: ReduxSelectorType = useSelector<RootState>(
    state => state.user,
  ) as ReduxSelectorType;

  useEffect(() => {
    if (success || isFocused) {
      dispatch(clearStates());
      setEmail('');
      setPassword('');
      setEmailError(false);
      setPasswordError(false);
    }
  }, [success, isFocused]);

  useEffect(() => {
    return () => {
      dispatch(clearStates());
    };
  }, []);

  useEffect(() => {
    if (error) {
      let parsedError = JSON.parse(error);
      if (parsedError?.status == 401 || parsedError?.status == 422) {
        if (parsedError?.data?.message) {
          if (parsedError?.data?.errors) {
            if (parsedError?.data?.errors?.email) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
            if (parsedError?.data?.errors?.password) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
            }
          }
          showMessage({
            message: parsedError?.data?.message
              ? parsedError?.data?.message
              : 'Something went wrong while trying to authonticate',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'Something went wrong while trying to authonticate',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Something went wrong while trying to authonticate',
          type: 'danger',
        });
      }
    } else {
      setEmailError(false);
      setPasswordError(false);
    }
  }, [error]);

  function signIn() {
    dispatch<any>(login({email, password}));
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
                Login here
              </Text>
              <Text
                style={tx`font-soraSemiBold text-[16px] max-w-[50%] text-center mt-7 text-black mb-10`}>
                Welcome back you`ve been missed
              </Text>
            </View>
            <View style={tx`w-full flex-1 pb-10 justify-start`}>
              <Input
                error={emailError}
                value={email}
                placeholder={'Email'}
                handler={setEmail}
                style={tx`mb-7`}
                email={true}
              />
              <Input
                error={passwordError}
                value={password}
                placeholder={'Password'}
                handler={setPassword}
                secure={true}
                style={tx`mb-7`}
              />

              <Button handler={signIn}>Sign In</Button>

              <Text
                onPress={() => {
                  navigation.navigate('Register');
                }}
                style={tx`text-black text-center mt-10 text-[16px] font-soraRegular`}>
                Create new account
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
