import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Button } from "react-native";

const emails = [
  {
    from: "admin@yourbank.com",
    subject: "Security Alert",
    body: "Your account has been compromised. Please click this link to reset your password: http://www.yourbank.com/reset-password",
    isPhishing: true,
  },
  {
    from: "customer-service@amazon.com",
    subject: "Your Order Status",
    body: "Dear customer, your order #123456789 is now being processed. You can track your order at http://www.amazon.com/track-order",
    isPhishing: false,
  },
  {
    from: "support@netflix.com",
    subject: "Account Information Update Required",
    body: "Dear user, we were unable to validate your billing information for the next billing cycle. Please update your account information by clicking this link: http://www.netflix.com/billing-information-update",
    isPhishing: true,
  },
  {
    from: "admin@facebook.com",
    subject: "Security Update Required",
    body: "Dear user, we have noticed some suspicious activity on your account. Please log in and update your security settings at http://www.facebook.com/security-update",
    isPhishing: true,
  },
  {
    from: "noreply@paypal.com",
    subject: "Payment Received",
    body: "Dear customer, your account has been credited with $100. If you did not authorize this transaction, please contact us immediately at http://www.paypal.com/contact-us",
    isPhishing: false,
  },
];

const PhishingScam = () => {
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState(selectEmail());

  // Randomly select an email from the list and return it.
  function selectEmail() {
    const index = Math.floor(Math.random() * emails.length);
    return emails[index];
  }

  // Check if the user's response matches the correct answer and update the score accordingly.
  function checkAnswer(response) {
    if (email.isPhishing && !response) {
      setScore(score + 1);
      alert("Correct! This is a phishing scam.");
    } else if (!email.isPhishing && response) {
      setScore(score + 1);
      alert("Correct! This is a legitimate email.");
    } else {
      alert("Incorrect. Please try again.");
    }
    setEmail(selectEmail());
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        <Text style={styles.text}>Is this email legitimate?</Text>
        <Text style={styles.emailText}>
          From: {email.from}
          {"\n"}
          Subject: {email.subject}
          {"\n\n"}
          {email.body}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            title="Yes"
            onPress={() => checkAnswer(true)}
            color="#4CAF50"
          />
          <Button
            title="No"
            onPress={() => checkAnswer(false)}
            color="#F44336"
          />
        </View>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 50,
  },
  emailText: {
    fontSize: 18,
    // textAlign: "center",
    color: "black",
    margin: 20,
    backgroundColor: "white",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    //width: "80%",
    margin: 50,
    backgroundColor: "white",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 50,
  },
});

export default PhishingScam;
