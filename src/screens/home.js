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
        let level = "Beginner";
        if ((result > 6) & (result <= 9)) {
          level = "Intermediate";
        } else if (result > 9) {
          level = "Advanced";
        } else {
          level = "Beginner";
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

  const onSubmit = () => {
    const collectionRef = collection(db, "/Lessons/Under_14/Levels");

    setDoc(doc(collectionRef, "levelQuiz"), {
      levelDetermainingQuestions,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef2 = collection(db, "/Lessons/15_18/Levels");

    setDoc(doc(collectionRef2, "levelQuiz"), {
      levelDetermainingQuestions,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef3 = collection(db, "/Lessons/19_and_above/Levels");

    setDoc(doc(collectionRef3, "levelQuiz"), {
      levelDetermainingQuestions,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
    const collectionRef4 = collection(db, "/Lessons/Employee/Levels");

    setDoc(doc(collectionRef4, "levelQuiz"), {
      levelDetermainingQuestions,
    }).catch((error) => {
      Alert.alert(error.errorCode, error.message);
    });
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
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.appIcon}
          />
        </View>

        {isFirstTime ? (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setShowBeginnersQuiz(true)}
          >
            <Text style={styles.quizButtonText}> Beginners Quiz</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "#0A4BC9",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Text style={styles.headingLog}>Cyber security news</Text>
            </View>

            <ReadDailyNews></ReadDailyNews>
          </View>
        )}
        {showBeginnersQuiz && (
          <View style={styles.quizContainer}>
            <>
              <Quiz
                questions={levelDetermainingQuestions}
                handleDone={handleDone}
              />
            </>
          </View>
        )}

        <View
          style={{ bottom: 60, left: 0, position: "absolute", width: "100%" }}
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
    top: 50,
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  appIcon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    top: 0,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    color: "white",
    padding: 10,
  },
  quizContainer: {
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
  containerLog: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 20,
    paddingHorizontal: 20,
    opacity: 0.7,
    margin: 10,
    borderRadius: 10,
  },
  headingLog: {
    fontSize: 20,
    fontWeight: "bold",
    //marginBottom: 20,
    width: "80%",
    alignSelf: "center",
    color:'white'
  },
});

export default Home;
