import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity, Dimensions, Platform, PixelRatio, ProgressBarAndroid,StatusBar } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-elements';
import CustomHeader from '../CustomHeader'
import { Badge } from 'react-native-elements'
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from 'react-native-elements/dist/config';
import '../../data/data.product'
import dataProduct from '../../data/data.product';
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { getSanPhams, getSanPhamsPage, getSanPhamsSold, getSanPhamsSoldPage, updateLikeSanpham } from '../redux/actions/index';
import { checkUsername$, dataAccount$, dataSanPham$, dataSanPhamSold$, timKiem$, id_Account$} from '../redux/selectors';
import Toast from 'react-native-tiny-toast';

const color = "#e3a27c"
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const size = Dimensions.get('screen');
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
type PropsTab = {
    id: number;
    tabName: string;
    borderRightWidth: number;
}

const imgW = 2.1 // tỉ lệ chiều rộng của ảnh
const imgH = 4     // tỉ lệ chiều cao của ảnh
const ratingCompleted = (rating: number) => {
    console.log("Rating is: " + rating)
}
const heartCompleted = (rating: number) => {
    console.log("Rating is: " + rating)
}



const Item = ({ item, navigation }: { item: Props, navigation: any }) => (
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
            <Image source={{ uri: item.img[0].image }}
                style={{
                    width: width / imgW,
                    height: height / imgH,
                    resizeMode: "cover",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                }} />
            {item.flashSale == 1 ? <Badge
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
                {item.flashSale == 0 ? <Text style={[styles.styleItemPrice, styles.fontFamily, { color: "red", }]}>{String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ </Text> :
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

const dataTabs = [{
    id: 1,
    tabName: "Mới nhất",
    borderRightWidth: 1
}, {
    id: 2,
    tabName: "Bán chạy",
    borderRightWidth: 0
}]



const ProductScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");
    const [tab, setTab] = useState<number>(0);
    const [marginLeft, setMarginLeft] = useState<number>(0);
    const [dataTab, setDataTab] = useState<PropsTab[]>(dataTabs);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTab, setIsLoadingTab] = useState(false);
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const [isClick, setClick] = useState(true);
    let stopFetchMore = true;

    const _rederItem = ({ item }: { item: Props }) => <Item item={item} navigation={navigation} />;
    const sanPhamSelected = useSelector(dataSanPham$);
    
    const sanPhamSoldSelected = useSelector(dataSanPhamSold$);
    
    const x = useSelector(id_Account$);
    const check_login = useSelector(checkUsername$);
    const fontSize = 0.035 * width

    useEffect(() => {
        dispatch(
            getSanPhams.getSanPhamsRequest({ pagenumber: 0 })
        )
        dispatch(
            getSanPhamsSold.getSanPhamsSoldRequest({ pagenumber: 0 })
        )
    }, [dispatch, isClick]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("[ProductScreen]");
            check_login != undefined ? dispatch(action.getCountCart.getCountCartRequest({ id_Account: x })) : null
        });
        return () => {
            unsubscribe
        };
    }, [navigation, dispatch]);

    const ListFooterComponent = () => (
        <View style={{ marginBottom: 50, height: height / 5 }}>
            <Text
                style={{
                    fontSize: normalize(12),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 5,
                    justifyContent: 'center',
                    alignItems:'center'
                }}
            >
                Loading
                <View style={{marginBottom: 50,}}>
                <AnimatedEllipsis
              numberOfDots={4}
              minOpacity={0.3}
              useNativeDriver={true}
              animationDelay={200}
              style={{
                color: '#000',
                  fontSize: width / 20,
              }} />
            </View>
            </Text>
        </View>
    );

    useEffect(() => {
        setTimeout(() => {
            isClick == false ? setData(sanPhamSoldSelected) : setData(sanPhamSelected.data)
            setIsLoadingTab(true)
        }, 500);
    }, [sanPhamSoldSelected, sanPhamSelected, isClick])

    const handleOnEndReached = React.useCallback(() => {

        if (!sanPhamSelected.isLoading && isClick == true) {
            dispatch(
                getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: sanPhamSelected.nextPage })
            )
        }
        if (!sanPhamSoldSelected.isLoading && isClick == true) {
            dispatch(
                getSanPhamsSoldPage.getSanPhamsSoldPageRequest({ pagenumber: sanPhamSoldSelected.nextPage })
            )
        }
        setIsLoading(true);
    }, [dispatch, sanPhamSelected.nextPage, isClick, sanPhamSoldSelected.nextPage])

    const _animateTab = async (item: PropsTab) => {
        if (item.id === 1) {
            setMarginLeft(0)
            setIsLoadingTab(false)
            setClick(true)
            dispatch(
                getSanPhams.getSanPhamsRequest({ pagenumber: 0 })
            )
        } else if (item.id === 2) {
            setMarginLeft(width / 2)
            setIsLoadingTab(false)
            setClick(false)
            dispatch(
                getSanPhamsSold.getSanPhamsSoldRequest({ pagenumber: 0 })
            )
        }
    }

    const Tabs = () => {
        return <View style={{
            width: width,
            height: height / 20,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: 'center',
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
        }}>
            {dataTabs.map((e: PropsTab, index: any) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => _animateTab(e)}
                    activeOpacity={1}
                    style={{
                        width: width / 2,
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        height: height / 20
                    }}
                >
                    <Text
                        style={[{
                            borderRightColor: "black",
                            borderRightWidth: e.borderRightWidth,
                            textAlign: 'center',
                        }, styles.fontFamily]} key={e.id.toString()}>{e.tabName}</Text>
                </TouchableOpacity>
            ))}
        </View>
    }

    const Indicator = () => {
        return <View
            style={{
                position: "absolute",
                height: 4,
                width: width / 2,
                backgroundColor: color,
                bottom: -5,
                marginLeft: marginLeft,
            }} />
    }


    const timKiem = useSelector(timKiem$);
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
    const clickSearch = (e) => {
        dispatch(action.timKiem.timKiemRequest(e))
        setSearch(e)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
              <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
            <View style={{ backgroundColor: "#ECECE", height: height, width: width }}>
                <ImageBackground
                    source={{ uri: "https://dacsanbanme.com/wp-content/uploads/2019/12/arabica-5-1102x459.png" }}
                    style={{
                        width: width,
                        height: height / 7,
                    }}>
                    <CustomHeader
                        color="#FFFFFF"
                        invisibleFilter={true}
                        placeholde="Tìm kiếm ..."
                        value={search}
                        changeText={setSearch}
                        colorText="black"
                        borderColor="black"
                        borderWidth={1} />
                    <View style={{ marginTop: height / 150, width: width / 1.1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Chip
                            icon='close'
                            onPress={() => clickSearch("Cà phê bột")}
                            mode="outlined"
                            ellipsizeMode="middle"
                            textStyle={{ fontFamily: 'Tahoma_Regular_font', fontSize: fontSize }}
                        > Cà phê bột </Chip>
                        <Chip
                            icon='close'
                            onPress={() => { clickSearch("Mật ong hoa cà phê") }}
                            mode="outlined"
                            ellipsizeMode="middle"
                            textStyle={{ fontFamily: 'Tahoma_Regular_font', fontSize: fontSize }}
                        > Mật ong hoa cà phê </Chip>


                    </View>
                </ImageBackground>
                <View style={{
                    width: width,
                    height: height / 20,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: 'center',
                    backgroundColor: "white",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                }}>
                    <Tabs />
                    <Indicator />
                </View>
                <View style={{
                    width: width,
                    height: height / 1.33,
                    marginTop: 2
                }}>

                    {
                        isLoadingTab == true ? <FlatList
                            numColumns={2}
                            data={data}
                            renderItem={_rederItem}
                            keyExtractor={item => item.name + ""}
                            onEndReached={handleOnEndReached}
                            onEndReachedThreshold={0.5}
                            onScrollBeginDrag={() => {
                                stopFetchMore = false;
                            }}
                            ListFooterComponent={() => !isLoading && <ListFooterComponent />}
                        /> : <ListFooterComponent />
                    }
                </View>
            </View>
        </SafeAreaView >
    );
}
export default ProductScreen;

const styles = StyleSheet.create({
    styleFilter: {
        borderRightColor: "black",
        borderRightWidth: 1,
        flex: 1,
        textAlign: 'center'
    },
    styleItem: {
        width: width / imgW,
        height: height / 2.7,
        alignItems: 'center',
        marginTop: height / 190,
        backgroundColor: "white",
        borderRadius: 5
    },
    styleItemTitle: {
        fontSize: normalize(14),
        width: width / 2.3,
        minHeight: height / 25,
        marginTop: height / 180,
        textAlign: 'center'
    },
    styleItemPriceSale: {
        fontSize: normalize(13),
        color: "red"
    },
    styleItemPrice: {
        fontSize: normalize(13),
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
});