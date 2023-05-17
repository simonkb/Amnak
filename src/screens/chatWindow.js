import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import { API_URL, API_KEY } from "../config/firebaseConfig";
const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (message !== "") {
      setChatHistory([...chatHistory, { isUser: true, message }]);
      setMessage("");
      setLoading(true); // Set loading state to true

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
                content: message,
              },
            ],
          }),
        });
        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        setChatHistory([
          ...chatHistory,
          { isUser: false, message: botResponse },
        ]);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
      setLoading(false); // Set loading state to false after receiving the API response
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.chatContainer}>
        <ScrollView>
          <View style={styles.chatHistory}>
            {chatHistory.map((chat, index) => (
              <Text
                key={index}
                style={chat.isUser ? styles.userText : styles.botText}
              >
                {chat.message}
              </Text>
            ))}
            {loading && <ActivityIndicator />}
            {/* Display loading animation when loading is true */}
          </View>
          <View style={styles.chatInputContainer}>
            <TextInput
              style={styles.chatInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    position: "absolute",
    bottom: 0,
    left: 80,
    backgroundColor: "white",
    padding: 16,
    width: "70%",
    borderRadius: 10,
  },
  chatHistory: {
    flex: 1,
    padding: 8,
    overflow: "scroll",
  },
  userText: {
    color: "black",
  },
  botText: {
    color: "gray",
  },
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    padding: 8,
  },
  chatInput: {
    flex: 1,
    padding: 8,
    backgroundColor: "lightgray",
    borderRadius: 4,
  },
  sendButton: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatWindow;
