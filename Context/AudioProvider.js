import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import MusicInfo from "expo-music-info";
export const AudioContext = createContext();

const AudioProvider = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    getPermission();
  }, []);

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      { text: "Iam Ready", onPress: () => getPermission() },
      { text: "Cancel", onPress: () => permissionAlert() },
    ]);
  };
  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    // media = await MediaLibrary.getAssetsAsync({
    //   mediaType: "audio",
    //   first: media.totalCount,
    // });
    const { assets } = media;
    let files = []
    for(let i in assets){
      let metadata = await MusicInfo.getMusicInfoAsync(
        assets[i].uri,
        {
          title: true,
          artist: false,
          album: false,
          genre: false,
          picture: true,
        }
      );
      let pictureData
      if(metadata !== null){
        if(metadata.picture===undefined || metadata.picture == null || !metadata.picture){
          pictureData=null
        }
        else{
          pictureData = metadata.picture.pictureData
        }
        const{artist,title} = metadata
        const music = assets[i]
        const file = { music, pictureData,artist, title}
        files[files.length] = file
      }
    }
    setAudioFiles(files)
  };
  const getPermission = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      console.log(status, canAskAgain);
      if (status === "denied" && canAskAgain) {
        permissionAlert();
      }
      if (status === "granted") {
        getAudioFiles();
      }
      if (status === "denied" && !canAskAgain) {
        permissionAlert();
      }
    }
  };

  return (
    <AudioContext.Provider value={{ audioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
