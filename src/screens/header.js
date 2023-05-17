import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.appIcon}
        resizeMode="contain"
      />
      <Text style={styles.appName}>Amnak UAE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    paddingTop: 65,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
  },
  appIcon: {
    width: 60,
    height: 60,
    left:20,
    top:40,
    position:'absolute'
  },
  appName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
