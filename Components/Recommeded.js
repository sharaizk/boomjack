import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import SongFlatList from './SongFlatList';
import {PlayingSongContext} from "../Context/SongPlayerProvider";
import SongPlayerProvider from '../Context/SongPlayerProvider';
const Recommeded = ({songs,navigation}) => {
    const {colors} = useTheme()
    return (
        <View style={styles.container}>
            <Text style={[styles.head, {color:colors.text}]}>Recommended for you</Text>
            <View>
            <SongFlatList songs={songs} navigation={navigation}/>
            </View>
        </View>
    )
}

export default Recommeded

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:20
    },
    head:{
        fontFamily:'gilRoyBold',
        fontSize:28,
    }
})
