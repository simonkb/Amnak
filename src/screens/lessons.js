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
import { collection, doc, onSnapshot } from "firebase/firestore";
import ChatAssistant from "./chatAssistant";
import { db, auth } from "../config/firebaseConfig";
import CollapsibleBar from "./CollabsibleBar";

const Lessons = ({ navigation }) => {
  const handlePress = (data) => {
    if (userData.isFirstTime) {
      Alert.alert("Error", "Please complete the beginners quiz first");
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
  const [beginnerLessons, setBeginnerLessons] = useState([]);
  const [intermediateLessons, setIntermediateLessons] = useState([]);
  const [advancedLessons, setAdvancedLessons] = useState([]);

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user) {
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

  useEffect(() => {
    if (userData) {
      readBeginnerLessons();
      readIntermediateLessons();
      readAdvancedLessons();
    }
  }, [userData]);

  const readBeginnerLessons = () => {
    try {
      if (userData.category !== "Employee") {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.ageGroup +
            "/Levels/" +
            "Beginners" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setBeginnerLessons(allLessons);
        });
      } else {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.category +
            "/Levels/" +
            "Beginners" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setBeginnerLessons(allLessons);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const readIntermediateLessons = () => {
    try {
      if (userData.category !== "Employee") {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.ageGroup +
            "/Levels/" +
            "Intermediate" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setIntermediateLessons(allLessons);
        });
      } else {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.category +
            "/Levels/" +
            "Intermediate" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setIntermediateLessons(allLessons);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const readAdvancedLessons = () => {
    try {
      if (userData.category !== "Employee") {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.ageGroup +
            "/Levels/" +
            "Advanced" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setAdvancedLessons(allLessons);
        });
      } else {
        const lessonsRef = collection(
          db,
          "/Lessons/" +
            userData?.category +
            "/Levels/" +
            "Advanced" +
            "/lessons"
        );
        onSnapshot(lessonsRef, (querySnapshot) => {
          const allLessons = [];
          querySnapshot.forEach((doc) => {
            allLessons.push({ id: doc.id, ...doc.data() });
          });
          setAdvancedLessons(allLessons);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  var message =
    "Sorry, we don't have any lessons for this level yet. We will upload them shortly.";
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
          {userData?.category !== "Employee" && (
            <Text
              style={{
                fontSize: 24,
                fontWeight: "800",
                color: "white",
              }}
            >
              Your Level is: {userData?.level}
            </Text>
          )}
        </View>
        {userData?.category !== "Employee" ? (
          <View
            contentContainerStyle={styles.container}
            style={styles.container}
          >
            <CollapsibleBar
              title={"Beginner Lessons"}
              isNotCurrentLevel={userData?.level !== "Beginners"}
            >
              <FlatList
                data={beginnerLessons}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.lessonsContainer}
              />
              {beginnerLessons.length === 0 && (
                <Text style={styles.message}>{message}</Text>
              )}
            </CollapsibleBar>
            <CollapsibleBar
              title={"Intermediate Lessons"}
              isNotCurrentLevel={userData?.level !== "Intermediate"}
            >
              <FlatList
                data={intermediateLessons}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.lessonsContainer}
              />
              {intermediateLessons.length === 0 && (
                <Text style={styles.message}>{message}</Text>
              )}
            </CollapsibleBar>
            <CollapsibleBar
              title={"Advanced Lessons"}
              isNotCurrentLevel={userData?.level !== "Advanced"}
            >
              <FlatList
                data={advancedLessons}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.lessonsContainer}
              />
              {advancedLessons.length === 0 && (
                <Text style={styles.message}>{message}</Text>
              )}
            </CollapsibleBar>
          </View>
        ) : (
          <>
            <FlatList
              data={beginnerLessons}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.lessonsContainer}
            />
            {beginnerLessons.length === 0 && (
              <Text style={styles.message}>{message}</Text>
            )}
          </>
        )}

        <View
          style={{ bottom: 0, left: 0, position: "absolute", width: "100%" }}
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
    paddingTop: 0,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 20,
    top: 10,
  },
  appIcon: {
    width: 150,
    height: 150,
    borderRadius: 100,
    top: 20,
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
  message: { fontSize: 14, margin: 5, fontWeight: "600" },
});

export default Lessons;
