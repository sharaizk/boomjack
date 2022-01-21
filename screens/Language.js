import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import HeaderBar from '../Components/Header'
const Language = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>
            <Text>
                Language
            </Text>
            <StatusBar style="light"/>
        </View>
    )
}

export default Language

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
