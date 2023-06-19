
import { StyleSheet, Text, View,Dimensions,Platform,PixelRatio } from "react-native";
import React, { useEffect, useState } from "react";
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import useLocation from "./hooks/useLocation";
import CustomCallBack from '../CustomCallBack'
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get("window")
const { height } = Dimensions.get("window")
const scale = width / 320;
export function normalize(size: any) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}
const InforApp: React.FC = () => {
  const { text, location } = useLocation();
  const [geoLocation, setGeoLocation] = useState([]);

  useEffect(() => {
    setGeoLocation(location);
    // console.log("geoLocation", geoLocation);
  }, [geoLocation, location]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomCallBack color="#009387" label="Thông tin cửa hàng" />
      <MapView
        initialRegion={{
          latitude: Number(geoLocation?.coords?.latitude) || 12.592868203342274,
          longitude: Number(geoLocation?.coords?.longitude) || 107.89489794304843,
          longitudeDelta: 0.0005,
          latitudeDelta: 0.0005,
        }}
        showsCompass={true}
        rotateEnabled={false}
        showsTraffic={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.MapView}
        title={""}
      >

        <Marker
          draggable
          coordinate={{
            latitude: 12.592868203342274,
            longitude: 107.89489794304843
          }}
          title={"title"}
          showCallout={true}
        >
          <View style={styles.marker}>
         
            <Ionicons
              name="location"
              color="red"
              size={35}>
            </Ionicons>
            <Text style={styles.text}>Cà phê Thành Đạt</Text>
          </View>

        </Marker>
      </MapView>
      <View style={styles.bottomWidget}>
        <View style={styles.whereContainer}>
          {/* <Text>{text}</Text> */}
          <Text style={{fontSize:normalize(10)}}>Tên cửa hàng : Cà phê Thành Đạt</Text>
          <Text style={{fontSize:normalize(10)}}>Tên chủ cửa hàng : Đỗ Thị Phương Hải</Text>
          <Text style={{fontSize:normalize(10)}}>Số điện thoại : 0932 200 645</Text>
          <Text style={{fontSize:normalize(10)}}>Địa chỉ cửa hàng : 03 Nguyễn Văn Linh, Cư Jut, Đắk Nông</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default InforApp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MapView: {
    flex: 1,
  },
  bottomWidget: {
    position: "absolute",
    bottom: 0,
    width: "95%",
    marginHorizontal: "2.5%",
    backgroundColor: "#fff",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    zIndex: 5,
  },
  whereContainer: {
    margin: "2.5%",
    backgroundColor: "#f1f1f1",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: "2.5%",
    paddingVertical: 8,
    marginBottom: 20,
  },
  whereTo: {
    fontSize: 22.5,
    color: "#000",
  },
  marker: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    color: "red",
  },
}); 