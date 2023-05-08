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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.lessonContentContainer}>
        <Text style={styles.topic}>{lesson.id}</Text>
        {/* {lessons.map((lesson, index) => (
          <View key={lesson.id}> */}
        {/* <TouchableOpacity
              style={{
                width: "96%",
                backgroundColor: "blue",
                left: "2%",
                marginTop: 10,
                borderRadius: 15,
              }}
              onPress={() => toggleExpanded(index)}
            >
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
            </TouchableOpacity> */}
        {/* {expanded === index && ( */}
        {/* <ScrollView style={styles.lessonContentContainer}>
         */}
        <LessonPage contents={lesson.contents}></LessonPage>
        <Button
          title={lesson.id + " Quiz"}
          onPress={() => {
            handleQuizPressed(lesson.id, lesson.quiz);
          }}
        ></Button>

        {/* </ScrollView>
            )} */}
        {/* </View>
        ))} */}
      </ScrollView>
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
    flex: 1,
    backgroundColor: "white",
    padding: 8,

    borderRadius: 15,
  },

  buttonText: {
    color: "#fff",
  },
};

export default LessonScreen;
