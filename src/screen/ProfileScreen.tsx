import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, View, StyleSheet, Platform, ImageBackground, Image, TouchableOpacity, Button, Alert, StatusBar, PixelRatio } from 'react-native';
// yarn add react - native - elements
import { Card, Text, Icon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const colorBackground = '#009387';
import axios from "axios";
// redux

import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
const URL = "http://localhost:3000";
import { checkAccount$, checkUsername$, dataAccount$ ,getDetailUser$ } from '../redux/selectors';
import { LinearGradient } from 'expo-linear-gradient';
import CustomCallBack from '../CustomCallBack';
function VirtualizedView(props: any) {
    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={(_props: string) => 'C'}
            listKey={(_index: string) => 'B'}
            renderItem={null}
            ListHeaderComponent={() => (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        />
    );
}
type Profile = {
    id?: string;
    Name?: string,
    Address?: string,
    Telephone?: number,
    Email?: string,
    image?: string
}
const Data: Profile[] = [
    {
        id: "1",
        Name: "Michael Bay",
        Address: "Buôn Ma Thuột",
        Telephone: 113,
        Email: "dondepgia2k1@gmail.com",
        image: "https://i.imgur.com/GfkNpVG.jpg"
    }
]
const ProfileScreen: React.FC<Profile> = ({ Name, Address, Telephone, Email, image }) => {
    const navigation = useNavigation();

    const [img, setImage] = useState("");
    const dispatch = useDispatch();
    const defaultCodeCountry = "+"
    const datauserone = useSelector(dataAccount$);
    const detailUser = useSelector(checkAccount$);
useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => { 
        dispatch(actions.getAccountsUserName.getAccountsUserNameRequest({ phonenumber: detailUser.phoneNumber }));
     });

    return unsubscribe;
}, [navigation,detailUser])
    
    const checkAccount = useSelector(checkAccount$);
    var str = detailUser.phoneNumber;
    const str_a = str.toString();
    var myArr = Number(str_a.slice(2, 11));
    var PhoneString = defaultCodeCountry.concat(str_a)
    // console.log('[CUT]', myArr);
    const ngaySinh = detailUser.birthDay
    let tempDate = new Date(ngaySinh);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    // console.log("ngày sinh", fDate);
    const [data, setData] = useState<any>({
        alldataimg: '',
        type: true
    });
    React.useEffect(() => {
        setImage(detailUser.avatar)
        if (img == null) {
            setData({
                ...data,
                type: true
            })
        } else {
            setData({
                ...data,
                type: false
            })
        }
    }, [img]);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //     });
    //     // setData({
    //     //     ...data,
    //     //     alldataimg:result
    //     // })
    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };
    const sendImgtoSv = () => {
        // console.log('[I.M.G]',img);
        try {
            const formData = new FormData();
            formData.append('file', {
                name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                uri: img,
                type: 'image/jpg',
            }, 'file');
            console.log('[FORMDATA]', formData);

            axios.post(`${URL}/file/upload`, formData);

        } catch (error) {
            console.log(error.message);
        }
    }
    const changePassword = () => {
        Alert.alert(
            'Thông báo',
            'Bạn muốn đổi mật khẩu ?',
            [
                { text: "Hủy", style: 'cancel', onPress: () => { } },
                {
                    text: 'Xác nhận',
                    style: 'destructive',
                    onPress: async () => {
                        //   console.log('sdt' ,detailUser.phoneNumber);
                        dispatch(actions.getForgetPassword.getForgetPasswordRequest({ phonenumber: detailUser.phoneNumber, channel: 'sms' }));
                        navigation.navigate('ForgetPassword_OtpScreen', { Number: detailUser.phoneNumber });
                    },
                },
            ]
        );
    }
    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <CustomCallBack color="#009387" label="Trang cá nhân" />
            <VirtualizedView
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={[{}]} >
                    <ImageBackground style={styles.headerBackgroundImage} blurRadius={10}
                        source={{ uri: 'https://i.imgur.com/rXVcgTZ.jpg' }}>
                        <View style={styles.headerColumn}>
                            <TouchableOpacity>
                                {data.type ?
                                    <Image
                                        style={styles.userImage}
                                        source={require('./images/avatauser.png')}
                                    /> :
                                    <Image source={{ uri: img }} style={styles.userImage} />
                                }
                            </TouchableOpacity>
                            <Text style={[styles.userNameText, styles.fontFamily]}>{detailUser.nameUser}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }} >
                <VirtualizedView>
                    <FlatList contentContainerStyle={{
                        paddingLeft: 30,
                        paddingTop: 30,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.32,
                        shadowRadius: 5.46,
                        elevation: 9,
                    }}
                        data={Data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={(item: any) => {
                            return (
                                <View style={{
                                    shadowOffset: {
                                        width: 0,
                                        height: 9,
                                    },
                                    shadowOpacity: 0.48,
                                    shadowRadius: 11.95,
                                    elevation: 18,
                                }}>
                                    <TouchableOpacity >
                                        <View style={[styles.Telcontainer]}>
                                            <View style={styles.iconRow}>
                                                <Icon
                                                    name="call"
                                                    underlayColor="transparent"
                                                    iconStyle={styles.telIcon}
                                                />
                                            </View>
                                            <View style={styles.telRow}>
                                                <View style={styles.telNumberColumn}>
                                                    <Text style={[styles.telNumberText, styles.fontFamily]}>(+84) {myArr}</Text>
                                                </View>
                                                <View style={styles.telNameColumn}>
                                                    <Text style={[styles.telNameText, styles.fontFamily]}>Mobile</Text>
                                                </View>
                                            </View>
                                            <View style={styles.smsRow}>
                                                <Icon
                                                    name="textsms"
                                                    underlayColor="transparent"
                                                    iconStyle={styles.smsIcon}
                                                />
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                        />
                        </VirtualizedView>
                </View>
                <View style={{ flex: 1, backgroundColor: "white", flexDirection: 'row', justifyContent: 'center', }} >
                <VirtualizedView>
                    <FlatList
                        contentContainerStyle={{
                            paddingLeft: 30,
                            paddingTop: 30,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,
                            elevation: 9,
                        }}
                        data={Data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={(item: any) => {
                            return (
                                <TouchableOpacity>
                                    <View style={[styles.EmailContainer]}>
                                        <View style={styles.iconRow}>
                                            <FontAwesome
                                                name="birthday-cake"

                                                style={[styles.emailIcon, { marginLeft: 30 }]}

                                            />
                                        </View>
                                        <View style={styles.emailRow}>
                                            <View style={styles.emailColumn}>
                                                <Text style={[styles.emailText, styles.fontFamily]}>{fDate}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        />
                        </VirtualizedView>
                </View>
                <View style={{ flex: 1, backgroundColor: "white", flexDirection: 'row', justifyContent: 'center', }} >
                <VirtualizedView>
                    <FlatList
                        contentContainerStyle={styles.emailContainer}
                        data={Data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={(item: any) => {
                            return (
                                <TouchableOpacity>
                                    <View style={[styles.EmailContainer]}>
                                        <View style={styles.iconRow}>
                                            <FontAwesome
                                                name="address-book-o"

                                                style={[styles.emailIcon, { marginLeft: 30 }]}

                                            />
                                        </View>
                                        <View style={styles.emailRow}>
                                            <View style={styles.emailColumn}>
                                                <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.specificaddress}</Text>
                                            </View>
                                            <View style={styles.emailColumn}>
                                                <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.xa_phuong}</Text>
                                            </View>
                                            <View style={styles.emailColumn}>
                                                <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.quan_huyen}</Text>
                                            </View>
                                            <View style={styles.emailColumn}>
                                                <Text style={[styles.emailText, styles.fontFamily]}>Tỉnh {detailUser.tinh_tp}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        />
                        </VirtualizedView>
                </View>
                <View style={{ flex: 3 }} >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => changePassword()}
                        >
                            <LinearGradient
                                style={styles.button}
                                colors={['#009387', '#00786E']}>
                                <Text style={[styles.text, styles.fontFamily]}>Đổi mật khẩu</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditInformation')}>
                            <LinearGradient
                                style={styles.button}
                                colors={['#009387', '#00786E']}>
                                <Text style={[styles.text, styles.fontFamily]}>Chỉnh sửa thông tin</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </VirtualizedView>
        </View>


        // <SafeAreaView>
        //     <ScrollView>

        //         <View style={{ width: width, height: height }}>
        //             <Card containerStyle={styles.cardContainer}>
        //                 <View style={styles.headerContainer}>
        //                     <ImageBackground style={styles.headerBackgroundImage} blurRadius={10}
        //                         source={{ uri: 'https://i.imgur.com/rXVcgTZ.jpg' }}>
        //                         <TouchableOpacity onPress={() => navigation.goBack()}>
        //                             <Icon style={styles.payIcon} type="ionicons" name="arrow-back-ios" color="white"></Icon>
        //                         </TouchableOpacity>
        //                         <View style={styles.headerColumn}>
        //                             <TouchableOpacity>
        //                                 {data.type ?
        //                                     <Image
        //                                         style={styles.userImage}
        //                                         source={require('./images/avatauser.png')}
        //                                     /> :
        //                                     <Image source={{ uri: img }} style={styles.userImage} />
        //                                 }
        //                             </TouchableOpacity>
        //                             <Text style={[styles.userNameText, styles.fontFamily]}>{detailUser.nameUser}</Text>
        //                         </View>
        //                     </ImageBackground>
        //                 </View>
        //                 {/* Telephone */}

        //                     <FlatList contentContainerStyle={styles.telContainer}
        //                         data={Data}
        //                         keyExtractor={item => item.id.toString()}
        //                         renderItem={(item: any) => {
        //                             return (
        //                                 <View style={{
        //                                     shadowOffset: {
        //                                         width: 0,
        //                                         height: 9,
        //                                     },
        //                                     shadowOpacity: 0.48,
        //                                     shadowRadius: 11.95,
        //                                     elevation: 18,
        //                                 }}>
        //                                     <TouchableOpacity >
        //                                         <View style={[styles.Telcontainer]}>
        //                                             <View style={styles.iconRow}>
        //                                                 <Icon
        //                                                     name="call"
        //                                                     underlayColor="transparent"
        //                                                     iconStyle={styles.telIcon}
        //                                                 />
        //                                             </View>
        //                                             <View style={styles.telRow}>
        //                                                 <View style={styles.telNumberColumn}>
        //                                                     <Text style={[styles.telNumberText, styles.fontFamily]}>(+84) {myArr}</Text>
        //                                                 </View>
        //                                                 <View style={styles.telNameColumn}>
        //                                                     <Text style={[styles.telNameText, styles.fontFamily]}>Mobile</Text>
        //                                                 </View>
        //                                             </View>
        //                                             <View style={styles.smsRow}>
        //                                                 <Icon
        //                                                     name="textsms"
        //                                                     underlayColor="transparent"
        //                                                     iconStyle={styles.smsIcon}
        //                                                 />
        //                                             </View>

        //                                         </View>
        //                                     </TouchableOpacity>
        //                                 </View>
        //                             )
        //                         }}
        //                     />
        //                      <View style={{marginHorizontal:50}}>
        //                         <View style={styles.separatorOffset} />
        //                         <View style={styles.separator} />
        //                     </View>

        //                         <FlatList
        //                             contentContainerStyle={{

        //                                 paddingLeft: 30,
        //                                 paddingTop: 30,
        //                                 shadowColor: "#000",
        //                                 shadowOffset: {
        //                                     width: 0,
        //                                     height: 4,
        //                                 },
        //                                 shadowOpacity: 0.32,
        //                                 shadowRadius: 5.46,
        //                                 elevation: 9,
        //                             }}
        //                             data={Data}
        //                             keyExtractor={item => item.id.toString()}
        //                             renderItem={(item: any) => {
        //                                 return (
        //                                     <TouchableOpacity>
        //                                         <View style={[styles.EmailContainer]}>
        //                                             <View style={styles.iconRow}>
        //                                                 <FontAwesome
        //                                                     name="birthday-cake"

        //                                                     style={[styles.emailIcon, { marginLeft: 30 }]}

        //                                                 />
        //                                             </View>
        //                                             <View style={styles.emailRow}>
        //                                                 <View style={styles.emailColumn}>
        //                                                     <Text style={[styles.emailText, styles.fontFamily]}>{fDate}</Text>
        //                                                 </View>

        //                                             </View>
        //                                         </View>
        //                                     </TouchableOpacity>
        //                                 )
        //                             }}
        //                         />


        //                     <View style={{marginHorizontal:50}}>
        //                         <View style={styles.separatorOffset} />
        //                         <View style={styles.separator} />
        //                     </View>

        //                         <FlatList
        //                             contentContainerStyle={styles.emailContainer}
        //                             data={Data}
        //                             keyExtractor={item => item.id.toString()}
        //                             renderItem={(item: any) => {
        //                                 return (
        //                                     <TouchableOpacity>
        //                                         <View style={[styles.EmailContainer]}>
        //                                             <View style={styles.iconRow}>
        //                                                 <FontAwesome
        //                                                     name="address-book-o"

        //                                                     style={[styles.emailIcon, { marginLeft: 30 }]}

        //                                                 />
        //                                             </View>
        //                                             <View style={styles.emailRow}>
        //                                                 <View style={styles.emailColumn}>
        //                                                     <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.specificaddress}</Text>
        //                                                 </View>
        //                                                 <View style={styles.emailColumn}>
        //                                                     <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.xa_phuong}</Text>
        //                                                 </View>
        //                                                 <View style={styles.emailColumn}>
        //                                                     <Text style={[styles.emailText, styles.fontFamily]}>{detailUser.quan_huyen}</Text>
        //                                                 </View>
        //                                                 <View style={styles.emailColumn}>
        //                                                     <Text style={[styles.emailText, styles.fontFamily]}>Tỉnh {detailUser.tinh_tp}</Text>
        //                                                 </View>
        //                                             </View>
        //                                         </View>
        //                                     </TouchableOpacity>
        //                                 )
        //                             }}
        //                         />

        //                     <View style={{marginHorizontal:50}}>
        //                         <View style={styles.separatorOffset} />
        //                         <View style={styles.separator} />
        //                     </View>
        //                     <View style={styles.buttonContainer}>
        //                         <TouchableOpacity onPress={() => changePassword()}
        //                         >
        //                             <LinearGradient
        //                                style={styles.button}
        //                               colors={['#009387', '#00786E']}>
        //                                 <Text style={[styles.text, styles.fontFamily]}>Đổi mật khẩu</Text>
        //                                 </LinearGradient>
        //                         </TouchableOpacity>
        //                     </View>
        //                     <View style={styles.buttonContainer}>
        //                         <TouchableOpacity

        //                             onPress={() => navigation.navigate('EditInformation')}
        //                         >
        //                              <LinearGradient
        //                                style={styles.button}
        //                               colors={['#009387', '#00786E']}>
        //                                 <Text style={[styles.text, styles.fontFamily]}>Chỉnh sửa thông tin</Text>
        //                                 </LinearGradient>
        //                         </TouchableOpacity>
        //                     </View>
        //             </Card>
        //         </View>

        //         </ScrollView>
        // </SafeAreaView>
    )
}
export default ProfileScreen

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {

        paddingLeft: 30,
        paddingTop: 30,

    },
    headerBackgroundImage: {
        paddingBottom: 20,

    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        marginTop: 15,
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#fff',

        padding: 30,

    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 90,
        borderWidth: 3,
        height: width / 2.5,
        marginBottom: 15,
        width: width / 2.5,
    },
    userNameText: {
        color: '#FFF',
        fontSize: normalize(16),
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
        fontFamily: 'Tahoma_Regular_font'
    },
    separatorOffset: {
        flex: 2,
        flexDirection: 'row',

    },
    separator: {
        borderColor: '#EDEDED',
        borderWidth: 0.3,
        flex: 8,
        flexDirection: 'row',
        shadowColor: "#EDEDED",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1.62,

        elevation: 1,
    },
    separatorContainer: {
        flexDirection: 'row',
    },
    Telcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,


    },
    iconRow: {
        flex: 2,
    },
    smsIcon: {
        color: colorBackground,
        fontSize: normalize(20)

    },
    smsRow: {
        flex: 2,
        justifyContent: 'flex-start',
        marginRight: 30,
        marginTop: 5
    },
    telIcon: {
        color: colorBackground,
        fontSize: normalize(20),
        marginLeft: 25
    },
    telNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    telNameText: {
        color: 'gray',
        fontSize: normalize(10),
        fontWeight: '200',
    },
    telNumberColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    telNumberText: {
        fontSize: normalize(15),
    },
    telRow: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    EmailContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailIcon: {
        color: colorBackground,
        fontSize: normalize(20),
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: normalize(15),
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        width: 300,
        backgroundColor: colorBackground,
        marginTop: 17,

    },
    text: {
        fontSize: normalize(11),
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 10
    },
    payIcon: {
        alignItems: "flex-start",
        justifyContent: "center",
        position: 'relative',
        width: 50,
        height: height / 17,
        left: 20,
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
})