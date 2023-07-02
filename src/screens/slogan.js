import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Slogan = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Safeguarding UAE's Future By</Text>
      <Text style={styles.text}>Empowering Students and Residents</Text>
      <Text style={styles.text}>in Cybersecurity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica",
    letterSpacing: 1,
  },
 
});

export default Slogan;
