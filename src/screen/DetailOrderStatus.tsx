
import React, { useState, useRef, useEffect } from 'react';
import { Picker, Text, View, Image, Dimensions, StyleSheet, useWindowDimensions, StatusBar, FlatList, TouchableOpacity, SafeAreaView, ScrollView,Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CustomCallBack from '../CustomCallBack';
const colorBackground = '#009387';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get("window")
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Rating, AirbnbRating, Card } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const initialLayout = { width: Dimensions.get('window').width };
type customNotiScreen = {
  img: string,
  tenSanPham: string,
  _id: string,
  type: number,
  typeProduct: string,
  soLuong: number,
  tongGiaBan: number,
  flashSale: number,
  price: number,
  priceSale: number,
  giaSanPham: number
}
const sizeText = width * 0.046
const sizeTypeText = width * 0.038
const Item = ({ item }: { item: customNotiScreen }) => (
  <View style={{
    flex: 1, flexDirection: 'row', padding: 5, backgroundColor: 'white', borderBottomWidth: 6, borderColor: '#F4F5F4', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }}>
    <View style={{ flex: 0.5, flexDirection: 'column' }}>
      <Image source={{ uri: item.img }} style={{ width: width / 5, height: width / 5, margin: 20, marginLeft: 20 }} ></Image>
    </View>
    <View style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
      <Text style={[{ fontSize: sizeText, color: 'black', }, styles.fontFamily]}>{item.tenSanPham}</Text>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[{ fontSize: sizeTypeText, color: '#757575', }, styles.fontFamily]}>{item.typeProduct}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={[{ fontSize: sizeText, color: 'black' }, styles.fontFamily]}>x{item.soLuong}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>

        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {
            item.flashSale == 1 ?
              <><Text style={[{ fontSize: sizeText, color: 'black', textDecorationLine: "line-through", marginRight: 10 }, styles.fontFamily]}>{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                <Text style={[{ fontSize: sizeText, color: 'red' }, styles.fontFamily]}>{String(item.priceSale).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text></> :
              <Text style={[{ fontSize: sizeText, color: 'red' }, styles.fontFamily]}>{String(item.giaSanPham).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
          }
        </View>
      </View>
    </View>
  </View>
);
const ProductScreen = (props: any) => {
  const dispatch = useDispatch();
  const TypeHoaDon = props.route.params.item.type;
  const navigation = useNavigation()
  const [phone, setPhone] = React.useState("");
  // React.useEffect(() => {
  //   dispatch(actions.getDeleteOderUser.getDeleteOderUserRequest({ idOrder: props.route.params.item._id,typeOrder:props.route.params.item.type}))

  // }, [dispatch])
  const deleteOrder = () => {
    Alert.alert(
      'Thông báo',
      'Bạn chắc chắn muốn hủy đơn hàng này ?',
      [
          { text: "Hủy", style: 'cancel', onPress: () => { } },
          {
              text: 'Xác nhận',
              style: 'destructive',
              onPress: async () => {
                  try {
                    dispatch(actions.getDeleteOderUser.getDeleteOderUserRequest({ _id: props.route.params.item._id, typeOrder: '0' }))
                    navigation.navigate('OrderStatus')
                  } catch (error) {
                      console.log(error);
                  }
              },
          },
      ]
  );
  }
  // console.log('abc',props.route.params.item);
  const renderItem = ({ item }: { item: customNotiScreen }) => (
    <Item
      item={item}
    />
  )
  const [data, setData] = useState<any>({
    trangThaiChoXacNhan: false,
    trangThaiHuy: false,
    trangthaiDagiao: false,
    trangthaiDanggiao: false,
    trangthaiDaXacNhan: false
  });
  useEffect(() => {
    if (TypeHoaDon == "1") {
      setData({
        ...data,
        trangThaiChoXacNhan: true,
        trangThaiHuy: false,
        trangthaiDagiao: false,
        trangthaiDanggiao: false,
        trangthaiDaXacNhan: false
      })
    } else if (TypeHoaDon == "2") {
      setData({
        ...data,
        trangThaiChoXacNhan: false,
        trangThaiHuy: false,
        trangthaiDagiao: false,
        trangthaiDanggiao: false,
        trangthaiDaXacNhan: true
      })
    } else if (TypeHoaDon == "3") {
      setData({
        ...data,
        trangThaiChoXacNhan: false,
        trangThaiHuy: false,
        trangthaiDagiao: false,
        trangthaiDanggiao: true,
        trangthaiDaXacNhan: false
      })
    } else if (TypeHoaDon == "4") {
      setData({
        ...data,
        trangThaiChoXacNhan: false,
        trangThaiHuy: false,
        trangthaiDagiao: true,
        trangthaiDanggiao: false,
        trangthaiDaXacNhan: false
      })
    } else if (TypeHoaDon == "0") {
      setData({
        ...data,
        trangThaiChoXacNhan: false,
        trangThaiHuy: true,
        trangthaiDagiao: false,
        trangthaiDanggiao: false,
        trangthaiDaXacNhan: false
      })
    } else {
      setData({
        ...data,
        trangThaiChoXacNhan: false,
        trangThaiHuy: false,
        trangthaiDagiao: false,
        trangthaiDanggiao: false,
        trangthaiDaXacNhan: false
      })
    }
    var str = props.route.params.item.phoneNumber;
    const str_a = str.toString();
    var myArr = Number(str_a.slice(2, 11));
    setPhone(myArr)
  }, [TypeHoaDon])
  var ship = parseInt(props.route.params.item.ship);
  var totails = parseInt(props.route.params.item.tongThanhToan);
  const tongthanhtoan = ship+totails;
  // console.log('ac',tongthanhtoan);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomCallBack label="Thông tin đơn hàng" color={colorBackground} />
      <ScrollView>
        <View style={[styles.container, {
          flexDirection: "column"
        }]}>
          {data.trangThaiChoXacNhan ?
            <View style={{ flex: 1 }} >
              <View style={{ flex: 1, padding: 20, backgroundColor: '#FFF739' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Đơn hàng chờ xác nhận </Text>
              </View>
            </View> : null}
          {data.trangthaiDaXacNhan ?
            <View style={{ flex: 1 }} >
              <View style={{ flex: 1, padding: 20, backgroundColor: '#05F787' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Đơn hàng đã xác nhận </Text>
              </View>
            </View> : null}
          {data.trangthaiDanggiao ?
            <View style={{ flex: 1 }} >
              <View style={{ flex: 1, padding: 20, backgroundColor: '#FAAD48' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Đơn hàng đang giao </Text>
              </View>
            </View> : null}
          {data.trangthaiDagiao ?
            <View style={{ flex: 1 }} >
              <View style={{ flex: 1, padding: 20, backgroundColor: '#D7F6F0' }}>
                <Text style={{ color: 'black', fontSize: 25 }}>Đơn hàng đã giao </Text>
              </View>
            </View> : null}
          {data.trangThaiHuy ?
            <View style={{ flex: 1 }} >
              <View style={{ flex: 1, padding: 20, backgroundColor: '#FF4B2C' }}>
                <Text style={{ color: 'white', fontSize: 25 }}>Đơn hàng đã hủy </Text>
              </View>
            </View> : null}
          <View style={{ flex: 1, backgroundColor: "white" }} >
            <View style={{ flex: 1, padding: 10, flexDirection: 'row' }}>
              <EvilIcons
                name='location'
                color="black"
                size={40}
                style={{ marginTop: 2 }}>

              </EvilIcons>
              <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>Địa chỉ nhận hàng</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ marginLeft: 50, paddingBottom: 10 }}>
                <Text style={{ color: 'black', fontSize: 22 }}>{props.route.params.item.nameUser}</Text>
                <Text style={{ color: 'black', fontSize: 22 }}>(+84) {phone}</Text>
                <Text style={{ color: 'black', fontSize: 22 }}>{props.route.params.item.specificaddress}</Text>
                <Text style={{ color: 'black', fontSize: 22 }}>{props.route.params.item.address}</Text>
              </View>

            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }} >
            <FlatList
              style={{ width: width }}
              data={props.route.params.item.product}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
            />
            <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
              <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: sizeText, }}>Tiền ship:</Text>
                <Text style={{ fontSize: sizeText, marginTop: 15, fontWeight: 'bold' }}>Thành tiền:</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingTop: 10 }}>
                <Text style={{ fontSize: sizeText, }}>{String(props.route.params.item.ship).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
                <Text style={{ fontSize: sizeText, marginTop: 15, fontWeight: 'bold' }}>{String(tongthanhtoan).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
              </View>
            </View>
          </View>
          {data.trangThaiChoXacNhan ?
            <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }} >
              <TouchableOpacity style={{ flex: 1, padding: 20, backgroundColor: '#FF4B2C', justifyContent: 'center', alignItems: 'center' }} onPress={() =>deleteOrder()}>
                <Text style={{ color: 'white', fontSize: 25 }}>Hủy dơn hàng</Text>
              </TouchableOpacity>
            </View> : null}
            {data.trangthaiDaXacNhan ?
            <View style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }} >
              <TouchableOpacity style={{ flex: 1, padding: 20, backgroundColor: '#FF4B2C', justifyContent: 'center', alignItems: 'center' }} onPress={() =>deleteOrder()}>
                <Text style={{ color: 'white', fontSize: 25 }}>Hủy dơn hàng</Text>
              </TouchableOpacity>
            </View> : null}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProductScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  MapView: {
    flex: 1,
  },
  bottomWidget: {
    position: "absolute",
    bottom: 0,
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: "#fff",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    zIndex: 5,
  },
  whereContainer: {
    margin: "2.5%",
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2.5%",
    paddingVertical: 8,
    marginBottom: 20,
  },
  whereTo: {
    fontSize: 22.5,
    color: "#000",
  },
  customItem: {
    borderColor: '#ddd',
    borderWidth: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    minHeight: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  fontFamily: {
    fontFamily: 'Tahoma_Regular_font'
  }
}); 