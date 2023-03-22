import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import ChatAssistant from "./chatAssistant";
import Quiz from "./BeginnerQuiz";

const Home = ({ navigation }) => {
  const [showBeginnersQuiz, setShowBeginnersQuiz] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.welcomeText}>Welcome to my App</Text>
        </View>

        {isFirstTime && (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setShowBeginnersQuiz(true)}
          >
            <Text style={styles.quizButtonText}> Beginners Quiz</Text>
          </TouchableOpacity>
        )}

        {showBeginnersQuiz && (
          <View style={styles.quizContainer}>
            <>
              <Quiz />
              <Button
                title="Done"
                onPress={() => {
                  setIsFirstTime(false);
                  setShowBeginnersQuiz(false);
                }}
              />
            </>
          </View>
        )}

        <View
          style={{ bottom: 20, left: 0, position: "absolute", width: "100%" }}
        >
          <ChatAssistant />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    //alignItems: "center",
    //justifyContent: "center",
    paddingTop: 150,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    top: 0,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    marginTop: 50,
  },
  quizContainer: {
    //  alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    padding: "5%",
    alignSelf: "center",
    borderRadius: 15,
    opacity: 0.9,
  },
  quizButton: {
    width: "70%",
    height: 40,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 40,
    left: "15%",
  },
  quizButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
