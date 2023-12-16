import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const GameScreen = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [grid, setGrid] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isHintShown, setIsHintShown] = useState(false);
  const [isWordFound, setIsWordFound] = useState(false);
  const levels = [
    {
      level: "Level 1",
      word: "cyber security",
      hint: "The practice of protecting systems, networks, and programs from digital attacks.",
    },
  ];
  const level = levels[currentLevel];

  useEffect(() => {
    setGrid(generateGrid(level.word));
  }, [currentLevel]);

  const handleCellPress = (cellIndex) => {
    const newSelectedLetters = [...selectedLetters];
    if (newSelectedLetters.includes(cellIndex)) {
      setSelectedLetters(newSelectedLetters.filter((i) => i !== cellIndex));
    } else {
      setSelectedLetters([...newSelectedLetters, cellIndex]);
    }
  };

  const checkWord = () => {
    const selectedWord = grid
      .map((cell, i) => (selectedLetters.includes(i) ? cell.letter : ""))
      .join("");
    if (selectedWord === level.word) {
      setIsWordFound(true);
    }
  };

  const showHint = () => {
    setIsHintShown(true);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setIsWordFound(false);
      setSelectedLetters([]);
      setIsHintShown(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level {currentLevel + 1}: Find the word!</Text>
      <Grid
        grid={grid}
        selectedLetters={selectedLetters}
        onCellPress={handleCellPress}
      />
      {isHintShown && <Text style={styles.hint}>{level.hint}</Text>}
      {isWordFound && (
        <Text style={styles.congratulations}>
          Congratulations! You found the word!
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Check Word" onPress={checkWord} />
        <Button title="Hint" onPress={showHint} />
      </View>
      {currentLevel < levels.length - 1 && !isWordFound && (
        <Button title="Next Level" onPress={nextLevel} disabled />
      )}
      {currentLevel < levels.length - 1 && isWordFound && (
        <Button title="Next Level" onPress={nextLevel} />
      )}
    </View>
  );
};
function generateGrid(word) {
  const grid = [...Array(8)].map(() => Array(8).fill({ letter: "" }));

  // Find a random starting point for the word
  const startIndex = Math.floor(Math.random() * grid.length * grid[0].length);

  // Choose a random direction for the word (horizontal, vertical, or diagonal)
  const directions = ["horizontal", "vertical", "diagonalDown", "diagonalUp"];
  const direction = directions[Math.floor(Math.random() * directions.length)];

  // Insert the word into the grid based on the chosen direction
  insertWord(grid, word, startIndex, direction);

  // Fill the remaining cells with random letters
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].letter === "") {
        grid[i][j].letter =
          ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
    }
  }

  return grid;
}

function insertWord(grid, word, startIndex, direction) {
  const wordLength = word.length;
  const row = Math.floor(startIndex / 8);
  const col = startIndex % 8;

  switch (direction) {
    case "horizontal":
      for (let i = 0; i < wordLength; i++) {
        const newCol = col + i;
        if (newCol < 0 || newCol >= 8) {
          return; // Word doesn't fit
        }
        grid[row][newCol].letter = word[i];
      }
      break;
    case "vertical":
      for (let i = 0; i < wordLength; i++) {
        const newRow = row + i;
        if (newRow < 0 || newRow >= 8) {
          return; // Word doesn't fit
        }
        grid[newRow][col].letter = word[i];
      }
      break;
    case "diagonalDown":
      for (let i = 0; i < wordLength; i++) {
        const newRow = row + i;
        const newCol = col + i;
        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
          return; // Word doesn't fit
        }
        grid[newRow][newCol].letter = word[i];
      }
      break;
    case "diagonalUp":
      for (let i = 0; i < wordLength; i++) {
        const newRow = row - i;
        const newCol = col + i;
        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
          return; // Word doesn't fit
        }
        grid[newRow][newCol].letter = word[i];
      }
      break;
  }
}

const Grid = ({ grid, selectedLetters, onCellPress }) => {
  return (
    <View style={styles.grid}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <LetterCell
              key={colIndex}
              letter={cell.letter}
              isSelected={selectedLetters.includes(rowIndex * 8 + colIndex)}
              onPress={() => onCellPress(rowIndex * 8 + colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const LetterCell = ({ letter, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.cell, isSelected && styles.selectedCell]}
      onPress={onPress}
    >
      <Text style={styles.cellText}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hint: {
    color: "gray",
    fontSize: 16,
    marginTop: 10,
  },
  congratulations: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginTop: 10,
  },
  grid: {
    flexDirection: "column",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  selectedCell: {
    backgroundColor: "#eee",
  },
  cellText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default GameScreen;
