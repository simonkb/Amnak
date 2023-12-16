import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db, auth } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import ScenarioView from "./ScenarioView";

const ScenarioHome = ({ navigation }) => {
  const [allScenarios, setAllScenarios] = useState([]);
  var route = useRoute();
  const userData = route.params.userData;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.lessonsContainer}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            margin: 5,
            alignSelf: "center",
          }}
        >
          All Scenarios
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Scenarios", {
              userData: userData,
              level: "Beginners",
            });
          }}
          style={styles.lessonButton}
        >
          <Text style={styles.lessonButtonText}>Beginner Scenarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lessonButton}
          onPress={() => {
            navigation.navigate("Scenarios", {
              userData: userData,
              level: "Intermediate",
            });
          }}
        >
          <Text style={styles.lessonButtonText}>Intermediate Scenarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Scenarios", {
              userData: userData,
              level: "Advanced",
            });
          }}
          style={styles.lessonButton}
        >
          <Text style={styles.lessonButtonText}>Advanced Scenarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    alignSelf: "center",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  emptyMessage: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 60,
    margin: 10,
    color: "white",
    justifyContent: "center",
    fontWeight: "500",
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
    fontSize: 16,
  },
  lessonsContainer: {
    width: "90%",
    left: "5%",
    right: "5%",
    flexGrow: 1,
    top:50
  },
});

export default ScenarioHome;
