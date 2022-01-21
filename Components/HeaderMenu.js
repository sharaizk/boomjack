import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';
const HeaderMenu = ({navigation}) => {
    const { colors } = useTheme();
  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.openDrawer()}>
        <AntDesign name="menufold" size={30} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({});
