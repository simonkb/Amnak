import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import HackerDefense from "./HackerDefense";
import PasswordQuest from "./PasswordQuest";
import PhishingScam from "./PhishingScam";
import FirewallDefense from "./FirewallDefense";
import MalwareHunt from "./MalwareHunt";
import SafeSurfing from "./SafeSurfing";




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export {
  PasswordQuest,
  PhishingScam,
  FirewallDefense,
  MalwareHunt,
  SafeSurfing,
};
