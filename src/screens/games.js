import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import MyComponent from "./ChatBloom";
const Games = ({ navigation }) => {
  const letters = [
    ["A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O"],
    ["P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y"],
  ];

  const words = ["CAT", "DOG", "BAT", "HAT", "WOW"];

  function WordPuzzle() {
    const [selectedLetters, setSelectedLetters] = useState([]);

    function handleLetterPress(letter) {
      setSelectedLetters([...selectedLetters, letter]);
    }

    function handleWordSubmit() {
      const selectedWord = selectedLetters.join("");
      if (words.includes(selectedWord)) {
        console.log(`Congratulations! You found the word ${selectedWord}!`);
      } else {
        console.log(
          `Sorry, ${selectedWord} is not a valid word. Please try again.`
        );
      }
      setSelectedLetters([]);
    }

    function checkWord(selectedLetters, i, j, row, col, dx, dy) {
      let word = "";
      while (
        row >= 0 &&
        row < letters.length &&
        col >= 0 &&
        col < letters[0].length
      ) {
        word += letters[row][col];
        if (words.includes(word)) {
          console.log(`Congratulations! You found the word ${word}!`);
          return true;
        }
        row += dx;
        col += dy;
      }
      return false;
    }

    function handleCheckWord(i, j) {
      checkWord(selectedLetters, i, j, i, j, 1, 1);
      checkWord(selectedLetters, i, j, i, j, 1, 0);
      checkWord(selectedLetters, i, j, i, j, 0, 1);
      checkWord(selectedLetters, i, j, i, j, -1, -1);
      checkWord(selectedLetters, i, j, i, j, -1, 0);
      checkWord(selectedLetters, i, j, i, j, 0, -1);
      checkWord(selectedLetters, i, j, i, j, -1, 1);
      checkWord(selectedLetters, i, j, i, j, 1, -1);
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {letters.map((row, i) => (
          <View key={i} style={{ flexDirection: "row" }}>
            {row.map((letter, j) => (
              <TouchableOpacity
                key={j}
                style={{
                  padding: 10,
                  margin: 5,
                  borderWidth: 2,
                  borderColor: selectedLetters.includes(letter)
                    ? "blue"
                    : "black",
                  borderRadius: 5,
                }}
                onPress={() => handleLetterPress(letter)}
                onLongPress={() => handleCheckWord(i, j)}
              >
                <Text style={{ fontSize: 20 }}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 5,
            backgroundColor: "green",
            borderRadius: 5,
          }}
          onPress={handleWordSubmit}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const allLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const words2 = ["CAT", "DOG", "BAT", "HAT", "WOW"];

  function RandomWordPuzzle() {
    const [letters, setLetters] = useState(createLetters());
    const [selectedLetters, setSelectedLetters] = useState([]);
    const [lastSelected, setLastSelected] = useState({ i: -1, j: -1 });

    function createLetters() {
      const rows = 5;
      const cols = 5;
      let newLetters = [];
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          row.push(allLetters[Math.floor(Math.random() * allLetters.length)]);
        }
        newLetters.push(row);
      }
      return newLetters;
    }

    function handleLetterPress(letter, i, j) {
      if (isAdjacent(i, j)) {
        setSelectedLetters([...selectedLetters, letter]);
        setLastSelected({ i, j });
      }
    }

    function isAdjacent(i, j) {
      if (lastSelected.i === -1 && lastSelected.j === -1) {
        return true;
      }
      if (
        Math.abs(i - lastSelected.i) <= 1 &&
        Math.abs(j - lastSelected.j) <= 1
      ) {
        return true;
      }
      return false;
    }

    function handleWordSubmit() {
      const selectedWord = selectedLetters.join("");
      if (words2.includes(selectedWord)) {
        alert(`Congratulations! You found the word ${selectedWord}!`);
      } else {
        alert(`Sorry, ${selectedWord} is not a valid word. Please try again.`);
      }
      setSelectedLetters([]);
      setLastSelected({ i: -1, j: -1 });
    }

    return (
      <View>
        {letters.map((row, i) => (
          <View style={{ flexDirection: "row" }} key={i}>
            {row.map((letter, j) => (
              <TouchableOpacity
                key={j}
                style={{
                  padding: 20,
                  margin: 5,
                  backgroundColor: "black",
                  borderRadius: 5,
                }}
                onPress={() => handleLetterPress(letter, i, j)}
              >
                <Text style={{ fontSize: 20 }}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View>
          <TouchableOpacity
            style={{ padding: 20, margin: 10, backgroundColor: "green" }}
            onPress={handleWordSubmit}
          >
            <Text style={{ fontSize: 20 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <WordPuzzle />
      {/* <MyComponent></MyComponent> */}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
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

export default Games;
