import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity, Picker, Platform, PixelRatio, AsyncStorage } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Rating, AirbnbRating, Card } from 'react-native-elements';
import CustomHeader from '../CustomHeader'
import { Badge, Icon } from 'react-native-elements'
import { Chip } from 'react-native-paper';

import IconDetail from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomCallBack from '../CustomCallBack'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
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
import * as actions from '../redux/actions';
import { cartData$, cartOrder$, checkAccount$, dataAccount$ ,id_Account$} from '../redux/selectors';
import Toast from 'react-native-tiny-toast'
import Swiper from 'react-native-swiper';

const ProductScreen = (props: any) => {

    const [payInput, setPayInput] = useState<string>("1");
    const [tongGia, setTongGia] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const navigation = useNavigation();
    const [data, setData] = useState<any>({
        typelove: true,
        country: 'sms',
        cities: [],
        type: props.route.params.item.type
    });
    // console.log('type', props.route.params.item.type);

    const x = useSelector(id_Account$);
    const cartData = useSelector(cartOrder$);
    const dispatch = useDispatch()
    let checkAccount = undefined
    try {
        checkAccount = useSelector(checkAccount$);
    } catch (error) {
    }
    React.useEffect(() => {
        console.log('[cartDAta.trangThai]', cartData.trangThai);
        if (cartData.trangThai == 1 && isLoading == false) {
            const toast = Toast.showSuccess("Thêm thành công!")
            setTimeout(() => {
                Toast.hide(toast)
                setIsLoading(!isLoading)
                navigation.goBack()
            }, 500)
        }
        // checkAccount == undefined ? setIsChecked(!isChecked) : setIsChecked(isChecked)
        a()
    }, [dispatch, props, cartData])
    const a = async () => {
        try {
            const phone = await AsyncStorage.getItem('PhoneNumber');
            const pass = await AsyncStorage.getItem('PassWord');
            if (phone !== null && pass !== null) {
                // console.log(phone);
                setIsChecked(true)
            } else {
                setIsChecked(false)
            }
        } catch (error) {
            console.log('[Error] ' + error);
        }
    };
    const _onClickCount = (e: any) => {
        e == 0 && payInput != "1" ?
            setPayInput(String(parseInt(payInput) - 1)) : null
        e == 1 ?
            setPayInput(String(parseInt(payInput) + 1)) : null
    }
    const addCart = () => {

        if (isChecked == true) {
            props.route.params.item.flashSale == 1 ?
                dispatch(actions.getAddCart.getAddCartRequest({ id_Account: x, tenSanPham: props.route.params.item.name, _id: props.route.params.item._id, giaSanPham: props.route.params.item.priceSale, soLuong: parseInt(payInput), tongGiaBan: props.route.params.item.priceSale * parseInt(payInput), img: props.route.params.item.img[0].image, typeProduct: data.type, flashSale: props.route.params.item.flashSale, price: props.route.params.item.price, priceSale: props.route.params.item.priceSale }))
                :
                dispatch(actions.getAddCart.getAddCartRequest({ id_Account: x, tenSanPham: props.route.params.item.name, _id: props.route.params.item._id, giaSanPham: props.route.params.item.price, soLuong: parseInt(payInput), tongGiaBan: props.route.params.item.price * parseInt(payInput), img: props.route.params.item.img[0].image, typeProduct: data.type, flashSale: props.route.params.item.flashSale, price: props.route.params.item.price, priceSale: props.route.params.item.priceSale }))
        } else {
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
        }
        setIsLoading(!isLoading)
    }

    const buyNow = () => {
        if (isChecked) {
            dispatch(actions.getAddCart.getAddCartRequest({ id_Account: x, tenSanPham: props.route.params.item.name, _id: props.route.params.item._id, giaSanPham: props.route.params.item.price, soLuong: parseInt(payInput), tongGiaBan: props.route.params.item.priceSale * parseInt(payInput), img: props.route.params.item.img[0].image, typeProduct: data.type, flashSale: props.route.params.item.flashSale, price: props.route.params.item.price, priceSale: props.route.params.item.priceSale }))
            navigation.navigate("ShoppingCartScreen")
        } else {
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
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <CustomCallBack label="Chi tiết sản phẩm" color="#009387" />
            <ScrollView>
                <Card>
                    {/* <Card.Image source={{ uri: props.route.params.item.img[1].image }} style={{ height: height / 3, }} /> */}
                    <View style={{ height: height / 3, }}  >
                        <Swiper
                            showsButtons={true}
                            autoplay
                            loop
                            dotColor="#ddd"
                            activeDotColor="#fff"
                            buttonWrapperStyle={{ backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}
                            nextButton={
                                <Icon type="ionicons" name="arrow-forward-ios" color="white"></Icon>
                            }
                            prevButton={
                                <Icon type="ionicons" name="arrow-back-ios" color="white"></Icon>
                            }
                        >
                            {props.route.params.item.img.map((imageProduct, index) => (
                                <View style={styles.slide} key={index}>
                                    <Image
                                        source={{
                                            uri: imageProduct.image
                                        }}
                                        resizeMode="cover"
                                        style={styles.sliderImage}
                                    />
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: height / 120, marginBottom: height / 50 }}>
                        <Text style={[{ fontSize: normalize(18), marginTop: 10 }, styles.fontFamily]}>{props.route.params.item.name}</Text>
                    </View>
                    {
                        props.route.params.item.flashSale == 1 ?
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>Giá gốc</Text>
                                    <Text style={[styles.stylePrice, styles.fontFamily, { textDecorationLine: "line-through" }]}>{String(props.route.params.item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                                </View>
                                <View style={{ marginLeft: width / 10 }}>
                                    <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>Giá sale</Text>
                                    <Text style={[styles.stylePrice, styles.fontFamily]}>{String(props.route.params.item.priceSale).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                                </View>
                            </View> :
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>Giá sản phẩm:   </Text>
                                <Text style={[styles.stylePrice, styles.fontFamily]}>{String(props.route.params.item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                            </View>
                    }
                </Card>
                <Card >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>Số lượng</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>Loại</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' ,marginTop:15}}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    width: width / 15,
                                    height: width / 15,
                                    backgroundColor: "#DEDEDE",
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => _onClickCount(0)}>
                                <IconDetail name="minus" size={15} />
                            </TouchableOpacity>
                            <TextInput style={[{
                                width: width / 6,
                                borderWidth: 1,
                                marginHorizontal: width / 30,
                                borderRadius: 5,
                                color: "black",
                                height: height / 30,
                                fontSize: normalize(10),
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }, styles.fontFamily]} keyboardType="numeric" value={payInput} onChangeText={(e: any) => setPayInput(e)} />
                            <TouchableOpacity style={{
                                width: width / 15,
                                height: width / 15,
                                backgroundColor: "#DEDEDE",
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                                onPress={() => _onClickCount(1)}>

                                <IconDetail name="plus" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[styles.fontFamily, { fontSize: normalize(16) }]}>{ data.type}</Text>
                          
                                {/* <Picker
                                    selectedValue={data.type}
                                    style={{ width: width/2,height:width/20}}
                                    onValueChange={(itemValue, itemIndex) => setData({
                                        ...data,
                                        type: itemValue,
                                    })}
                                >
                                    <Picker.Item label="Bịch - 0.5Kg" value="Bịch - 0.5Kg" />
                                    <Picker.Item label="Bịch - 1Kg" value="Bịch - 1Kg" />
                                    <Picker.Item label="Hạt - 0.5Kg" value="Hạt - 0.5Kg" />
                                    <Picker.Item label="Hạt - 1Kg" value="Hạt - 1Kg" />
                                </Picker> */}
                           
                        </View>





                        {/* <View style={{ flex: 1, flexDirection: 'column', marginLeft: width / 7, }}>
                            <Text style={[styles.fontFamily, { fontSize: normalize(11) }]}>Loại</Text>
                            <View style={{ borderBottomWidth: 1, borderColor: '#000' }}>
                                <Picker
                                    selectedValue={data.type}
                                  
                                    onValueChange={(itemValue, itemIndex) => setData({
                                        ...data,
                                        type: itemValue,
                                    })}
                                >
                                    <Picker.Item label="Bịch - 0.5Kg" value="Bịch - 0.5Kg" />
                                    <Picker.Item label="Bịch - 1Kg" value="Bịch - 1Kg" />
                                    <Picker.Item label="Hạt - 0.5Kg" value="Hạt - 0.5Kg" />
                                    <Picker.Item label="Hạt - 1Kg" value="Hạt - 1Kg" />
                                </Picker>
                            </View>
                        </View> */}
                    </View>







                </Card>

                <Card>
                    <View>
                        <Text style={[{ fontSize: normalize(16), }, styles.fontFamily]}>Chi tiết sản phẩm</Text>
                        <Text style={[{ fontSize: normalize(14) }, styles.fontFamily]}>    {props.route.params.item.details}</Text>
                    </View>
                </Card>
            </ScrollView>
            <View
                style={{
                    flexDirection: "row",

                }}>
                <TouchableOpacity style={{ width: width / 2, height: height / 13, alignItems: "center", justifyContent: "center", backgroundColor: "#e3a27c" }}
                    onPress={() => addCart()}>
                    <Text style={[styles.styleBuyText, styles.fontFamily]}>Thêm giỏ hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => buyNow()} style={{ width: width / 2, height: height / 13, alignItems: "center", justifyContent: "center", backgroundColor: "#10E3F1" }}>
                    <Text style={[styles.styleBuyText, styles.fontFamily]}>Mua ngay</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
export default ProductScreen;

const styles = StyleSheet.create({
    stylePrice: {
        color: 'tomato',
        fontSize: normalize(16),
        fontWeight: 'bold'
    },
    styleBuyText: {
        fontSize: normalize(15),

    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    },
    slide: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    Colors: {
        color: '#000'
    }
});