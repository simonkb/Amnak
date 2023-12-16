import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

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
    <ScrollView>
      {props.questions.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1}
          </Text>
          <Text style={styles.questionText}>
            {props.questions[currentQuestion].question}
          </Text>
          {props.questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              disabled={isQuestionSubmitted(currentQuestion)}
              style={[
                styles.optionButton,
                selectedAnswer === option ? styles.selectedOptionButton : null,
              ]}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedAnswer === option
                    ? styles.selectedOptionButtonText
                    : null,
                ]}
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
          <View style={styles.buttonContainer}>
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
          </View>
          <Button
            title="Done"
            onPress={() => props.handleDone(result)}
            disabled={currentQuestion !== props.questions.length - 1}
          ></Button>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minWidth: "98%",
    maxWidth: "98%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 20,
    opacity: 0.95,
    marginBottom: 5,
    paddingBottom: 200,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
    fontStyle: "italic",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  optionButton: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "green",
  },
  optionButtonText: {
    fontSize: 16,
    color: "black",
  },
  selectedOptionButtonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Quiz;
