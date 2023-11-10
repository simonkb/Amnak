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

const Scenarios = () => {
  const [allScenarios, setAllScenarios] = useState([
    {
      id: "Scenarios-Under-14-Beginners-Scenario1",
      title: "Scenario 1: Password Protection",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2Funder-14-beginners-Scenario1.png?alt=media&token=8062bf07-b931-4448-94a3-fe2c47ac8be0&_gl=1*vqpq50*_ga*MzU2MjA5MjA0LjE2ODUwOTEzODM.*_ga_CW55HF8NVT*MTY5OTMzNTI2Mi41MC4xLjE2OTkzMzU2MzIuNjAuMC4w",
      scenario:
        "You have a secret diary, and you want to keep it safe from your little brother or sister. What should you do to make sure they can't access it?",
      choices: [
        "Using Strong password",
        "Using Unique password",
        "Using PIN or Passcode",
        "Using Biometric authentication",
        "All the above",
      ],
      answers: "All the above",
    },
  ]);
  var route = useRoute();
  const userData = route.params.userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            userData?.level,
            "Scenarios"
          )
        );
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setAllScenarios(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userData) fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return <ScenarioView item={item}></ScenarioView>;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>All Scenarios</Text>
      {allScenarios.length === 0 ? (
        <Text style={styles.emptyMessage}>
          Sorry, we don't have scenarios for this category yet.
        </Text>
      ) : (
        <FlatList
          data={allScenarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      )}
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
    margin:10,
    color: "white",
    justifyContent:'center',
    fontWeight:'500'
  },
});

export default Scenarios;
