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
    ToastAndroid,
    KeyboardAvoidingView, FlatList, AsyncStorage, TouchableWithoutFeedback, SafeAreaView, Modal, ProgressBarAndroid, Pressable,Dimensions,PixelRatio
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import CustomCallBack from '../CustomCallBack';
const colorBackground = '#009387';
import colors from '../Colors';

import DropDownPicker from "react-native-custom-dropdown";
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { checkRegister$ } from '../redux/selectors';
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
const RegisterScreen: React.FC = () => {

    const navigation = useNavigation();
    const defaultCodeCountry = "+84";
    const dispatch = useDispatch();
    const defaultMaskCountry = "902 291 011"
    const [phoneNumber, setPhoneNumber] = useState();
    const [focusInput, setFocusInput] = useState(false);

    const [placeholder, setPlaceholder] = useState(defaultMaskCountry);

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
    const onChangeBlur = () => {
        setFocusInput(false);
    }

    const abcx = useSelector(checkRegister$);
    useEffect(() => {
        let aa = defaultCodeCountry;
        let a = phoneNumber;
        let b = parseInt(a);
        let c = b.toString();
        let inputNumber = aa.concat(c);
        if (abcx == '0') {
            console.log('đã tồn tại');
            ToastAndroid.showWithGravityAndOffset(
                "Tài khoản đã tồn tại !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if (abcx == '1') {
            console.log('hợp lệ');
            ToastAndroid.showWithGravityAndOffset(
                "Hợp lệ !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            navigation.navigate('OtpScreen', { Number: inputNumber });
        } else {
            console.log('Erro');
        }
        const willFocusSubscription = navigation.addListener('focus', () => {
            updatetypeButtom()
        });
        return willFocusSubscription;
    }, [abcx])
    const [data, setData] = useState<any>({
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
        select: abcx,
        country: 'sms'
    });
    
    const updatetypeButtom = () => {
        // let aa = defaultCodeCountry;
        // let a = phoneNumber;
        // let b = parseInt(a);
        // // console.log(b);
        // let c = b.toString();
        // let inputNumber = aa.concat(c);
        // navigation.navigate('OtpScreen', { Number: inputNumber });

        if (phoneNumber == null) {
            ToastAndroid.showWithGravityAndOffset(
                "Vui lòng không để trống !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            let aa = defaultCodeCountry;
            let a = phoneNumber;
            let b = parseInt(a);
            // console.log(b);
            let c = b.toString();
            let inputNumber = aa.concat(c);
            console.log('[hihi]', abcx);
            dispatch(actions.registerAccount.registerAccountRequest({ phonenumber: inputNumber, channel: data.country }));
        }
    }
    return (
        <View style={styles.container}>
            <CustomCallBack label="" color={colorBackground} />
            <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
            <View style={styles.header}>
                <Text style={[styles.text_header, styles.fontFamily]}>Đăng ký ngay !</Text>
            </View>
            <View
                style={styles.footer}>
                <Text style={[styles.text_footer, styles.fontFamily]}>Số điện thoại</Text>
                <View style={styles.action}>
                    <View style={[styles.containerInput, {}]}>
                        <DropDownPicker
                            items={[
                                {
                                    label: '', value: 'sms', icon: () => <MaterialIcons
                                    name="sms"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}>
                                </MaterialIcons>
                            },
                            {
                                label: '', value: 'call', icon: () => <Feather
                                    name="phone-call"
                                    color="#05375a"
                                    size={20}
                                    style={{ marginRight: 10 }}>
                                </Feather>
                            },
                        ]}
                        defaultValue={data.country}
                        containerStyle={{ width: 50 }}
                        style={{ borderWidth: 0, width: 50, padding: 5, marginRight: 10}}
                        itemStyle={{
                            justifyContent: 'flex-start', width: 100
                        }}
                        dropDownStyle={{ borderWidth: 0, backgroundColor: '#fafafa', position: 'relative' }}
                        onChangeItem={item => setData({
                            country: item.value
                        })}
                    />
                        <View style={[styles.containerInput, {
                           borderBottomColor: focusInput ? '#244DB7' : '#00000059'
                        }]}>
                            <View >
                                <View style={styles.openDialogView}>
                                    <Text style={[styles.fontFamily,styles.text_footer]}>  {defaultCodeCountry} |</Text>
                                </View>
                            </View>
                            <TextInput
                                style={styles.phoneInputStyle}
                                placeholder={placeholder}
                                keyboardType="numeric"
                                onChangeText={onChangePhone}
                                value={phoneNumber}
                                secureTextEntry={false}
                                onFocus={onChangeFocus}
                                onBlur={onChangeBlur}
                                maxLength={10}
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
                                color="green"
                                size={20}>
                            </Feather>
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={[styles.errorMsg, styles.fontFamily]}>Số điện thoại phải có 10 chữ số và có số 0 ở đầu</Text>
                    </Animatable.View>
                }
                <View style={styles.button}>
                    <CustomButtonLoginScreen label={"Gửi mã xác minh"} colorboder={"#fff"} onPress={() => updatetypeButtom()} colortext={"#fff"} firstcolor={'#009387'} secondcolor={'#00786E'} numbermarginTop={0}></CustomButtonLoginScreen>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorBackground
    },
    dropdown3BtnTxt: {
        color: "#444",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        marginHorizontal: 12,
    },
    dropdown3BtnStyle: {
        width: "80%",
        height: 50,
        backgroundColor: "#FFF",
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#444",
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
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
    },
    centeredView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default RegisterScreen;