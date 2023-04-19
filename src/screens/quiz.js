// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";

// function QuizPage({ navigation, route }) {
//   const { quizTitle, quiz } = route.params;

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [results, setResults] = useState(new Array(quiz.length).fill(null));
//   const [hintsViewed, setHintsViewed] = useState(
//     new Array(quiz.length).fill(false)
//   );
//   const [selectedAnswers, setSelectedAnswers] = useState(
//     new Array(quiz.length).fill(null)
//   );

//   const handleOptionPress = (option) => {
//     setSelectedAnswer(option);
//     setSelectedAnswers((prevSelectedAnswers) => {
//       const newSelectedAnswers = [...prevSelectedAnswers];
//       newSelectedAnswers[currentQuestion] = option;
//       return newSelectedAnswers;
//     });
//   };

//   const handleSubmit = () => {
//     const newResults = [...results];
//     newResults[currentQuestion] =
//       selectedAnswer === quiz[currentQuestion].answer ? 1 : 0;
//     setResults(newResults);
//     setSelectedAnswer(null);
//   };

//   const handlePrev = () => {
//     setHintsViewed((prevHintsViewed) => {
//       const newHintsViewed = [...prevHintsViewed];
//       newHintsViewed[currentQuestion] = false;
//       return newHintsViewed;
//     });

//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleNext = () => {
//     setHintsViewed((prevHintsViewed) => {
//       const newHintsViewed = [...prevHintsViewed];
//       newHintsViewed[currentQuestion] = false;
//       return newHintsViewed;
//     });

//     if (currentQuestion < quiz.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };
//   const handleDone = () => {
//     if (selectedAnswers.includes(null)) {
//       alert("Please answer all questions before submitting");
//     } else {
//       navigation.navigate("Results", {
//         quizTitle,
//         quiz,
//         results,
//         selectedAnswers,
//         hintsViewed,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/bg.jpeg")}
//         style={styles.backgroundImage}
//       />
//       <Text style={styles.topic}>{quizTitle}</Text>
//       <ScrollView
//         style={{
//           backgroundColor: "white",
//           width: "90%",
//           borderRadius: 5,
//           padding: 20,
//           opacity: 0.95,
//           height: "40%",
//           bottom: 15,
//         }}
//       >
//         <Text>Question {currentQuestion + 1}</Text>
//         <Text>{quiz[currentQuestion].question}</Text>
//         {quiz[currentQuestion].options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleOptionPress(option)}
//             disabled={results[currentQuestion] !== null}
//           >
//             <Text style={selectedAnswer === option ? { color: "green" } : null}>
//               {option}
//             </Text>
//           </TouchableOpacity>
//         ))}
//         {results[currentQuestion] !== null && (
//           <Text style={{ color: "green" }}>✓ Submitted</Text>
//         )}
//         <Button
//           title="Submit"
//           onPress={handleSubmit}
//           disabled={
//             selectedAnswer === null || results[currentQuestion] !== null
//           }
//         />
//         <Button
//           title="Previous"
//           onPress={handlePrev}
//           disabled={currentQuestion === 0}
//         />
//         <Button
//           title="Next"
//           onPress={handleNext}
//           disabled={currentQuestion === quiz.length - 1}
//         />
//         <Button
//           title="Done"
//           onPress={() => handleDone()}
//           disabled={currentQuestion !== quiz.length - 1}
//         />
//         {!hintsViewed[currentQuestion] && (
//           <Button
//             title="Show Hint"
//             onPress={() => {
//               setHintsViewed((prevState) => {
//                 const newHintsViewed = [...prevState];
//                 newHintsViewed[currentQuestion] = true;
//                 return newHintsViewed;
//               });
//             }}
//           />
//         )}
//         {hintsViewed[currentQuestion] && (
//           <Text>{quiz[currentQuestion].hint}</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = {
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   backgroundImage: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//   },
//   topic: {
//     fontSize: 24,
//     fontWeight: "bold",
//     margin: 16,
//     color: "white",
//     backgroundColor: "transparent",
//   },
// };

// export default QuizPage;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
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
        results,
        selectedAnswers,
        hintsViewed,
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
        <Text>{quiz[currentQuestion].question}</Text>
        {quiz[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
            disabled={results[currentQuestion] !== null}
          >
            <Text style={selectedAnswer === option ? { color: "green" } : null}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        {results[currentQuestion] !== null && (
          <Text style={{ color: "green" }}>✓ Submitted</Text>
        )}
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={
            selectedAnswer === null || results[currentQuestion] !== null
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
          disabled={currentQuestion === quiz.length - 1}
        />
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
          <Text>{quiz[currentQuestion].hint}</Text>
        )}
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
