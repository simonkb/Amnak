import { async } from "@firebase/util";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { db, auth } from "../config/firebaseConfig";

function ResultsPage({ route }) {
  const { quizTitle, quiz, results, selectedAnswers, hintsViewed } =
    route.params;
  const [userData, setUserData] = useState(null);

  const calculatePointsEarned = (index) => {
    const currentQuiz = quiz[index];
    const userAnswer = selectedAnswers[index];
    const correctAnswer = currentQuiz.answer;
    const hintViewed = hintsViewed[index];
    if (userAnswer === null) {
      return 0;
    } else if (userAnswer === correctAnswer && !hintViewed) {
      return currentQuiz.point;
    } else if (userAnswer === correctAnswer && hintViewed) {
      return currentQuiz.point * 0.7;
    } else {
      return 0;
    }
  };

  const renderItem = ({ item, index }) => {
    const points = calculatePointsEarned(index);
    return (
      <View style={{ marginVertical: 10 }}>
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
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user !== null && user.emailVerified) {
        const uid = user.uid;
        try {
          onSnapshot(doc(db, "Users", uid), (doc) => {
            setUserData(doc.data());
          });
          setDoc(doc(db, `Users/${uid}/TasksCompleted`, quizTitle), {
            taskName: `Completed ${quizTitle} and its quiz.`,
            dateCompleted: new Date().getTime(),
            selectedAnswers: selectedAnswers,
            pointsEarned: totalPointsEarned,
            docReference: doc(
              db,
              `/Lessons/${userData?.ageGroup}/Levels/${userData?.level}/lessons/${quizTitle}`
            ),
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

  // Calculate total points earned
  const totalPointsEarned = quiz.reduce((total, _, index) => {
    return total + calculatePointsEarned(index);
  }, 0);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", margin: 16 }}>
        {quizTitle} Quiz Results
      </Text>
      <FlatList
        data={quiz}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Text
        style={{ fontSize: 18, fontWeight: "bold", marginTop: 0, bottom: 40 }}
      >
        Total points earned: {totalPointsEarned}
      </Text>
    </View>
  );
}

export default ResultsPage;
