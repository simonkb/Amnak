import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import ChatAssistant from "./chatAssistant";
import Quiz from "./BeginnerQuiz";
import { db, auth } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const SocialMediaTipsHome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.topContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.appIcon}
        />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Social Media Tip", {
                category: "WhatsApp",
              });
            }}
          >
            <MaterialCommunityIcons
              name="whatsapp"
              color={"green"}
              size={40}
            ></MaterialCommunityIcons>
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Social Media Tip", {
                category: "Instagram",
              });
            }}
          >
            <MaterialCommunityIcons
              name="instagram"
              color={"green"}
              size={40}
            ></MaterialCommunityIcons>
            <Text style={styles.buttonText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}    onPress={() => {
              navigation.navigate("Social Media Tip", {
                category: "Facebook",
              });
            }}>
            <MaterialCommunityIcons
              name="facebook"
              color={"green"}
              size={40}
            ></MaterialCommunityIcons>
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <MaterialCommunityIcons
              name="snapchat"
              color={"green"}
              size={40}
            ></MaterialCommunityIcons>
            <Text style={styles.buttonText}>Snapchat </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <MaterialCommunityIcons
              name="music-note"
              color={"green"}
              size={40}
            ></MaterialCommunityIcons>
            <Text style={styles.buttonText}>TikTok </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <ChatAssistant />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    top: 0,
    padding: 3,
  },
  topContainer: {
    position: "absolute",
    top: 0,
  },
  appIcon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    top: "30%",
  },
  quizButton: {
    minWidth: "80%",
    height: 40,
    backgroundColor: "blue",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  quizButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  headingLog: {
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "100%",
    minWidth: "100%",
    paddingHorizontal: 10,
    color: "white",
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center", // Center vertically
    marginVertical: 5,
    top: "60%",
    paddingBottom: "20%",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    width: "100%",
  },
});

export default SocialMediaTipsHome;
