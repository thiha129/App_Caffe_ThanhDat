import React from 'react';
import { View, Text, TextInput, Alert, Dimensions, StyleSheet, } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const widthIcon = 150;
type Props = {
    label: string;
    color: string;
}

const CustomHeader: React.FC<Props> = ({ label, color }) => {
    const navigation = useNavigation();
    const horizontalAnimation = {
        gestureDirection: 'horizontal',
        gestureEnabled:true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      };
    return (
        <View style={[styles.pay, { backgroundColor: color }]}>
            <TouchableOpacity onPress={() => {navigation.goBack() ,horizontalAnimation}}>
                <Icon style={styles.payIcon} type="ionicons" name="arrow-back-ios" color="white"></Icon>
            </TouchableOpacity>
            <Text style={[styles.payText, styles.fontFamily]}>{label}</Text>
        </View>
    );
}

export default CustomHeader;
const styles = StyleSheet.create({
    pay: {
        width: width,
        height: height / 17,
        backgroundColor: '#FCB900',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: "row",


    },
    payText: {
        fontSize: width/20,
        color: "white",
        flex: 1,
        textAlign: 'center',
        right: widthIcon / 2

    },
    payIcon: {
        alignItems: "flex-start",
        justifyContent: "center",
        position: 'relative',
        width: widthIcon,
        height: height / 17,
        left: 20
    },
    fontFamily: {
        fontFamily: 'Tahoma_Regular_font'
    }
})