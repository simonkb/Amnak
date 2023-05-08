import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import VideoPlayer from "./VideoPlayer";
import { db, auth } from "../config/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

const LessonPage = (props) => {
    let contents = [
      { type: "topic", body: "This is the topic of lesson 1" },
      {
        type: "paragraph",
        body:
          "This is the paragraph of lesson 1 This is the " +
          ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
  varius quam sapien, in aliquam dolor feugiat at. Fusce vel elit ac
  libero dictum aliquam. Sed molestie, risus eget vestibulum rutrum,
  nisi quam semper velit, vel tempus enim urna at ante. Aliquam erat
  volutpat. Sed vel erat quis risus euismod congue. Fusce finibus arcu
  vitae nisi mollis, vel convallis nibh faucibus.`,
      },
      {
        type: "bulletPoints",
        body: [
          "- This is first point",
          "- This is the second point",
          "- This is the third point",
          "- This is the last point",
        ],
      },
      {
        type: "paragraph",
        body:
          "This is the paragraph of lesson 1 This is the " +
          ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    varius quam sapien, in aliquam dolor feugiat at. Fusce vel elit ac
    libero dictum aliquam. Sed molestie, risus eget vestibulum rutrum,
    nisi quam semper velit, vel tempus enim urna at ante. Aliquam erat
    volutpat. Sed vel erat quis risus euismod congue. Fusce finibus arcu
    vitae nisi mollis, vel convallis nibh faucibus.`,
      },
      {
        type: "video",
        url: "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/Videos%2Fcia.mp4?alt=media&token=96e6c10b-cc2a-4234-9833-b6efdafbb497",
        description:
          "This video explains CIA in detailed terms. I recommend watching it.",
      },
      {
        type: "image",
        url: "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
        description: "The image showing CIA",
      },
    ];
    let quiz = [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "London", "Madrid"],
        answer: "Paris",
        hint: "This is the hint for question 1",
        point: 10,
      },
      {
        question: "What is the tallest mammal?",
        options: ["Elephant", "Giraffe", "Kangaroo", "Gorilla"],
        answer: "Giraffe",
        hint: "This is the hint for question 2",
        point: 10,
      },
      {
        question: "What is the largest planet in our Solar System?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: "Jupiter",
        hint: "This is the hint for question 3",
        point: 10,
      },
    ];
  const onSubmit = () => {
    const collectionRef = collection(
      db,
      "/Lessons/Under_14/Levels/Beginners/lessons"
    );

    setDoc(doc(collectionRef, "lesson-1"), {
      contents,
      quiz,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef2 = collection(
      db,
      "/Lessons/15_18/Levels/Beginners/lessons"
    );

    setDoc(doc(collectionRef2, "lesson-1"), {
      contents,
      quiz,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef3 = collection(
      db,
      "/Lessons/19_and_above/Levels/Beginners/lessons"
    );

    setDoc(doc(collectionRef3, "lesson-1"), {
      contents,
      quiz,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef4 = collection(
      db,
      "/Lessons/Employee/Levels/Beginners/lessons"
    );

    setDoc(doc(collectionRef4, "lesson-1"), {
      contents,
      quiz,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
  };

  return (
    <ScrollView style={styles.container}>
      {props.contents.map((content, index) => (
        <View key={index}>
          {content.type === "topic" ? (
            <View style={styles.topicContainer}>
              <Text style={styles.topicText}>{content.body}</Text>
            </View>
          ) : content.type === "paragraph" ? (
            <View style={styles.paragraphContainer}>
              <Text style={styles.paragraphText}>{content.body}</Text>
            </View>
          ) : content.type === "bulletPoints" ? (
            <View style={styles.bulletContainer}>
              {content.body.map((point) => (
                <Text key={point} style={styles.bulletText}>
                  {point}
                </Text>
              ))}
            </View>
          ) : content.type === "image" ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: content.url }}
                style={styles.image}
                alt={content.description}
              />
              <Text style={[styles.paragraphText, { fontStyle: "italic" }]}>
                {content.description}
              </Text>
            </View>
          ) : content.type === "video" ? (
            <>
              <View style={styles.videoContainer}>
                <VideoPlayer videoUri={content.url}></VideoPlayer>
              </View>
              <Text style={[styles.paragraphText, { fontStyle: "italic" }]}>
                {content.description}
              </Text>
              {/* <Button title="Submit" onPress={onSubmit()}></Button> */}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topicContainer: {
    marginTop: 24,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#6699CC",
  },
  topicText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  paragraphContainer: {
    marginVertical: 16,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    marginBottom: 16,
  },
  bulletContainer: {
    marginLeft: 16,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    marginBottom: 8,
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 2,
    overflow: "scroll",
    resizeMode: "contain",
  },
});
export default LessonPage;
