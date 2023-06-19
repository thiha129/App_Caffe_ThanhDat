import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  KeyboardAvoidingView, FlatList, TouchableWithoutFeedback, AsyncStorage, SafeAreaView, Modal, ProgressBarAndroid, ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import CustomCallBack from '../CustomCallBack';
const colorBackground = '#009387';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../Colors';
//redux

import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const ForgetPassword_ChangePassScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [focusInputPassWord, setFocusInputPassWord] = useState(false);
  const [focusInputPassWordConfirm, setFocusInputPassWordConfirm] = useState(false);

  const onChangeFocusPassWord = () => {
    setFocusInputPassWord(true);
  }
  const onChangeBlurPassword = () => {
    setFocusInputPassWord(false);
  }
  const onChangeFocusPassWordConfirm = () => {
    setFocusInputPassWordConfirm(true);
  }
  const onChangeBlurPassWordConfirm = () => {
    setFocusInputPassWordConfirm(false);
  }
  const [data, setData] = useState<any>({
    username: '',
    phonenumber: '+84',
    password: '',
    cofirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    confirm_secureTextEntry: true,
    typeButten: true,
    timer: 11,
    kiemtra: false
  });

  const handlePasswordChange = (val: string) => {
    val.trim().length >= 8 ?
      setData({
        ...data,
        password: val,
        isValidPassword: true
      }) : setData({
        ...data,
        password: val,
        isValidPassword: false
      })
  }
  const handleConfirmPasswordChange = (val: string) => {
    val.trim() === data.password ?
      setData({
        ...data,
        cofirm_password: val,
        isValidConfirmPassword: true
      }) : setData({
        ...data,
        cofirm_password: val,
        isValidConfirmPassword: false
      })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  }
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  }

  const OTP = () => {
    if (data.password == "" || data.cofirm_password == "") {
      ToastAndroid.showWithGravityAndOffset(
        "Vui lòng không để trống !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      console.log("rỗng");
    } else {
      console.log("có");

      dispatch(actions.getChangePassword.getChangePasswordRequest({ phonenumber: route.params.Number, password: data.password }));

      ToastAndroid.showWithGravityAndOffset(
        "Cập nhật thành công !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );  
      navigation.navigate('ProfileScreen');
      //  console.log('[UserName]', phoneNumber);
      // console.log("[birthDay]" + text);
      // console.log("[Password]" + data.password);
      // console.log("[cofirm_password]" + data.cofirm_password);
      // console.log("[Mã OTP] : " + route.params.OPT);
      // console.log("[PhoneNumber]" + route.params.Number);
    }
  }

  const handleValidPassword = (val: string) => {
    val.trim().length >= 8 ?
      setData({
        ...data,
        password: val,
        isValidPassword: true
      }) : setData({
        ...data,
        password: val,
        isValidPassword: false
      })

  }

  return (
    <View style={styles.container}>
      <CustomCallBack label="" color={colorBackground} />
      <StatusBar backgroundColor={colorBackground} barStyle='light-content' />

      <View style={styles.header}>
        <Text style={[styles.text_header, styles.fontFamily]}>Đổi mật khẩu !</Text>
      </View>

      <View
        style={styles.footer}>
        <ScrollView>
          {/* hết 1 ô nhập */}
          <Text style={[styles.text_footer, { marginTop: 10 }, styles.fontFamily]}>Mật khẩu mới</Text>
          <View style={styles.action}>
            <View style={[styles.containerInput, {
            }]}>
              <FontAwesome
                name="lock"
                color="#05375a"
                size={24}
                style={{ marginRight: 10 }}>
              </FontAwesome>
              <View style={[styles.containerInput, {
                borderBottomColor: focusInputPassWord ? '#3A404C' : '#00000059'
              }]}>
                <TextInput
                  placeholder="Mật khẩu của bạn"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.phoneInputStyle}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                  onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                  onFocus={onChangeFocusPassWord}
                  onBlur={onChangeBlurPassword}

                >
                </TextInput>
                <TouchableOpacity
                  onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ?
                    <Feather
                      name="eye-off"
                      color="black"
                      size={20}>

                    </Feather>
                    :
                    <Feather
                      name="eye"
                      color="black"
                      size={20}>

                    </Feather>
                  }
                </TouchableOpacity>
              </View>

            </View>
          </View>
          {data.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={[styles.errorMsg, styles.fontFamily]}>Mật khẩu phải dài 8 ký tự trở lên</Text>
            </Animatable.View>
          }

          <Text style={[styles.text_footer, { marginTop: 35 }, styles.fontFamily]}>Xác nhận mật khẩu mới</Text>
          <View style={styles.action}>
            <View style={[styles.containerInput, {
            }]}>
              <FontAwesome
                name="lock"
                color="#05375a"
                size={24}
                style={{ marginRight: 10 }}>
              </FontAwesome>
              <View style={[styles.containerInput, {
                borderBottomColor: focusInputPassWordConfirm ? '#3A404C' : '#00000059'
              }]}>
              <TextInput
                placeholder="Xác nhận mật khẩu của bạn"
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                style={styles.phoneInputStyle}
                autoCapitalize="none"
                  onChangeText={(val) => handleConfirmPasswordChange(val)}
                  onFocus={onChangeFocusPassWordConfirm}
                  onBlur={onChangeBlurPassWordConfirm}
              >
                </TextInput>
                <TouchableOpacity
                onPress={updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry ?
                  <Feather
                    name="eye-off"
                    color="black"
                    size={20}>

                  </Feather>
                  :
                  <Feather
                    name="eye"
                    color="black"
                    size={20}>

                  </Feather>
                }
              </TouchableOpacity>
                </View>
       
            </View>
          </View>
          {data.isValidConfirmPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={[styles.errorMsg, styles.fontFamily]}>Xác nhận mật khẩu phải giống với mật khẩu</Text>
            </Animatable.View>
          }




          <View style={styles.button}>
            <CustomButtonLoginScreen label={"Hoàn tất đăng ký"} colorboder={"#fff"} onPress={() => OTP()} colortext={"#fff"} firstcolor={'#009387'} secondcolor={'#00786E'} numbermarginTop={0}></CustomButtonLoginScreen>

          </View>
        </ScrollView>
      </View>


    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorBackground
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: colorBackground
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,

  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  fontFamily: {
    fontFamily: 'Tahoma_Regular_font'
  },
  otpText: {
    color: colors.BLUE,
    fontSize: 18,
    width: '100%',
  },
  centerAlignedText: {
    textAlign: 'center',
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 15
  },
  containerInput: {
    flexDirection: 'row',

    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: 'white',
    flex: 1
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center'
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: 'white'
  },
  fillterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242'
  },
  countryModalStyle: {
    flex: 1,
    borderColor: 'black',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16
  },
  modalItemDialCode: {
    fontSize: 16
  },
  fillterInputCountainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center'
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  }
});
export default ForgetPassword_ChangePassScreen;