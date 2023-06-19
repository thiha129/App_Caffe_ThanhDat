import React, { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, Dimensions, Image, Alert, StatusBar, AsyncStorage, Platform, Button, RefreshControl, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated'
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { notifisState$, notifisStateID$, checkUsername$, id_Account$, alluser$,getDetailUser$ } from '../redux/selectors';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { BackgroundImage } from 'react-native-elements/dist/config'
import { isLoading } from 'expo-font'
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
const colorBackground = '#009387';

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

type customNotiScreen = {
    img: string,
    title: string,
    updateAt: string,
    content: string
}

const Item = ({ item }: { item: customNotiScreen }) => (
    <TouchableOpacity style={styles.customItem}>
        <Image source={require('./images/notifiIMG.png')}
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
                    fontSize: height / 60,
                    fontWeight: 'bold',
                    color: 'red',
                    flex: 0.3,
                }, styles.fontFamily]}>{item.title}</Text>
            <Text
                style={[{
                    fontSize: 14,
                    color: 'black',
                    flex: 0.5,
                }, styles.fontFamily]}>{item.content}</Text>
            <Text
                style={[{
                    fontSize: 14,
                    color: '#9b9b9b',
                    flex: 0.2
                }, styles.fontFamily]}>{moment(item.updateAt).format('DD-MM-YYYY')}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item }: { item: customNotiScreen }) => (
    <Item
        item={item}
    />
)
// const thongbao = Alert.alert(
//     'Thông báo',
//     'Bạn cần đăng nhập để hiện thông báo của bạn',
// );
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const NotiScreen: React.FC<customNotiScreen> = ({ img, title, updateAt }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const abcx = useSelector(checkUsername$);
    const notifiData = useSelector(notifisState$);
    const notifiDataI = useSelector(notifisStateID$);
    const detailUser = useSelector(id_Account$);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() =>  {a(), setRefreshing(false)});
    }, []);
    React.useEffect(() => {
        a();
        if (abcx == '0') {
            setData({
                ...data,
                trangThai: true,
            })
            console.log('trang thái', data.trangThai);
        } else {
            setData({
                ...data,
                trangThai: false,
            })
            console.log('trang thái', data.trangThai);
        }
    }, [notifiDataI, dispatch])
    const [data, setData] = useState<any>({
        trangThai: true,
        idrong: '',
    });
    const a = async () => {
        try {
            const phone = await AsyncStorage.getItem('PhoneNumber');
            const pass = await AsyncStorage.getItem('PassWord');
            if (phone !== null && pass !== null) {
                console.log(phone);
                dispatch(actions.getAccountsUserName.getAccountsUserNameRequest({ phonenumber: phone }));
                setData({
                    ...data,
                    trangThai: false
                })
                dispatch(actions.getNotifis.getNotifiRequest(detailUser))
            } else {
                setData({
                    ...data,
                    trangThai: true

                })
            }
        } catch (error) {
            // Error retrieving data
            console.log('[Error] ' + error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.view}>
                <View style={styles.viewNoti}>
                    <Text style={styles.textNoti}>Thông báo </Text>
                </View>
            </View>
            {data.trangThai ?
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',padding:10 }}>
                        <Image
                            style={{
                                height: 70,
                                marginBottom: 15,
                                width: 70,
                            }}
                            source={require('./images/bell.png')}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: width/25 }}>Chưa có thông báo</Text>
                        <Text style={{fontSize: width/40}}>Bạn vui lòng đăng nhập để nhận thông báo mới nhất của chúng tôi.</Text>

                        {/* <CustomButtonLoginScreen label={"Đăng nhập"} colorboder={"#fff"} onPress={() => navigation.navigate('LoginScreen')} colortext={"#fff"} numbermarginTop={10}
                        firstcolor={'#009387'} secondcolor={'#00786E'}
                        >

                        </CustomButtonLoginScreen> */}

                    </View>
                </SafeAreaView>
                :
                <>
                {notifiData == "" ?   <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{
                                width: width / 5.5, height: width / 4.5,
                                marginBottom: 15
                            }}
                            source={require('./images/bell.png')}
                        />
                        <Text style={{  fontSize: 20 }}>HIện tại chưa có thông báo mới</Text>
                    </View>
                </SafeAreaView> : <ScrollView
                  
                  refreshControl={<RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh} />}
              >
                  <FlatList
                      style={{ margin: 5 }}
                      data={notifiData}
                      renderItem={renderItem}
                      keyExtractor={(item) => item._id} />
              </ScrollView> }
               
                </>}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
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
        backgroundColor: "#009387",
    },
    textNoti: {
        fontSize: width/30,
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
        alignItems: 'center'
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }


})

export default NotiScreen;