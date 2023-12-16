import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, Alert } from "react-native";
import { db, auth } from "../config/firebaseConfig";

function EvaluationQuizResultsPage({ navigation, route }) {
  const { title, quiz, selectedAnswers, hintsViewed, isSaved, userData } =
    route.params;

  const calculatePointsEarned = (index) => {
    const currentQuiz = quiz[index];
    const userAnswer = selectedAnswers[index];
    const correctAnswer = currentQuiz.answer;
    const hintViewed = hintsViewed[index];
    if (userAnswer === null) {
      return 0;
    } else if (userAnswer === correctAnswer && !hintViewed) {
      //return currentQuiz.point;
      return 10;
    } else if (userAnswer === correctAnswer && hintViewed) {
      //return currentQuiz.point * 0.7;
      return 10;
    } else {
      return 0;
    }
  };

  const renderItem = ({ item, index }) => {
    const points = calculatePointsEarned(index);
    return (
      <View
        style={{ marginVertical: 10, backgroundColor: "white", padding: 10 }}
      >
        <Text style={{ fontWeight: "bold" }}>{`Question ${index + 1}: ${
          item.question
        }`}</Text>
        <Text>{`Your response: ${
          selectedAnswers[index] || "Not answered"
        }`}</Text>
        <Text>{`Correct answer: ${item.answer}`}</Text>
        <Text>{`Points earned: ${points}`}</Text>
      </View>
    );
  };
  const totalPointsEarned = quiz.reduce((total, _, index) => {
    return total + calculatePointsEarned(index);
  }, 0);

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user !== null) {
        const uid = user.uid;
        try {
          if (!isSaved) {
            setDoc(
              doc(
                db,
                `Users/${uid}/TasksCompleted`,
                title + "-" + new Date().getTime()
              ),
              {
                taskName: `Completed ${title}.`,
                dateCompleted: new Date().getTime(),
                selectedAnswers: selectedAnswers,
                hintsViewed: hintsViewed,
                pointsEarned: totalPointsEarned,
              }
            );
            const userDocRef = doc(db, "Users", uid);
            updateDoc(userDocRef, {
              level: updateLevel(totalPointsEarned, 150, userData?.level),
            })
              .then(() => {
                console.log("Level updated successfully");
              })
              .catch((error) => {
                console.error("Error updating points: ", error);
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  console.log(
    updateLevel(totalPointsEarned, 150, userData.level),
    totalPointsEarned,
    userData.level
  );
  useEffect(() => {
    fetchUserData();
  }, []);

  // Calculate total points earned

  function updateLevel(pointsEarned, totalPossiblePoints, currentLevel) {
    const percentage = (pointsEarned / totalPossiblePoints) * 100;

    // Define the levels
    const levels = ["Beginners", "Intermediate", "Advanced"];

    // Check if the user is already at the highest level
    if (currentLevel === "Advanced") {
      return "Advanced"; // No change if already at the highest level
    }

    // Check if the percentage is greater than 80
    if (percentage > 80) {
      // Find the index of the current level
      const currentLevelIndex = levels.indexOf(currentLevel);

      // If the current level is not Advanced, upgrade to the next level
      if (currentLevelIndex < levels.length - 1) {
        Alert.alert(
          "Success",
          `Congratulations! You are upgraded to the ${
            levels[currentLevelIndex + 1]
          } level.`
        );
        return levels[currentLevelIndex + 1];
      }
    }

    // Default return statement if conditions are not met
    return currentLevel;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../../assets/bg.jpeg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: 0.8,
          padding: 10,
          margin: 10,
          borderRadius: 15,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>
          {title} Results
        </Text>
        <FlatList
          data={quiz}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
        <View
          style={{
            backgroundColor: "green",
            width: "90%",
            padding: 20,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 0,
              color: "white",
            }}
          >
            Total points earned: {totalPointsEarned}
          </Text>
        </View>
        <Button
          title="Back to Grades"
          onPress={() => {
            navigation.navigate("Grade");
          }}
        ></Button>
      </View>
    </View>
  );
}
export default EvaluationQuizResultsPage;
