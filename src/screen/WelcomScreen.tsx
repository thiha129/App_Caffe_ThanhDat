import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { checkUsername$, checkAccount$, dataAccount$, dataSanPhamSold$ ,id_Account$} from '../redux/selectors';
import * as actions from '../redux/actions';
import 'intl';
import 'intl/locale-data/jsonp/vi-VN'
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const image = { uri: "https://wallpaperaccess.com/full/2362815.jpg" };
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, SafeAreaView, FlatList,
  TouchableWithoutFeedback, ToastAndroid, Dimensions, Platform, Button, ProgressBarAndroid, ImageBackground, AsyncStorage, StatusBar
} from 'react-native';
const colorBackground = '#009387';
// import {ProgressBar} from '@react-native-community/progress-bar-android';
const Test: React.FC = () => {
  const dispatch = useDispatch();
  const check_login = useSelector(checkUsername$);
  const x = useSelector(id_Account$);
  const detailUser = useSelector(checkAccount$);
  check_login != undefined ? dispatch(actions.getCountCart.getCountCartRequest({ id_Account: x })) : null
  const navigation = useNavigation();

  // console.log('[Check màn hình login]', check_login);
  const sanPhamSoldSelected = useSelector(dataSanPhamSold$);
  useEffect(() => {
    // console.log('format', new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(10000));
    dispatch(actions.getPosts.getPostsRequest());
    dispatch(actions.getSanPhamsSold.getSanPhamsSoldRequest({ pagenumber: 0 }))
   
    dispatch(actions.getAccountsUserName.getAccountsUserNameRequest({ phonenumber: detailUser.phoneNumber }));
  }, [])

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('myScreenTab')
    }, 3000)

    const willFocusSubscription = navigation.addListener('focus', () => {
      setTimeout(() => {
        navigation.navigate('myScreenTab')
      }, 3000)
    });
    return willFocusSubscription;

  }, [sanPhamSoldSelected])

  useEffect(() => {

    a();
    const willFocusSubscription = navigation.addListener('focus', () => {
      a();
    });
    if (check_login == '0') {
      setData({
        ...data,
        typelove: true,
        user: "Tài khoản"
      })
    } else {
      setData({
        ...data,
        typelove: false,
        user: check_login
      })


    }
    return willFocusSubscription;
  }, [])
  const [data, setData] = useState<any>({
    typelove: true,
    user: check_login,
  });
  const a = async () => {
    try {
      const phone = await AsyncStorage.getItem('PhoneNumber');
      const pass = await AsyncStorage.getItem('PassWord');
      if (phone !== null && pass !== null) {
        // console.log('màn hình chờ', phone);
        dispatch(actions.getAccountsUserName.getAccountsUserNameRequest({ phonenumber: phone }));
        
        setData({
          ...data,
          typelove: false,
          user: check_login
        })
      } else {
        setData({
          ...data,
          typelove: true,
          user: "Tài khoản"
        })
      }
    } catch (error) {
      console.log('[Error]' + error);
    }
  };


  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.text}>Thành Đạt Coffee</Text>
            <AnimatedEllipsis
              numberOfDots={4}
              minOpacity={0.5}
              useNativeDriver={true}
              animationDelay={200}
              style={{
                color: '#fff',
                fontSize: width/5,
              }} />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  text: {
    marginTop: width/3,
    color: "white",
    fontSize: width / 12,
    lineHeight: 84,
    textAlign: "center",
  }
});


export default Test;