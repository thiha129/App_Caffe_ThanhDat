import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    StyleSheet, View, SafeAreaView, Text, Image, Dimensions
} from 'react-native';
import CustomCallBack from '../CustomCallBack'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


const ChinhSachBaoMat: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomCallBack color="#009387" label="Chính sách bảo mật" />
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, margin: 20 }}>Chính sách bảo mật</Text>
                    <Image style={{ width: '100%', height: height / 3 }} source={{ uri: 'https://maychieuchinhhang.com/wp-content/uploads/2020/08/csbm.jpg' }} />
                    <Text style={styles.Text}>
                        Thành Đạt đã ban hành và công bố chính sách bảo mật thông tin cá nhân nhằm bảo vệ thông tin cá nhân của khách hàng với các nội dung sau:
                    </Text>
                    <Text style={styles.Text}>
                        - Về việc thu thập thông tin cá nhân:{'\n'}
                        ** Ban quản lý yêu cầu kê khai thông tin cá nhân như họ và tên, địa chỉ, số điện thoại.
                    </Text>
                    <Text style={styles.Text}>
                        - Yêu cầu về độ chính xác của thông tin cá nhân:{'\n'}
                        ** Thành đạt luôn nỗ lực trong việc xử lý dữ liệu thông tin cá nhân được cung cấp. Do đó, khách hàng có trách nhiệm cung cấp thông tin chính xác.Ngoài ra Thành Đạt không chịu trách nhiệm giải quyết bất cứ tranh chấp nào liên quan tới việc cung cấp thông tin các nhân không chính xác hoặc giả mạo
                    </Text>
                    <Text style={styles.Text}>
                        - Về việc lưu trữ và bảo mật thông tin cá nhân:{"\n"}
                        ** Thành Đạt lưu trữ và bảo mật thông tin cá nhân cua khách hàng tại máy chủ riêng của công ty và được bảo mật thông tin an toàn.{"\n"}
                        ** Thời gian lưu trữ thông tin của khách hàng: các thông tin của khách hàng sẽ được lưu trữ kể từ khi khởi tạo đến lần cập nhật gần nhất, ngoài trừ chi tiết các giao dịch của khách hàng.
                    </Text>
                    <Text style={styles.Text}>
                        - Về việc sử dụng thông tin cá nhân:{"\n"}
                        ** Mọi thông tin của khách hàng, cũng như mọi thắc mắc thông tin trao đổi của khách hàng với ứng dụng đều được bảo mật bởi hệ thống.
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
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default ChinhSachBaoMat;