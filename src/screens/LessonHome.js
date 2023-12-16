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
import { FontAwesome } from "@expo/vector-icons";

const LessonHome = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        try {
          onSnapshot(doc(db, "Users", uid), (doc) => {
            setUserData(doc.data());
          });

          const tasksCompletedRef = collection(
            db,
            `Users/${uid}/TasksCompleted`
          );
          const tasksQuery = query(
            tasksCompletedRef,
            orderBy("dateCompleted", "desc")
          );
          getDocs(tasksQuery)
            .then((querySnapshot) => {
              let list = [];
              querySnapshot.forEach((doc) => {
                list.push(doc.data());
              });
            })
            .catch((error) => {
              console.error("Error getting documents: ", error);
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
              navigation.navigate("All Lessons", {
                userData: userData,
              });
            }}
          >
            <FontAwesome name="graduation-cap" size={40} color="green" />
            <Text style={styles.buttonText}>My Learning</Text>
          </TouchableOpacity>
          {userData?.category !== "Employee" && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Stories", {
                    userData: userData,
                  });
                }}
              >
                <FontAwesome name="book" size={40} color="green" />
                <Text style={styles.buttonText}>Stories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate("Scenarios Home", {
                    userData: userData,
                  });
                }}
              >
                <FontAwesome name="tasks" size={40} color="green" />
                <Text style={styles.buttonText}>Scenarios</Text>
              </TouchableOpacity>
            </>
          )}
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
    top: 250,
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

export default LessonHome;
