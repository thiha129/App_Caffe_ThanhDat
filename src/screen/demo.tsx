
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
try {
  firebase.initializeApp({
      apiKey: "AIzaSyCriv53iKnzazfNxzWEOo8Z7v2TrhHkTx0",
      authDomain: "thanhdat-6f990.firebaseapp.com",
      databaseURL: "https://thanhdat-6f990-default-rtdb.firebaseio.com/",
      projectId: "thanhdat-6f990",
      storageBucket: "thanhdat-6f990.appspot.com",
      messagingSenderId: "999576525954",
      appId: "1:999576525954:web:e00974ff69dab0f49ae89b",
      measurementId: "G-FHSB15MCR8"
  });
} catch (err) {
  // ignore app already initialized error in snack
}

export default ({ }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{width:200,height:50,backgroundColor:'blue', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'white'}}>Register Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2.5%",
    paddingVertical: 8,
    marginBottom: 20,
  },
  whereTo: {
    fontSize: 22.5,
    color: "#000",
  },
}); 