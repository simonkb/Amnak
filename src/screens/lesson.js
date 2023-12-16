import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { db, storage, auth } from "../config/firebaseConfig";
import { collection, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import LessonPage from "./lessonsBb";
const LessonScreen = ({ navigation, route }) => {
  const { lesson } = route.params;
  const [expanded, setExpanded] = useState(null);
  const handleQuizPressed = (title, data) => {
    const user = auth.currentUser;
    if (user) {
      const tasksCompletedRef = doc(
        db,
        `Users/${user.uid}/TasksCompleted`,
        title
      );

      getDoc(tasksCompletedRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            navigation.navigate("Results", {
              quizTitle: title,
              quiz: data,
              selectedAnswers: docSnapshot.data().selectedAnswers,
              hintsViewed: docSnapshot.data().hintsViewed,
              isSaved: true,
            });
          } else {
            navigation.navigate("Quiz", { quizTitle: title, quiz: data });
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  };
  const source = {
    uri: "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/Pdfs%2Fbeginner_Lesson%201.pdf?alt=media&token=5bafa18c-00e7-43f9-ac9a-78133c58c0d9",
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <View style={styles.lessonContentContainer}>
        <Text style={styles.topic}>{lesson.title}</Text>
        <LessonPage contents={lesson.contents}></LessonPage>
        {lesson.quiz && (
          <Button
            title={lesson.title + " Quiz"}
            onPress={() => {
              handleQuizPressed(lesson.title, lesson.quiz);
            }}
          ></Button>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  topic: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    color: "black",
    backgroundColor: "transparent",
  },
  lessonTitle: {
    fontSize: 18,
    margin: 16,
    color: "white",
    backgroundColor: "transparent",
  },
  lessonContent: {
    fontSize: 14,
    margin: 16,
    color: "black",
    backgroundColor: "transparent",
  },
  lessonContentContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 15,
  },

  buttonText: {
    color: "#fff",
  },
};

export default LessonScreen;
