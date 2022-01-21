import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, DeviceEventEmitter } from "react-native";
import SecondHeaderBar from "../Components/SecondHeader";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ImageBlurShadow from "react-native-image-blur-shadow";
import mp3icon from "../assets/mp3icon.png";
import Slider from "@react-native-community/slider";
import MinutesDisplay from "../Components/MinutesDisplay";
import { TouchableOpacity } from "react-native";
import {ScreenWidth } from "react-native-elements/dist/helpers";
import AudioIcons from "../Components/AudioIcons";
import Seekbar from "../Components/Seekbar";
const PlaySongs = ({ navigation, route }) => {
  const { songs, songIndex } = route.params;
  const { colors, dark } = useTheme();

  const RenderItem = () => {

    const { music, pictureData, artist, title} = songs[songIndex];
    return (
      <>
      <View style={styles.upperArea}>
        <View style={{ marginRight: 20 }}>
          {pictureData !== null ? (
            <ImageBlurShadow
              style={styles.albumArt}
              source={{ uri: pictureData }}
              imageWidth={200}
              imageHeight={200}
              shadowOffset={30}
              shadowBlurRadius={20}
              imageBorderRadius={20}
              shadowBackgroundColor={colors.background}
            />
          ) : (
            <ImageBlurShadow
              style={styles.albumArt}
              source={mp3icon}
              imageWidth={200}
              imageHeight={200}
              shadowOffset={40}
              shadowBlurRadius={20}
              imageBorderRadius={0}
              shadowBackgroundColor={colors.background}
            />
          )}
          <View style={styles.infoWrapper}>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.songTitle, { color: colors.text }]}
              >
                {!title ? music.filename : title}
              </Text>

            </View>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={[styles.songArtist, { color: colors.text }]}
            >
              {artist}
            </Text>
          </View>
          <TouchableOpacity style={styles.likeBtn}>
                <AntDesign name="hearto" size={20} color={colors.text} />
              </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerArea}>
        <MinutesDisplay music={music}/>
        <Seekbar />
        <AudioIcons songIndex={songIndex} songs={songs} />
      </View>
      </>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        <SecondHeaderBar navigation={navigation} />
        <StatusBar
          style={!dark ? "light" : "dark"}
          backgroundColor={colors.background}
        />
      </View>
      <>
        <RenderItem />
      </>
    </View>
  );
};

export default PlaySongs;

const styles = StyleSheet.create({
  upperArea: {
    justifyContent: "center",
    alignItems: "center",
    flex:0.6
  },
  infoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  songTitle: {
    fontFamily: "gilRoyMedium",
    fontSize: 28,
    maxWidth: 200,
  },
  songArtist: {
    fontFamily: "gilRoyRegular",
    fontSize: 16,
    textTransform: "uppercase",
    opacity: 0.35,
    maxWidth: 200,
    textAlign: "center",
  },
  likeBtn: {
    opacity: 0.35,
    position: "absolute",
    left: ScreenWidth-157,
    top: 250,
  },
  lowerArea: {
    flex: 0.3,
    justifyContent:'space-around',
    alignItems: "center",
    width: "100%",
    paddingHorizontal:30
  }

});
