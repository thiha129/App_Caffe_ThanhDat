import React, { useState, useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Platform,
    PixelRatio,
    ListView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { FlatList } from 'react-native-gesture-handler';
import { Rating, AirbnbRating, Card } from 'react-native-elements';
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
// import màn hình custom
import CustomHeader from '../CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colorBackground } from '../../App';
import DoubleTapToClose from './ExitApp/android_doubleTapToClose';

import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import { postsState$, id_Account$, dataAccount$, cartData$, dataSanPhamSold$ } from '../redux/selectors';
import { getSanPhamsSold } from '../redux/actions';

// Thuộc tính cố định
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const imgW = 2.2
const imgH = 4

const {
    width: SCREEN_WIDTH,
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


// Khai báo kiểu dữ liệu
type Props = {
    img: string;
    name: string;
    price: number;
    priceSale: number;
    sold: number;
    flashSale: number;
}
type PropsPost = {
    id: string;
    title: string;
    moredetail: string;
    attachment: string,
    content: string,

}
// Tạo component
const ratingCompleted = (rating: number) => {
    console.log("Rating is: " + rating)
}


const ItemPost = ({ item, route, navigation }: { item: PropsPost, navigation: any, route: any }) => (

    <TouchableOpacity style={{ backgroundColor: 'white' }} activeOpacity={1}
        onPress={() => navigation.navigate('DetailPosts', { item_img: item.attachment, item_title: item.title, item_content: item.content })}>
        <View style={{
            flex: 1, flexDirection: 'row', paddingRight: 5,
            padding: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderBottomRightRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: '#fff',
            alignItems: 'flex-end'
        }}>
            <View style={{ flex: 1.3 }}>
                <View style={styles.cardImgWrapper}>
                    <Image
                        source={{ uri: item.attachment }}
                        resizeMode="cover"
                        style={styles.cardImg}
                    />
                </View>
            </View>
            <View style={{ flex: 2, paddingLeft: 5 }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.cardTitle, styles.fontFamily]}>{item.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.cardDetails, styles.fontFamily]} numberOfLines={5}>
                            {item.content}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "flex-end", marginTop: 5, }}>
                        <View style={{ width: width / 5, paddingVertical: width / 40, backgroundColor: colorBackground, borderRadius: 5 }}>
                            <Text style={[{ textAlign: 'center', fontWeight: 'normal', fontSize: normalize(8), color: "white", justifyContent: 'center', alignItems: 'center' }, styles.fontFamily]}>Xem thêm</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        {/* <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
                <Image
                    source={{ uri: item.attachment }}
                    resizeMode="cover"
                    style={styles.cardImg}
                />
            </View>

            <View style={styles.cardInfo}>
                <View style={{ flex: 0.9 }}>
                    <Text style={[styles.cardTitle, styles.fontFamily]}>{item.title}</Text>
                    <Text style={[styles.cardDetails, styles.fontFamily]} numberOfLines={5}>
                        {item.content}
                    </Text>
                </View>
                <View style={{ width: width / 5, height: height / 25, backgroundColor: colorBackground, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[{ textAlign: 'center', fontWeight: 'normal', fontSize: normalize(8), color: "white" }, styles.fontFamily]}>Xem thêm</Text>
                </View>
            </View>
        </View> */}
    </TouchableOpacity>
)
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
const Section: React.FC<{
    title: string;
    placeholder: string,
}> = ({ title, placeholder }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Text>xxxxxxxxxxxxxxxxxxxxxxx</Text>
    );
};

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isDarkMode = useColorScheme() === 'dark';
    const [data, setData] = useState<Props[]>();
    const [post, setDataPost] = useState<PropsPost[]>();
    const _rederItem = ({ item }: { item: Props }) => <Item item={item} navigation={navigation} />;
    const _rederItemPost = ({ item }: { item: PropsPost }) => <ItemPost item={item} navigation={navigation} route={route} />;
    const [search, setSearch] = useState<string>("");
    const [dataSP, setDataSP] = useState([])
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    const sanPhamSoldSelected = useSelector(dataSanPhamSold$);
    useEffect(() => {
        try {
            // console.log('abc',sanPhamSoldSelected);
            if (sanPhamSoldSelected !== undefined) {
                setDataSP(sanPhamSoldSelected)
            }
        } catch (error) {
            console.log('eerroo', error);

        }

    }, [sanPhamSoldSelected])

    React.useEffect(() => {
        dispatch(action.getPosts.getPostsRequest());
        dispatch(action.getSanPhamsSold.getSanPhamsSoldRequest({ pagenumber: 0 }))
    }, [dispatch]);


    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {

    //     });
    //     return () => {
    //         unsubscribe
    //     };
    // }, [navigation]);
    const backgroundStyle = {
        backgroundColor: "#E9E9E9",
    };
    function VirtualizedView(props: any) {
        return (
            <FlatList
                data={[]}
                ListEmptyComponent={null}
                keyExtractor={(item, index) => index.toString()}
                listKey={(_index: string) => 'A'}
                renderItem={null}
                ListHeaderComponent={() => (
                    <React.Fragment>{props.children}</React.Fragment>
                )}
            />
        );
    }


    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <StatusBar backgroundColor={colorBackground} barStyle='light-content' />
            <CustomHeader color="white" invisibleFilter={true} placeholde="Tìm kiếm ..." value=
                {search} changeText={setSearch} colorText="black" borderColor="black" borderWidth={1} />
            <DoubleTapToClose />
            <ScrollView>
                <View style={[{
                    flexDirection: "column", flex: 1, padding: 10
                }]}>
                    <View style={{ backgroundColor: 'white' }} >
                        <View style={styles.sliderContainer}>
                            <Swiper
                                autoplay
                                dotColor="#AARRGGBB00"
                                activeDotColor="#AARRGGBB00"
                            >
                                <View style={styles.slide}>
                                    <Image
                                        source={{
                                            uri: 'https://dacsanbanme.com/wp-content/uploads/2019/12/arabica-3-916x381.png'
                                        }}
                                        resizeMode="cover"
                                        style={styles.sliderImage}
                                    />
                                </View>
                                <View style={styles.slide}>
                                    <Image
                                        source={{
                                            uri:
                                                'https://congthuong.vn/stores/news_dataimages/thanhhuong/032019/06/09/in_article/le-hoi-ca-phe-buon-ma-thuot-lan-thu-7-2019-hua-hen-nhieu-chuong-trinh-dac-sac_1.jpg'
                                        }}
                                        resizeMode="cover"
                                        style={styles.sliderImage}
                                    />
                                </View>
                                <View style={styles.slide}>
                                    <Image
                                        source={{
                                            uri:
                                                'https://media.truyenhinhdulich.vn/upload/news/3174_nhung_quan_cafe_dam_chat_tay_nguyen_o_buon_ma_thuo.jpg'
                                        }}
                                        resizeMode="cover"
                                        style={styles.sliderImage}
                                    />
                                </View>
                                <View style={styles.slide}>
                                    <Image
                                        source={{
                                            uri:
                                                'http://khoahocphattrien.vn/Images/Uploaded/Share/2017/04/27/8551.jpg'
                                        }}
                                        resizeMode="cover"
                                        style={styles.sliderImage}
                                    />
                                </View>
                            </Swiper>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "white" }} >
                        <VirtualizedView style={backgroundStyle}>
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    width: width,
                                    alignSelf: 'center',

                                }}>

                                <View style={{
                                    width: 230,
                                    height: 0,
                                    borderBottomColor: "#009387",
                                    borderBottomWidth: normalize(15),
                                    borderTopColor: "#009387",
                                    borderTopWidth: normalize(12),
                                    borderRightWidth: normalize(7),
                                    marginLeft: 10,
                                    borderRightColor: 'transparent',
                                    justifyContent: 'center',
                                    zIndex: 1,
                                    position: 'relative',
                                    elevation:0
                                }}>
                                    <Text
                                        style={[{
                                            fontSize: 20,
                                            color: '#fff',
                                            marginLeft: 5,
                                            zIndex:0,position:'absolute'
                                        }, styles.fontFamily]}>
                                        Sản phẩm bán chạy
                                    </Text>
                                </View>
                                <FlatList
                                    numColumns={2}
                                    data={dataSP.slice(0, 4)}
                                    renderItem={_rederItem}
                                    keyExtractor={item => item._id.toString()}
                                />
                            </View>
                        </VirtualizedView>
                    </View>
                    <View style={{ backgroundColor: "white" }} >
                        <VirtualizedView >
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    width: width,
                                    alignSelf: 'center',

                                }}>
                                <View style={{
                                    width: 230,
                                    height: 0,
                                    borderBottomColor: "#009387",
                                    borderBottomWidth: normalize(15),
                                    borderTopColor: "#009387",
                                    borderTopWidth: normalize(12),
                                    borderRightWidth: normalize(7),
                                    marginLeft: 10,
                                    borderRightColor: 'transparent',
                                    justifyContent: 'center',
                                }}>
                                    <Text
                                        style={[{
                                            fontSize: normalize(12),
                                            color: '#fff',
                                            marginLeft: 5
                                        }, styles.fontFamily]}>
                                        Bài viết hay
                                    </Text>
                                </View>

                                <FlatList
                                    data={posts.slice(0, 3)}
                                    scrollEnabled={false}
                                    renderItem={_rederItemPost}
                                    keyExtractor={item => item._id}
                                />
                            </View>
                        </VirtualizedView>
                        <View style={{
                            alignItems: "center",
                            width: width,
                            height: height / 14,
                            borderTopWidth: 5,
                            borderTopColor: "#E9E9E9"
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AllPosts')}
                                activeOpacity={1}
                                style={{
                                    width: width,
                                    height: height / 18,
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                    borderBottomLeftRadius: 15,
                                    borderBottomRightRadius: 15
                                }}>
                                <Text
                                    style={[{
                                        fontSize: normalize(11),
                                    }, styles.fontFamily]}>Xem thêm bài viết khác</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sliderContainer: {
        height: height / 5,

        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 5
    },
    wrapper: {},
    slide: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#F5DEB3' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#e3a27c',
    },
    cardImgWrapper: {
        flex: 1.3,
    },
    card: {
        height: width / 2,
        flexDirection: 'row',
        paddingHorizontal: width / 50,
        marginBottom: height / 90
    },

    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        resizeMode: 'cover'
    },
    cardInfo: {
        flex: 1.5,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'flex-end'
    },
    cardTitle: {
        fontSize: normalize(13),
        fontWeight: 'bold',
        fontFamily: 'Tahoma_Regular_font'
    },
    cardDetails: {
        fontSize: normalize(12),
        color: '#444',
        fontFamily: 'Tahoma_Regular_font',
        width: width / 1.8,
        height: height / 7.5
    },
    cardStart: {
        fontSize: 15,
        color: '#444',
        marginTop: 10,
        fontFamily: 'Tahoma_Regular_font'
    },
    cardXemthem: {
        marginTop: 8,
        color: '#444',
        fontSize: 16,
        // fontWeight: 'bold',
    },
    styleFilter: {
        borderRightColor: "black",
        borderRightWidth: 1,
        flex: 1,
        textAlign: 'center'
    },
    styleItem: {
        width: width / imgW,
        minHeight: height / 2.5,
        alignItems: 'center',
        marginTop: height / 190,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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


export default HomeScreen;
