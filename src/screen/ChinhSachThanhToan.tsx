import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    StyleSheet, View, SafeAreaView, Text, Image, Dimensions
} from 'react-native';
import CustomCallBack from '../CustomCallBack'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


const ChinhSachThanhToan: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomCallBack color="#009387" label="Chính sách thanh toán" />
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 20 }}>Chính sách thanh toán</Text>
                    <Image style={{ width: '100%', height: height / 3 }} source={{ uri: 'https://www.elkay.vn/wp-content/uploads/2021/06/article_1581935677_367.png' }} />
                    <Text style={styles.Text}>
                        - Chính sách Ship COD: nếu gửi giao hàng tiết kiệm COD toàn bộ giá trị đơn hàng. Nếu gửi xe, khách vui lòng chuyển khoản toàn bộ giá trị đơn hàng trước khi gửi.
                    </Text>
                    <Text style={styles.Text}>
                        ** Lưu ý ** : các đơn hàng có hình thức thanh toán bằng chuyển khoản ngân hàng, khách hàng vui lòng chuyển khoản trong vognh 48h ( 2 ngày) sau khi đơn hàng được xác nhận. Sau thời gian này quý khách không chuyển khoản, đơn hàng sẽ bị hủy
                    </Text>
                    <Text style={styles.Text}>
                        - KHO KHÔNG BÁN CÔNG NỢ
                        - Đơn COD, khách hàng vui lòng không kiểm tra hàng vì liên quan tới bảo quản khi vận chuyển. Toàn bộ sản phẩm khi gửi sẽ có bill đi kèm, nếu sản phẩm lỗi do nhà sản xuất hoặc gửi thiếu... vui lòng liên hệ với shop để giải quyết.
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

export default ChinhSachThanhToan;