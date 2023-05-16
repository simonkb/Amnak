import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordQuest = () => {
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState(1);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: 8,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
    isUnique: true,
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const generatePassword = () => {
    const generatedPassword = "randomly generated password";
    setPassword(generatedPassword);
  };

  const checkPassword = () => {
    if (password.length < passwordRequirements.length) {
      setError(
        `Password must be at least ${passwordRequirements.length} characters long.`
      );
      return;
    }
    if (passwordRequirements.hasUppercase && !/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (passwordRequirements.hasLowercase && !/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (passwordRequirements.hasNumber && !/\d/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (
      passwordRequirements.hasSymbol &&
      !/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password)
    ) {
      setError("Password must contain at least one symbol.");
      return;
    }
    if (passwordRequirements.isUnique && password === "password") {
      setError("Password is too common.");
      return;
    }
    setError("Password meets all requirements!");
    setPassword("");
    setLevel(level + 1);
    setPasswordRequirements({
      length: Math.min(passwordRequirements.length + 2, 16),
      hasUppercase: !passwordRequirements.hasUppercase,
      hasLowercase: !passwordRequirements.hasLowercase,
      hasNumber: !passwordRequirements.hasNumber,
      hasSymbol: !passwordRequirements.hasSymbol,
      isUnique: !passwordRequirements.isUnique,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            opacity: 0.8,
            padding: 20,
            flex: 1,
          }}
        >
          <Text style={styles.title}>Password Quest - Level {level}</Text>
          <Text style={styles.subtitle}>
            Create a password that meets the following requirements:
          </Text>
          <Text style={styles.requirements}>
            Length: {passwordRequirements.length}
          </Text>
          <Text style={styles.requirements}>
            Uppercase letters:{" "}
            {passwordRequirements.hasUppercase ? "required" : "optional"}
          </Text>
          <Text style={styles.requirements}>
            Lowercase letters:{" "}
            {passwordRequirements.hasLowercase ? "required" : "optional"}
          </Text>
          <Text style={styles.requirements}>
            Numbers: {passwordRequirements.hasNumber ? "required" : "optional"}
          </Text>
          <Text style={styles.requirements}>
            Symbols: {passwordRequirements.hasSymbol ? "required" : "optional"}
          </Text>
          <Text style={styles.requirements}>
            Unique: {passwordRequirements.isUnique ? "required" : "optional"}
          </Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Button
            title="Generate password"
            onPress={generatePassword}
            style={styles.button}
          />
          <Button
            title="Check password"
            onPress={checkPassword}
            style={styles.button}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requirements: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PasswordQuest;
