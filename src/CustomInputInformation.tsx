import React from 'react';
import { View, Text, TextInput, Alert, Dimensions, } from 'react-native';

const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")

type Props = {
    label: string;
    placeholde: string;
    onChangeText: (value: string) => void;
    value?: string;
    type: string
}
const CustomInputInformation: React.FC<Props> = ({ label, placeholde, onChangeText, value, type }) => {
    return (
        <View style={{ height: height / 9, width: width / 1.1, alignItems: 'flex-start' }}>
            <Text style={{
            flex:1,
                height: 50,
      
                fontWeight: "bold",
              
            }}>{label}</Text>
            <TextInput style={{
                 flex: 1,
                 height: 50,
                borderRadius: 10,
            
                borderColor: '#9a9191',
                borderBottomWidth:1,
                color: '#443e3e'
            }}
                keyboardType={type}
                placeholder={placeholde}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    );
}

export default CustomInputInformation;
