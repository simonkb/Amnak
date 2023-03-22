import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import ChatAssistant from "./chatAssistant";
const data = [
  {
    id: 1,
    title: "Educative stories",
  },
  {
    id: 2,
    title: "Basics of CIA",
  },
  {
    id: 3,
    title: "Path Ways to IS",
  },
  {
    id: 4,
    title: "Passwords",
  },
  {
    id: 5,
    title: "Best Practices",
  },
];

const Lessons = ({ navigation }) => {
  const handlePress = (title) => {
    navigation.navigate("Lesson", { topic: title });
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.lessonButton}
        onPress={() => handlePress(item.title)}
      >
        <Text style={styles.lessonButtonText}>{item.title}</Text>
      </TouchableOpacity>
    );
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
          <Text style={styles.headingText}>Beginner Lessons</Text>
        </View>
        <FlatList
          data={data}
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
    // alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
