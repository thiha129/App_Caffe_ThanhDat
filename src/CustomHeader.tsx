import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Dimensions, AsyncStorage} from 'react-native';
import { Badge, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { colorBackground } from '../App';
import { cartData$, addChecking$, checkAccount$, checkUsername$,isChecking$, dataAccount$, postsState$, timKiem$ ,id_Account$, countCart$} from '../src/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../src/redux/actions"
import Toast from 'react-native-tiny-toast';

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

type Props = {
    placeholde: string;
    changeText: (value: string) => void;
    value: string;
    colorText: string;
    borderColor: string;
    borderWidth: number;
    invisibleFilter: boolean;
    color: string;
}

const CustomHeader: React.FC<Props> = ({ placeholde, changeText, value, colorText, borderWidth, borderColor, invisibleFilter, color }) => {
    const navigation = useNavigation();
    const [valueCount, setValueCount] = React.useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [isChecked, setIsChecked] = useState(true)
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    const x = useSelector(dataAccount$);
    const dataCart = useSelector(cartData$)
    const check_login = useSelector(checkUsername$);
    const countCart = useSelector(countCart$);
    const timKiem = useSelector(timKiem$);
    const user = useSelector(id_Account$);
    const isChecking = useSelector(isChecking$)
    const addChecking = useSelector(addChecking$)
    
    let checkAccount = undefined
    try {
        checkAccount = useSelector(checkAccount$);
    } catch (error) {
    }
    const search = () => {
        if (value != "") {
            dispatch(action.timKiem.timKiemRequest(value))
        }

    }
    const a = async () => {
        try {
            const phone = await AsyncStorage.getItem('PhoneNumber');
            const pass = await AsyncStorage.getItem('PassWord');
            if (phone !== null && pass !== null) {
                // console.log(phone);
                setIsChecked(isChecked)
            } else {
                setIsChecked(!isChecked)
                setValueCount(0)
            }
        } catch (error) {
            console.log('[Error] ' + error);
        }
    };
    React.useEffect(() => {
        // checkAccount == undefined ? setIsChecked(!isChecked) : setIsChecked(isChecked)
        // console.log("[checkAccoount]", checkAccount);
        a()
    }, [])

    React.useEffect(() => {
        check_login != undefined ? dispatch(action.getCountCart.getCountCartRequest({ id_Account: user})) : null
        const unsubscribe = navigation.addListener('focus', () => {
            check_login != undefined ? dispatch(action.getCountCart.getCountCartRequest({ id_Account: user })) : null
            setValueCount(dataCart.length)
            changeText("")
            console.log("[CustomHeader]",addChecking);
        });

        return unsubscribe;
    }, [navigation, dispatch, isChecking,addChecking]);

    React.useEffect(() => {
        try {
            if (timKiem.checkTimKiem == 1) {
                navigation.navigate("TimKiemScreen")
            } else if (timKiem.checkTimKiem == 0) {
                Toast.show("Không có sản phẩm nào!",
                    {
                        position: Toast.position.CENTER,
                        containerStyle: {
                            width: width / 2,
                            height: width / 6
                        },
                        textStyle: {},
                        // imgSource: require('xxx'),
                        mask: true,
                        maskStyle: {},
                    })
            }

        } catch (error) {
        }
    }, [timKiem])

    return (
        <View style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            height: height / 15,
            backgroundColor: colorBackground
        }}>
            <View style={{
                flex: 0.94,
                borderRadius: 5,
                paddingLeft: 10,
                backgroundColor: "white",
                alignItems: 'center',
                flexDirection: 'row',
                borderWidth: 0.5,
                borderColor: 'white'

            }}>
                <Icon name="search" size={width / 20} ></Icon>
                <TextInput
                    style={[{
                        height: height / 20,
                        flex: 1,
                        backgroundColor: "white",
                        color: "black", borderRadius: 5,
                        marginLeft: 1,

                    }]}
                    placeholderTextColor="black"
                    placeholder={placeholde}
                    onChangeText={changeText}
                    value={value}
                    keyboardType="default"
                    returnKeyType="done"
                    onEndEditing={() => search()}
                />
            </View>
            {invisibleFilter ? <View
                style={{
                    justifyContent: "center",
                    height: height / 20
                }}>
                <Icon activeOpacity={1} onPress={() => {
                    isChecked == true ? navigation.navigate('ShoppingCartScreen') :
                        Alert.alert(
                            'Thông báo',
                            'Bạn cần đăng nhập để vào giỏ hàng?',
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
                }} type='AntDesign' name="shopping-cart" size={width / 15} style={{ marginLeft: 2 }} color={color}></Icon>
                <Badge
                    value={countCart}
                    status="error"
                    containerStyle={{ position: 'absolute', bottom: height / 35, left: width / 30 }}
                />
            </View> : null
            }
        </View >
    );
}

export default CustomHeader;
