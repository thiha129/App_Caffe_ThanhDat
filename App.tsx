import React, { useState, useEffect, Fragment } from 'react';

import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { View, Text, Dimensions, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity, AppRegistry, LogBox, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import reducers from './src/redux/reducers';
import mySaga from './src/redux/sagas';

import TabComponent from './src/screen/components/Tab'
import LoginScreen from './src/screen/LoginScreen'
import RegisterScreen from './src/screen/RegisterScreen'
import HomeScreen from './src/screen/HomeScreen'
import ProductScreen from './src/screen/ProductScreen'
import DetailPosts from './src/screen/DetailPosts'
import DetailsProductScreen from './src/screen/DetailsProductScreen'
import NotifiScreen from './src/screen/NotifiScreen'
import ShoppingCartScreen from './src/screen/ShoppingCartScreen'
import ProfileScreen from './src/screen/ProfileScreen'
import SettingScreen from './src/screen/SettingScreen'
import PayScreen from './src/screen/PayScreen'
import CallScreen from './src/screen/demo'
import OtpScreen from './src/screen/OtpView'
import Test from './src/screen/WelcomScreen'
import RegisterInforUser from './src/screen/RegisterInforUser'
import FogetPasswordScreen from './src/screen/FogetPasswordScreen';
import ForgetPassword_OtpScreen from './src/screen/ForgetPassword_OtpScreen';
import ForgetPassword_ChangePassScreen from './src/screen/ForgetPassword_ChangePassScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AboutUs from './src/screen/AboutUs';
import EditInformation from './src/screen/EditInformation';
import ChinhSachGiaoHang from './src/screen/ChinhSachGiaoHang';
import ChinhSachThanhToan from './src/screen/ChinhSachThanhToan';
import ChinhSachDoiTra from './src/screen/ChinhSachDoiTra';
import ChinhSachBaoMat from './src/screen/ChinhSachBaoMat';
import TimKiemScreen from './src/screen/TimKiemScreen';
import OrderStatus from './src/screen/orderStatus';
import InforApp from './src/screen/InforApp';
import AllPosts from './src/screen/allPosts';
import DetailOrderStatus from './src/screen/DetailOrderStatus';

const sagaMiddleware = createSagaMiddleware();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const colorBackground = '#009387'
const myScreenTab: any = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <TabComponent name="Trang chủ" label="home" {...props} />,
          horizontalAnimation
        }}
        srceen
      />
      <Tab.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          tabBarButton: (props) => <TabComponent name="Shopping" label="logger" {...props} />,
          horizontalAnimation
        }}
      />
      <Tab.Screen
        name="NotifiScreen"
        component={NotifiScreen}
        options={{
          tabBarButton: (props) => (
            <TabComponent name="Thông báo" label="documents" {...props} />
          ), horizontalAnimation
        }}
      />
      <Tab.Screen
        name="Danh mục"
        component={SettingScreen}
        options={{
          tabBarButton: (props) => <TabComponent name="Tài khoản" label="menu" {...props} />,
          horizontalAnimation
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {

  let [fontsLoaded] = useFonts({
    'Tahoma_Regular_font': require('./assets/fonts/Tahoma_Regular_font.ttf'),
  });



  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <Fragment>
        <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
          <SafeAreaView style={{ flex: 0, backgroundColor: colorBackground }} />
          <SafeAreaView style={{ flex: 1 }}>
           
            <NavigationContainer>
              <Stack.Navigator screenOptions={horizontalAnimation}>
                <Stack.Screen options={{ headerShown: false }} name="Test" component={Test}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="myScreenTab" component={myScreenTab} ></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="CallScreen" component={CallScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="OrderStatus" component={OrderStatus}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="OtpScreen" component={OtpScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="RegisterScreen" component={RegisterScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="DetailsProductScreen" component={DetailsProductScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="ShoppingCartScreen" component={ShoppingCartScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="InforApp" component={InforApp}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="AllPosts" component={AllPosts}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="DetailOrderStatus" component={DetailOrderStatus}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="PayScreen" component={PayScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="DetailPosts" component={DetailPosts}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="ForgetPassword_ChangePassScreen" component={ForgetPassword_ChangePassScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="ForgetPassword_OtpScreen" component={ForgetPassword_OtpScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="FogetPasswordScreen" component={FogetPasswordScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="RegisterInforUser" component={RegisterInforUser}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="AboutUs" component={AboutUs}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="EditInformation" component={EditInformation}></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="chinhSachBaoMat" component={ChinhSachBaoMat} ></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="chinhSachDoiTra" component={ChinhSachDoiTra} ></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="chinhSachThanhToan" component={ChinhSachThanhToan} ></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="chinhSachGiaoHang" component={ChinhSachGiaoHang} ></Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name="TimKiemScreen" component={TimKiemScreen} ></Stack.Screen>

              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </Fragment>
      </Provider>
    );
  }
};
export default App;
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,

  },
})
AppRegistry.registerComponent(myScreenTab, () => App);
console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
LogBox.ignoreLogs(['Warning: Failed context type: Invalid context `virtualizedList.debugInfo.listKey` of type `function` supplied to `VirtualizedList`, expected `string`.']);

LogBox.ignoreLogs([`Require cycle: App.tsx -> src\screen\DetailPosts.tsx -> App.tsx`]);
LogBox.ignoreLogs([`Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.`]);
LogBox.ignoreLogs([`Require cycle: App.tsx -> src\screen\allPosts.tsx -> App.tsx`]);
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);
LogBox.ignoreLogs(['Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.']);

LogBox.ignoreLogs(['Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.']);
console.reportErrorsAsExceptions = false;
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
console.disableRedBox = true;