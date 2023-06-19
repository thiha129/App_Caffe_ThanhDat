import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, Picker, Image, ScrollView, Alert, Platform, Modal, Animated, PixelRatio } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../CustomInput'
import CustomCallBack from '../CustomCallBack'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import { cartData$, checkAccount$, checkPay$, checkAddress$ } from '../redux/selectors';
import { useNavigation } from '@react-navigation/core'
import Toast from 'react-native-tiny-toast'
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import { LinearGradient } from 'expo-linear-gradient';
const colorBackground = '#FFA100';
const tinh_tp = require('./datapicker/tinh_tp.json')
const quan_huyen = require('./datapicker/quan_huyen.json')
const xa_phuong = require('./datapicker/xa_phuong.json')
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
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

type customPay = {
    id: number,
    img: string,
    title: string,
    price: number
}
const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const PayScreen: React.FC<{}> = (props: any) => {
    const default0 = "0";
    const defaultCodeCountry = "84";
    const cartData = useSelector(cartData$)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [tongChiPhi, setTongChiPhi] = React.useState(0)
    const [data, setData] = React.useState([])
    const [Pay, setPay] = React.useState("")
    const dataAccount = useSelector(checkAccount$)
    const checkPayment = useSelector(checkPay$)
    const checkAddres = useSelector(checkAddress$)
    const [diaChi, setDiaChi] = React.useState("");
    const [diaChiChiTiet, setDiaChiChiTiet] = React.useState("");
    const [idnguoidung, setIdnguoidung] = React.useState("");
    const [codeCities, setcodeCities] = React.useState("");
    const [codeCounties, setcodeCounties] = React.useState("");
    const [codeWards, setcodeWards] = React.useState("");
    const [ten, setTen] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [phonechange, setPhoneChange] = React.useState<number>();
    const [isCheckedPay, setIsCheckedPay] = React.useState(false)
    const [visible, setvisible] = React.useState(false)
    const [isCheckChange, setIsCheckedChange] = React.useState(false)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    React.useEffect(() => {
        // console.log('[checkaddress]',checkAddres.checkaddress);

        if (isCheckChange == true) {
            const toast = Toast.showSuccess("Cập nhật địa chỉ thành công!")
            setTimeout(() => {
                setIsCheckedChange(false)
            }, 1100)
            setvisible(false)
        }
    }, [isCheckChange])

    React.useEffect(() => {
        try {
            // console.log("[pay]", props.route.params.data.name);
            if (props.route.params.checked == 0) {
                setData(props.route.params.data);
                setTongChiPhi(props.route.params.tongChiPhi)
            }
            const format = String().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        } catch (error) {
        }
        // console.log('[CheckAddress]', checkAddres);
        setPay(checkAddres)
        let numberstr = (dataAccount.phoneNumber).toString()
        let numberstr0 = default0.concat(numberstr.slice(2, 11))
        setDiaChi(dataAccount.address)
        setTen(dataAccount.nameUser)
        setPhone(dataAccount.phoneNumber)
        setPhoneChange(numberstr0)
        setDiaChiChiTiet(dataAccount.specificaddress)
        setIdnguoidung(dataAccount._id)
        setcodeCities(dataAccount.tinh_tp)
        setcodeCounties(dataAccount.quan_huyen)
        setcodeWards(dataAccount.xa_phuong)
        if (isCheckedPay == true) {
            setIsCheckedPay(false)
            const toast = Toast.showSuccess("Đặt hàng thành công!")
            setTimeout(() => {
                dispatch(action.getAddNotifition.getAddNotifitionRequest({
                    title: 'Đặt hàng thành công',
                    body: 'Đang chờ xác nhận ',
                    id_hoadon: checkPayment,
                    id_Account: idnguoidung
                }));
                sendPushNotification(expoPushToken);
                Toast.hide(toast)
                setIsLoading(!isLoading)
                navigation.navigate('myScreenTab')
            }, 1100)
        }
    }, [checkPayment])
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            // console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Đặt hàng thành công',
            body: 'Mã đơn hàng của bạn là ' + checkPayment,
            data: { someData: checkPayment },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            // console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }
    const [focusInput, setFocusInput] = useState(false);
    const [user, setUser] = useState<any>({
        codeCountries: 'VN',
        dataCities: [],
        dataCounties: [],
        dataWards: [],
        tinh: 'Tỉnh ',
        isValidUser: true
    });
    useEffect(() => {
        setUser({
            ...user,
            dataCities: Object.values(tinh_tp),
            dataCounties: Object.values(quan_huyen),
            dataWards: Object.values(xa_phuong),
            nameCities: ""
        })

    }, [])
    function renderlistCities() {
        if (user.codeCountries == 'VN') {
            return (user.dataCities.map((item, key) => (
                <Picker.Item label={item.name} value={item.code} key={key} />
            )));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }

    function renderlistCounties() {
        if (user.codeCountries == 'VN') {
            const filteredDataCounties = user.dataCounties.filter((item) => {
                return (item.parent_code == codeCities);
            });
            return (filteredDataCounties.map((item, key) => (
                <Picker.Item label={item.name} value={item.code} key={key} />
            )));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }
    function renderlistWards() {
        if (user.codeCountries == 'VN') {
            const filteredDataWards = user.dataWards.filter((item) => {
                return (item.parent_code == codeCounties);
            });
            return (filteredDataWards.map((item, key) =>
            (
                <Picker.Item label={item.name} value={item.name_with_type} key={key} />
            )
            ));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }
    const textInputChange = (val) => {
        setPhoneChange(val)
    }
    const onChangeFocus = () => {
        setFocusInput(true);
    }
    const onChangeBlur = () => {
        setFocusInput(false);
    }
    // console.log('[adress]',Pay);
    const [min, setMin] = React.useState<number>(10)
    const [max, setMax] = React.useState<number>(30)
    const [zero, setzero] = useState<string>("000");
    const sendData = (min, max) => {
        Alert.alert(
            'Thông báo',
            'Xác nhận đặt hàng ?',
            [
                { text: "Hủy", style: 'cancel', onPress: () => { } },
                {
                    text: 'Xác nhận',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            let random = Math.floor(Math.random() * (max - min) + min);
                            // console.log('[Random]', random);
                            let randomst = random.toString();
                            let randomship = parseInt(randomst.concat(zero))
                            // console.log('[Randompr]', randomship);
                            // let total = String(tongChiPhi + randomship).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                            // console.log('[Tổng thanh toán]', total);
                            const dataCart = data;
                            dispatch(
                                action.getAddPay.getAddPayRequest({
                                    data,
                                    nameUser: ten,
                                    address: diaChi,
                                    phoneNumber: phone,
                                    tongThanhToan: tongChiPhi,
                                    ship: 0,
                                    type: 1,
                                    specificaddress: diaChiChiTiet,
                                    id_Account: idnguoidung
                                }));
                            setIsCheckedPay(true)


                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ]
        );
    }
    const changeaddress = () => {
        if (ten == "" || phonechange == "" || codeCities == "" || codeCounties == "" || codeWards == "" || diaChiChiTiet == "") {
            setUser({
                ...user,
                isValidUser: false
            })
        } else {
            let numerphone = defaultCodeCountry.concat(parseInt(phonechange).toString())
            let AddressUser = codeWards + ", " + codeCounties + ", " + user.tinh.concat(codeCities)
            // console.log('[Tên]',ten);
            // console.log('[sđt]',numerphone);
            // console.log('[Tỉnh]',codeCities);
            // console.log('[QuanHuyen]',codeCounties);
            // console.log('[XaPhuong]',codeWards);
            // console.log('[diachichitiet]',diaChiChiTiet);
            dispatch(action.getChangeAddress.getChangeAddressRequest({
                nameU: ten,
                phoneU: numerphone,
                tinhTp: codeCities,
                quanHuyen: codeCounties,
                xaPhuong: codeWards,
                specificaddressU: diaChiChiTiet,
                id_Account: idnguoidung,
                addressU: AddressUser
            }))
            setIsCheckedChange(true)
        }

    }
    return (
        <View style={[styles.container, {
            flexDirection: "column"
        }]}>
            <CustomCallBack color="#009387" label="Thanh toán" />
            <View style={{ backgroundColor: "white", flexDirection: "column", padding: 10 }} >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[{ fontSize: normalize(14) }, styles.fontFamily]}>Địa chỉ nhận hàng:</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.fontFamily, { fontSize: normalize(13) }]}>Tên khách hàng : {ten} | +{phone}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.fontFamily, { fontSize: normalize(13) }]}>Địa chỉ : {diaChiChiTiet}, {diaChi}</Text>
                </View>
                {/* <View style={{ flexDirection: 'column' }}>
                    <Text style={[styles.fontFamily, { fontSize: normalize(9), alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end' }]}>Thay đổi địa chỉ nhận hàng</Text>
                </View> */}
            </View>

            <View style={{ flex: 4 }} >
                <ScrollView>
                    {
                        data.map((product, index) => (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: 'white', width: width, }}>
                                    <Image source={{ uri: product.img }} style={{ width: width / 4.5, height: width / 4.5, margin: 20, marginLeft: 20 }} ></Image>
                                    <View style={{ margin: width / 35, width: width / 1.6 }}>
                                        <Text style={[{ fontSize: normalize(14), color: 'black', }, styles.fontFamily]}>{product.tenSanPham}</Text>
                                        <Text style={[{ fontSize: normalize(14), color: 'black', }, styles.fontFamily]}>Loại: {product.typeProduct}</Text>

                                        <View style={{ flexDirection: 'row', marginTop: width / 40 }}>
                                            <Text style={[{ fontSize: normalize(13) }, styles.fontFamily]}>Số lượng:  x{product.soLuong}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: width / 50 }}>
                                            <Text style={[{ fontSize: normalize(13) }, styles.fontFamily]}>Đơn giá:   {String(product.giaSanPham).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
                                        </View>
                                    </View>
                                </View>
                            </View >
                        ))
                    }
                </ScrollView>
            </View>
            <View style={{ flex: 1.5, backgroundColor: "white", flexDirection: 'column',justifyContent:'center',alignItems:'center' }} >
                <View style={{ flexDirection: 'column',  justifyContent: 'center'}}>

                    <View style={{  flexDirection: 'row' }}>
                        <Text style={[styles.textStyle, styles.fontFamily]}>Tổng tiền hàng:</Text>
                        <Text style={[styles.priceStyle, styles.fontFamily]}>{String(tongChiPhi).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
                        {/* <Text style={[styles.textStyle, styles.fontFamily]}>Phí vận chuyển:</Text> */}
                        {/* <Text style={[styles.textStyle, styles.fontFamily]}>Tổng thanh toán:</Text> */}
                    </View>
                    <View style={{  flexDirection: 'row' }}>
                    <Text style={[styles.textStyle, styles.fontFamily]}>Phí vận chuyển:</Text>
                        <Text style={[styles.priceStyle, styles.fontFamily]}>NV gọi xác nhận</Text>
                        {/* <Text style={[styles.priceStyle, styles.fontFamily]}>{String(tongChiPhi + 10000).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ ~ {String(tongChiPhi + 30000).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text> */}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <TouchableOpacity onPress={() => sendData(min, max)} >
                        <LinearGradient
                            colors={['#009387', '#00786E']}
                            style={styles.btnBuy}
                        >
                            <Text style={[{ color: 'white', fontSize: normalize(13) }, styles.fontFamily]}>Đặt hàng</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        //     <ModalPoup visible={visible}>
        //         <View style={{
        //             flexDirection: 'row',
        //         }}>
        //             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
        //                 <TouchableOpacity onPress={() => setvisible(false)}>
        //                     <Image
        //                         source={require('./images/x.png')}
        //                         style={{ height: 30, width: 30 }}
        //                     ></Image>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //         <View style={{
        //             flexDirection: 'row',

        //             marginBottom: 5,
        //         }}>
        //             <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        //                 <TouchableOpacity onPress={() => setvisible(false)}>
        //                     <Text style={{ fontSize: 30 }}>Chỉnh Sửa Địa Chỉ</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>

        //         <View style={styles.action1}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 <Text style={{ fontSize: 17 }}>Tên khách hàng:</Text>
        //                 <View style={[styles.containerInput, {
        //                     borderBottomColor: focusInput ? '#3A404C' : '#00000059'
        //                 }]}>
        //                     <TextInput
        //                         style={styles.phoneInputStyle}
        //                         placeholder="Nhập tên người dùng..."
        //                         keyboardType="default"
        //                         autoCapitalize="words"
        //                         onChangeText={(val) => setTen(val)}
        //                         onFocus={onChangeFocus}
        //                         onBlur={onChangeBlur}
        //                         value={ten}
        //                     >
        //                     </TextInput>
        //                 </View>
        //             </View>

        //         </View>

        //         <View style={styles.action1}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 <Text style={{ fontSize: 17 }}>Số điện thoại:</Text>
        //                 <View style={[styles.containerInput, {
        //                     borderBottomColor: focusInput ? '#3A404C' : '#00000059'
        //                 }]}>
        //                     <TextInput
        //                         keyboardType="numeric"
        //                         style={styles.phoneInputStyle}
        //                         placeholder="Nhập số điện thoại..."
        //                         onChangeText={(val) => textInputChange(val)}
        //                         onFocus={onChangeFocus}
        //                         onBlur={onChangeBlur}
        //                         value={phonechange}
        //                         maxLength={10}
        //                     >
        //                     </TextInput>
        //                 </View>
        //             </View>

        //         </View>

        //         <View style={[styles.action1]}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 <Text style={{ fontSize: 17 }}>Tỉnh/Thành phố , Quận /Huyện, Phường/Xã</Text>
        //                 <View style={styles.action}>
        //                     <View style={{ flex: 1, flexDirection: "row" }}>
        //                         <View style={{ flex: 1, paddingRight: 5 }} >
        //                             <Picker
        //                                 selectedValue={codeCities}
        //                                 style={{ height: 50, width: 150 }}
        //                                 onValueChange={(itemValue, itemIndex) => setcodeCities(itemValue)}
        //                             >
        //                                 <Picker.Item label="Tỉnh/Thành phố" value="" />
        //                                 {renderlistCities()}
        //                             </Picker>
        //                         </View>
        //                         <View style={{ flex: 1, paddingRight: 5 }} >
        //                             <Picker
        //                                 selectedValue={codeCounties}
        //                                 style={{ height: 50, width: 150 }}
        //                                 onValueChange={(itemValue, itemIndex) => setcodeCounties(itemValue)}
        //                             >
        //                                 <Picker.Item label="Quận/huyện" value="" />
        //                                 {renderlistCounties()}
        //                             </Picker>
        //                         </View>
        //                         <View style={{ flex: 1 }} >
        //                             <Picker
        //                                 selectedValue={codeWards}
        //                                 style={{ height: 50, width: 150 }}
        //                                 onValueChange={(itemValue, itemIndex) => setcodeWards(itemValue)}
        //                             >
        //                                 <Picker.Item label="Xã/phường" value="" />
        //                                 {renderlistWards()}
        //                             </Picker>

        //                         </View>
        //                     </View>
        //                 </View>
        //             </View>

        //         </View>

        //         <View style={styles.action1}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 <Text style={{ fontSize: 17 }}>Địa chỉ cụ thể:</Text>
        //                 <View style={[styles.containerInput, {
        //                     borderBottomColor: focusInput ? '#3A404C' : '#00000059'
        //                 }]}>
        //                     <TextInput
        //                         style={styles.phoneInputStyle}
        //                         placeholder="Nhập tên người dùng..."
        //                         keyboardType="default"
        //                         autoCapitalize="words"
        //                         onChangeText={(val) => setDiaChiChiTiet(val)}
        //                         onFocus={onChangeFocus}
        //                         onBlur={onChangeBlur}
        //                         value={diaChiChiTiet}
        //                     >
        //                     </TextInput>
        //                 </View>
        //             </View>

        //         </View>

        //         <View style={styles.action1}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>
        //                 {user.isValidUser ? null :
        //                     <Animatable.View animation="fadeInLeft" duration={500}>
        //                         <Text style={[styles.errorMsg, styles.fontFamily]}>Vui lòng không để trống !</Text>
        //                     </Animatable.View>
        //                 }
        //             </View>
        //         </View>
        //         <View style={styles.action1}>
        //             <View style={{ flex: 1, flexDirection: 'column' }}>

        //                 <CustomButtonLoginScreen
        //                     label={"Đăng nhập"}
        //                     colorboder={"#fff"}
        //                     onPress={() => changeaddress()}
        //                     colortext={"#fff"}
        //                     firstcolor={'#009387'} secondcolor={'#00786E'}
        //                     numbermarginTop={5}>
        //                 </CustomButtonLoginScreen>
        //             </View>
        //         </View>
        //     </ModalPoup>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    pay: {
        width: width,
        height: height / 17,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            width: width,
            height: height / 17
        },
        elevation: 22

    },
    action1: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5,
        //borderBottomWidth: 1,
        //borderBottomColor: '#f2f2f2',


    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',


    },
    containerInput: {
        flexDirection: 'row',

        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: 'white',

    },
    payText: {
        fontSize: 18,

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    address: {
        backgroundColor: 'white',
        marginTop: width / 70
    },
    textStyle: {
        marginTop: width / 60,
        marginLeft: width / 50,
        fontSize: normalize(14),
        color: 'black'
    },
    priceStyle: {
        marginLeft: width / 70,
        marginTop: width / 60,
        fontSize: normalize(14),
        color: 'red'

    },
    btnBuy: {
        width: width / 1.5,
        height: height / 15,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productView: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        width: width,
        height: height / 7,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    payIt: {
        backgroundColor: 'white',
        width: width,
        height: height / 5,
        alignItems: 'center',
        marginTop: 2
    },
    textStyles: {
        marginTop: width / 40,
        marginLeft: width / 20,
        fontSize: 15,
        color: '#a9a9a9'
    },
    priceStyles: {
        marginLeft: width / 4.5,
        marginTop: width / 40,
        fontSize: 15,
        color: '#a9a9a9'
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: "#00000073",
        alignItems: 'center',
        justifyContent: 'center'

    },
    modalContainer: {

        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    header: {
        width: '100%',
        height: '70%',

        justifyContent: 'center',
    },
    phoneInputStyle: {
        marginLeft: 5,
        color: 'black',
        height: 50,
        flex: 1
    },
})

export default PayScreen;