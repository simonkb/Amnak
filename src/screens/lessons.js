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
  ScrollView,
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

  useEffect(() => {
    if (userData) {
      readBeginnerLessons();
      readIntermediateLessons();
      readAdvancedLessons();
    }
  }, [userData]);

  const readBeginnerLessons = () => {
    try {
      const lessonsRef = collection(
        db,
        "/Lessons/" + userData?.ageGroup + "/Levels/" + "Beginners" + "/lessons"
      );
      onSnapshot(lessonsRef, (querySnapshot) => {
        const allLessons = [];
        querySnapshot.forEach((doc) => {
          allLessons.push({ id: doc.id, ...doc.data() });
        });
        setBeginnerLessons(allLessons);
        // if (allLessons.length === 0) {
        //   Alert.alert(
        //     "Message",
        //     "We are sorry to let you know that we don't have any lesson for this level yet. We will add it asap."
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const readIntermediateLessons = () => {
    try {
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
        // if (allLessons.length === 0) {
        //   Alert.alert(
        //     "Message",
        //     "We are sorry to let you know that we don't have any lesson for this level yet. We will add it asap."
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const readAdvancedLessons = () => {
    try {
      const lessonsRef = collection(
        db,
        "/Lessons/" + userData?.ageGroup + "/Levels/" + "Advanced" + "/lessons"
      );
      onSnapshot(lessonsRef, (querySnapshot) => {
        const allLessons = [];
        querySnapshot.forEach((doc) => {
          allLessons.push({ id: doc.id, ...doc.data() });
        });
        setAdvancedLessons(allLessons);
        // if (allLessons.length === 0) {
        //   Alert.alert(
        //     "Message",
        //     "We are sorry to let you know that we don't have any lesson for this level yet. We will add it asap."
        //   );
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: "white",
            }}
          >
            Your Level is: {userData?.level}
          </Text>
        </View>
        <View
          // contentContainerStyle={styles.container}
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
          </CollapsibleBar>
        </View>
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
    marginBottom: 30,
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

export default Lessons;
