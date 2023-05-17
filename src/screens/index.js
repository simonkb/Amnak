import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Header from "./header";
import ReadDailyNews from "./ReadDailyNews";
const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Header></Header>
      <View style={styles.blurBackground}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Cybersecurity News Today</Text>
        </View>

        <ReadDailyNews></ReadDailyNews>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerContainer: {
    //  position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure the header appears above other components
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 10,
    width: 60,
  },
  appIcon: {
    width: 1600,
    height: 70,
    borderRadius: 40,
    top: 0,
    left: 0,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  newsFeedContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  newsItemContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  newsItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsItemDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  newsItemReadMore: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%", // Adjust the width as per your design
    marginBottom: 30, // Add some margin at the bottom
  },
  button: {
    backgroundColor: "darkgreen",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
  },
  appLogo: {
    width: 100,
    height: 80,
    left: 20,
    top: 16,
    borderRadius: 15,
  },
  line: {
    height: 1,
    backgroundColor: "gray",
  },
  titleContainer: {
    marginTop: 120,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  blurBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.85,
    flex: 1,
  },
});
export default LandingPage;
