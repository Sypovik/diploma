import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, StatusBar, Text, SafeAreaView, View, FlatList } from 'react-native';

// import List from './componets/list';
import MainStack from './navigate';
export default function App() {


  return (

    <SafeAreaView style={styles.AndroidSafeArea}>
      <MainStack/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
