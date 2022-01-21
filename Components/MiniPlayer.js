import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { PlayingSongContext } from "../Context/SongPlayerProvider";
import { useTheme } from "@react-navigation/native";
import Seekbar from "../Components/Seekbar";
import mp3icon from "../assets/mp3icon.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pause, resume } from "./AudioIcons";

const MiniPlayer = ({ songs }) => {
  const { state, dispatch } = useContext(PlayingSongContext);
  const { currentIndex, isPlaying, sound } = state;
  const [songIndex, setSongIndex] = useState(currentIndex);
  const { colors, dark } = useTheme();
  const RenderPlayIcon = () => {
    return (
      <View>
        {!isPlaying ? (
          <TouchableOpacity
            onPress={async () => {
              await resume(sound);
              dispatch({ type: "isPlaying", payload: true });
            }}
          >
            <MaterialCommunityIcons
              name="play-outline"
              style={styles.audioIcons}
              color={colors.text}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              await pause(sound);
              dispatch({ type: "isPlaying", payload: false });
            }}
          >
            <MaterialCommunityIcons
              name="pause"
              style={styles.audioIcons}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (currentIndex !== undefined) {
    const { music, pictureData, artist, title } = songs[songIndex];
    return (
      <View style={{ flex: 1 ,backgroundColor:colors.background}}>
        <Seekbar />
        <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            {pictureData ? (
              <Image style={styles.albumart} source={{ uri: pictureData }} />
            ) : (
              <Image source={mp3icon} />
            )}
            <View style={{flexDirection:'column', paddingLeft: 10,justifyContent:'center'}}>
                
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.songTitle, { color: colors.text }]}
            >
              {!title ? music.filename : title}
            </Text>
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              style={[styles.songArtist, { color: colors.text }]}
            >
              {artist}
            </Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <RenderPlayIcon />
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default MiniPlayer;

const styles = StyleSheet.create({
  albumart: {
    height: 66,
    width: 66,
  },
  audioIcons: {
    fontSize: 55,
    textAlign: "center",
  },
  songTitle: {
    fontFamily: "gilRoyMedium",
    fontSize: 24,
    maxWidth: 200,
  },
  songArtist: {
    fontFamily: "gilRoyRegular",
    fontSize: 14,
    textTransform: "uppercase",
    opacity: 0.35,
    maxWidth: 200,
    textAlign: "center",
  },
});
