import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import Exercise from "./Exercise";
const Exercises = () => {
  const exercises = [
    {
      id: "1",
      description: "Question 1: Categorize the following passwords",
      boxes: [
        { id: "box1", text: "password123", category: "weak" },
        { id: "box2", text: "securePassword123", category: "weak" },
        { id: "box3", text: "strongPassword123!", category: "weak" },
        { id: "box4", text: "weakPassword", category: "weak" },
      ],
      categories: ["weak", "strong"],
    },
    {
      id: "2",
      description: "Question 2: Categorize the following passwords",
      boxes: [
        { id: "2box1", text: "password123", category: "weak" },
        { id: "2box2", text: "securePassword123", category: "weak" },
        { id: "2box3", text: "strongPassword123!", category: "strong" },
        { id: "box4", text: "weakPassword", category: "weak" },
      ],
      categories: ["weak", "strong"],
    },
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const goToNextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  }, [currentExerciseIndex]);

  const goToPrevExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }, [currentExerciseIndex]);

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Exercise currentExercise={currentExercise}></Exercise>

      <View style={styles.navigationButtons}>
        <Button
          title="Previous"
          onPress={goToPrevExercise}
          disabled={currentExerciseIndex === 0}
        />
        <Button
          title="Next"
          onPress={goToNextExercise}
          disabled={currentExerciseIndex === exercises.length - 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exercise: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  exerciseDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    flex: 1,
    height: 300,
    borderWidth: 0.4,
    marginHorizontal: 3,
    padding: 5,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  box: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: "40%",
  },
  boxText: {
    color: "white",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#66cc66",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
  },
});

export default Exercises;
