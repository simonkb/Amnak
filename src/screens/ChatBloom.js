import axios from "axios";

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const MyComponent = () => {
  const bloomAPI = axios.create({
    baseURL: "https://api.bloom-lang.net",
  });

  const getBloomResponse = async (input) => {
    const response = await bloomAPI.post("/api/v1/complete", {
      prompt: input,
      max_tokens: 50,
      temperature: 0.5,
    });

    return response.data.choices[0].text;
  };
  const [response, setResponse] = useState("");

  const handleInput = async (input) => {
    const bloomResponse = await getBloomResponse(input);
    setResponse(bloomResponse);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: "green",
        }}
      >
        <Text>Response: {response}</Text>
        <TextInput
          style={{ width: "90%", backgroundColor: "white", height: 40 }}
          onChangeText={handleInput}
        />
        <Button title="Submit" onPress={handleInput}></Button>
      </View>
    </View>
  );
};
export default MyComponent;
