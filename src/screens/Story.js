import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import { API_URL, API_KEY } from "../config/firebaseConfig";
import PdfViewer from "./PdfViewer";

const Story = ({ navigation, route }) => {
  const item = route.params.data;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [inputText, setInputText] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const handleSubmit = async () => {
    if (inputText !== "") {
      setLoading(true);
      try {
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
                content: `Act as a smart trainer in my Amnak app. In the app the user went through a story titled ${item.title}.
                After that the user was asked this ${item.question} and the correct answer expected is ${item.answers}. Here is the user's
                answer ${inputText}. Write a 30 words short explanation for the user based on the user's response and the given answers motivate the user in your response. Your goal is making the user learn.`,
              },
            ],
          }),
        });
        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        setResponse(botResponse);
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    }
  };
  const [done, setDone] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          borderTopColor: "green",
          borderTopWidth: 4,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        {item.question !== "-" && done && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{item.question}</Text>
              <TextInput
                style={styles.textInput}
                multiline={true}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder="Write your response here"
              />
              {loading ? (
                <ActivityIndicator size="large" color="green" />
              ) : (
                <ScrollView contentContainerStyle={styles.titleContainer}>
                  <Text style={{ ...styles.title, fontWeight: "600" }}>
                    {response}
                  </Text>
                </ScrollView>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setInputText("");
                  setResponse("");
                }}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {!done && <PdfViewer source={{ uri: item.url, cache: true }}></PdfViewer>}
      <View
        style={{
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
          alignSelf: "center",
          bottom: 0,
        }}
      >
        <Button
          title={!done ? "Done" : "Check the Story Again"}
          onPress={() => {
            setDone(!done);
          }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparent background
  },
  videoContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    maxHeight: 200,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textInput: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Story;
