import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
type ButtonType = {
    label: string;
    colorboder: string;
    colortext: string;
    firstcolor: string;
    secondcolor: string;
    numbermarginTop: number;
    onPress: (val: string) => void;

};
const CustomButtonLoginScreen: React.FC<ButtonType> = ({ label, colorboder, colortext, numbermarginTop, onPress,firstcolor,secondcolor }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(label)}
            style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: colorboder,
                borderWidth: 1,
                marginTop: numbermarginTop,
            }}
    >
        <LinearGradient
        // colors={['#009387', '#00786E']}
        colors={[firstcolor, secondcolor]}
        style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: colorboder,
            borderWidth: 1,
           
        }}
    >
          
            <Text style={{
                fontSize: width/30,
                color: colortext,
                fontFamily: 'Tahoma_Regular_font'
                }}>{label}</Text>
              
          
            </LinearGradient>
            </TouchableOpacity>
    );
}
export default CustomButtonLoginScreen;