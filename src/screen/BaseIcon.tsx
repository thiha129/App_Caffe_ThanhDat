import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        height: 34,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 18,
        width: 34,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#b3b3b3',
    },
})

type Ic = {
    ic: string,
    cl: string,
    tp: string
}
const IconScreen: React.FC<Ic> = ({ ic, cl, tp }) => {
    return (

        <View style={
            {
                alignItems: 'center',
                backgroundColor: cl,
                borderColor: 'transparent',
                borderRadius: 10,
                borderWidth: 1,
                height: 34,
                justifyContent: 'center',
                marginLeft: 30,
                marginRight: 18,
                marginTop: 10,
                width: 34
            }
        }>
            <Icon
                size={24}
                name={ic}
                underlayColor="notifications"
                type={tp}
                color="white"
            />
        </View>

    )



}
export default IconScreen