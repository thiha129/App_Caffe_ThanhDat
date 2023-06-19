import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
    StyleSheet, View, SafeAreaView, Text, Dimensions, ScrollView, TouchableOpacity, Platform, ToastAndroid, Picker, Alert, TextInput, PixelRatio

} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomCallBack from '../CustomCallBack'
import { Avatar, } from 'react-native-elements';
import CustomInputInformation from '../CustomInputInformation';
import CustomButtonLoginScreen from '../CustomButtonLoginScreen';
import { colorBackground } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-tiny-toast'
const tinh_tp = require('./datapicker/tinh_tp.json')
const quan_huyen = require('./datapicker/quan_huyen.json')
const xa_phuong = require('./datapicker/xa_phuong.json')
// redux
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import axios from "axios";

import { dataAccount$, checkUpdate$,getDetailUser$,checkAccount$} from '../redux/selectors';
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
import * as ImagePicker from 'expo-image-picker';

const EditInformation: React.FC = () => {
    const dispatch = useDispatch();
    const detailUser = useSelector(checkAccount$);
    const navigation = useNavigation();
    const default0 = "0";
    const defaultCodeCountry = "84";
    // console.log('[abczxc]',detailUser);
    const [isCheckRe, setIsisCheckRe] = React.useState(false)
    const UpdateAll = useSelector(checkUpdate$);
    // console.log('[UPDATE]', UpdateAll);
    const [focusInput, setFocusInput] = useState(false);
    const [focusInputNumber, setFocusInputNumber] = useState(false);
    const [focusInputAddress, setFocusInputAddress] = useState(false);
    const onChangeFocus = () => {
        setFocusInput(true);
    }
    const onChangeBlur = () => {
        setFocusInput(false);
    }
    const onChangeFocusNumber = () => {
        setFocusInputNumber(true);
    }
    const onChangeBlurNumber = () => {
        setFocusInputNumber(false);
    }
    const onChangeFocusAddress = () => {
        setFocusInputAddress(true);
    }
    const onChangeBlurAddress = () => {
        setFocusInputAddress(false);
    }
    useEffect(() => {
        if (isCheckRe == true) {

            if (UpdateAll == '1') {
                const toast = Toast.showSuccess("Cập nhật thông tin thành công!")
                ToastAndroid.showWithGravityAndOffset(
                    "Cập nhật thành công",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                setIsisCheckRe(false)
                navigation.navigate('ProfileScreen')

            } else if (UpdateAll == '2') {
                ToastAndroid.showWithGravityAndOffset(
                    "Cập nhật thất bại",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                console.log("E.r..r");
            }
        }

    }, [UpdateAll])
    const check = () => {

    }
  
    var str = detailUser.phoneNumber;
    const str_a = str.toString();
    var myArr = default0.concat(str_a.slice(2, 11));
    // console.log('[myarrr]', detailUser)
    const [img, setImage] = useState(detailUser.avatar);
    const [dataTinh, setdataTinh] = useState(detailUser.tinh_tp );
    const [dataQuan, setdataQuan] = useState(detailUser.quan_huyen);
    const [dataXa, setdataXa] = useState(detailUser.xa_phuong);
    // const [img, setImage] = useState(detailUser.avatar);
    const ngaySinh = detailUser.birthDay
    let tempDate = new Date(ngaySinh);
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
    // console.log("ngày sinh", fDate);
    const [timeget, setTimeGet] = useState(fDate);
    const [data, setData] = useState<any>({
        name: detailUser.nameUser,
        phone: myArr,
        birdday: fDate,
        address: detailUser.address,
        specificaddress: detailUser.specificaddress,
        kiemtra: false,
        type: true,
        img: '',
        codeCountries: 'VN',
        dataCities: [],
        codeCities: detailUser.tinh_tp,
        dataCounties: [],
        codeCounties: detailUser.quan_huyen,
        dataWards: [],
        codeWards: detailUser.xa_phuong,
        tinh: 'Tỉnh '
    });
    useEffect(() => {
        setData({
            ...data,
            dataCities: Object.values(tinh_tp),
            dataCounties: Object.values(quan_huyen),
            dataWards: Object.values(xa_phuong),
        })

    }, [])
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [imgCode, setImgCode] = useState();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
                // setData({
        //     ...data,
        //     alldataimg:result
        // })
        if (!result.cancelled) {
            setImgCode(result.uri);
            console.log('imagecode', imgCode);
            
        }
        // if (!result.cancelled) {
        //     if (result.uri == "") {
        //         ToastAndroid.showWithGravityAndOffset(
        //             "Vui lòng chọn lại hình !",
        //             ToastAndroid.LONG,
        //             ToastAndroid.BOTTOM,
        //             25,
        //             50
        //         );
        //     } else {
        //         setImage('data:image/jpeg;base64,' + result.base64);
               
        //         setImgCode(result.base64)
        //         const blob = new Blob(img, {type: 'image/jpg'});
        //         console.log('[result.uri]',blob);
        //         // console.log('[result.uri]','data:image/jpeg;base64,'+result.base64);
        //     }
        // }
    };
    const onChange = (event, selectdDate) => {
        const currentDate = selectdDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fDateget = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
        if (tempDate.getDate() > 1 && (tempDate.getMonth() + 1) > 1 && tempDate.getFullYear() < 2003) {
            setData({
                ...data,
                birdday: fDate,
                kiemtra: true
            })
            setTimeGet(fDateget)
        } else {
            ToastAndroid.showWithGravityAndOffset(
                "Ngày sinh của bạn cần nhỏ hơn 2003(Tức lớn hơn 18 tuổi) !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setData({
                ...data,
                kiemtra: false
            })
        }
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const onSubmit = () => {
        if (data.name == "" || data.phone == "" || data.kiemtra == true || data.address == "" || data.specificaddress == "" || img == "" || data.codeCities == "" || data.codeCounties == "" || data.codeWards == "") {
            ToastAndroid.showWithGravityAndOffset(
                "Vui lòng không để trống !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            console.log("rỗng");
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn chắc chắn muốn cập nhật thông tin cá nhân ?',
                [
                    { text: "Hủy", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Xác nhận',
                        style: 'destructive',
                        onPress: () => {
                            let aa = defaultCodeCountry;
                            let a = myArr;
                            let b = parseInt(a);
                            let c = b.toString();
                            let inputNumber = aa.concat(c);
                            // console.log('[cụ thể]',data);
                            const AddressUser = data.codeWards + ", " + data.codeCounties + ", " + data.tinh.concat(data.codeCities)
                            try {
                                
                                const formData = new FormData();
                                formData.append('file', {
                                    uri: imgCode,
                                    name: 'td',
                                    type: 'image/jpg',
                                });
                                formData.append('nameU', data.name)
                                formData.append('phoneN', inputNumber)
                                formData.append('birthD', timeget)
                                formData.append('idU', detailUser._id)
                                formData.append('addressU',AddressUser)
                                formData.append('specificaddressU', data.specificaddress)
                                formData.append('tinhTp', data.codeCities)
                                formData.append('quanHuyen', data.codeCounties)
                                formData.append('xaPhuong', data.codeWards)

                                dispatch(actions.getUpdateInfor.getUpdateInforRequest(formData));
                                setIsisCheckRe(true)
                            } catch (error) {
                                console.log(error.message);
                            }
                        },
                    },
                ]
            );
        }
    }
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    function renderlistCities() {
        if (data.codeCountries == 'VN') {
            return (data.dataCities.map((item, key) => (
                <Picker.Item label={item.name} value={item.code} key={key} />
            )));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }

    function renderlistCounties() {
        if (data.codeCountries == 'VN') {
            const filteredDataCounties = data.dataCounties.filter((item) => {
                return (item.parent_code == data.codeCities);
            });
            return (filteredDataCounties.map((item, key) => (
                <Picker.Item label={item.name} value={item.code} key={key} />
            )));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }
    function renderlistWards() {
        if (data.codeCountries == 'VN') {
            const filteredDataWards = data.dataWards.filter((item) => {
                return (item.parent_code == data.codeCounties);
            });
            return (filteredDataWards.map((item, key) =>
            (
                <Picker.Item label={item.name} value={item.name_with_type} key={key} />
            )
            ));
        }
        return (<Picker.Item label={'Không có dữ liệu'} value={'noData'} />);
    }
    return (
        <View style={{ flex: 1 }}>
            <CustomCallBack color="#009387" label="Chỉnh sửa thông tin" />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ margin: 20, alignItems: 'center', }} >
                        <TouchableOpacity onPress={pickImage}>
                            {data.type ?
                                <Avatar
                                    containerStyle={{ marginBottom: 20 }}
                                    size="xlarge"
                                    rounded
                                    source={{ uri: img }}>
                                </Avatar> : <Avatar
                                    containerStyle={{ marginBottom: 20 }}
                                    size="xlarge"
                                    rounded
                                    source={{ uri: img }}>
                                </Avatar>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <Text style={[styles.text_footer, styles.fontFamily]}>Tên người dùng:</Text>
                        <View style={styles.action}>
                            <View style={[styles.containerInput, {
                                borderBottomColor: focusInput ? '#3A404C' : '#00000059'
                            }]}>
                                <TextInput
                                    style={styles.phoneInputStyle}
                                    placeholder={'Nhập tên người dùng cần thay đổi'}
                                    keyboardType="default"
                                    autoCapitalize="words"
                                    value={data.name}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        name: val
                                    })}
                                    onFocus={onChangeFocus}
                                    onBlur={onChangeBlur}

                                >
                                </TextInput>
                            </View>
                        </View>

                        <Text style={[styles.text_footer, styles.fontFamily, { marginTop: 15 }]}>Số điện thoại:</Text>
                        <View style={styles.action}>
                            <View style={[styles.containerInput, {
                                borderBottomColor: focusInputNumber ? '#3A404C' : '#00000059'
                            }]}>
                                <TextInput
                                    style={styles.phoneInputStyle}
                                    placeholder={'Nhập số điện thoại người dùng'}
                                    keyboardType="numeric"
                                    value={data.phone}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        phone: val
                                    })}
                                    onFocus={onChangeFocusNumber}
                                    onBlur={onChangeBlurNumber}

                                >
                                </TextInput>
                            </View>
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 15 }, styles.fontFamily]}>Ngày sinh:</Text>
                        <View style={styles.action}>
                            <View style={[styles.containerInput, {
                            }]}>
                                <View style={[{
                                    borderBottomColor: '#00000059',
                                    flex: 0.5,
                                    height: 50,
                                    borderBottomWidth: 1.5,
                                }]}
                                >
                                    <TouchableOpacity onPress={() => showMode('date')}>
                                        <Text style={{ paddingTop: 15, paddingBottom: 15, fontSize: normalize(9.9) }}>{data.birdday}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {show && (<DateTimePicker
                            textColor="red"
                            style={{ flex: 2, padding: 20 }}
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='calendar'
                            onChange={onChange}

                        />)}
                        <Text style={[styles.text_footer, { marginTop: 15 }, styles.fontFamily]}>Tỉnh/Thành phố, Quận /Huyện, Phường/Xã</Text>
                        <View style={styles.action}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 1, paddingRight: 5 }} >
                                    <Picker
                                        selectedValue={detailUser.tinh_tp}
                                       
                                        onValueChange={(itemValue, itemIndex) => setData({
                                            ...data,
                                            codeCities: itemValue,
                                        })}
                                    >
                                        <Picker.Item label="Tỉnh/Thành phố" value="" />
                                        {renderlistCities()}
                                    </Picker>
                                </View>
                                <View style={{ flex: 1, paddingRight: 5 }} >
                                    <Picker
                                        selectedValue={dataQuan}
                                        // style={{  width: "100%", fontSize:normalize(20) }}
                                        // itemStyle={{  fontSize:normalize(20) }}
                                        onValueChange={(itemValue, itemIndex) => setData({
                                            ...data,
                                            codeCounties: itemValue,

                                        })}
                                    >
                                        <Picker.Item label="Quận/huyện" value="" />
                                        {renderlistCounties()}
                                    </Picker>
                                </View>
                                <View style={{ flex: 1 }} >
                                    <Picker
                                        selectedValue={dataXa}
                                        // style={{  width: "100%", fontSize:normalize(20) }}
                                        // itemStyle={{  fontSize:normalize(20) }}
                                        onValueChange={(itemValue, itemIndex) => setData({
                                            ...data,
                                            codeWards: itemValue
                                        })}
                                    >
                                        <Picker.Item label="Xã/phường" value="" />
                                        {renderlistWards()}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.text_footer, { marginTop: 10 }, styles.fontFamily]}>Địa chỉ cụ thể</Text>
                        <View style={styles.action}>
                            <View style={[styles.containerInput, {
                            }]}>
                                <View style={[styles.containerInput, {
                                    borderBottomColor: focusInputAddress ? '#3A404C' : '#00000059'
                                }]}>
                                    <TextInput
                                        style={styles.phoneInputStyle}
                                        placeholder="Nhập địa chỉ cụ thể..."
                                        autoCapitalize="none"
                                        value={data.specificaddress}
                                        onChangeText={(val) => setData({
                                            ...data,
                                            specificaddress: val
                                        })}
                                        onFocus={onChangeFocusAddress}
                                        onBlur={onChangeBlurAddress}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <CustomButtonLoginScreen
                                label={"Thay đổi thông tin"}
                                colorboder={"#fff"} onPress={onSubmit}
                                colortext={"#fff"}
                                firstcolor={'#009387'} secondcolor={'#00786E'}
                                numbermarginTop={height / 15} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',

    },
    button: {
        alignItems: 'center',
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: normalize(13)
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,

    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
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
    phoneInputStyle: {
        marginLeft: 5,
        flex: 1,
        height: width / 7,
        color: 'black',
        fontSize: normalize(9.9)
    },
});

export default EditInformation;