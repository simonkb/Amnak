// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Button,
//   ScrollView,
// } from "react-native";
// import ChatAssistant from "./chatAssistant";

// const Quizzes = ({ navigation }) => {
//   const [expanded, setExpanded] = useState(null);
//   const data = [
//     {
//       id: 1,
//       title: "Educative stories Quizzes",
//       quizzes: [
//         { topic: "Quiz on lesson 1", id: 1 },
//         { topic: "Quiz on lesson 2", id: 2 },
//         { topic: "Quiz on lesson 3", id: 3 },
//       ],
//     },
//     {
//       id: 2,
//       title: "Basics of CIA Quizzes",
//       quizzes: [
//         { topic: "Quiz on lesson 1", id: 1 },
//         { topic: "Quiz on lesson 2", id: 2 },
//         { topic: "Quiz on lesson 3", id: 3 },
//       ],
//     },
//     {
//       id: 3,
//       title: "Path Ways to IS Quizzes",
//       quizzes: [
//         { topic: "Quiz on lesson 1", id: 1 },
//         { topic: "Quiz on lesson 2", id: 2 },
//         { topic: "Quiz on lesson 3", id: 3 },
//       ],
//     },
//     {
//       id: 4,
//       title: "Passwords Quizzes",
//       quizzes: [
//         { topic: "Quiz on lesson 1", id: 1 },
//         { topic: "Quiz on lesson 2", id: 2 },
//         { topic: "Quiz on lesson 3", id: 3 },
//       ],
//     },
//     {
//       id: 5,
//       title: "Best Practices Quizzes",
//       quizzes: [
//         { topic: "Quiz on lesson 1", id: 1 },
//         { topic: "Quiz on lesson 2", id: 2 },
//         { topic: "Quiz on lesson 3", id: 3 },
//       ],
//     },
//   ];
//   const toggleExpanded = (index) => {
//     setExpanded(expanded === index ? null : index);
//   };
//   const handleQuizPressed = (title) => {
//     navigation.navigate("Quiz", { quizTitle: title });
//   };
//   const renderItem = ({ item, index }) => {
//     return (
//       <>
//         <TouchableOpacity
//           style={styles.quizButton}
//           onPress={() => {
//             toggleExpanded(index);
//           }}
//         >
//           <Text style={styles.quizButtonText}>{item.title}</Text>
//         </TouchableOpacity>

//         {expanded === index && (
//           <ScrollView>
//             {item.quizzes.map((quiz) => (
//               <View style={styles.quizListContainer} key={quiz.id}>
//                 <TouchableOpacity
//                   onPress={() => {
//                     handleQuizPressed(item.title + "\n" + quiz.topic);
//                   }}
//                 >
//                   <Text>{quiz.topic}</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         )}
//       </>
//     );
//   };
//   return (
//     <ImageBackground
//       source={require("../../assets/bg.jpeg")}
//       style={styles.background}
//     >
//       <View style={styles.container}>
//         <View style={styles.topContainer}>
//           <Image
//             source={require("../../assets/icon.png")}
//             style={styles.appIcon}
//           />
//           <Text style={styles.headingText}>Beginner Quizzes</Text>
//         </View>
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.quizzesContainer}
//         />
//         <View
//           style={{ bottom: 20, left: 0, position: "absolute", width: "100%" }}
//         >
//           <ChatAssistant />
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container: {
//     width: "100%",
//     height: "100%",
//     paddingTop: 80,
//   },
//   topContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   appIcon: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   headingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 10,
//   },
//   quizzesContainer: {
//     //alignItems: "center",
//     left: "10%",
//     right: "10%",
//   },
//   quizButton: {
//     width: "80%",
//     height: 40,
//     backgroundColor: "blue",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   quizButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   quizListContainer: {
//     backgroundColor: "white",
//     padding: 8,
//     margin: 8,
//     borderRadius: 4,
//     width: "70%",
//   },
// });

// export default Quizzes;
