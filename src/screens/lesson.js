import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { db, storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import LessonPage from "./lessonsBb";

const LessonScreen = ({ navigation, route }) => {
  const { lesson } = route.params;
  const [expanded, setExpanded] = useState(null);
  // const [lessons, setLessons] = useState([]);
  // [
  //   {
  //     title: "Lesson 1",
  //     content: {
  //       topic: "Topic 1",
  //       body: [
  //         "This is the first paragraph\n\n",
  //         "This is the second paragraph",
  //       ],
  //       //video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //       video:
  //         "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/Videos%2Fcia.mp4?alt=media&token=96e6c10b-cc2a-4234-9833-b6efdafbb497",
  //       image:
  //         "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
  //     },
  //     id: 1,
  //   },
  //   {
  //     title: "Lesson 2",
  //     content: {
  //       topic: "Topic 2",
  //       body: [
  //         "This is the first paragraph\n\n",
  //         "This is the second paragraph",
  //       ],
  //       video:
  //         "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

  //       image:
  //         "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
  //     },
  //     id: 2,
  //   },
  //   {
  //     title: "Lesson 3",
  //     content: {
  //       topic: "Topic 3",
  //       body: [
  //         "This is the first paragraph\n\n",
  //         "This is the second paragraph",
  //       ],
  //       video:
  //         "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

  //       image:
  //         "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
  //     },
  //     id: 3,
  //   },
  // ];

  // const submit = () => {
  //   const file = "../../assets/cia.mp4";
  //   const storageRef = ref(storage, "Videos/" + "cia.mp4");
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Here you can monitor the progress of the upload
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //     },
  //     (error) => {
  //       // Handle any errors that occur during the upload
  //       console.log(error);
  //     },
  //     () => {
  //       // The upload is complete, so you can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         // Save the download URL to Firestore
  //         let obj = {
  //           title: "Lesson 1",
  //           content: {
  //             topic: "Topic 1",
  //             body: [
  //               "This is the first paragraph\n\n",
  //               "This is the second paragraph",
  //             ],
  //             video: downloadURL,
  //             image:
  //               "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
  //           },
  //           quiz: [
  //             {
  //               question: "What is the capital of France?",
  //               options: ["Paris", "Rome", "London", "Madrid"],
  //               answer: "Paris",
  //               hint: "This is the hint for question 1",
  //               point: 10,
  //             },
  //             {
  //               question: "What is the tallest mammal?",
  //               options: ["Elephant", "Giraffe", "Kangaroo", "Gorilla"],
  //               answer: "Giraffe",
  //               hint: "This is the hint for question 2",
  //               point: 10,
  //             },
  //             {
  //               question: "What is the largest planet in our Solar System?",
  //               options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
  //               answer: "Jupiter",
  //               hint: "This is the hint for question 3",
  //               point: 10,
  //             },
  //           ],
  //         };

  //         const collectionRef = collection(
  //           db,
  //           "/Lessons/Under_14/Levels/Beginner/lessons"
  //         );

  //         setDoc(doc(collectionRef, obj.title), {
  //           obj,
  //         }).catch((error) => {
  //           Alert.alert(error.errorCode, error.message);
  //         });
  //       });
  //     }
  //   );
  // };

  // const toggleExpanded = (index) => {
  //   setExpanded(expanded === index ? null : index);
  // };
  const handleQuizPressed = (title, data) => {
    navigation.navigate("Quiz", { quizTitle: title, quiz: data });
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
