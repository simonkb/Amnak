import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
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
  where,
} from "firebase/firestore";
import ActivityLog from "./ActivityLog";

const Grades = ({ navigation }) => {
  const [userRank, setUserRank] = useState("-");

  const [userData, setUserData] = useState({
    username: "",
    email_address: "",
    birthDate: 0,
    points: 0,
    level: "",
    ageGroup: "",
    category: "",
  });

  const [logs, setLogs] = useState(null);
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        try {
          // Fetch data using onSnapshot
          onSnapshot(doc(db, "Users", uid), (document) => {
            setUserData(document.data());

            // Now that you have the userData, fetch additional data using getDocs
            const ageGroup = document.data().ageGroup;
            const category = document.data().category;
            if (category !== "Employee") {

              onSnapshot(
                doc(db, `/Lessons/${ageGroup}/Levels`, "Evaluation_Test"),
                (doc) => {
                  setTest(doc.data().test);
                }
              );
              const usersInAgeGroupRef = collection(db, "Users");
              const q = query(
                usersInAgeGroupRef,
                where("ageGroup", "==", ageGroup),
                orderBy("points", "desc")
              );
              getDocs(q)
                .then((querySnapshot) => {
                  let userIndex = -1;
                  querySnapshot.docs.forEach((doc, index) => {
                    if (doc.id === uid) {
                      userIndex = index;
                    }
                  });
                  if (userIndex !== -1) {
                    setUserRank(userIndex + 1);
                  } else {
                    console.log(`User ${uid} not found in this age group`);
                  }
                })
                .catch((error) => {
                  console.error("Error getting documents: ", error);
                });
            
            } else {
              onSnapshot(
                doc(db, `/Lessons/${category}/Levels`, "Evaluation_Test"),
                (doc) => {
                  setTest(doc.data().test);
                }
              );
              const usersInAgeGroupRef = collection(db, "Users");
              const q = query(
                usersInAgeGroupRef,
                where("category", "==", category),
                orderBy("points", "desc")
              );
              getDocs(q)
                .then((querySnapshot) => {
                  let userIndex = -1;
                  querySnapshot.docs.forEach((doc, index) => {
                    if (doc.id === uid) {
                      userIndex = index;
                    }
                  });
                  if (userIndex !== -1) {
                    setUserRank(userIndex + 1);
                  } else {
                    console.log(`User ${uid} not found in this age group`);
                  }
                })
                .catch((error) => {
                  console.error("Error getting documents: ", error);
                });
            }
          });
        
        } catch (error) {
          console.log(error);
        }

        const tasksCompletedRef = collection(db, `Users/${uid}/TasksCompleted`);
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
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getRankStyle = (rank) => {
    if (rank === 1) {
      return styles.goldRank;
    } else if (rank === 2) {
      return styles.silverRank;
    } else if (rank === 3) {
      return styles.bronzeRank;
    } else {
      return styles.normalRank;
    }
  };
  const [test, setTest] = useState([]);

  function getRandomQuestions(questionsList) {
    // Shuffle the input questions list to get a random order
    const shuffledQuestions = [...questionsList].sort(
      () => Math.random() - 0.5
    );

    // Return the first 15 questions from the shuffled list
    return shuffledQuestions.slice(0, 15);
  }
  const formatRank = (rank) => {
    return rank <= 3 ? rank.toString() : `#${rank}`;
  };
  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.blurBackground}>
        <View style={styles.container}>
          <View style={styles.pointsContainer}>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>Current Level : </Text>
              <Text style={styles.pointsText}>{userData.level}</Text>
            </View>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>Points Collected :</Text>
              <Text style={styles.pointsText}>{userData.points}</Text>
            </View>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>
                Rank in{" "}
                {userData.category === "Employee"
                  ? "Employee"
                  : userData.ageGroup}{" "}
                Category:
              </Text>
              <Text style={[styles.pointsText, getRankStyle(userRank)]}>
                {formatRank(userRank)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.lessonButton}
            onPress={() => {
              navigation.navigate("Evaluation Test", {
                quiz: getRandomQuestions(test),
                userData: userData,
              });
            }}
          >
            <Text style={styles.lessonButtonText}>Take Evaluation Test</Text>
          </TouchableOpacity>
          <View style={styles.containerLog}>
            <Text style={styles.headingLog}>Your Activities</Text>
            <ActivityLog logs={logs} />
          </View>
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
  blurBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    opacity: 0.9,
    padding: 10,
    flex: 1,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    top: 25,
    width: 150,
    height: 80,
    borderRadius: 100,
  },
  infoContainer: {
    width: "95%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  pointsContainer: {
    width: "100%",
    padding: 10,
    //  alignItems: "center",
    justifyContent: "center",
    margin: 20,
    backgroundColor: "#33B0FF",
    borderRadius: 10,
  },
  pointsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsLabel: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 20,
    color: "green",
  },

  containerLog: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
  },
  headingLog: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    padding: 10,
  },

  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 10,
  },
  pointsLabel: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  pointsText: {
    fontSize: 20,
  },
  goldRank: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 35,
  },
  silverRank: {
    color: "silver",
    fontWeight: "bold",
    fontSize: 35,
  },
  bronzeRank: {
    color: "peru",
    fontWeight: "bold",
    fontSize: 35,
  },
  normalRank: {
    fontSize: 24,
    fontWeight: "bold",
  },
  lessonButton: {
    width: "100%",
    height: 40,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  lessonButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Grades;
