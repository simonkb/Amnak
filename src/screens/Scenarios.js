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
  const [allScenarios, setAllScenarios] = useState([]);
  var route = useRoute();
  const userData = route.params.userData;
  const level = route.params.level;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            level,
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
      <Text style={styles.headerText}>{level} Scenarios</Text>
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
    margin: 10,
    color: "white",
    justifyContent: "center",
    fontWeight: "500",
  },
});

export default Scenarios;
