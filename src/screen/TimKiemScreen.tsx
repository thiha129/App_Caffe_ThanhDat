import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, PixelRatio, ProgressBarAndroid } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Rating } from 'react-native-elements';
import CustomCallBack from '../CustomCallBack'
import { Badge } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import '../../data/data.product'
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"

import { getSanPhams, getSanPhamsPage } from '../redux/actions/index';
import { checkUsername$, dataAccount$, dataSanPham$, timKiem$, } from '../redux/selectors';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const colorBackground = '#009387';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;
export function normalize(size: any) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}

type Props = {
    img: string;
    name: string;
    price: number;
    priceSale: number;
    sold: number;
    flashSale: number;
}

const imgW = 2.1 // tỉ lệ chiều rộng của ảnh
const imgH = 4     // tỉ lệ chiều cao của ảnh
const ratingCompleted = (rating: number) => {
    console.log("Rating is: " + rating)
}

const Item = ({ item, navigation, dispatch }: { item: Props, navigation: any, dispatch: any }) => (
    <View style={{
        justifyContent: "space-evenly",
        width: width / 2,
        alignItems: "center",
        marginBottom: 5

    }}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('DetailsProductScreen', { item: item })}
            style={styles.styleItem}>
            <Image source={{ uri:item.img[0].image }}
                style={{
                    width: width / imgW,
                    height: height / imgH,
                    resizeMode: "cover",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                }} />
            {item.price > 0 ? <Badge
                value="SALE"
                status="error"
                containerStyle={{
                    position: 'absolute',
                    top: 5,
                    right: 5
                }}
            /> : null}
            <Text style={[styles.styleItemTitle, styles.fontFamily]}>{item.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: height / 200 }}>
            {item.flashSale == 0 ? <Text style={[styles.styleItemPrice, styles.fontFamily, { color: "red", }]}>{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ </Text> :
                    <Text style={[styles.styleItemPrice, styles.fontFamily, { textDecorationLine: "line-through", color: "#BFBFBF" }]}>{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ </Text>}
                
                {item.flashSale == 1 ? <Text style={[styles.styleItemPriceSale, styles.fontFamily]}>{String(item.priceSale).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text> : null}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: width / imgW }}>
                <Rating
                    type='star'
                    ratingColor='#FCB900'
                    ratingBackgroundColor='#c8c7c8'
                    ratingCount={5}
                    readonly={true}
                    startingValue={5}
                    imageSize={15}
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                />
              <Text style={[{ marginLeft: 5, fontSize: normalize(11) }, styles.fontFamily]}>Đã bán {item.sold}</Text>
            </View>
        </TouchableOpacity>
    </View>
)


const TimKiemScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    let stopFetchMore = true;

    const _rederItem = ({ item }: { item: Props }) => <Item item={item} navigation={navigation} dispatch={dispatch} />;
    const sanPhamSelected = useSelector(dataSanPham$);
    const x = useSelector(dataAccount$);
    const check_login = useSelector(checkUsername$);
    const timKiem = useSelector(timKiem$);

    useEffect(() => {
        const getData = dispatch(
            getSanPhams.getSanPhamsRequest({ pagenumber: 0 })
        )
        check_login != undefined ? dispatch(action.getCountCart.getCountCartRequest({ id_Account: x.check_Account._id })) : null
        return () => getData
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("[ProductScreen]");
            check_login != undefined ? dispatch(action.getCountCart.getCountCartRequest({ id_Account: x.check_Account._id })) : null
        });
        return () => {
            unsubscribe
        };
    }, [navigation, dispatch]);

    const ListFooterComponent = () => (
        <View style={{ marginBottom: 50 }}>
            <Text
                style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 5,

                }}
            >
                Loading...
                <ProgressBarAndroid styleAttr={'SmallInverse'} />
            </Text>
        </View>
    );

    const handleOnEndReached = React.useCallback(() => {

        if (!sanPhamSelected.isLoading) {
            dispatch(
                getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: sanPhamSelected.nextPage })
            )
        }
        setIsLoading(true);
    }, [dispatch, sanPhamSelected.nextPage])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#fff", height: height, width: width }}>
                <CustomCallBack label="Tìm kiếm" color={colorBackground} />
                <View style={{
                    width: width,
                    height: height / 1.08,
                    marginTop: 2,
                    padding:5
                }}>
                    <FlatList
                        numColumns={2}
                        data={timKiem.data}
                        renderItem={_rederItem}
                        keyExtractor={item => item.name.toString()}
                        onEndReached={handleOnEndReached}
                        onEndReachedThreshold={0.5}
                        onScrollBeginDrag={() => {
                            stopFetchMore = false;
                        }}
                        ListFooterComponent={() => !isLoading && <ListFooterComponent />}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}
export default TimKiemScreen;

const styles = StyleSheet.create({
    styleFilter: {
        borderRightColor: "black",
        borderRightWidth: 1,
        flex: 1,
        textAlign: 'center'
    },
    styleItem: {
        width: width / imgW,
        height: height / 2.4,
        alignItems: 'center',
        marginTop: height / 190,
        backgroundColor: "white",
        borderRadius: 5
    },
    styleItemTitle: {
        fontSize: normalize(14),
        width: width / 2.3,
        height: height / 20,
        marginTop: height / 180,
        textAlign: 'center'
    },
    styleItemPriceSale: {
        fontSize: normalize(13),
        color: "red"
    },
    styleItemPrice: {
        fontSize: normalize(13),
        color: "#BFBFBF",
        textDecorationLine: "line-through"
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
});