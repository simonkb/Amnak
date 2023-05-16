import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  collection,
  doc,
  onSnapshot,
} from "firebase/firestore";
import ChatAssistant from "./chatAssistant";
import { db, auth } from "../config/firebaseConfig";

const Lessons = ({ navigation }) => {
  const handlePress = (data) => {
    if (userData.isFirstTime) {
      Alert.alert("Error", "lease complete the beginners quiz first");
      navigation.navigate("Home");
    } else {
      navigation.navigate("Lesson", { lesson: data });
    }
  };
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

  const [userData, setUserData] = useState(null);
  const [lessons, setLessons] = useState([]);

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user !== null && user.emailVerified) {
        const uid = user.uid;
        try {
          onSnapshot(doc(db, "Users", uid), (doc) => {
            setUserData(doc.data());
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const readLessons = () => {
    if (userData) {
      try {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.ageGroup +
            "/Levels/" +
            userData?.level +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setLessons(allLessons);
          if (allLessons.length === 0) {
            Alert.alert(
              "Message",
              "We are sorry to let you know that we don't have any lesson for this level yet. We will add it asap."
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (lessons.length === 0) readLessons();

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.headingText}>{userData?.level} Lessons</Text>
        </View>

        <FlatList
          data={lessons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lessonsContainer}
        />

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
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingTop: 80,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: 0,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  lessonsContainer: {
    width: "80%",
    left: "10%",
    right: "10%",
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
  },
});

export default Lessons;
