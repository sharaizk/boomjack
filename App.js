import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Route from "./routes";
import AudioProvider from "./Context/AudioProvider";
import SongPlayerProvider from './Context/SongPlayerProvider';
export default function App() {
  const [loading, setLoading] = useState(true);
  const loadFonts = async () => {
    await Font.loadAsync({
      gilRoyMedium: require("./assets/Fonts/Gilroy-Medium.ttf"),
      gilRoyBold: require("./assets/Fonts/Gilroy-Bold.ttf"),
      gilRoyRegular: require("./assets/Fonts/Gilroy-Regular.ttf")
    });
    setTimeout(()=>{
      setLoading(false);
    },5000)
  };
  useEffect(() => {
    loadFonts();

  }, [loadFonts]);

  return (
    <>
      <AudioProvider>
      <SongPlayerProvider>
      {!loading ? (
          <>
          <View style={styles.container}>
            <Route />
          </View>
          <StatusBar style="light" />
          </>
      ) : (
        <View  style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'#EAF0FF'}}>
        <ActivityIndicator size="large" color='#091227'/>
        </View>
      )}
      </SongPlayerProvider>
      </AudioProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
