import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ToastAndroid,
  KeyboardAvoidingView,
  LogBox, ProgressBarAndroid
} from 'react-native'
const colorBackground = '#009387';
const { width, height } = Dimensions.get("window")
import { Styles } from '../Styles';
import CustomTextInput from '../CustomTextInput';
import colors from '../Colors';
import { isAndroid } from '../HelperFunctions';
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import CustomCallBack from '../CustomCallBack';
import { useNavigation, useRoute } from '@react-navigation/native';
// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { checkForgetPassword_otp$ } from '../redux/selectors';
const ForgetPassword_OtpScreen: React.FC = () => {
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = React.useState();
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };
  const abcx = useSelector(checkForgetPassword_otp$);
  console.log('[client - otp]',abcx);
  useEffect(() => {
    var a = otpArray.toString();
    var stringWithoutCommas = a.replace(/,/g, '');
    var b = parseInt(stringWithoutCommas);
    if (abcx == '1') {
      ToastAndroid.showWithGravityAndOffset(
          "Hệ thống đg chuyển tiếp",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
      );
      navigation.navigate('ForgetPassword_ChangePassScreen',{Number:route.params.Number});
  } else if (abcx == '2') {
      console.log('hợp lệ');
      ToastAndroid.showWithGravityAndOffset(
          "Bạn đã nhập mã OTP sai. Vui lòng kiểm tra lại !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,  
          25,
          50
      );
      // navigation.navigate('OtpScreen', { Number: inputNumber });
  } else {
      console.log('Erro');
  }
  }, [abcx])
  const [data, setData] = useState<any>({
    typeButten: true,
  });
  const updatetypeButtom = () => {
    setData({
      ...data,
      typeButten: !data.typeButten,
    });
  }
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fivthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
          setSubmittingOtp(false);
        }
      }
    };
  };
  const onOtpKeyPress = index => {
    return ({ nativeEvent: { key: value } }) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fivthTextInputRef.current.focus();
        }
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };
  const signin = () => {
    // navigation.navigate('ForgetPassword_ChangePassScreen',{Number:route.params.Number});

    var a = otpArray.toString();
    var stringWithoutCommas = a.replace(/,/g, '');

    if (stringWithoutCommas == undefined) {
      ToastAndroid.showWithGravityAndOffset(
        "Vui lòng không để trống !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
    } else {
      // console.log("Mã OTP : " + b);
      // console.log("abcx" + route.params.Number);
      dispatch(actions.getForgetPasswordVerify.getForgetPasswordVerifyRequest({ phonenumber: route.params.Number,code:stringWithoutCommas}));
      
    }
  }
  
  return (
    <View style={styles.container}>
    <CustomCallBack label="" color={colorBackground} />
    <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
    <View style={styles.header}>
      <Text style={[styles.text_header, styles.fontFamily]}>Nhập mã OTP !</Text>
    </View>
    <View
      style={styles.footer}>
         <View style={[Styles.row, Styles.mt12]}>
      {[
        firstTextInputRef,
        secondTextInputRef,
        thirdTextInputRef,
        fourthTextInputRef,
        fivthTextInputRef,
        sixthTextInputRef,
      ].map((textInputRef, index) => (
        <CustomTextInput
          containerStyle={[Styles.fill, Styles.mr12]}
          value={otpArray[index]}
          onKeyPress={onOtpKeyPress(index)}
          onChangeText={onOtpChange(index)}
          keyboardType={'numeric'}
          maxLength={1}
          styles={[styles.otpText, styles.centerAlignedText]}
          autoFocus={index === 0 ? true : undefined}
          refCallback={refCallback(textInputRef)}
          key={index}
        />
      ))}

    </View>
      {/* <View style={styles.action}>
        <View style={[styles.containerInput, {
        }]}>
          <View style={[Styles.row, Styles.mt12]}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
              fivthTextInputRef,
              sixthTextInputRef,
            ].map((textInputRef, index) => (
              <CustomTextInput
                containerStyle={[Styles.fill, Styles.mr12]}
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                keyboardType={'numeric'}
                maxLength={1}
                styles={[styles.otpText, styles.centerAlignedText]}
                autoFocus={index === 0 ? true : undefined}
                refCallback={refCallback(textInputRef)}
                key={index}
              />
            ))}
          </View>
        </View>
      </View> */}
      <View style={styles.button}>
        <CustomButtonLoginScreen label={"Xác minh"} colorboder={"#fff"} onPress={() => signin()} colortext={"#fff"} firstcolor={'#009387'} secondcolor={'#00786E'} numbermarginTop={0}></CustomButtonLoginScreen>
      </View>
    </View>
  </View>

  );
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
    color: colors.BLACK,
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
export default ForgetPassword_OtpScreen;