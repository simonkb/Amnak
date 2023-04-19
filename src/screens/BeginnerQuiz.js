import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const handleOptionPress = (option) => {
    setSelectedAnswer(option);
  };
  const handleSubmit = () => {
    if (selectedAnswer === props.questions[currentQuestion].answer) {
      console.log("Correct!");
      setResult(result + 1);
    } else {
      console.log(
        "Incorrect, the correct answer is: " +
          props.questions[currentQuestion].answer
      );
    }
    setSelectedAnswer(null);
    setSubmittedQuestions([...submittedQuestions, currentQuestion]);
    if (currentQuestion < props.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion < props.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const isQuestionSubmitted = (questionIndex) => {
    return submittedQuestions.includes(questionIndex);
  };

  let opt = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [result, setResult] = useState(0);

  return (
    <View>
      {props.questions.length > 0 && (
        <View>
          <Text>Question {currentQuestion + 1}</Text>
          <Text>{props.questions[currentQuestion].question}</Text>
          {props.questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              disabled={isQuestionSubmitted(currentQuestion)}
            >
              <Text
                style={selectedAnswer === option ? { color: "green" } : null}
              >
                {opt[index] + ") " + option}
              </Text>
            </TouchableOpacity>
          ))}
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={
              selectedAnswer === null || isQuestionSubmitted(currentQuestion)
            }
          />
          <Button
            title="Previous"
            onPress={handlePrev}
            disabled={currentQuestion === 0}
          />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentQuestion === props.questions.length - 1}
          />
          <Button
            title="Done"
            onPress={() => props.handleDone(result)}
            disabled={currentQuestion !== props.questions.length - 1}
          ></Button>
        </View>
      )}
    </View>
  );
}

export default Quiz;
