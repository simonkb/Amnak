import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import Draggable from "./draggable";
import DraggableComponent from "./draggable2";
import Box from "./Box";

const Exercise = ({ exercise, onDrop, onSubmit, onClear, currentIndex }) => {
  const [categories, setCategories] = useState({
    weak: [],
    strong: [],
  });

  const [currentBoxes, setCurrentBoxes] = useState([]);

  useEffect(() => {
    // Set the current boxes when the exercise changes
    setCurrentBoxes(exercise.boxes);
    setCategories({ weak: [], strong: [] }); // Reset categories on exercise change
  }, [exercise]);

  const renderBox = (box) => (
    <DragAndDropBox
      key={box.id}
      box={box}
      category={box.category}
      onDrop={(box, category) => {
        // Handle the drop for the current exercise
        const updatedCategories = { ...categories };
        const previousCategory = box.category;
        updatedCategories[previousCategory] = updatedCategories[
          previousCategory
        ].filter((b) => b.id !== box.id);
        updatedCategories[category].push(box);
        setCategories(updatedCategories);

        // Update the current boxes
        const updatedBoxes = currentBoxes.map((b) =>
          b.id === box.id ? { ...b, category } : b
        );
        setCurrentBoxes(updatedBoxes);
      }}
    />
  );

  const handleClear = () => {
    setCategories({ weak: [], strong: [] });
  };

  const handleSubmit = () => {
    const correctCount = currentBoxes.filter(
      (box) => box.category === categories[box.category]
    ).length;
    const wrongCount = currentBoxes.length - correctCount;

    // Display results
    alert(`Correct: ${correctCount}, Wrong: ${wrongCount}`);
  };

  return (
    <View style={styles.exercise}>
      <Text style={styles.exerciseDescription}>{exercise.description}</Text>
      {currentBoxes.map((box) => renderBox(box))}
      <View style={styles.categories}>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Weak</Text>
          {categories.weak.map((box) => renderBox(box))}
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Strong</Text>
          {categories.strong.map((box) => renderBox(box))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DragAndDropBox = ({ box, category, onDrop }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        setDragging(false);
        const dropCategory = category === "weak" ? "strong" : "weak";
        onDrop(box, dropCategory);
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: position.getTranslateTransform(),
          opacity: dragging ? 0.8 : 1,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.boxText}>{box.text}</Text>
    </Animated.View>
  );
};
const Exercises = () => {
  const exercises = [
    {
      id: "1",
      description: "Question 1: Categorize the following passwords",
      boxes: [
        { id: "box1", text: "password123", category: "weak" },
        { id: "box2", text: "securePassword123", category: "weak" },
        { id: "box3", text: "strongPassword123!", category: "strong" },
        { id: "box4", text: "weakPassword", category: "weak" },
      ],
    },
    {
      id: "2",
      description: "Question 2: Categorize the following passwords",
      boxes: [
        { id: "box1", text: "password123", category: "weak" },
        { id: "box2", text: "securePassword123", category: "weak" },
        { id: "box3", text: "strongPassword123!", category: "strong" },
        { id: "box4", text: "weakPassword", category: "weak" },
      ],
    },
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const goToNextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  }, [currentExerciseIndex]);

  const goToPrevExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  }, [currentExerciseIndex]);

  const currentExercise = exercises[currentExerciseIndex];
  const arr = new Array(25).fill("").map((_, i) => i);
  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {/* <Exercise
        key={currentExercise.id}
        exercise={currentExercise}
        currentIndex={currentExerciseIndex}
        onDrop={(box, category) => {
          // Handle drop for the current exercise
          // This function can be extended to handle the drop for the entire exercise if needed
          // For now, we'll just print the dropped box and category
          console.log(`Dropped ${box.text} into category ${category}`);
        }}
        onSubmit={() => {
          // Handle submit for the current exercise
          const correctCount = currentExercise.boxes.filter(
            (box) => box.category === categories[box.id]
          ).length;
          const wrongCount = currentExercise.boxes.length - correctCount;

          // Display results
          alert(`Correct: ${correctCount}, Wrong: ${wrongCount}`);
        }}
        onClear={() => {
          // Handle clear for the current exercise
          console.log("Clearing categories for the current exercise");
        }}
      />
      <View style={styles.navigationButtons}>
        <Button
          title="Previous"
          onPress={goToPrevExercise}
          disabled={currentExerciseIndex === 0}
        />
        <Button
          title="Next"
          onPress={goToNextExercise}
          disabled={currentExerciseIndex === exercises.length - 1}
        />
      </View> */}
      <View style={styles.exercise}>
        <Text style={styles.exerciseDescription}>
          {currentExercise.description}
        </Text>
        <View style={styles.wrapper}>
          {currentExercise.boxes.map((item) => (
            <DraggableComponent key={item.id}>
              <Box key={item.id} text={item.text}></Box>
            </DraggableComponent>
          ))}
        </View>
        <View style={styles.categories}>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Weak</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>Strong</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <Button
          title="Previous"
          onPress={goToPrevExercise}
          disabled={currentExerciseIndex === 0}
        />
        <Button
          title="Next"
          onPress={goToNextExercise}
          disabled={currentExerciseIndex === exercises.length - 1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  exercise: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  exerciseDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    flex: 1,
    height: 300,
    borderWidth: 0.4,
    marginHorizontal: 3,
    padding: 5,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  box: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: "40%",
  },
  boxText: {
    color: "white",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#66cc66",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
  },
});

export default Exercises;
