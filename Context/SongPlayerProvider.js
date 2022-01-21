import React,{createContext, useReducer, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { initialState, reducer } from './songPlayerReducer'
export const PlayingSongContext=createContext()
const SongPlayerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState)
    return (
        <>
        <PlayingSongContext.Provider value={{state, dispatch}}>
            {children}
        </PlayingSongContext.Provider>
        </>
    )
}

export default SongPlayerProvider

const styles = StyleSheet.create({})
