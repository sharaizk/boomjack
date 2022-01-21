import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
const SecondHeaderBar = ({ navigation }) => {
  const { colors, dark } = useTheme();
  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={24}
              style={[styles.backBtn,{color:colors.text}]}
            />
          </TouchableOpacity>
        }
        centerComponent={<Text style={[styles.headLabel, {color:colors.text}]}>Playing Now</Text>}
        containerStyle={{
          backgroundColor: colors.background,
          borderBottomWidth: 0,
          paddingHorizontal: 20,
        }}
      />
    </>
  );
};

export default SecondHeaderBar;

const styles = StyleSheet.create({
  headLabel: {
    fontFamily: "gilRoyMedium",
    fontSize: 24,
  },
});
