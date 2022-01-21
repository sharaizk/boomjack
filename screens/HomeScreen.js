import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View,ScrollView} from "react-native";
import { AudioContext } from "../Context/AudioProvider";
import { useTheme } from "@react-navigation/native";
import HeaderBar from "../Components/Header";
import Recommeded from "../Components/Recommeded";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { PlayingSongContext } from "../Context/SongPlayerProvider";
import MiniPlayer from "../Components/MiniPlayer";

const HomeScreen = React.memo(({ navigation }) => {
  const { colors, dark } = useTheme();
  const songs = useContext(AudioContext);
  const { state } = useContext(PlayingSongContext);
  const { sound,isFinished } = state;

  const renderMiniPlayer = () => {
    return (
      <View style={styles.miniplayer}>
        <MiniPlayer songs={songs.audioFiles} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <HeaderBar navigation={navigation} />
        <StatusBar
          style={!dark ? "light" : "dark"}
          backgroundColor={colors.background}
        />
      </View>
      <ScrollView>
      <View style={styles.recommended}>
        <Recommeded songs={songs.audioFiles} navigation={navigation} />
      </View>
      {/* <View style={styles.recommended}>
        <Recommeded songs={songs.audioFiles} navigation={navigation} />
      </View> */}

      </ScrollView>
      {/* {sound!==null && !isFinished? renderMiniPlayer(): null} */}
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recommended: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  miniplayer: {
    height: 90,
    width: "100%",
    position: "absolute",
    top: ScreenHeight - 90,
  },
});
