import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert, TouchableWithoutFeedback, SafeAreaView, Modal, FlatList, ToastAndroid, AsyncStorage, ScrollView,Dimensions,PixelRatio
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import CustomCallBack from '../CustomCallBack';
// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const scale = width / 320;
export function normalize(size: any) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}
import { checkLogin$ } from '../redux/selectors';
const colorBackground = '#009387';

const LoginScreen: React.FC = () => {
    const [data, setData] = useState<any>({
        phonenumber: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        _check: true
    });
    const [phoneNumber, setPhoneNumber] = useState();
    const [inputNumber, setInputNumber] = useState();
    const dispatch = useDispatch();

    const navigation = useNavigation();



    const _storeData = async () => {
        try {
            let aa = defaultCodeCountry;
            let a = phoneNumber;
            let b = parseInt(a);
            let c = b.toString();
            let inputNumber = aa.concat(c);
            await AsyncStorage.setItem('PhoneNumber', inputNumber)
            await AsyncStorage.setItem('PassWord', data.password)

            navigation.navigate('Test')
        } catch (error) {
            console.log(error);
        }

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
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    }

    const signin = () => {
        navigation.navigate('RegisterScreen')
        console.log("abc");
    }
    const forgetpassword = () => {
        navigation.navigate('FogetPasswordScreen')
        console.log("mnp");
    }
    const abcx = useSelector(checkLogin$);
    React.useEffect(() => {
        if (abcx == "0") {
            console.log("Rỗng 1 trong 2");

            // ToastAndroid.showWithGravityAndOffset(
            //     "Bạn vui lòng kiểm tra lại số điện thoại và mật khẩu !",
            //     ToastAndroid.SHORT,
            //     ToastAndroid.BOTTOM,
            //     25,
            //     50
            // );
            setData({
                ...data,
                _check: false
            })

        } else if (abcx == "1") {
            console.log("Có");
            ToastAndroid.showWithGravityAndOffset(
                "Chào mừng bạn trở lại !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            _storeData();
            setData({
                ...data,
                _check: true
            })
        } else if (abcx == "2") {
            console.log("ko tồn tại");
            // ToastAndroid.showWithGravityAndOffset(
            //     "Tài khoản này không tồn tại. Vui lòng kiểm tra lại",
            //     ToastAndroid.SHORT,
            //     ToastAndroid.BOTTOM,
            //     25,
            //     50
            // );
            setData({
                ...data,
                _check: false
            })
        } else {
            console.log('erro');
        }

    }, [abcx]);
    const defaultCodeCountry = "84";
    const defaultMaskCountry = "902 291 011"
    const onSubmit = React.useCallback(() => {
        if (phoneNumber == undefined || data.password == null || data.isValidUser == false || data.isValidPassword == false) {
            console.log('rỗng 1 trong 2');
            setData({
                ...data,
                isValidUser: false,
                check_textInputChange: false,
                isValidPassword: false
            })
        } else {
            let aa = defaultCodeCountry;
            let a = phoneNumber;
            let b = parseInt(a);
            let c = b.toString();
            let inputNumber = aa.concat(c);
            dispatch(actions.getAccounts.getAccountsRequest({ phonenumber: inputNumber, password: data.password }));
        }
    }, [phoneNumber, inputNumber, data.password, dispatch]);
    const [focusInput, setFocusInput] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
    const onChangePhone = (number) => {
        setPhoneNumber(number);
        let rjx =  /^0[1-9]{1}\d{8,9}$/;
        let validuser = rjx.test(number)
        validuser ? setData({
            ...data,
            isValidUser: true,
            check_textInputChange: true
        }) :
            setData({
                ...data,
                isValidUser: false,
                check_textInputChange: false
            })
    }

    const onChangeFocus = () => {
        setFocusInput(true);
    }
    const onChangeFocusPass = () => {
        setFocusPassword(true);
    }
    const onChangeBlur = () => {
        setFocusInput(false);
    }
    const onChangeBlurPass = () => {
        setFocusPassword(false);
    }
    return (
        <View style={styles.container}>
            <CustomCallBack label="" color={colorBackground} />
            <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
            <View style={styles.header}>
                <Text style={[{
                    color: 'white',
                    fontSize: normalize(20),
                }, styles.fontFamily]}>Chào mừng !</Text>
            </View>

            <View
                style={styles.footer}>
                <ScrollView>
                    <Text style={[styles.text_footer, styles.fontFamily]}>Số điện thoại</Text>
                    <View style={styles.action}>
                        <View style={[styles.containerInput, {
                        }]}>
                            <Feather
                                name="phone-call"
                                color="#05375a"
                                size={20}
                                style={{ paddingTop: 10 }}>
                            </Feather>
                            <View style={[styles.containerInput, {
                                borderBottomColor: focusInput ? '#3A404C' : '#00000059'
                            }]}>
                                <Text style={[styles.text_footer,styles.fontFamily]}>  +{defaultCodeCountry} |</Text>
                                <TextInput
                                    // ref={(input) => textInput = input}
                                    style={styles.phoneInputStyle}
                                    placeholder={defaultMaskCountry}
                                    keyboardType="numeric"
                                    onChangeText={(number) => onChangePhone(number)}
                                    onFocus={onChangeFocus}
                                    onBlur={onChangeBlur}
                                    maxLength={10}
                                >
                                </TextInput>
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}>
                                        </Feather>
                                    </Animatable.View>
                                    : <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Entypo
                                            name="circle-with-cross"
                                            color="red"
                                            size={20}>
                                        </Entypo>
                                    </Animatable.View>}
                            </View>

                        </View>

                    </View>
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={[styles.errorMsg, styles.fontFamily]}>Số điện thoại phải có 10 chữ số và có số 0 ở đầu</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, { marginTop: 25 }, styles.fontFamily]}>Mật khẩu</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={24}>
                        </FontAwesome>
                        <View style={[styles.containerInput, {
                            borderBottomColor: focusPassword ? '#3A404C' : '#00000059', marginLeft: 5
                        }]}>
                            <TextInput
                                placeholder="Mật khẩu của bạn"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={[styles.textInput, styles.fontFamily]}
                                autoCapitalize="none"
                                onChangeText={(val) => handlePasswordChange(val)}
                                onFocus={onChangeFocusPass}
                                onBlur={onChangeBlurPass}
                            >
                            </TextInput>
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}>
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="black"
                                        size={20}
                                        style={{ paddingBottom: 10 }}>

                                    </Feather>
                                    :
                                    <Feather
                                        name="eye"
                                        color="black"
                                        size={20}
                                        style={{ paddingBottom: 10 }}>

                                    </Feather>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={[styles.errorMsg, styles.fontFamily]}>Mật khẩu phải dài 8 ký tự trở lên</Text>
                        </Animatable.View>
                    }
                    {data._check ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={[styles.errorMsg, styles.fontFamily]}>Vui lòng kiểm tra lại số điện thoại và mật khẩu của bạn !</Text>
                        </Animatable.View>
                    }
                    <View style={{ alignItems: 'flex-start' }} >
                        <Text style={[styles.fontFamily, { marginTop: 20, alignItems: 'flex-end',fontSize:normalize(10) }]} onPress={() => forgetpassword()}>Quên mật khẩu</Text>
                    </View>
                    <View style={styles.button}>
                        <CustomButtonLoginScreen label={"Đăng nhập"} colorboder={"#fff"} onPress={onSubmit} colortext={"#fff"}   firstcolor={'#009387'} secondcolor={'#00786E'} numbermarginTop={0}></CustomButtonLoginScreen>

                        <CustomButtonLoginScreen label={"Đăng ký"} colorboder={colorBackground} onPress={signin} colortext={colorBackground}  firstcolor={'#fff'} secondcolor={'#fff'} numbermarginTop={15}></CustomButtonLoginScreen>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}
export default LoginScreen;
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
        marginTop: 30,
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
        color: '#000'

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

function showModal(): any {
    throw new Error('Function not implemented.');
}
