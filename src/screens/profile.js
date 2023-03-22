import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
} from "react-native";
import ChatAssistant from "./chatAssistant";
import { signOut } from "firebase/auth";
import { db, auth } from "../config/firebaseConfig";

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("johndoe@gmail.com");
  const [userLevel, setUserLevel] = useState("Beginner");
  const [userPoints, setUserPoints] = useState(1000);
  const [userRank, setUserRank] = useState(1);

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.blurBackground}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image
              source={require("../../assets/profile.webp")}
              style={styles.profilePic}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.text}>{userName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{userEmail}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Level:</Text>
              <Text style={styles.text}>{userLevel}</Text>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>Points:</Text>
              <Text style={styles.pointsText}>{userPoints}</Text>
            </View>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>Rank:</Text>
              <Text style={styles.pointsText}>{userRank}</Text>
            </View>
          </View>
          <Button
            title="Logout"
            onPress={() => {
              signOut(auth)
                .then(() => {
                  // User signed out
                  navigation.navigate("Login");
                })
                .catch((error) => {
                  // Handle errors here
                });
            }}
          ></Button>
        </View>
        <View
          style={{ bottom: 20, left: 0, position: "absolute", width: "100%" }}
        >
          <ChatAssistant />
        </View>
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
  blurBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
  },
  container: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.8,
  },
  topContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  infoContainer: {
    width: "100%",
    height: "25%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  pointsContainer: {
    width: "100%",
    height: "25%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  pointsLabel: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 40,
    color: "green",
  },
});

export default Profile;
