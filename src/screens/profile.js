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
import ChatAssistant from "./chatAssistant";
import { signOut } from "firebase/auth";
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
import { sendEmailVerification } from "firebase/auth";

const Profile = ({ navigation }) => {
  const [userRank, setUserRank] = useState("-");

  const [userData, setUserData] = useState({
    username: "",
    email_address: "",
    birthDate: 0,
    points: 0,
    level: "",
    ageGroup: "",
  });

  const [logs, setLogs] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false); // New state for email verification
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      if (user) {
        setIsEmailVerified(user.emailVerified);
        const uid = user.uid;

        try {
          // Fetch data using onSnapshot
          onSnapshot(doc(db, "Users", uid), (doc) => {
            setUserData(doc.data());

            // Now that you have the userData, fetch additional data using getDocs
            const ageGroup = doc.data().ageGroup;
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
                  // console.log(
                  //   `User ${uid} is ranked at index ${userIndex + 1}`
                  // );
                } else {
                  console.log(`User ${uid} not found in this age group`);
                }
              })
              .catch((error) => {
                console.error("Error getting documents: ", error);
              });
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

  const sendVerificationEmail = () => {
    const user = auth.currentUser;
    sendEmailVerification(user)
      .then(() => {
        Alert.alert(
          "Email Verification",
          "A verification link has been sent to your email address. Please check your inbox.",
          [{ text: "OK" }]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyEmail = () => {
    sendVerificationEmail();
  };
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
          <View style={styles.topContainer}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.profilePic}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.text}>{userData.username}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{userData.email_address}</Text>
            </View>
            {!isEmailVerified && ( // Display the button if email is not verified
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleVerifyEmail}
              >
                <Text style={styles.verifyButtonText}>Verify Email</Text>
              </TouchableOpacity>
            )}

            <View style={styles.infoRow}>
              <Text style={styles.label}>Level:</Text>
              <Text style={styles.text}>{userData.level}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Age group:</Text>
              <Text style={styles.text}>{userData.ageGroup}</Text>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>Points:</Text>
              <Text style={styles.pointsText}>{userData.points}</Text>
            </View>
            <View style={styles.pointsRow}>
              <Text style={styles.pointsLabel}>
                Your Rank in {userData.ageGroup} Category:
              </Text>
              <Text style={[styles.pointsText, getRankStyle(userRank)]}>
                {formatRank(userRank)}
              </Text>
            </View>
          </View>
          <View style={styles.containerLog}>
            <Text style={styles.headingLog}>Your Activities</Text>
            <ActivityLog logs={logs} />
          </View>

          <Button
            title="Logout"
            onPress={() => {
              signOut(auth)
                .then(() => {
                  // User signed out
                  // navigation.navigate("Auth");
                })
                .catch((error) => {
                  // Handle errors here
                });
            }}
          />
        </View>
        <View
          style={{ bottom: 0, left: 0, position: "absolute", width: "100%" }}
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
    // height: "25%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  headingLog: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  verifyButton: {
    marginLeft: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  verifyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
});

export default Profile;
