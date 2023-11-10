// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
//   Button,
//   Alert,
//   ScrollView,
// } from "react-native";
// import ChatAssistant from "./chatAssistant";
// import Quiz from "./BeginnerQuiz";
// import { db, auth } from "../config/firebaseConfig";
// import {
//   collection,
//   doc,
//   setDoc,
//   onSnapshot,
//   updateDoc,
//   getDocs,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import ActivityLog from "./ActivityLog";
// import ReadDailyNews from "./ReadDailyNews";

// const Home = ({ navigation }) => {
//   const [showBeginnersQuiz, setShowBeginnersQuiz] = useState(false);
//   const [isFirstTime, setIsFirstTime] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [levelDetermainingQuestions, setLevelDetermaining] = useState([]);
//   const [logs, setLogs] = useState(null);
//   const fetchUserData = async () => {
//     if (auth.currentUser) {
//       const user = auth.currentUser;
//       if (user !== null && user.emailVerified) {
//         const uid = user.uid;
//         try {
//           onSnapshot(doc(db, "Users", uid), (doc) => {
//             setIsFirstTime(doc.data().isFirstTime);
//             setUserData(doc.data());
//           });

//           const tasksCompletedRef = collection(
//             db,
//             `Users/${uid}/TasksCompleted`
//           );
//           const tasksQuery = query(
//             tasksCompletedRef,
//             orderBy("dateCompleted", "desc")
//           );
//           getDocs(tasksQuery)
//             .then((querySnapshot) => {
//               let list = [];
//               querySnapshot.forEach((doc) => {
//                 list.push(doc.data());
//               });
//               setLogs(list);
//             })
//             .catch((error) => {
//               console.error("Error getting documents: ", error);
//             });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);
//   const readQuiz = () => {
//     if (userData) {
//       onSnapshot(
//         doc(db, `/Lessons/${userData.ageGroup}/Levels`, "levelQuiz"),
//         (doc) => {
//           setLevelDetermaining(doc.data().levelDetermainingQuestions);
//         }
//       );
//     }
//   };
//   if (levelDetermainingQuestions.length === 0) {
//     readQuiz();
//   }

//   const updateUserIsFirstTime = async (isFirst, result) => {
//     if (auth.currentUser) {
//       const user = auth.currentUser;
//       if (user !== null && user.emailVerified) {
//         const uid = user.uid;
//         let level = "Beginners";
//         if ((result > 6) & (result <= 9)) {
//           level = "Intermediate";
//         } else if (result > 9) {
//           level = "Advanced";
//         } else {
//           level = "Beginners";
//         }
//         try {
//           await updateDoc(doc(db, "Users", uid), {
//             isFirstTime: isFirst,
//             level: level,
//           });
//           setIsFirstTime(isFirst);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//   };

//   // const onSubmit = () => {
//   //   const collectionRef = collection(db, "/Lessons/Under_14/Levels");
//   //   setDoc(doc(collectionRef, "levelQuiz"), {
//   //     levelDetermainingQuestions,
//   //   }).catch((error) => {
//   //     Alert.alert(error.errorCode, error.message);
//   //   });
//   //   const collectionRef2 = collection(db, "/Lessons/15_18/Levels");

//   //   setDoc(doc(collectionRef2, "levelQuiz"), {
//   //     levelDetermainingQuestions,
//   //   }).catch((error) => {
//   //     Alert.alert(error.errorCode, error.message);
//   //   });
//   //   const collectionRef3 = collection(db, "/Lessons/19_and_above/Levels");

//   //   setDoc(doc(collectionRef3, "levelQuiz"), {
//   //     levelDetermainingQuestions,
//   //   }).catch((error) => {
//   //     Alert.alert(error.errorCode, error.message);
//   //   });
//   //   const collectionRef4 = collection(db, "/Lessons/Employee/Levels");

//   //   setDoc(doc(collectionRef4, "levelQuiz"), {
//   //     levelDetermainingQuestions,
//   //   }).catch((error) => {
//   //     Alert.alert(error.errorCode, error.message);
//   //   });
//   // };

//   const handleDone = (result) => {
//     updateUserIsFirstTime(false, result);
//     setShowBeginnersQuiz(false);
//   };
//   return (
//     <ImageBackground
//       source={require("../../assets/bg.jpeg")}
//       style={styles.background}
//     >
//       <View style={styles.topContainer}>
//         <Image
//           source={require("../../assets/icon.png")}
//           style={styles.appIcon}
//         />
//       </View>
//       <View style={styles.container}>
//         {isFirstTime ? (
//           <TouchableOpacity
//             style={styles.quizButton}
//             onPress={() => setShowBeginnersQuiz(!showBeginnersQuiz)}
//           >
//             <Text style={styles.quizButtonText}> Beginners Quiz</Text>
//           </TouchableOpacity>
//         ) : (
//           <ScrollView contentContainerStyle={{
//             justifyContent:'center',
//             alignSelf:'center',
//             top:"30%"
//           }}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 navigation.navigate("Cyber Security News");
//               }}
//             >
//               <Text style={styles.buttonText}>Cyber Security News</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 navigation.navigate("My Learning", {
//                   userData: userData,
//                 });
//               }}
//             >
//               <Text style={styles.buttonText}>Cyber Security Lessons</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 navigation.navigate("Certifications");
//               }}
//             >
//               <Text style={styles.buttonText}>
//                 Cyber Security Certifications Roadmap
//               </Text>
//             </TouchableOpacity>
//             <View style={styles.rowContainer}>
//               <TouchableOpacity
//                 style={{ ...styles.button }}
//                 onPress={() => {
//                   navigation.navigate("Stories", {
//                     userData: userData,
//                   });
//                 }}
//               >
//                 <Text style={styles.buttonText}>Stories </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => {
//                   navigation.navigate("Scenarios", {
//                     userData: userData,
//                   });
//                 }}
//               >
//                 <Text style={styles.buttonText}>Scenarios </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => {
//                   navigation.navigate("Exercises", {
//                     userData: userData,
//                   });
//                 }}
//               >
//                 <Text style={styles.buttonText}>Exercises </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         )}
//         {showBeginnersQuiz && (
//           <Quiz
//             questions={levelDetermainingQuestions}
//             handleDone={handleDone}
//           />
//         )}
//       </View>
//       <View style={styles.bottomContainer}>
//         <ChatAssistant />
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
//     flex: 1,
//     justifyContent: "center",
//     top: 60,
//     padding: 3,
//   },
//   topContainer: {
//     position: "absolute",
//     top: 0,
//   },
//   appIcon: {
//     width: 180,
//     height: 180,
//     borderRadius: 100,
//     top: 70,
//   },
//   quizButton: {
//     minWidth: "80%",
//     height: 40,
//     backgroundColor: "blue",
//     alignItems: "center",
//     alignSelf: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   quizButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   headingLog: {
//     fontSize: 20,
//     fontWeight: "bold",
//     maxWidth: "100%",
//     minWidth: "100%",
//     paddingHorizontal: 10,
//     color: "white",
//   },
//   button: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 6,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   rowContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     marginTop: 10,
//   },

//   bottomContainer: {
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//     width: "100%",
//   },
// });

// export default Home;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import ChatAssistant from "./chatAssistant";
import Quiz from "./BeginnerQuiz";
import { db, auth } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import ActivityLog from "./ActivityLog";
import ReadDailyNews from "./ReadDailyNews";
import { FontAwesome } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [showBeginnersQuiz, setShowBeginnersQuiz] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [userData, setUserData] = useState(null);
  const [levelDetermainingQuestions, setLevelDetermaining] = useState([]);
  const [logs, setLogs] = useState(null);
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user !== null && user.emailVerified) {
        const uid = user.uid;
        try {
          onSnapshot(doc(db, "Users", uid), (doc) => {
            setIsFirstTime(doc.data().isFirstTime);
            setUserData(doc.data());
          });

          const tasksCompletedRef = collection(
            db,
            `Users/${uid}/TasksCompleted`
          );
          const tasksQuery = query(
            tasksCompletedRef,
            orderBy("dateCompleted", "desc")
          );
          getDocs(tasksQuery)
            .then((querySnapshot) => {
              let list = [];
              querySnapshot.forEach((doc) => {
                list.push(doc.data());
              });
              setLogs(list);
            })
            .catch((error) => {
              console.error("Error getting documents: ", error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const readQuiz = () => {
    if (userData) {
      onSnapshot(
        doc(db, `/Lessons/${userData.ageGroup}/Levels`, "levelQuiz"),
        (doc) => {
          setLevelDetermaining(doc.data().levelDetermainingQuestions);
        }
      );
    }
  };

  if (levelDetermainingQuestions.length === 0) {
    readQuiz();
  }

  const updateUserIsFirstTime = async (isFirst, result) => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user !== null && user.emailVerified) {
        const uid = user.uid;
        let level = "Beginners";
        if ((result > 6) & (result <= 9)) {
          level = "Intermediate";
        } else if (result > 9) {
          level = "Advanced";
        } else {
          level = "Beginners";
        }
        try {
          await updateDoc(doc(db, "Users", uid), {
            isFirstTime: isFirst,
            level: level,
          });
          setIsFirstTime(isFirst);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleDone = (result) => {
    updateUserIsFirstTime(false, result);
    setShowBeginnersQuiz(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.topContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.appIcon}
        />
      </View>
      <View style={styles.container}>
        {isFirstTime ? (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setShowBeginnersQuiz(!showBeginnersQuiz)}
          >
            <Text style={styles.quizButtonText}> Beginners Quiz</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView contentContainerStyle={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Cyber Security News");
              }}
            >
              <FontAwesome name="newspaper-o" size={40} color="green" />
              <Text style={styles.buttonText}>Cyber Security News</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("My Learning", {
                  userData: userData,
                });
              }}
            >
              <FontAwesome name="graduation-cap" size={40} color="green" />
              <Text style={styles.buttonText}>Cyber Security Lessons</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Certifications");
              }}
            >
              <FontAwesome name="certificate" size={40} color="green" />
              <Text style={styles.buttonText}>
                Cyber Security Certifications Roadmap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Stories", {
                  userData: userData,
                });
              }}
            >
              <FontAwesome name="book" size={40} color="green" />
              <Text style={styles.buttonText}>Stories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Scenarios", {
                  userData: userData,
                });
              }}
            >
              <FontAwesome name="tasks" size={40} color="green" />
              <Text style={styles.buttonText}>Scenarios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Exercises", {
                  userData: userData,
                });
              }}
            >
              <FontAwesome name="file-text" size={40} color="green" />
              <Text style={styles.buttonText}>Exercises</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
        {showBeginnersQuiz && (
          <Quiz
            questions={levelDetermainingQuestions}
            handleDone={handleDone}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <ChatAssistant />
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
    flex: 1,
    justifyContent: "center",
    top: 0,
    padding: 3,
  },
  topContainer: {
    position: "absolute",
    top: 0,
  },
  appIcon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    top: "30%",
  },
  quizButton: {
    minWidth: "80%",
    height: 40,
    backgroundColor: "blue",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  quizButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  headingLog: {
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "100%",
    minWidth: "100%",
    paddingHorizontal: 10,
    color: "white",
  },
  buttonContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center", // Center vertically
    marginVertical: 5,
    top: "60%",
    paddingBottom: "20%",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    width: "100%",
  },
});

export default Home;
