import React, { FC } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions, Platform, PixelRatio,AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { checkAccount$, checkUsername$ } from './redux/selectors'
import { useSelector } from 'react-redux'
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
const styles = StyleSheet.create({
    text: {
        fontSize: normalize(13),
        marginLeft: 25,
        marginTop: 15,
        color: 'black',
        fontWeight: '500',
        justifyContent: 'center',

    },
    TextContainer: {
        width: width / 2,

    },
    listItemContainer: {
        height: width / 6.5,
        borderWidth: 0.5,
        borderColor: '#cccccc',
    },
    ListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
},
)
type Ic = {
    ic: string,
    cl: string,
    tp: string,
    str: string,
    xx: string,
    ckd: number,
}
const CustomSetting: React.FC<Ic> = ({ ic, cl, tp, str, xx, ckd }) => {
    const navigation = useNavigation()
    const [isChecked, setIsChecked] = React.useState(true)
    let checkAccount = undefined
    try {
        checkAccount = useSelector(checkUsername$);

    } catch (error) {
    }
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
    React.useEffect(() => {
       a()
    }, [])

    return (
        <TouchableOpacity onPress={() => {
            if (isChecked == false && ckd == 0) {
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
            } else {
                navigation.navigate(xx)
            }
        }}>
            <View style={styles.listItemContainer}>
                <View style={styles.ListContainer}>
                    <View style={
                        {
                            alignItems: 'center',
                            backgroundColor: cl,
                            borderColor: 'transparent',
                            borderRadius: 10,
                            borderWidth: 1,
                            height: 34,
                            justifyContent: 'center',
                            marginLeft: 30,
                            marginRight: 18,
                            marginTop: 10,
                            width: 34
                        }
                    }>
                        <Icon
                            size={normalize(20)}
                            name={ic}
                            underlayColor="notifications"
                            type={tp}
                            color="white"
                        />
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={[styles.text, styles.fontFamily]}>{str}</Text>
                    </View>
                    <Icon
                        name="chevron-right"
                        type="entypo"
                        size={24}
                        color="#D1D1D6"
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-start', marginTop: 10
                        }}
                    />
                </View>
            </View >
        </TouchableOpacity>
    )
}
export default CustomSetting