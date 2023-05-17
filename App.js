import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

import Navigation from "./src/screens/routes";
export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
