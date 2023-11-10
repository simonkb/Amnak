import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import VideoPlayer from "./VideoPlayer_Story";
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
import { useRoute } from "@react-navigation/native";
import { API_URL, API_KEY } from "../config/firebaseConfig";

const Stories = ({ navigation }) => {
  var route = useRoute();
  const userData = route.params.userData;
  const [stories, setStories] = useState([
    {
      title: "Ahmed and Ali Social Media Adventures",
      url: "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/videos%2FAhmed-and-Ali-Social-Media-Adventures.mp4?alt=media&token=afc389f7-0881-45de-8e13-1522d68f90e3&_gl=1*hn4xm4*_ga*MzU2MjA5MjA0LjE2ODUwOTEzODM.*_ga_CW55HF8NVT*MTY5ODc2Mjg0Ny40Ni4xLjE2OTg3NjMxMjYuNTQuMC4w",
      question:
        "Write down a list of things you have learned after going through this story.",
      answers: [
        "Think before post.",
        "Be respectful.",
        "Stay safe.",
        "Share positivity.",
        "Never try dangerous things.",
        "Never share personal information.",
        "Ask a trusted adult.",
      ],
    },
  ]);

  // const onSubmit = (story) => {
  //   const collectionRef = collection(
  //     db,
  //     "/Lessons/Under_14/Levels/Beginners/Stories"
  //   );
  //   setDoc(doc(collectionRef, story.title), story).catch((error) => {
  //     Alert.alert(error.errorCode, error.message);
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            userData?.level,
            "Stories"
          )
        );
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setStories(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userData) fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.storyItem}>
        <VideoPlayer
          videoUri={item.url}
          title={item.title}
          question={item.question}
          answers={item.answers}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>All Stories</Text>

      {/* <Button
        title={"Submit once"}
        onPress={() => {
          onSubmit(stories[0]);
        }}
      ></Button> */}
      {stories.length === 0 ? (
        <Text style={styles.emptyMessage}>
          Sorry, we don't have stories for this category yet.
        </Text>
      ) : (
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{
            width: "96%",
            alignSelf: "center",
            paddingBottom: 600,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
    alignSelf: "center",
  },
  storyItem: {
    width: "100%",
    //minHeight: "100%",
    alignSelf: "center",
    paddingVertical: 5,
  },
  storyText: {
    color: "white",
    alignSelf: "center",
  },
  emptyMessage: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 60,
    margin: 10,
    color: "white",
    justifyContent: "center",
    fontWeight: "500",
  },
});

export default Stories;
