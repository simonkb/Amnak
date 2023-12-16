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
  FlatList,
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

const SocialMediaTip = ({ navigation, route }) => {
  const [beginnerLessons, setBeginnerLessons] = useState([]);
  const category = route.params.category;
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.lessonButton}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.lessonButtonText}>{item.id}</Text>
      </TouchableOpacity>
    );
  };
  const handlePress = (item) => {
    navigation.navigate("Social Media Tip Page", { data: item });
  };
  const readPdfs = () => {
    try {
      const lessonsRef = collection(
        db,
        "/Social-Media-Tips/" + category + "/tips"
      );
      onSnapshot(lessonsRef, (querySnapshot) => {
        const allLessons = [];
        querySnapshot.forEach((doc) => {
          allLessons.push({ id: doc.id, ...doc.data() });
        });
        setBeginnerLessons(allLessons);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    readPdfs();
  }, []);

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
      <View
        style={{
          width: "100%",
          height: "100%",
          paddingTop: "40%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.headingLog}>{category}</Text>
        <FlatList
          data={beginnerLessons}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.lessonsContainer}
        />
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
    top: "5%",
  },

  headingLog: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",

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

  lessonsContainer: {
    width: "90%",
    left: "5%",
    right: "5%",
    flexGrow: 1,
  },
  lessonButton: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  lessonButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SocialMediaTip;
