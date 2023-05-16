import React from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Game = ({ navigation }) => {
  const games = [
    { name: "Password Quest" },
    { name: "Hacker Defense" },
    { name: "Phishing Scam" },
    { name: "Firewall Defense" },
    { name: "Malware Hunt" },
    { name: "Safe Surfing" },
  ];

  const handleGamePress = (game) => {
    navigation.navigate(game);
  };

  const renderGameItem = ({ item: game }) => {
    return (
      <TouchableOpacity
        style={styles.gameItem}
        onPress={() => handleGamePress(game.name)}
      >
        <Text style={styles.gameName}>{game.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.header}>All Games</Text>
          <FlatList
            data={games}
            renderItem={renderGameItem}
            keyExtractor={(game, index) => game.name}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  header: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gameItem: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
  },
  gameName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});

export default Game;
