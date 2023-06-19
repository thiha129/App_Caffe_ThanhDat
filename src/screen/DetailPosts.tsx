import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, useWindowDimensions, Image, ScrollView, TouchableOpacity, Dimensions, FlatList, PixelRatio, Platform } from 'react-native';
import HTML from "react-native-render-html";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import CustomCallBack from '../CustomCallBack'
import { colorBackground } from '../../App';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import { postsState$ } from '../redux/selectors';
import { SocialIcon } from 'react-native-elements/dist/social/SocialIcon';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const scale = width / 320;
export function normalize(size: any) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}
const imgW = 2.05
const imgH = 4
type PropsPost = {
    _id: string;
    title: string;
    item_title: string;
    moredetail: string;
    attachment: string,
    content: string,
    updateAt: string,
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
            <View style={{ flex: 2, paddingLeft: 5, paddingRight: 5 }}>

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
                        <View style={{ width: width / 5,paddingVertical: width/40, backgroundColor: colorBackground, borderRadius: 5 }}>
                            <Text style={[{ textAlign: 'center', fontWeight: 'normal', fontSize: normalize(8), color: "white",justifyContent:'center',alignItems:'center'}, styles.fontFamily]}>Xem thêm</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

const DetailPosts: React.FC = () => {


    const navigation = useNavigation();
    const route = useRoute();
    const contentWidth = useWindowDimensions().width;
    const _rederItemPost = ({ item }: { item: PropsPost }) => <ItemPost item={item} navigation={navigation} route={route} />;

    const dispatch = useDispatch();
    const posts = useSelector(postsState$);


    Array.prototype.reverse.call(posts)


    React.useEffect(() => {
        dispatch(action.getPosts.getPostsRequest());
    }, [dispatch]);

    function VirtualizedView(props: any) {
        return (
            <FlatList

                data={[]}
                ListEmptyComponent={null}
                keyExtractor={(item, index) => item._id}
                listKey={(_index: string) => 'A'}
                renderItem={null}
                ListHeaderComponent={() => (
                    <React.Fragment>{props.children}</React.Fragment>
                )}
            />
        );
    }
    return (
        <SafeAreaView>
            <CustomCallBack color="#009387" label="Bài viết" />
            <VirtualizedView style={{ backgroundColor: "#fff" }}>
                <View style={styles.container}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[{ fontSize: normalize(19), fontWeight: 'bold', marginBottom: 5, justifyContent: 'center', alignItems: 'center' }, styles.fontFamily]}>{route.params.item_title}</Text>
                        </View>
                        <Text style={{ marginBottom: 30, alignItems: 'flex-end' }}>{moment(route.params.updateAt).format('HH:MM MMM DD, YYYY')}</Text>
                        <Image source={{ uri: route.params.item_img }}
                            resizeMode="cover"
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 15,
                                marginBottom: 20,
                            }}
                        />
                    </View>
                    {/* <Text >Register Screen {route.params.item_detail}</Text> */}
                    {/* <HTML source={{ html: route.params.item_content }} contentWidth={contentWidth} ptSize={100} /> */}
                    <Text style={{fontSize:normalize(16)}}>{route.params.item_content}</Text>
                    <Text style={[{ fontSize: 17, fontWeight: 'bold', marginBottom: 20, marginTop: 10 }, styles.fontFamily]}>Tất cả bài viết</Text>

                    {/* <View style={{ width: width, height: height / 1.8 }}> */}

                    <View style={{ width: '100%', height: 1, borderWidth: 1, borderColor: '#000' }}></View>
                    <View style={{flex:1,paddingBottom:30}}>
                    <FlatList
                        data={posts}
                        renderItem={_rederItemPost}
                        keyExtractor={item => item._id}
                    />
                 </View>
                    {/* </View> */}
                </View>
            </VirtualizedView >
        </SafeAreaView>

    )

}
export default DetailPosts;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    sliderContainer: {
        height: height / 5,
        width: '95%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,


    },
    wrapper: {},
    slide: {
        flex: 0.9,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
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
        flex: 1,
    },
    card: {
        height: 200,
        flexDirection: 'row',
        // marginBottom: height / 90,
        marginTop: height / 90
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
        width: 200,
        height: 90
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
    styleItem: {
        width: width / imgW,
        height: height / 2.5,
        alignItems: 'center',
        marginTop: height / 190,
        backgroundColor: "white",
        borderRadius: 5
    },
    styleItemTitle: {
        fontSize: 14,
        width: width / 2.3,
        height: height / 20,
        marginTop: height / 180,
        textAlign: 'center'
    },
    styleItemPriceSale: {
        fontSize: 20,
        color: "red"
    },
    styleItemPrice: {
        fontSize: 20,
        color: "#BFBFBF",
        textDecorationLine: "line-through"
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
});
