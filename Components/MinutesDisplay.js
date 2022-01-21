import React,{useContext, useState, useEffect} from 'react'
import { StyleSheet, Text, View, DeviceEventEmitter } from 'react-native'
import { useTheme } from "@react-navigation/native";
import {PlayingSongContext} from '../Context/SongPlayerProvider';
const MinutesDisplay = ({music}) => {

    const convertTime=(minutes)=>{
        if(minutes){
          const hrs=minutes/60
          const minute=hrs.toString().split('.')[0]
          const percent = parseInt(hrs.toString().split('.')[1].slice(0,2))
          const sec = Math.ceil((60*percent)/100)
          if(parseInt(minute) <10 &&sec < 10){
            return `0${minute}:0${sec}`
          }
          else if(sec == 60){
            return `${minute+1}:00`
          }
          else if(parseInt(minute) < 10){
            return `0${minute}:${sec}`
          }
          else if(sec<10){
            return `${minute}:0${sec}`
          }
          return `${minute}:${sec}`
        }
        return '00:00'
      }

    const {state} = useContext(PlayingSongContext)
    const {currentTime} = state
    const { colors, dark } = useTheme();
    return (
        <View style={styles.timeArea}>
         <Text style={[styles.minute, {color:colors.text, opacity:0.35}]}>{convertTime(currentTime)}</Text>
         <Text style={[styles.minute, {color:colors.text, opacity:0.35}]}>{convertTime(music.duration)}</Text>
        </View>
    )
}

export default MinutesDisplay

const styles = StyleSheet.create({
    timeArea:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 10,
      },
      minute:{
        fontFamily:'gilRoyRegular',
        fontSize:14
      }
})
