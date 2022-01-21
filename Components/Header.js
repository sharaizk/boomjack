import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import HeaderMenu from "./HeaderMenu";
const HeaderBar = ({navigation}) => {
    const { colors } = useTheme();
  return (
    <Header
      leftComponent={<HeaderMenu navigation={navigation}/>}
      rightComponent={<AntDesign name="search1" size={30} color={colors.text} />}
      containerStyle={{
          backgroundColor:colors.background,
          borderBottomWidth:0,
          paddingHorizontal:20
      }}
    />
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
});
