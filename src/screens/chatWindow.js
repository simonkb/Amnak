// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// const ChatWindow = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleSubmit = () => {
//     if (message !== "") {
//       setChatHistory([...chatHistory, { isUser: true, message }]);
//       setMessage("");
//     }
//     // Send message to server here and update chat history with response
//   };

//   return (
//     <View style={styles.chatContainer}>
//       <View style={styles.chatHistory}>
//         {chatHistory.map((chat, index) => (
//           <Text
//             key={index}
//             style={chat.isUser ? styles.userText : styles.botText}
//           >
//             {chat.message}
//           </Text>
//         ))}
//       </View>
//       <View style={styles.chatInputContainer}>
//         <TextInput
//           style={styles.chatInput}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Type your message here"
//           onSubmitEditing={handleSubmit}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chatContainer: {
//     position: "absolute",

//     bottom: 0,
//     left: 80,
//     backgroundColor: "white",
//     padding: 16,
//     width: "70%",
//     borderRadius: 10,
//   },
//   chatHistory: {
//     flex: 1,
//     padding: 8,
//     overflow: "scroll",
//   },
//   userText: {
//     color: "black",
//   },
//   botText: {
//     color: "gray",
//   },
//   chatInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "lightgray",
//     padding: 8,
//   },
//   chatInput: {
//     flex: 1,
//     padding: 8,
//     backgroundColor: "lightgray",
//     borderRadius: 4,
//   },
//   sendButton: {
//     backgroundColor: "#4caf50",
//     padding: 8,
//     borderRadius: 4,
//     marginLeft: 8,
//   },
//   sendButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default ChatWindow;
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet, ScrollView
} from "react-native";

import { API_URL, API_KEY } from "../config/firebaseConfig";
const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    if (message !== "") {
      setChatHistory([...chatHistory, { isUser: true, message }]);
      setMessage("");

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
    }
  };

  return (
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
