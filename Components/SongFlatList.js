import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter
} from "react-native";
import { useTheme } from "@react-navigation/native";
import mp3icon from "../assets/mp3icon.png";
import ImageBlurShadow from "react-native-image-blur-shadow";
const SongFlatList = ({ songs, navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    DeviceEventEmitter.addListener("event.testEvent", (eventData) =>{
      navigation.navigate("SongPlayer",{
        songIndex: eventData.index,
        songs:eventData.songs
      })
    });
    return () => {
      DeviceEventEmitter.removeListener("event.testEvent")
    }
  },[])
  
  const renderItem = ({ item, index }) => {
    const { music, pictureData, artist, title } = item;
    return (
      <View style={styles.songWrapper}>
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginTop: 20 }}
            onPress={() =>    navigation.navigate("SongPlayer", {
              songIndex: index,
              songs: songs
            })}
          >
            {pictureData !== null ? (
              <ImageBlurShadow
                style={styles.albumArt}
                source={{ uri: pictureData }}
                imageWidth={150}
                imageHeight={150}
                shadowOffset={30}
                shadowBlurRadius={20}
                imageBorderRadius={0}
                shadowBackgroundColor={colors.background}
              />
            ) : (
              <ImageBlurShadow
                style={styles.albumArt}
                source={mp3icon}
                imageWidth={150}
                imageHeight={150}
                shadowOffset={40}
                shadowBlurRadius={20}
                imageBorderRadius={0}
                shadowBackgroundColor={colors.background}
              />
            )}
            <View style={styles.infoWrapper}>
              <Text style={[styles.songTitle, { color: colors.text }]}>
                {!title ? music.filename : title}
              </Text>
              <Text style={[styles.songArtist, { color: colors.text }]}>
                {artist}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.music.filename}
        horizontal={true}
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default SongFlatList;

const styles = StyleSheet.create({
  songWrapper: {
    flex: 1,
  },
  albumArt: {
    justifyContent: "center",
    alignSelf: "center",
  },
  songTitle: {
    textAlign: "center",
    fontFamily: "gilRoyMedium",
  },
  songArtist: {
    fontFamily: "gilRoyRegular",
    opacity: 0.35,
    textAlign: "center",
    marginTop: 2.5,
    textTransform: "uppercase",
  },
  infoWrapper: {
    maxWidth: 200,
    marginTop: 5,
  },
});
