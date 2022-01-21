import React, {useContext} from "react";
import { StyleSheet, Text, View} from "react-native";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather, FontAwesome5,Entypo,MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

const DrawerContent = (props) => {
  const {navigation, themeChanger,isDarkMode} = props
  const { colors } = useTheme();
  return (
    <View style={{flex:1,backgroundColor: colors.background}}>
    <View style={styles.drawer}>
    <View  style={styles.top}>
        <TouchableOpacity onPress={()=>navigation.closeDrawer()}>
          <Feather name="x" style={styles.icnBtn} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={themeChanger}>
          <Ionicons
            name="ios-moon-outline"
            style={[styles.icnBtn,{transform: [{rotateY: '180deg'}], opacity:0.5}]}
            color={colors.text}
          />
        </TouchableOpacity>
        </View>
      <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.screen}>
       
            <DrawerItem
              icon={() => (
                <AntDesign name="home" size={24} color={colors.text}/>
              )}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
            <DrawerItem
              icon={() => (
                <FontAwesome5 name="heart" size={24} color={colors.text} />
              )}
              label="Liked Songs"
              onPress={() => {
                navigation.navigate("LikedSongs");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
            <DrawerItem
              icon={() => (
                <Entypo name="globe" size={24} color={colors.text} />
              )}
              label="Language"
              onPress={() => {
                navigation.navigate("Language");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons name="comment-text-outline" size={24} color={colors.text} />
              )}
              label="Contact US"
              onPress={() => {
                navigation.navigate("ContactUS");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={colors.text} />
              )}
              label="FAQs"
              onPress={() => {
                navigation.navigate("FAQ");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
          <DrawerItem
              icon={() => (
                <Ionicons name="settings-outline" size={24} color={colors.text} />
              )}
              label="Settings"
              onPress={() => {
                navigation.navigate("Settings");
              }}
              labelStyle={[styles.drawerItem,{color:colors.text}]}
            />
          </Drawer.Section>
      </DrawerContentScrollView>
    </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    marginTop:40
  },
  top: {
    flex:0.1,
    flexDirection: "row",
    justifyContent:'space-between',
    width:'100%',
    paddingHorizontal:20
  },
  icnBtn: {
    fontSize: 30
  },
  screen:{
    flex:0.9,
    width:'100%'
  },
  drawerItem:{
    fontSize:20,
    fontFamily:'gilRoyMedium'
  }
});
