import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "London", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the tallest mammal?",
    options: ["Elephant", "Giraffe", "Kangaroo", "Gorilla"],
    answer: "Giraffe",
  },
  {
    question: "What is the largest planet in our Solar System?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    answer: "Jupiter",
  },
];

function Quiz() {
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
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <View>
      <Text>Question {currentQuestion + 1}</Text>
      <Text>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleOptionPress(option)}>
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
    </View>
  );
}

export default Quiz;
