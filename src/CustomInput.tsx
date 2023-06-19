import React from 'react';
import { View, Text, TextInput, Alert, Dimensions, } from 'react-native';

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

type Props = {
    label: string;
    placeholde: string;
    changeText: (value: string) => void;
    value: string;
    colorText: string;
    borderColor: string;
    borderWidth: number;
}
const CustomInput: React.FC<Props> = ({ label, placeholde, changeText, value, colorText, borderWidth, borderColor }) => {
    return (
        <View style={{ height: height / 9, width: width / 1.1, alignItems: 'center' }}>
            <Text style={{ height: height / 25, width: width / 1.1, fontWeight: "bold", paddingLeft: 5, color: colorText }}>{label}</Text>
            <TextInput style={{ height: height / 15, width: width / 1.1, borderColor: borderColor, borderWidth: borderWidth, borderRadius: 10, paddingLeft: 10 }} placeholder={placeholde} onChangeText={changeText} value={value} />
        </View>
    );
}

export default CustomInput;
