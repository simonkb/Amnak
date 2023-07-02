import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Slogan from "./slogan";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const LandingPage = ({ navigation }) => {
  onAuthStateChanged(auth, (user) => {
    if (user?.emailVerified) {
      navigation.navigate("Main");
    }
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.blurBackground}>
        <View>
          <Image
            source={require("../../assets/icon.png")}
            style={{ alignSelf: "center", width: 300, height: 300 }}
          />
          <Slogan></Slogan>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Cyber Security News");
          }}
        >
          <Text style={styles.buttonText}>Cyber Security News</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Certifications");
          }}
        >
          <Text style={styles.buttonText}>
            Cyber Security Certifications Roadmap
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  blurBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LandingPage;
