import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

function QuizPage({ navigation, route }) {
  const { quizTitle, quiz } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState(new Array(quiz.length).fill(null));
  const [hintsViewed, setHintsViewed] = useState(
    new Array(quiz.length).fill(false)
  );
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(quiz.length).fill(null)
  );

  const handleOptionPress = (option) => {
    setSelectedAnswer(option);
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestion] = option;
      return newSelectedAnswers;
    });
  };

  const handleSubmit = () => {
    const newResults = [...results];
    newResults[currentQuestion] =
      selectedAnswer === quiz[currentQuestion].answer ? 1 : 0;
    setResults(newResults);
    setSelectedAnswer(null);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleDone = () => {
    if (selectedAnswers.includes(null)) {
      alert("Please answer all questions before submitting");
    } else {
      navigation.navigate("Results", {
        quizTitle,
        quiz,
        selectedAnswers,
        hintsViewed,
        isSaved: false,
      });
    }
  };

  const handleHintView = () => {
    if (
      !hintsViewed[currentQuestion] &&
      selectedAnswers[currentQuestion] === null
    ) {
      setHintsViewed((prevState) => {
        const newHintsViewed = [...prevState];
        newHintsViewed[currentQuestion] = true;
        return newHintsViewed;
      });
    }
  };

  useEffect(() => {
    setHintsViewed((prevHintsViewed) => {
      const newHintsViewed = [...prevHintsViewed];
      newHintsViewed[currentQuestion] = false;
      return newHintsViewed;
    });
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.topic}>{quizTitle} Quiz</Text>
      <ScrollView
        style={styles.quizContainer}
        contentContainerStyle={styles.quizContentContainer}
      >
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1}
        </Text>
        <Text style={styles.questionText}>
          {quiz[currentQuestion].question}
        </Text>
        {quiz[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option ? styles.selectedOptionButton : null,
            ]}
            onPress={() => handleOptionPress(option)}
            disabled={results[currentQuestion] !== null}
          >
            <Text
              style={[
                styles.optionButtonText,
                selectedAnswer === option
                  ? styles.selectedOptionButtonText
                  : null,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        {results[currentQuestion] !== null && (
          <Text style={styles.submittedText}>✓ Submitted</Text>
        )}
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between'
        }}>
          <Button
            title="Previous"
            onPress={handlePrev}
            disabled={currentQuestion === 0}
          />
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={
              selectedAnswer === null || results[currentQuestion] !== null
            }
          />
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentQuestion === quiz.length - 1}
          />
        </View>
       
        <Button
          title="Done"
          onPress={() => handleDone()}
          disabled={currentQuestion !== quiz.length - 1}
        />
        {!hintsViewed[currentQuestion] && results[currentQuestion] === null && (
          <Button
            title="Show Hint"
            onPress={() => {
              setHintsViewed((prevState) => {
                const newHintsViewed = [...prevState];
                if (!results[currentQuestion]) {
                  newHintsViewed[currentQuestion] = true;
                }
                return newHintsViewed;
              });
            }}
          />
        )}
        {hintsViewed[currentQuestion] && (
          <Text style={styles.hintText}>{quiz[currentQuestion].hint}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    margin: 10,
    color: "white",
    backgroundColor: "transparent",
  },
  quizContainer: {
    backgroundColor: "white",
    width: "97%",
    borderRadius: 5,
    padding: 20,
    opacity: 0.95,
    marginBottom: 5,
  },
  quizContentContainer: {
    paddingBottom: 50,
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
  submittedText: {
    color: "green",
    marginBottom: 10,
  },
  hintText: {
    marginTop: 10,
  },
});

export default QuizPage;
