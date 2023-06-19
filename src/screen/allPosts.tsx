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
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
// import màn hình custom
import CustomHeader from '../CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colorBackground } from '../../App';
import CustomCallBack from '../CustomCallBack'
import { useDispatch, useSelector } from 'react-redux';
import * as action from "../redux/actions"
import { postsState$ } from '../redux/selectors';

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
type PropsPost = {
  id: string;
  title: string;
  moredetail: string;
  attachment: string,
  content: string,

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
const allPosts: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const _rederItemPost = ({ item }: { item: PropsPost }) => <ItemPost item={item} navigation={navigation} route={route} />;
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);


  React.useEffect(() => {
    dispatch(action.getPosts.getPostsRequest());
  }, [dispatch]);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomCallBack color="#009387" label="Bài viết" />
      <ScrollView>
          <View style={{ flex:1 ,padding:5}}>
            <FlatList
              data={posts}
              scrollEnabled={false}
              renderItem={_rederItemPost}
              keyExtractor={item => item._id}
            />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  sliderContainer: {
      height: height / 5,
      width: '96%',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 5,
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
      flex: 1,
  },
  card: {
      height: 200,
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
      fontSize: height / 45,
      // fontWeight: 'bold',
      fontFamily: 'Tahoma_Regular_font'
  },
  cardDetails: {
      fontSize: 12,
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
      fontSize: normalize(10),
      width: width / 2.3,
      minHeight: height / 25,
      marginTop: height / 180,
      textAlign: 'center'
  },
  styleItemPriceSale: {
      fontSize: normalize(12),
      color: "red"
  },
  styleItemPrice: {
      fontSize: normalize(12),
  },
  fontFamily: {
      fontFamily: 'Tahoma_Regular_font'
  }
});

export default allPosts;