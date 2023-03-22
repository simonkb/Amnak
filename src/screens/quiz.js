import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

function QuizPage({ navigation, route }) {
  const { quizTitle } = route.params;
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "London", "Madrid"],
      answer: "Paris",
      hint: "This is the hint for question 1",
    },
    {
      question: "What is the tallest mammal?",
      options: ["Elephant", "Giraffe", "Kangaroo", "Gorilla"],
      answer: "Giraffe",
      hint: "This is the hint for question 2",
    },
    {
      question: "What is the largest planet in our Solar System?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      answer: "Jupiter",
      hint: "This is the hint for question 3",
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      console.log("Correct!");
    } else {
      console.log(
        "Incorrect, the correct answer is: " + questions[currentQuestion].answer
      );
    }
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    setShowHint(false);

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    setShowHint(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const [showHint, setShowHint] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.topic}>{quizTitle}</Text>
      <ScrollView
        style={{
          backgroundColor: "white",
          width: "90%",
          borderRadius: 5,
          padding: 20,
          opacity: 0.95,
          height: "40%",
          bottom: 15,
        }}
      >
        <Text>Question {currentQuestion + 1}</Text>
        <Text>{questions[currentQuestion].question}</Text>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={selectedAnswer === option ? { color: "green" } : null}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={selectedAnswer === null}
        />
        <Button
          title="Previous"
          onPress={handlePrev}
          disabled={currentQuestion === 0}
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentQuestion === questions.length - 1}
        />
        <Button
          title="hint"
          onPress={() => {
            setShowHint(true);
          }}
        />
        {showHint && <Text>{questions[currentQuestion].hint}</Text>}
      </ScrollView>
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
};
export default QuizPage;
