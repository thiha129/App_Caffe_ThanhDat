import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
    StyleSheet, View, SafeAreaView, Text
} from 'react-native';
import CustomCallBack from '../CustomCallBack'
import { ScrollView } from 'react-native-gesture-handler';


const AboutUs: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomCallBack color="#FFA100" label="Thông tin về chúng tôi" />
            <View>
                <ScrollView>
                    <Text style={{ margin: 10 }}>
                        Cà phê (bắt nguồn từ từ tiếng Pháp: café [/kafe/])[2] là một loại thức uống được ủ từ hạt cà phê rang, lấy từ quả của cây cà phê. Các giống cây cà phê được bắt nguồn từ vùng nhiệt đới châu Phi và các vùng Madagascar, Comoros, Mauritius và Réunion trên các khu vực thuộc đường xích đạo.[3] Giống cây này được xuất khẩu từ châu Phi tới các nước trên thế giới và hiện nay đã được trồng tại tổng cộng hơn 70 quốc gia, chủ yếu là các khu vực nằm gần đường xích đạo thuộc châu Mỹ, Đông Nam Á, Ấn Độ và châu Phi. Hai giống cà phê được trồng phổ biến nhất là cà phê chè, và cà phê vối. Sau khi chín, quả cà phê sẽ được hái, chế biến theo các cách thức khác nhau, rang, xay và pha với nước. Quy trình chế biến cũng có nhiều dạng như như chế biến khô, chế biến ướt, chế biến mật ong; hạt cà phê khô được rang trong nhiều điều kiện nhiệt độ khác nhau từ rang sáng tới rang tối màu; sau khi rang lại được đem đi xay theo các kích cỡ hạt mịn hay thô, và ủ với nước sôi hoặc nước lạnh, tùy thị hiếu, để tạo ra cà phê dưới dạng thức uống.

                        Cà phê có ít tính axit và có thể gây kích thích đối với người sử dụng do có chứa hàm lượng cafein. Cà phê ngày nay là một trong những thức uống phổ biến trên thế giới.[4] Thức uống này có thể được chuẩn bị và phục vụ theo nhiều dạng uống khác nhau (ví dụ như espresso, cà phê bình, latte,...). Cà phê thường được thưởng thức nóng, dù cà phê đá cũng được nhiều người ưa dùng. Nhiều nghiên cứu lâm sàng cho thấy lượng cà phê tiêu thụ trung bình là vừa đủ hoặc có lợi đối với một người lớn khỏe mạnh. Nhiều nhà nghiên cứu cũng đặt câu hỏi về việc sử dụng cà phê lâu dài có thể hạn chế chứng suy giảm trí nhớ về già hoặc giảm thiểu khả năng mắc các bệnh ung thư.[5][6]

                        Bằng chứng sớm và đáng tin cậy nhất về việc sử dụng cà phê được phát hiện vào thế kỷ 15 tại các lăng mộ Sufi giáo ở Yemen.[7] Cũng tại bán đảo Ả Rập, các hạt cà phê đầu tiên được rang và ủ theo cách tương tự như phương pháp chúng ta vẫn làm ngày nay. Hạt cà phê ban đầu được xuất khẩu từ Đông Phi tới Yemen, do cây cà phê chè lúc đó được cho là có nguồn gốc từ người bản địa.[8] Các thương nhân Yemen đã đem cà phê về quê nhà và bắt đầu trồng các hạt giống. Tới thế kỷ 16, cà phê đã được đem tới Persia, Thổ Nhĩ Kỳ và Bắc Phi. Từ đây, cà phê được lan rộng khắp châu Âu và phần còn lại của thế giới.

                        Cà phê (bắt nguồn từ từ tiếng Pháp: café [/kafe/])[2] là một loại thức uống được ủ từ hạt cà phê rang, lấy từ quả của cây cà phê. Các giống cây cà phê được bắt nguồn từ vùng nhiệt đới châu Phi và các vùng Madagascar, Comoros, Mauritius và Réunion trên các khu vực thuộc đường xích đạo.[3] Giống cây này được xuất khẩu từ châu Phi tới các nước trên thế giới và hiện nay đã được trồng tại tổng cộng hơn 70 quốc gia, chủ yếu là các khu vực nằm gần đường xích đạo thuộc châu Mỹ, Đông Nam Á, Ấn Độ và châu Phi. Hai giống cà phê được trồng phổ biến nhất là cà phê chè, và cà phê vối. Sau khi chín, quả cà phê sẽ được hái, chế biến theo các cách thức khác nhau, rang, xay và pha với nước. Quy trình chế biến cũng có nhiều dạng như như chế biến khô, chế biến ướt, chế biến mật ong; hạt cà phê khô được rang trong nhiều điều kiện nhiệt độ khác nhau từ rang sáng tới rang tối màu; sau khi rang lại được đem đi xay theo các kích cỡ hạt mịn hay thô, và ủ với nước sôi hoặc nước lạnh, tùy thị hiếu, để tạo ra cà phê dưới dạng thức uống.

                        Cà phê có ít tính axit và có thể gây kích thích đối với người sử dụng do có chứa hàm lượng cafein. Cà phê ngày nay là một trong những thức uống phổ biến trên thế giới.[4] Thức uống này có thể được chuẩn bị và phục vụ theo nhiều dạng uống khác nhau (ví dụ như espresso, cà phê bình, latte,...). Cà phê thường được thưởng thức nóng, dù cà phê đá cũng được nhiều người ưa dùng. Nhiều nghiên cứu lâm sàng cho thấy lượng cà phê tiêu thụ trung bình là vừa đủ hoặc có lợi đối với một người lớn khỏe mạnh. Nhiều nhà nghiên cứu cũng đặt câu hỏi về việc sử dụng cà phê lâu dài có thể hạn chế chứng suy giảm trí nhớ về già hoặc giảm thiểu khả năng mắc các bệnh ung thư.[5][6]

                        Bằng chứng sớm và đáng tin cậy nhất về việc sử dụng cà phê được phát hiện vào thế kỷ 15 tại các lăng mộ Sufi giáo ở Yemen.[7] Cũng tại bán đảo Ả Rập, các hạt cà phê đầu tiên được rang và ủ theo cách tương tự như phương pháp chúng ta vẫn làm ngày nay. Hạt cà phê ban đầu được xuất khẩu từ Đông Phi tới Yemen, do cây cà phê chè lúc đó được cho là có nguồn gốc từ người bản địa.[8] Các thương nhân Yemen đã đem cà phê về quê nhà và bắt đầu trồng các hạt giống. Tới thế kỷ 16, cà phê đã được đem tới Persia, Thổ Nhĩ Kỳ và Bắc Phi. Từ đây, cà phê được lan rộng khắp châu Âu và phần còn lại của thế giới.
                    </Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default AboutUs;