import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    StyleSheet, View, SafeAreaView, Text, Image, Dimensions
} from 'react-native';
import CustomCallBack from '../CustomCallBack'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


const ChinhSachDoiTra: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomCallBack color="#009387" label="Chính sách đổi trả" />
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 20 }}>Chính sách đổi trả</Text>
                    <Image style={{ width: '100%', height: height / 3 }} source={{ uri: 'https://chobcs.vn/wp-content/uploads/2020/09/Chinh-sach-doi-tra.jpg' }} />
                    <Text style={styles.Text}>
                        - Đơn hàng đã nhận vui lòng không hoàn trả, trong trường hợp nhầm hàng hoặc hàng lỗi vui lòng thông báo ngay cho nhân viên Thành Đạt để được hỗ trợ và đổi trả theo quy định.
                    </Text>
                    <Text style={styles.Text}>
                        - Đối với hàng đổi trả do nhà sản xuất:{"\n"}
                        ** Khi phát hiện hàng hư hỏng trong vòng 24h kể từ lúc nhận hàng quý khách hàng cui lòng thông báo ngay cho nhân viên để được giải quyết.{"\n"}
                        ** Đối với hàng hóa đổi trả do lỗi nhà sản xuất Thành Đạt xin chịu các khoản phí vận chuyển 2 chiều bao gồm chi trả đổi mới cho quý khách.{"\n"}
                        ** Đối với hàng hóa bị hư hỏng do vận chuyển vui lòng báo ngay cho Thành Đạt để nhân viên có hướng giải quyết hợp lý.
                    </Text>
                    <Text style={styles.Text}>
                        - Đối với hàng hóa do nhân viên giao nhầm sản phẩm (nếu có):{"\n"}
                        ** Trong vòng 24h kể từ lúc nhận hàng quý khách vui lòng thông báo với nhận viên Thành Đạt trong vòng 24h để được hỗ trợ đổi hàng và xin chịu hoàn toàn trách nhiệm giao nhận hàng mới.{"\n"}
                        ** Hàng đổi trả cần phải còn ngyuên dạng, được đóng gói kiện như ban đầu, không hư hỏng, không trầy xước, không có dấu hiệu mở nắp hoặc đã qua sử dụng.
                    </Text>
                   
                </View>
                <Text style={styles.Text}>
                        CAFE Thành Đạt hân hạnh được phục vụ quý khách
                    </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Text: {
        margin: 10, fontSize: 16, fontWeight: 'bold'
    }
})

export default ChinhSachDoiTra;