import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, SafeAreaView, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert, Platform, PixelRatio } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomCallBack from '../CustomCallBack'
import InputSpinner from 'react-native-input-spinner';
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import { cartData$, cartTotals$, checkAccount$, isChecking$, } from '../redux/selectors';
import Toast from 'react-native-tiny-toast'
import { LinearGradient } from 'expo-linear-gradient'

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
type customshoppingCart = {
    _id: Object,
    img: string,
    tenSanPham: string,
    tongGiaBan: string,
    date: number,
    giaSanPham: number,
    soLuong: number,
    typeProduct: string
}
const sizeText = width * 0.046
const sizeTypeText = width * 0.041
const sizeTextPrice = width * 0.04

//  Chỉnh heght dòng 28 - 29 để fix lỗi giao diện
const Item = ({ item, del, setCount, setValueCount }: { item: customshoppingCart, del: any, setCount: any, setValueCount: (value: string) => void }) => (
    <View >
        <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: 'white', width: width, }}>
            <Image source={{ uri: item.img }} style={{ width: width / 5, height: width / 5, margin: 20, marginLeft: 20 }} ></Image>
            <View style={{ margin: width / 35, width: width / 1.75 }}>
                <Text style={[{ fontSize: normalize(14), color: 'black', }, styles.fontFamily]}>{item.tenSanPham}</Text>
                <Text style={[{ fontSize: normalize(14), color: 'black', }, styles.fontFamily]}>Loại: {item.typeProduct}</Text>
                <View style={{ flexDirection: 'row', marginTop: height / 100, width: width / 2.5, alignItems: 'center',  }}>

                    <InputSpinner
                        max={10}
                        min={0}
                        step={1}
                        value={item.soLuong}
                        buttonStyle={styles.styleCal}
                        onMin={() => Alert.alert(
                            "Nhắc nhở",
                            "Bạn muốn xóa sản phẩm này?",
                            [
                                {
                                    text: "Hủy",
                                    onPress: () => {
                                        setCount({ item: item, num: item.soLuong })
                                    },
                                    style: "cancel"
                                },
                                { text: "Xóa", onPress: () => del(item) }
                            ]
                        )}
                        onChange={(num) => setCount({ item: item, num: num })} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: width / 40 }}>
                    <Text style={[{ fontSize: normalize(13), width: width / 4.5 }, styles.fontFamily]}>Đơn giá:</Text>
                    <Text style={[{ fontSize: normalize(13), color: 'red', }, styles.fontFamily]}>{String(item.giaSanPham).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: width / 50 }}>
                    <Text style={[{ fontSize: normalize(13), width: width / 4.5 }, styles.fontFamily]}>Tổng giá:</Text>
                    <Text style={[{ fontSize: normalize(13), color: 'red', }, styles.fontFamily]}>{String(item.tongGiaBan).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    del(item)
                }}
                style={{ margin: width / 50, right: width / 35, position: 'relative' }} >
                <Icon name='close' size={20} />
            </TouchableOpacity>
        </View>
    </View >
);



const shoppingCart: React.FC<customshoppingCart> = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const cartData = useSelector(cartData$)
    const cartTotals = useSelector(cartTotals$)
// console.log('chán',cartData);

    const [data, setData] = React.useState([])
    const [tongChiPhi, setTongChiPhi] = React.useState("")
    const [count, setCount] = React.useState<String>("")
    const [isCheckedDel, setIsCheckedDel] = React.useState(false)



    const _setCount = (e) => {
        dispatch(action.updateCountCart.updateCountCartRequest({
            _id: e.item._id,
            giaSanPham: e.item.giaSanPham,
            soLuong: e.num
        }))
    }

    const toast = () => Toast.showLoading("Đang xóa sản phẩm!")
    const _delete = (item) => {
        toast()
        setIsCheckedDel(true)
        dispatch(action.deleteCart.deleteCartRequest({
            _id: item._id
        }))
    }

    React.useEffect(() => {
        const format = String(cartTotals).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        if (isCheckedDel == true) {
            setTimeout(() => {
                setIsCheckedDel(false)
                Toast.hide(toast)
                setData(cartData)
            }, 1000);
        } else {
            setData(cartData)
        }
        setTongChiPhi(format)
    }, [dispatch, cartData, count])

    const renderItem = ({ item }: { item: customshoppingCart }) => (
        <Item
            item={item}
            del={_delete}
            setCount={_setCount}
            setValueCount={setCount}
        />
    )
    const _sendToPay = () => {
        cartData.length != 0 ?
            navigation.navigate('PayScreen', {
                data: data,
                tongChiPhi: cartTotals,
                checked: 0
            }) : null
    }
    return (
        <View style={styles.container}>
            <CustomCallBack color="#009387" label="Giỏ hàng" />
            <View style={{ flex: 4 }} >
                <FlatList
                    style={{ width: width }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
            <View style={{ flex: 1.5, backgroundColor: "white", flexDirection: 'column',justifyContent:'center',alignItems:'center' }} >
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{  flexDirection: 'row'}}>
                        <Text style={[styles.textStyle, styles.fontFamily]}>Mã khuyến mãi:   </Text>
                        <TextInput style={styles.inputStyle}></TextInput>
                        {/* <Text style={[styles.textStyle, styles.fontFamily]}>Phí vận chuyển:</Text>
                        <Text style={[styles.textStyle, styles.fontFamily]}>Tạm tính:</Text> */}
                    </View>
                    <View style={{  flexDirection: 'row', }}>
                    <Text style={[styles.textStyle, styles.fontFamily]}>Phí vận chuyển:   </Text>
                        <Text style={[styles.priceStyle, styles.fontFamily]}>NV gọi xác nhận</Text>
                        {/* <Text style={[styles.priceStyle, styles.fontFamily]}>{tongChiPhi} đ</Text> */}
                    </View>
                    <View style={{  flexDirection: 'row', }}>
                    <Text style={[styles.textStyle, styles.fontFamily]}>Tạm tính:           </Text>
                        <Text style={[styles.priceStyle, styles.fontFamily]}>{tongChiPhi} đ</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => _sendToPay()} >
                        <LinearGradient
                            colors={['#009387', '#00786E']}
                            style={styles.btnBuy}
                        >
                            <Text style={[{ color: 'white', fontSize: normalize(13) }, styles.fontFamily]}>Thanh toán</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    textStyle: {
        marginTop: width / 40,
        marginLeft: width / 40,
        fontSize: normalize(14),

        color: '#9b9b9b'
    },
    priceStyle: {
        marginTop: width / 40,
        fontSize: normalize(14),
        color: 'red'

    },
    inputStyle: {
        marginTop: width / 70,
        backgroundColor: '#ddd',
        width: width / 3,
        height: height / 29,
        borderWidth: 1,
        color: 'black',
        borderRadius: 5
    },
    styleCal: {
        borderWidth: 1,
        borderColor: '#ABABAB',
        width: width / 15,
        height: height / 30,
        borderRadius: 5,
        backgroundColor: '#D5D6D6',
    },
    btnBuy: {

        width: width / 1.5,
        height: height / 15,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
})

export default shoppingCart