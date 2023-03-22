import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
const LessonScreen = ({ navigation, route }) => {
  const { topic } = route.params;
  const [expanded, setExpanded] = useState(null);

  // Define the lessons variable
  const lessons = [
    {
      title: "Lesson 1",
      content: "This is the content for Lesson 1",
      id: 1,
    },
    {
      title: "Lesson 2",
      content: "This is the content for Lesson 2",
      id: 2,
    },
    {
      title: "Lesson 3",
      content: "This is the content for Lesson 3",
      id: 3,
    },
  ];
  const toggleExpanded = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  const handleQuizPressed = (title) => {
    navigation.navigate("Quiz", { quizTitle: title });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.topic}>{topic}</Text>
      {lessons.map((lesson, index) => (
        <View key={lesson.id}>
          <TouchableOpacity
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
          </TouchableOpacity>
          {expanded === index && (
            <View style={styles.lessonContentContainer}>
              <Text style={styles.lessonContent}>{lesson.content}</Text>
              <Button
                title={lesson.title + " Quiz"}
                onPress={() => {
                  handleQuizPressed(topic + "\n" + lesson.title + " Quiz");
                }}
              ></Button>
            </View>
          )}
        </View>
      ))}
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
    color: "white",
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
    backgroundColor: "white",
    padding: 8,
    width: "96%",
    left: "2%",

    borderRadius: 15,
  },
};

export default LessonScreen;
