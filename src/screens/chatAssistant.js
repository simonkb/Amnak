import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import ChatWindow from "./chatWindow";

const ChatAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <View>
      {/* render other components */}
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => setIsChatOpen(!isChatOpen)}
      >
        <Text style={styles.chatButtonText}>Help</Text>
      </TouchableOpacity>
      {isChatOpen && <ChatWindow />}
    </View>
  );
};

const styles = {
  chatButton: {
    backgroundColor: "#4caf50",
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 16,
  },
  chatButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
};

export default ChatAssistant;
