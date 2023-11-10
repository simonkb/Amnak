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
  ActivityIndicator,
} from "react-native";
import { API_URL, API_KEY } from "../config/firebaseConfig";
const ScenarioView = ({ item }) => {
  const [response, setResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [botRes, setBotRes] = useState(null);
  const handleClear = () => {
    setResponse("");
    setBotRes(null);
  };

  const handleSubmit = async () => {
    if (response !== "") {
      setSubmitting(true);
      try {
        // Make your API call here to send the user's response to GPT
        // Replace the following placeholder code with your API call
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Act as a smart trainer in my Amnak app. In the app the user is presented with a scenario with title ${item.title}. After that the user was given with this ${item.scenario} scenario and the correct answer expected is ${item.answers}. Here are the multiple choices provided to the user ${item.choices}. This is only if the question is multiple choice type. Here is the user's answer ${response}. Write a 20 words short explanation for the user based on the user's response and the given answer. Motivate the user in your response. Your goal is making the user learn.`,
              },
            ],
          }),
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        setBotRes(botResponse);
      } catch (error) {
        console.error("Error:", error);
      }
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.scenarioItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.scenarioImage} />
      <Text style={styles.scenarioTitle}>{item.title}</Text>
      <Text style={styles.scenarioDescription}>{item.scenario}</Text>
      {item.questionType === "writing" ? (
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Your answer..."
          value={response}
          onChangeText={(text) => setResponse(text)}
        />
      ) : (
        <ScrollView style={styles.choicesContainer}>
          {item.choices.map((choice, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.choiceButton,
                {
                  backgroundColor: response === choice ? "#007AFF" : "white",
                },
              ]}
              onPress={() => setResponse(choice)}
            >
              <Text
                style={{
                  color: response === choice ? "white" : "#007AFF",
                }}
              >
                {choice}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
      {botRes && (
        <Text style={{ ...styles.scenarioTitle, fontWeight: "600" }}>
          {botRes}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scenarioItem: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  scenarioImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  scenarioDescription: {
    fontSize: 16,
    color: "black",
  },
  textInput: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  choicesContainer: {
    marginTop: 10,
  },
  choiceButton: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  clearButton: {
    backgroundColor: "#ff6666",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#66cc66",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default ScenarioView;
