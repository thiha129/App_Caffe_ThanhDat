import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ToastAndroid, Dimensions, Platform, PixelRatio } from 'react-native'
// npx react-native run-android
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, ListItem, Icon } from 'react-native-elements'

import Custom from '../CustomSetting'
import BaseIcon from './BaseIcon'
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const colorBackground = '#FFA100';
const scale = width / 320;
export function normalize(size: any) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}
//redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { checkAccount$, checkUsername$, dataAccount$ ,getDetailUser$} from '../redux/selectors';
const SettingScreen: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const detailUser = useSelector(checkAccount$);
    const [img, setImg] = React.useState("https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg")
    const [isChecked, setIsChecked] = React.useState(false)
    let abcx = "0"
    let checkAccount = undefined
    try {
        const abc = useSelector(checkUsername$);
        abcx = abc
        
        const checkAccoun = useSelector(checkAccount$);
        checkAccount = checkAccoun
    } catch (error) {
    }

    useEffect(() => {
        a();

        // if (abcx == '0' || abcx == undefined) {
        //     setData({
        //         ...data,
        //         typelove: true,
        //         user: "Tài khoản",
        //     })
        //     setIsChecked(isChecked)
        //     setImg('https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg')

        // } else {
        //     setData({
        //         ...data,
        //         typelove: false,
        //         user: detailUser.nameUser,
        //     })
        //     setIsChecked(!isChecked)
        //     try {
        //         setImg(detailUser.avatar)
        //     } catch (error) {
        //     }

        // }
        // console.log("[checkAccount]", img);


    }, [])

    const [data, setData] = useState<any>({
        typelove: true,
        user: "Tài khoản",
        profile: true,
    });

    const retrieveData = async () => {
        try {
            const phone = await AsyncStorage.getItem('PhoneNumber');
            const pass = await AsyncStorage.getItem('PassWord');

            if (phone !== null && pass !== null) {
                // console.log(phone);
                setData({
                    ...data,
                    typelove: false,
                    user: phone
                })
            } else {
                setData({
                    ...data,
                    typelove: true,
                    user: "Tài khoản"
                })
            }
        } catch (error) {
            console.log('[Error] ' + error);
        }
    };
    const a = async () => {
        try {
            const phone = await AsyncStorage.getItem('PhoneNumber');
            const pass = await AsyncStorage.getItem('PassWord');
            if (phone !== null && pass !== null) {
                // console.log(phone);
                dispatch(actions.getAccountsUserName.getAccountsUserNameRequest({ phonenumber: phone }));
                setData({
                    ...data,
                    typelove: false,
                    user: abcx
                })
                try {
                    setImg(checkAccount.avatar)
                } catch (error) {

                }
                setIsChecked(!isChecked)
            } else {
                setData({
                    ...data,
                    typelove: true,
                    user: "Tài khoản"
                })
                setImg('https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg')
                setIsChecked(isChecked)
            }
        } catch (error) {
            console.log('[Error] ' + error);
        }
    };
    const updatetypelove = async () => {
        if (data.typelove == true) {
            navigation.navigate('LoginScreen');
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn muốn đăng xuất ?',
                [
                    { text: "Hủy", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Xác nhận',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                const keys = await AsyncStorage.getAllKeys();
                                await AsyncStorage.multiRemove(keys);
                                navigation.navigate('Test')
                            } catch (error) {
                                console.log(error);
                            }
                        },
                    },
                ]
            );
        }
        // console.log('[type] :' + data.typelove);

    }

    const gotoProfile = () => {
        if (isChecked == false) {
            Alert.alert(
                'Thông báo',
                'Bạn cần đăng nhập để sử dụng?',
                [
                    { text: "Hủy", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Đăng nhập',
                        style: 'destructive',
                        onPress: async () => {
                            try {
                                navigation.navigate('LoginScreen')
                            } catch (error) {
                                console.log(error);
                            }
                        },
                    },
                ]
            );
        } else {
            navigation.navigate('ProfileScreen')
        }
    }

    return (
        <View style={[styles.container, {
            flexDirection: "column",backgroundColor:'white'
        }]}>
            <ScrollView>
                <View style={{ backgroundColor: "white" }} >
                    <TouchableOpacity onPress={() => { gotoProfile() }}>
                        <View style={styles.userRow}>
                            <View style={styles.userImage}>
                                <Avatar
                                    rounded
                                    size="large"
                                    source={{ uri: img }}
                                />
                            </View>
                            <View>
                                <Text style={[{ fontSize: normalize(14) }, styles.fontFamily]}>{data.user}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ backgroundColor: "white" }} >
                    <Text style={[styles.infoText, styles.fontFamily,{padding:10}]}>Tài khoản</Text>
                    <Custom ckd={0} cl="#009387" ic="shop" tp="material" str="Giỏ hàng" xx='ShoppingCartScreen' ></Custom>
                    <Custom ckd={0} cl="#009387" ic="shop" tp="material" str="Tình trạng đơn hàng" xx='OrderStatus' ></Custom>
                </View>

                <View style={{ backgroundColor: "white" }} >
                    <Text style={[styles.infoText, styles.fontFamily,{padding:10}]}>Thêm</Text>
                    <Custom ckd={1} cl="#009387" ic='car' tp="ionicon" str="Chính sách giao hàng" xx="chinhSachGiaoHang" ></Custom>
                    <Custom ckd={1} cl="#009387" ic='card' tp="ionicon" str="Chính sách thanh toán" xx="chinhSachThanhToan" ></Custom>
                    <Custom ckd={1} cl="#009387" ic='md-information-circle' tp="ionicon" str="Chính sách đổi trả" xx="chinhSachDoiTra" ></Custom>
                    <Custom ckd={1} cl="#009387" ic='md-information-circle' tp="ionicon" str="Chính sách bảo mật" xx="chinhSachBaoMat" ></Custom>
                    <Custom ckd={1} cl="#009387" ic='md-information-circle' tp="ionicon" str="Thông tin cửa hàng" xx="InforApp" ></Custom>
                </View>

                <View style={{ backgroundColor: "white", alignItems: 'center' }} >
                    <TouchableOpacity
                        onPress={() => {
                            updatetypelove()
                        }}
                    >
                        <LinearGradient
                            colors={['#009387', '#00786E']}
                            style={styles.button}
                        >
                            {data.typelove ?
                                <Text style={[styles.btntext, styles.fontFamily]}>Đăng nhập</Text>
                                :
                                <Text style={[styles.btntext, styles.fontFamily]}>Đăng xuất</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
export default SettingScreen
const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#cccccc',
    },
    container: {
        flex: 1,
        padding: 5,
    },
    infoText: {
        fontSize: normalize(13),
        marginLeft: 20,
        color: 'gray',
        fontWeight: '500',
    },
    Iconcontainer: {
        alignItems: 'center',
        borderColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 18,
        marginTop: 10,
        width: 34,
    },
    ListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: normalize(9),
        marginLeft: 50,
        marginTop: 15,
        color: 'black',
        fontWeight: '500',
        justifyContent: 'center'
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: width/30,
        marginTop: 5,
        borderRadius: 4,
        elevation: 3,
        width: width/1.5,


    },
    btntext: {
        fontSize: normalize(13),
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    },
    NotiContainer: {
        width: 280,
    }

})