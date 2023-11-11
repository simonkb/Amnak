import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { MARGIN, SIZE } from "./utils";

const Box = ({ text }) => {
  const backgroundColor = "#6e48eb";
  //"#6e48eb" : "#c0a946";
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding:5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#cde9e4",
  },
});
