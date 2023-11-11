// import React, { useRef, useState, useCallback, useEffect } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import DraggableComponent from "./draggable2";
// import Box from "./Box";
// const Exercise = ({ currentExercise }) => {
//   const [boxPositions, setBoxPositions] = useState(
//     Object.fromEntries(
//       currentExercise.boxes.map((box) => [box.id, { x: 0, y: 0 }])
//     )
//   );
//   const targetViewRef = useRef(null);

//   const handleTargetLayout = () => {
//     if (targetViewRef.current) {
//       targetViewRef.current.measure((x, y, width, height, pageX, pageY) => {
//         const targetViewPosition = {
//           x,
//           y,
//           width,
//           height,
//           pageX,
//           pageY,
//           bottom: pageY + height,
//           right: pageX + width,
//         };

//         // Now you have the position of the target view
//         console.log("Target View Position:", targetViewPosition);
//       });
//     }
//   };

//   const handleDrop = (boxId, category, position) => {
//     if (targetViewRef.current) {
//       targetViewRef.current.measure((x, y, width, height, pageX, pageY) => {
//         const topLeft = { x, y };
//         const bottomRight = { x: x + width, y: y + height };

//         // Check if the dropped position is within the target view
//         if (
//           position.x >= topLeft.x &&
//           position.y >= topLeft.y &&
//           position.x <= bottomRight.x &&
//           position.y <= bottomRight.y
//         ) {
//           console.log("Dropped inside the target view!");
//         } else {
//           console.log("Dropped outside the target view.");
//         }
//       });
//     }
//   };

//   return (
//     <View style={styles.exercise}>
//       <Text style={styles.exerciseDescription}>
//         {currentExercise.description}
//       </Text>
//       <View style={styles.wrapper}>
//         {currentExercise.boxes.map((item) => (
//           <DraggableComponent
//             key={item.id}
//             boxId={item.id}
//             category={item.category}
//             position={boxPositions[item.id]}
//             onDrop={handleDrop}
//           >
//             <Box key={item.id} text={item.text}></Box>
//           </DraggableComponent>
//         ))}
//       </View>
//       <View style={styles.wrapper}>
//         {currentExercise.categories.map((element) => (
//           <View
//             ref={targetViewRef}
//             onLayout={handleTargetLayout}
//             key={element}
//             style={styles.category}
//           >
//             <Text style={styles.categoryTitle}>{element}</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.clearButton}>
//           <Text style={styles.buttonText}>Clear</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.submitButton}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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
    minHeight: 150,
    borderWidth: 0.4,
    marginHorizontal: 3,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
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
// export default Exercise;
import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DraggableComponent from "./draggable2";
import Box from "./Box";

const Exercise = ({ currentExercise }) => {
  const [boxPositions, setBoxPositions] = useState(
    Object.fromEntries(
      currentExercise.boxes.map((box) => [box.id, { x: 0, y: 0 }])
    )
  );

  const [targetPositions, setTargetPositions] = useState({});

  const handleTargetLayout = (category) => (event) => {
    const { x, y, width, height, pageX, pageY } = event.nativeEvent.layout;
    const targetViewPosition = {
      x,
      y,
      width,
      height,
      pageX,
      pageY,
      bottom: pageY + height,
      right: pageX + width,
    };

    // Update the target view position dynamically based on the category
    setTargetPositions((prevPositions) => ({
      ...prevPositions,
      [category]: targetViewPosition,
    }));
  };

  const handleDrop = (boxId, category, position) => {
    const targetViewPosition = targetPositions[category];

    if (targetViewPosition) {
      const { x, y, right, bottom } = targetViewPosition;

      // Check if the dropped position is within the target view
      if (position.x >= x && position.y >= y && position.x <= right && position.y <= bottom) {
        console.log(`Dropped inside the target view of category: ${category}`);
      } else {
        console.log("Dropped outside the target view.");
      }
    }
  };

  return (
    <View style={styles.exercise}>
      <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
      <View style={styles.wrapper}>
        {currentExercise.boxes.map((item) => (
          <DraggableComponent
            key={item.id}
            boxId={item.id}
            category={item.category}
            position={boxPositions[item.id]}
            onDrop={handleDrop}
          >
            <Box key={item.id} text={item.text}></Box>
          </DraggableComponent>
        ))}
      </View>
      <View style={styles.wrapper}>
        {currentExercise.categories.map((category) => (
          <View
            key={category}
            onLayout={handleTargetLayout(category)}
            style={styles.category}
          >
            <Text style={styles.categoryTitle}>{category}</Text>
          </View>
        ))}
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
  );
};



export default Exercise;
