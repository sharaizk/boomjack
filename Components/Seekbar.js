import React,{useState, useContext} from 'react'
import { StyleSheet, DeviceEventEmitter} from 'react-native'
import { useTheme } from "@react-navigation/native";
import {PlayingSongContext} from '../Context/SongPlayerProvider';
import Slider from "@react-native-community/slider";
import {setPosition } from './AudioIcons';
const Seekbar = () => {

    const { colors, dark } = useTheme();
    const {state,dispatch} = useContext(PlayingSongContext)
    const{ sound, isPlaying} = state
    const {totalTime,currentTime} = state

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
    
    const calculateSeekbar=()=>{
    
        if(currentTime !== null && totalTime!== null){
            if(isNaN(currentTime/totalTime)){
                return 0
            }
            else {
                return (currentTime/totalTime)
            }
        }
    }
    return (
        <Slider
          value={calculateSeekbar()*1000}
          style={[
            styles.slider,
            {color: colors.text },
          ]}
          maximumValue={1}
          minimumValue={0}
          thumbTintColor={colors.text}
          minimumTrackTintColor={colors.text}
          maximumTrackTintColor={colors.text}
          onSlidingComplete={async(value)=>{

              if(sound === null || !isPlaying) return
                try {
                    const status=await setPosition(sound, Math.floor(totalTime*value))
                    dispatch({type:'currentTime', payload: status.positionMillis/1000})
                } catch (error) {
                    
                }
          }}

        />
    )
}

export default Seekbar

const styles = StyleSheet.create({
    slider: {
        width: '100%'
      },
})
