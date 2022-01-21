import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import {PlayingSongContext} from '../Context/SongPlayerProvider';
import { Audio } from "expo-av";

export const setPosition=async(soundObj, position)=>{
  try {
    return await soundObj.setPositionAsync(position)
  } catch (error) {
    
  }
}

export const pause=async(soundObj)=>{
  soundObj.pauseAsync()
}

export const resume=async(soundObj)=>{
  soundObj.playAsync()
}

const AudioIcons = ({ songs, songIndex }) => {
  const {state, dispatch} = useContext(PlayingSongContext)
  const {sound, isFinished, isPlaying} = state
  const { music } = songs[songIndex];
  async function playSound() {
    await Audio.setAudioModeAsync({staysActiveInBackground:true})
    const { sound } = await Audio.Sound.createAsync({ uri: `${music.uri}`},{shouldPlay:true, progressUpdateIntervalMillis:1000});
    dispatch({type:'currentIndex',payload: songIndex})
    dispatch({type: 'sound', payload: sound})
    dispatch({type:'isPlaying',payload:true})
    dispatch({type:'isFinished',payload:false})
    sound.setOnPlaybackStatusUpdate(async (status) => {
    if(status.isPlaying && status.isLoaded){
      dispatch({type:'currentTime', payload:status.positionMillis/1000})
      dispatch({type:'totalTime', payload:status.durationMillis})
    }
    if (status.didJustFinish === true) {
      dispatch({type: 'isFinished', payload:true})
      await sound.unloadAsync()
    }
  })
    await sound.playAsync();
  }

  useEffect(() => {
    if(sound !==null){
      const res=async()=>{
        const rep=await sound.getStatusAsync()
       if(`file://${rep.uri}` !==  music.uri){

  
        dispatch({type:'isPlaying',payload:false})
        dispatch({type:'isFinished',payload:false})
        dispatch({type:'currentTime', payload:0})
        dispatch({type:'totalTime', payload:0})
        sound.unloadAsync();
       }
      }
      res()
    }
  }, []);

  const Next = () => {

    if (songs.length - 1 !== songIndex) {
      const index = songIndex + 1;
      DeviceEventEmitter.emit("event.testEvent", { index,songs });
      dispatch({type:'isPlaying', payload:false})
      dispatch({type:'isFinished', payload:false})
      
    }
  };

  const Prev = () => {
    if (songIndex !== 0) {
      dispatch({type:'isPlaying', payload:false})
      dispatch({type:'isFinished', payload:false})
      const index = songIndex - 1;
      DeviceEventEmitter.emit("event.testEvent", { index,songs });
    }
  };

  const songResumer = async () => {
    await sound.playAsync();
    dispatch({type:'isPlaying', payload:true})
  };
  const songPauser = async () => {
    await sound.pauseAsync();
    dispatch({type:'isPlaying', payload:false})
  };

  const PlayPauseToggle = () => {
    return (
      <>
        {!isPlaying ? (
          <TouchableOpacity onPress={songResumer}>
            <MaterialCommunityIcons
              name="play-outline"
              style={styles.audioIcons}
              color={colors.text}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={songPauser}>
            <MaterialCommunityIcons
              name="pause"
              style={styles.audioIcons}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Prev}>
        <MaterialCommunityIcons
          name="skip-previous-outline"
          style={styles.audioIcons}
          color={colors.text}
        />
      </TouchableOpacity>

      {sound === null || isFinished===true ? (
        <TouchableOpacity onPress={playSound}>
          <MaterialCommunityIcons
            name="play-outline"
            style={styles.audioIcons}
            color={colors.text}
          />
        </TouchableOpacity>
      ) : (
        <PlayPauseToggle />
      )}

      <TouchableOpacity onPress={Next}>
        <MaterialCommunityIcons
          name="skip-next-outline"
          style={styles.audioIcons}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AudioIcons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: ScreenWidth - 200,
  },
  audioIcons: {
    fontSize: 60,
  },
});
