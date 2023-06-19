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
  KeyboardAvoidingView, FlatList, TouchableWithoutFeedback, AsyncStorage, SafeAreaView, Modal, ProgressBarAndroid, ToastAndroid, Picker, Dimensions, PixelRatio
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
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const scale = width / 320;
export function normalize(size: any) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
}
const tinh_tp = require('./datapicker/tinh_tp.json')
const quan_huyen = require('./datapicker/quan_huyen.json')
const xa_phuong = require('./datapicker/xa_phuong.json')
//redux

import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const RegisterInforUser: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const defaultMaskCountry = "Nhập tên người dùng..."
  const [text, setText] = useState('01-01-2001');
  const [timeget, setTimeGet] = useState('');
  const [focusInput, setFocusInput] = useState(false);
  const [focusInputAddress, setFocusInputAddress] = useState(false);
  const [focusInputPassWord, setFocusInputPassWord] = useState(false);
  const [focusInputPassWordConfirm, setFocusInputPassWordConfirm] = useState(false);
  const [placeholder, setPlaceholder] = useState(defaultMaskCountry);


  const onChangeFocus = () => {
    setFocusInput(true);
  }
  const onChangeBlur = () => {
    setFocusInput(false);
  }
  // PassWordConfirm
  const onChangeFocusPassWordConfirm = () => {
    setFocusInputPassWordConfirm(true);
  }
  const onChangeBlurPassWordConfirm = () => {
    setFocusInputPassWordConfirm(false);
  }
  // Địa chỉ cụ thể
  const onChangeFocusAddress = () => {
    setFocusInputAddress(true);
  }
  const onChangeBlurAddress = () => {
    setFocusInputAddress(false);
  }
  // password
  const onChangeFocusPassWord = () => {
    setFocusInputPassWord(true);
  }
  const onChangeBlurPassword = () => {
    setFocusInputPassWord(false);
  }
  const [data, setData] = useState<any>({
    username: '',
    phonenumber: '+84',
    password: '',
    address: '',
    cofirm_password: '',
    check_textInputChange: false,
    checkEntyuser: true,
    checkEntyaddress: true,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    confirm_secureTextEntry: true,
    typeButten: true,
    timer: 11,
    kiemtra: false,
    codeCountries: 'VN',
    dataCities: [],
    codeCities: '',
    dataCounties: [],
    codeCounties: '',
    dataWards: [],
    codeWards: '',
    tinh: 'Tỉnh '
  });
  useEffect(() => {
    setData({
      ...data,
      dataCities: Object.values(tinh_tp),
      dataCounties: Object.values(quan_huyen),
      dataWards: Object.values(xa_phuong),
      nameCities: ""
    })

  }, [])
  function renderlistCities() {
    if (data.codeCountries == 'VN') {
      return (data.dataCities.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      )));
    }
    return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
  }

  function renderlistCounties() {
    if (data.codeCountries == 'VN') {
      const filteredDataCounties = data.dataCounties.filter((item) => {
        return (item.parent_code == data.codeCities);
      });


      return (filteredDataCounties.map((item, key) => (
        <Picker.Item label={item.name} value={item.code} key={key} />
      )));
    }
    return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
  }
  function renderlistWards() {
    if (data.codeCountries == 'VN') {
      const filteredDataWards = data.dataWards.filter((item) => {
        return (item.parent_code == data.codeCounties);
      });
      return (filteredDataWards.map((item, key) =>
      (
        <Picker.Item label={item.name} value={item.name_with_type} key={key} />
      )
      ));
    }
    return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectdDate) => {
    const currentDate = selectdDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    var year = new Date().getFullYear();
    let tempDate = new Date(currentDate);
    let thisyear = tempDate.getFullYear();

    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let fDateget = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    if (tempDate.getDate() > 1 && (tempDate.getMonth() + 1) > 1 && tempDate.getFullYear() < 2003) {
      setText(fDate);
      setTimeGet(fDateget)
      setData({
        ...data,
        kiemtra: true
      })

    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Ngày sinh của bạn cần nhỏ hơn 2003(Tức lớn hơn 18 tuổi) !",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      setData({
        ...data,
        kiemtra: false
      })
    }

  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  const textInputChange = (val: string) => {
    val.trim().length != 0 ?
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        checkEntyuser: true
      })
      :
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        checkEntyuser: false
      })
  }
  const addressInputChange = (val: string) => {
    val.trim().length != 0 ?
      setData({
        ...data,
        address: val,
        checkEntyaddress: true,
      })
      :
      setData({
        ...data,
        address: val,
        checkEntyaddress: false,
      })
  }
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
    const AddressUser = data.codeWards + ", " + data.codeCounties + ", " + data.tinh.concat(data.codeCities)

    if (data.username == "" || data.password == "" || data.cofirm_password == "" || data.kiemtra == false || data.codeCities == "" || data.codeCounties == "" || data.codeWards == "" || data.address == "" || data.address == "") {
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

      dispatch(actions.registerAccountInfor.registerAccountInforRequest({ phonenumber: route.params.Number, otp: route.params.code, username: data.username, birthday: timeget, password: data.password, address: AddressUser, specificaddress: data.address, tinhTp: data.codeCities, quanHuyen: data.codeCounties, xaPhuong: data.codeWards }));
      _storeData();
    }
  }
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('PhoneNumber', route.params.Number)
      await AsyncStorage.setItem('PassWord', data.password)
      navigation.navigate('Test')
    } catch (error) {
      console.log(error);
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
        <Text style={[styles.text_header, styles.fontFamily]}>Thông tin tài khoản !</Text>
      </View>
      <View
        style={styles.footer}>
        <ScrollView>
          {/* hết 1 ô nhập */}
          <Text style={[styles.text_footer, styles.fontFamily]}>Tên người dùng</Text>
          <View style={styles.action}>
            <View style={[styles.containerInput, {
            }]}>
              <Feather
                name="user"
                color="#05375a"
                size={20}
                style={{ marginRight: 10 }}>
              </Feather>
              <View style={[styles.containerInput, {
                borderBottomColor: focusInput ? '#3A404C' : '#00000059'
              }]}>
                <TextInput
                  style={styles.phoneInputStyle}
                  placeholder={placeholder}
                  keyboardType="default"
                  autoCapitalize="words"
                  onChangeText={(val) => textInputChange(val)}
                  onFocus={onChangeFocus}
                  onBlur={onChangeBlur}
                >
                </TextInput>
              </View>
            </View>
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="black"
                  size={20}>
                </Feather>
              </Animatable.View>
              : null}
          </View>
          {data.checkEntyuser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={[styles.errorMsg, styles.fontFamily]}>Vui lòng không để trống !</Text>
            </Animatable.View>
          }
          <Text style={[styles.text_footer, styles.fontFamily, { marginTop: 10 }]}>Ngày sinh</Text>
          <View style={styles.action}>
            <View style={[styles.containerInput, {
            }]}>
              <FontAwesome
                name="birthday-cake"
                color="#05375a"
                size={20}
                style={{ marginRight: 10 }}>
              </FontAwesome>
              <View style={[{
                borderBottomColor: '#00000059', marginLeft: 5,
                flex: 0.5,
                height: 50,
                borderBottomWidth: 1.5,
              }]}
              >
                <Text onPress={() => showMode('date')} style={{ paddingTop: 15, paddingBottom: 15, fontSize: normalize(10) }}>{text}</Text>
              </View>
              {show && (<DateTimePicker
                textColor="red"
                style={{ flex: 2, padding: 20 }}
                testID='dateTimePicker'
                value={date}
                mode={mode}
                is24Hour={true}
                display='calendar'
                onChange={onChange}

              />)}
            </View>
          </View>
          {/* //Chọn địa chỉ */}
          <Text style={[styles.text_footer, { marginTop: 20 }, styles.fontFamily]}>Tỉnh/Thành phố, Quận /Huyện, Phường/Xã</Text>
          <View style={styles.action}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1, paddingRight: 5 }} >
                <Picker
                  selectedValue={data.codeCities}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setData({
                    ...data,
                    codeCities: itemValue,
                  })}
                >
                  <Picker.Item label="Tỉnh/Thành phố" value="" />
                  {renderlistCities()}
                </Picker>
              </View>
              <View style={{ flex: 1, paddingRight: 5 }} >
                <Picker
                  selectedValue={data.codeCounties}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setData({
                    ...data,
                    codeCounties: itemValue,

                  })}
                >
                  <Picker.Item label="Quận/huyện" value="" />
                  {renderlistCounties()}
                </Picker>
              </View>
              <View style={{ flex: 1 }} >
                <Picker
                  selectedValue={data.codeWards}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setData({
                    ...data,
                    codeWards: itemValue
                  })}
                >
                  <Picker.Item label="Xã/phường" value="" />
                  {renderlistWards()}
                </Picker>

              </View>
            </View>
          </View>
          <Text style={[styles.text_footer, { marginTop: 10 }, styles.fontFamily]}>Địa chỉ cụ thể</Text>
          <View style={styles.action}>
            <View style={[styles.containerInput, {
            }]}>
              <FontAwesome
                name="address-book-o"
                color="#05375a"
                size={24}
                style={{ marginRight: 10 }}>
              </FontAwesome>
              <View style={[styles.containerInput, {
                borderBottomColor: focusInputAddress ? '#3A404C' : '#00000059'
              }]}>
                <TextInput
                  style={styles.phoneInputStyle}
                  placeholder="Nhập địa chỉ cụ thể..."
                  autoCapitalize="none"
                  onChangeText={(val) => addressInputChange(val)}
                  onFocus={onChangeFocusAddress}
                  onBlur={onChangeBlurAddress}
                >
                </TextInput>
              </View>
            </View>
          </View>
          {data.checkEntyaddress ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={[styles.errorMsg, styles.fontFamily]}>Vui lòng không để trống !</Text>
            </Animatable.View>
          }
          <Text style={[styles.text_footer, { marginTop: 10 }, styles.fontFamily]}>Mật khẩu</Text>
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
                  // onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
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

          <Text style={[styles.text_footer, { marginTop: 25 }, styles.fontFamily]}>Xác nhận mật khẩu</Text>
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
    fontSize: normalize(20)
  },
  text_footer: {
    color: '#05375a',
    fontSize: normalize(11)
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
    fontSize: normalize(10),
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
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
    height: 50,
    fontSize: normalize(10)
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
export default RegisterInforUser;