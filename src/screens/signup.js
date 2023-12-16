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
  Animated, ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebaseConfig.js";
import { Picker } from "@react-native-picker/picker";

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(new Animated.Value(0));
  const [show, setShow] = useState(Platform.OS === "ios");
  const [mode, setMode] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("Student");

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

    setLoading(true); // Show loading overlay

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);

        // Check if email is already verified
        if (userCredential.user.emailVerified) {
          setEmailVerified(true);
          setLoading(false);
          navigation.navigate("Main");
        } else {
          sendEmailVerification(userCredential.user)
            .then(() => {
              Alert.alert(
                "Verify email",
                "We have sent you a link to verify your email."
              );
              checkEmailVerification();
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
            level: "Beginners",
            points: 0,
            ageGroup: ageGroup,
            category: selectedCategory,
            isFirstTime: true,
          }).catch((error) => {
            Alert.alert(error.errorCode, error.message);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error.message);
      });
  };
  const checkEmailVerification = () => {
    let timer = 0;

    const verificationInterval = setInterval(() => {
      onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          setEmailVerified(true);
          setLoading(false);
          clearInterval(verificationInterval);
          navigation.navigate("Main");
        }

        timer += 2; // Increment timer by 2 seconds

        if (timer >= 10) {
          clearInterval(verificationInterval);
          setLoading(false);
          navigation.navigate("Main");
        }
      });
    }, 2000);
  };

  const resendVerificationLink = () => {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          Alert.alert(
            "Verify email",
            "We have sent you a new link to verify your email."
          );
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  };

  useEffect(() => {
    checkEmailVerification();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <ScrollView >
        <View style={styles.container}>
          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="blue" />
              <Text style={styles.loadingText}>Signing up...</Text>
            </View>
          )}
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
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "10%",
              marginTop: 10,
            }}
          >
            <Text style={styles.label}>Date of Birth</Text>
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
          <View style={{ width: "100%" }}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }
            >
              <Picker.Item label="Select Your Occupation" value="Student" />
              <Picker.Item label="Student" value="Student" />

              <Picker.Item label="Employee" value="Employee" />
              <Picker.Item label="Business Owner" value="Business Owner" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
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
        </View>
      </ScrollView>
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
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.9,
    margin:5,
    alignSelf:'center', 
  },
  label: {
    fontSize: 14,
    marginTop: 5,
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
});

export default Signup;
