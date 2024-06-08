import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import TabsNavigation from './TabsNavigation';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Product from '../screens/Product';
import login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ResetPassword from '../screens/auth/ResetPassword';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {getItem, removeItem, setItem} from '../services/storage';
import {clearUser, setToken, setUser} from '../redux/slices/UserSlice';
import {getUser} from '../services/api';
import Profile from '../screens/Profile';
import EditPassword from '../screens/EditPassword';
function Navigation() {
  const Stack = createNativeStackNavigator();
  const {loading, user, error, success, token} = useSelector<RootState>(
    state => state.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || token == '') {
      getItem('token').then(value => {
        if (value) {
          dispatch(setToken(value));
          getUser()
            .then(user => {
              dispatch(
                setUser({
                  name: user?.name,
                  email: user?.email,
                  phone: user?.phone,
                  address: user?.address,
                  avatar: user?.avatar,
                }),
              );
            })
            .catch(error => {
              removeItem('token');
              dispatch(clearUser());
            });
        } else {
          removeItem('token');
          dispatch(clearUser());
        }
      });
    } else {
      setItem('token', token);
      getUser()
        .then(user => {
          dispatch(
            setUser({
              name: user?.name,
              email: user?.email,
              phone: user?.phone,
              address: user?.address,
              avatar: user?.avatar,
            }),
          );
        })
        .catch(error => {
          removeItem('token');
          dispatch(clearUser());
        });
    }
  }, [token]);

  if (token) {
    return (
      <Stack.Navigator
        initialRouteName="TabNavigation"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigation" component={TabsNavigation} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    );
  }
}

export default Navigation;
