import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
const HackerDefense = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hackerImage, setHackerImage] = useState(
    require("../../assets/hacker1.png")
  );

  const handleScanPress = () => {
    // randomly generate a number between 0 and 1 to determine if the scan is successful or not
    const success = Math.round(Math.random());

    if (success) {
      // update the score and show a success message
      setScore(score + 1);
      alert("Scan successful! Your network is secure.");
    } else {
      // set the hacker image to the second image and show a failure message
      setHackerImage(require("../../assets/hacker2.jpeg"));
      alert(
        "Scan failed! The hacker has gained access to your network. You need to fix the vulnerability."
      );
    }
  };

  const handleFixPress = () => {
    // randomly generate a number between 0 and 1 to determine if the fix is successful or not
    const success = Math.round(Math.random());

    if (success) {
      // update the score and set the hacker image back to the first image
      setScore(score + 1);
      setHackerImage(require("../../assets/hacker1.png"));
      alert("Vulnerability fixed! Your network is secure.");
    } else {
      // show a failure message
      alert(
        "Fix failed! The hacker has already caused damage to your network. You need to act quickly to prevent further damage."
      );
    }
  };
  const handleGameOver = () => {
    // set the game over flag to true
    setGameOver(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      >
        <ScrollView style={styles.overlay}>
          <Text style={styles.header}>Hacker Defense</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
          {!gameOver ? (
            <View style={styles.gameContainer}>
              <Image source={hackerImage} style={styles.hackerImage} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleScanPress}
                >
                  <Text style={styles.buttonText}>
                    Scan for Vulnerabilities
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleFixPress}
                >
                  <Text style={styles.buttonText}>Fix Vulnerability</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverText}>Game Over!</Text>
              <Text style={styles.finalScoreText}>Final Score: {score}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.exitButton} onPress={handleGameOver}>
            <Text style={styles.exitButtonText}>Exit Game</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    top: 40,
  },
  scoreContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gameContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  hackerImage: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  gameOverContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  gameOverText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  finalScoreText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  exitButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  exitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HackerDefense;
