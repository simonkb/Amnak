import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Animated,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig.js";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (!user.emailVerified) {
  //         setLoading(true);
  //       } else {
  //         setLoading(false); // hide the loading screen when email is verified
  //       }
  //     }
  //   });

  //   return unsubscribe; // unsubscribe listener on unmount
  // }, []);
  const [user, setUser] = useState(null);
  const handleSignup = () => {
    // Validate form fields
    if (!username || !email || !password || !confirmPassword || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    if ((age < 5) | (age > 100)) {
      alert("Please enter a valid date of birth.");
      return;
    }
    let ageGroup;

    if (age < 14) {
      ageGroup = "Under_14";
    } else if (age >= 15 && age <= 18) {
      ageGroup = "15_18";
    } else if (age >= 19) {
      ageGroup = "19_and_above";
    } else {
      ageGroup = "Employee";
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        sendEmailVerification(userCredential.user)
          .then(() => {
            setLoading(true);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert("Error", error.message);
          });
        const usersRef = collection(db, "Users");
        setDoc(doc(usersRef, userCredential.user.uid), {
          username: username,
          email_address: email,
          birthDate: date.getTime(),
          level: "Beginner",
          points: 0,
          ageGroup: ageGroup,
          isFirstTime: false,
        }).catch((error) => {
          Alert.alert(error.errorCode, error.message);
        });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error.message);
      });
  };

  // const handlePress = () => {
  //   if (user.emailVerified) {
  //     // perform the action when the condition is true
  //     setLoading(false);
  //   } else {
  //     // shake animation when the condition is false
  //     Animated.sequence([
  //       Animated.timing(shakeAnimation, {
  //         toValue: 10,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: -10,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: 10,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(shakeAnimation, {
  //         toValue: 0,
  //         duration: 100,
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   }
  // };

  // const shakeStyle = {
  //   transform: [{ translateX: shakeAnimation }],
  // };
  const [shakeAnimation, setShakeAnimation] = useState(new Animated.Value(0));
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    // let u = auth.user;
    // if (u.emailVerified) {
    //   // perform the action when the condition is true
    //   //console.log(u);
    //   setLoading(false);
    //   setUser(u);
    //   navigation.navigate("Login");
    // } else {
    //   shake();
    //   console.log(user, "this is user-");
    // }
    navigation.navigate("Login");
  };

  const buttonStyle = {
    transform: [{ translateX: shakeAnimation }],
  };
  const [show, setShow] = useState(Platform.OS === "ios");
  const [mode, setMode] = useState("date");

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Date of Birth</Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "10%",
            marginTop: 10,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => setShow(true)}>
              {Platform.OS === "ios" ? (
                <Text style={{ fontSize: 0 }}></Text>
              ) : (
                <Text style={{ fontSize: 18 }}>
                  {date.toLocaleDateString()}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ minWidth: 130 }}>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  setShow(Platform.OS === "ios");
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>

        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="blue" />
            <View
              style={{
                width: "90%",
                margin: "5%",
                backgroundColor: "white",
                padding: "5%",
                borderRadius: 15,
              }}
            >
              <Text style={styles.loadingText}>
                We have sent you a link to verify your email. Please check your
                inbox.
              </Text>
              <Button
                title="Resend"
                onPress={() => {
                  if (user != null) {
                    if (!user.emailVerified) {
                      sendEmailVerification(user)
                        .then(() => {})
                        .catch((error) => {
                          setLoading(false);
                          Alert.alert("Error", error.message);
                        });
                    } else {
                      setLoading(false);
                    }
                  }
                }}
              />
              <Button
                title="Cancel"
                onPress={() => navigation.navigate("Login")}
              />
              {user && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    user.emailVerified ? styles.done : null,
                    !user.emailVerified ? buttonStyle : null,
                  ]}
                  onPress={handlePress}
                >
                  <Text style={styles.buttonText}>
                    {user.emailVerified ? "Done" : "Done"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "80%",
    height: "70%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.8,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  login: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "blue",
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "blue",
    justifyContent: "center",

    fontSize: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  done: {
    backgroundColor: "green",
  },
});

export default Signup;
