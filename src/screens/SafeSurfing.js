import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const IMAGES = [
  { url: 'https://picsum.photos/id/1/200/300', safe: true },
  { url: 'https://picsum.photos/id/10/200/300', safe: true },
  { url: 'https://picsum.photos/id/100/200/300', safe: true },
  { url: 'https://picsum.photos/id/1000/200/300', safe: false },
  { url: 'https://picsum.photos/id/1001/200/300', safe: false },
  { url: 'https://picsum.photos/id/1002/200/300', safe: false },
];

const SafeSurfing = () => {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleImagePress = (safe) => {
    setScore(score + (safe ? 1 : -1));
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    if (currentIndex >= IMAGES.length) {
      setShowResult(true);
    }
  }, [currentIndex]);

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      {showResult ? (
        <>
          <Text style={styles.resultText}>{`Your score: ${score}`}</Text>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Play again</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: IMAGES[currentIndex].url }} />
          </View>
          <Text style={styles.instructionText}>Is this website safe to browse?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.safeButton]} onPress={() => handleImagePress(true)}>
              <Text style={styles.buttonText}>Safe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.dangerousButton]} onPress={() => handleImagePress(false)}>
              <Text style={styles.buttonText}>Dangerous</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.scoreText}>{`Score: ${score}`}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    },
    image: {
      width: '80%',
      resizeMode: 'contain',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 30,
    },
    button: {
      backgroundColor: '#008000',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
    tipContainer: {
      marginTop: 30,
      alignItems: 'center',
    },
    tipText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
export default SafeSurfing;