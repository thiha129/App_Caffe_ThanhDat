import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    StyleSheet, View, SafeAreaView, Text, Image, Dimensions
} from 'react-native';
import CustomCallBack from '../CustomCallBack'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


const ChinhSachGiaoHang: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomCallBack color="#009387" label="Chính sách giao hàng" />
            <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 20 }}>Chính sách giao hàng</Text>
                   </View>
                    <Image style={{ width: width, height: height / 3 }} source={{ uri: 'https://cdn.shopify.com/s/files/1/0067/7285/0735/files/giao-hang-toan-quoc_480x480.jpg?v=1557471737' }} />
                    <Text style={styles.Text}>
                        - Kho sử dụng dịch vụ của giao hàng của các công ty vận chuyển: ưu tiên qua giao hàng tiết kiệm - với các khách hàng yêu cầu khác, kho có thể chuyển gửi hàng qua bưu điện
                    </Text>
                    <Text style={styles.Text}>
                        - Giao hàng qua nhà xe: gửi theo yêu cầu hoặc nhà xe khách đồng ý trước khi gửi.
                    </Text>
                    <Text style={styles.Text}>
                        - Khách hàng có nhu cầu mua sỉ với số lượng lớn sẽ được miễn phí ship, mọi liên hệ vui lòng liên hệ để biết thêm chi tiết.
                    </Text>
                    <Text style={styles.Text}>
                    - Để thuận tiện cho khách hàng có nhu cầu mua sản phẩm của chúng tôi mà không gặp bất kỳ khó khăn nào trong các hình thức mua hàng thanh toán và vận chuyển nào chúng tôi lên một số kế hoạch cho các khách hàng ở ngoại tỉnh thành tại Việt Nam mà chưa đại lý của chúng tôi kinh doanh để khách hàng không gặp bất kỳ khó khăn nào trong quá trình mua sản phẩm
                    </Text>
                  
                    <Text style={styles.Text}>
                    - Đây là hình thức giao hàng trực tiếp từ bộ phận nhân viên giao hàng của chúng tôi nó được áp dụng tùy vào tình hình thực tế và sản phẩm mà khách hàng đặt hàng thông thường nó sẽ được áp dụng đối với khách hàng mua sản phẩm của chúng tôi trong vòng bán kính 30 km từ đại lý của chúng tôi.
                    </Text>
                   
            
                </View>
                <Text style={styles.Text}>
                        CAFE Thành Đạt phục vụ giao hàng toàn quốc
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

export default ChinhSachGiaoHang;