import React, { useState, useRef, useEffect } from 'react';
import { Picker, Text, View, Image, Dimensions, StyleSheet, useWindowDimensions, StatusBar, FlatList, TouchableOpacity, Platform, PixelRatio } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CustomCallBack from '../CustomCallBack';
const colorBackground = '#009387';
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
import { useNavigation, useRoute } from '@react-navigation/native';
// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const initialLayout = { width: Dimensions.get('window').width };
import { checkAccount$, checkOrder$, dataSelectXacNhan$, dataSelectDaXacNhan$, dataSelectDangGiao$, dataSelectDaGiao$, dataSelectDaHuy$ } from '../redux/selectors';
type customNotiScreen = {
  img: string,
  nameUser: string,
  _id: string,
  type: number,
  createdAt: string,
  tongThanhToan:number
}

const formatDate = (item) => {
  var date = new Date(item.createdAt);
  var d;
  var m;
  var minus;
  var h;

  parseInt(date.getMinutes()) < 10
    ? (minus = "0" + date.getMinutes())
    : (minus = date.getMinutes());
  parseInt(date.getHours()) < 10
    ? (h = "0" + date.getHours())
    : (h = date.getHours());

  parseInt(date.getDate()) < 10
    ? (d = "0" + date.getDate())
    : (d = date.getDate());
  parseInt(date.getMonth()) < 9
    ? (m = "0" + (date.getMonth() + 1))
    : (m = date.getMonth() + 1);

  return (
    <Text
      style={[{
        fontSize: 14,
        color: 'black',
        flex: 0.5,
      }, styles.fontFamily]}>{item
        ? d + "-" + m + "-" + date.getFullYear() : ""}</Text>

  );
};
const Item = ({ item, navigation }: { item: customNotiScreen, navigation: any }) => (
  <TouchableOpacity style={styles.customItem}
    onPress={() => navigation.navigate('DetailOrderStatus', { item: item })}>
    <Image source={require('./images/receipt.png')}
      style={{
        width: 50,
        height: 50,
        marginLeft: 5
      }} ></Image>
    <View
      style={{
        margin: 15,
        flex: 1
      }}>
      <Text
        style={[{
          fontSize: normalize(10),
          fontWeight: 'bold',
          color: 'red',
          flex: 0.3,
        }, styles.fontFamily]}>{item.nameUser}</Text>
      <Text
        style={[{
          fontSize: 14,
          color: 'black',
          flex: 0.5,
        }, styles.fontFamily]}>{item._id}</Text>
      <Text
        style={[{
          fontSize: 14,
          color: 'black',
          flex: 0.5,
        }, styles.fontFamily]}>{formatDate(item)}</Text>
      <Text
        style={[{
          fontSize: 14,
          color: 'black',
          flex: 0.5,
        }, styles.fontFamily]}>Thanh toán: {String(item.tongThanhToan).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
    </View>
  </TouchableOpacity>
);


// const thongbao = Alert.alert(
//     'Thông báo',
//     'Bạn cần đăng nhập để hiện thông báo của bạn',
// );

const OrderStatus = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const Account = useSelector(checkAccount$);
  const dataSelecChoXacNhan = useSelector(dataSelectXacNhan$);
  const dataSelectDaXacNhan = useSelector(dataSelectDaXacNhan$);
  const dataSelectDangGiao = useSelector(dataSelectDangGiao$);
  const dataSelectDaGiao = useSelector(dataSelectDaGiao$);
  const dataSelectDaHuy = useSelector(dataSelectDaHuy$);

  React.useEffect(() => {
    dispatch(actions.getOrderStatus.getOrderStatusRequest({ iduser: Account._id }))

    const willFocusSubscription = navigation.addListener('focus', () => {
      dispatch(actions.getOrderStatus.getOrderStatusRequest({ iduser: Account._id }))
    });

    return willFocusSubscription;
  }, [dispatch])

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Chờ xác nhận', border: 2 },
    { key: 'second', title: 'Đã xác nhận', border: 2 },
    { key: 'third', title: 'Đang giao', border: 2 },
    { key: 'ford', title: 'Đã giao', border: 2 },
    { key: 'fifth', title: 'Đã hủy', border: 0 },
  ]);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F4F5F4' }} >
      {dataSelecChoXacNhan == "" ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: width / 5, height: width / 5,
            marginBottom: 15,

          }}
          source={require('./images/hoaDon.png')}
        />
        <Text style={{ fontSize: 20 }}>Chưa có đơn hàng</Text>
      </View> : <FlatList
        style={{ width: width }}
        data={dataSelecChoXacNhan}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F4F5F4' }} >
      {dataSelectDaXacNhan == "" ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: width / 5, height: width / 5,
            marginBottom: 15,

          }}
          source={require('./images/hoaDon.png')}
        />
        <Text style={{ fontSize: 20 }}>Chưa có đơn hàng</Text>
      </View> : <FlatList
        style={{ width: width }}
        data={dataSelectDaXacNhan}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />}
    </View>
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F4F5F4' }} >
      {dataSelectDangGiao == "" ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: width / 5, height: width / 5,
            marginBottom: 15,

          }}
          source={require('./images/hoaDon.png')}
        />
        <Text style={{ fontSize: 20 }}>Chưa có đơn hàng</Text>
      </View> : <FlatList
        style={{ width: width }}
        data={dataSelectDangGiao}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />}
    </View>
  );
  const FordRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F4F5F4' }} >
      {dataSelectDaGiao == "" ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: width / 5, height: width / 5,
            marginBottom: 15,

          }}
          source={require('./images/hoaDon.png')}
        />
        <Text style={{ fontSize: 20 }}>Chưa có đơn hàng</Text>
      </View> : <FlatList
        style={{ width: width }}
        data={dataSelectDaGiao}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />}
    </View>
  );
  const FifthRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F4F5F4' }} >
      {dataSelectDaHuy == "" ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: width / 5, height: width / 5,
            marginBottom: 15,

          }}
          source={require('./images/hoaDon.png')}
        />
        <Text style={{ fontSize: 20 }}>Chưa có đơn hàng</Text>
      </View> : <FlatList
        style={{ width: width }}
        data={dataSelectDaHuy}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    ford: FordRoute,
    fifth: FifthRoute,
  });
  const renderItem = ({ item }: { item: customNotiScreen }) => (
    <Item
      item={item}
      navigation={navigation}
    />
  )


  return (
    <><CustomCallBack label="Tình trạng đơn hàng" color={colorBackground} />
      <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <View style={{
                borderRightColor: "silver",
                borderRightWidth: route.border,
                width: width / 5,
                height: width / 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: normalize(9)
                }}>
                  {route.title}
                </Text>
              </View>

            )}
            style={{ backgroundColor: 'white' }}
          />
        )}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      /></>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  }, view: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewNoti: {
    alignItems: 'center',
    width: width,
    height: height / 16,
    justifyContent: 'center',
    backgroundColor: "#FFA100",
  },
  textNoti: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
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
export default OrderStatus;