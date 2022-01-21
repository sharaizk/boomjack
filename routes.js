import React,{useState, useRef} from "react";
// Navigation
import { View } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from './Components/DrawerContent';
import HomeScreen from "./screens/HomeScreen";
import LikedSongs from './screens/LikedSongs';
import FAQ from './screens/FAQ';
import Language from './screens/Language'
import ContactUS from './screens/ContactUS'
import Settings from "./screens/Settings";
import PlaySongs from "./screens/PlaySongs";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Route = () => {

  const [isDarkMode, setDarkMode] = useState(false)
  const LightTheme1 = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background:'#091227',
      text:'#EAF0FF',
      tintColor:'#000',
    },
  };  

  const DarkThemeCustom={
    ...DarkTheme,
    colors:{
      ...DarkTheme.colors,
      background:'#EAF0FF',
      text:'#091227'
    }
  }
  const darkthemeRef = useRef(false)
  const theme=darkthemeRef.current === true ? DarkThemeCustom : LightTheme1

  const themeChanger = ()=>{
    darkthemeRef.current = (!darkthemeRef.current)
  }

  const Drawers =()=>{
    return(
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props} themeChanger={themeChanger} isDarkMode={isDarkMode}/>} overlayColor='rgba(0, 0, 0, 0)' >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="LikedSongs" component={LikedSongs} />
            <Drawer.Screen name="Language" component={Language} />
            <Drawer.Screen name="ContactUS" component={ContactUS} />
            <Drawer.Screen name="FAQ" component={FAQ} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    )
  }
  return (
    <View style={{flex: 1,backgroundColor:theme.colors.background}}>
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      >
        <>
          <Stack.Screen name="Drawer" component={Drawers} />
          <Stack.Screen name="SongPlayer" component={PlaySongs} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};

export default Route;
