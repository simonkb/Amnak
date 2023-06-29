import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CertificationDetailsPage = ({ route, navigation }) => {
  const { certification } = route.params;
  const [beginnerExpanded, setBeginnerExpanded] = useState(false);
  const [intermediateExpanded, setIntermediateExpanded] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const handleLinkPress = (url) => {
    Linking.openURL(url)
      .then(() => {
        // URL opened successfully
      })
      .catch((error) => {
        console.error("Error opening URL: ", error);
      });
  };
  const renderCertificate = (certificate) => (
    <View
      style={{
        borderWidth: 1,
        padding: 5,
        marginVertical: 5,
        borderRadius: 10,
      }}
      key={certificate.name}
    >
      <Text style={styles.certificateText}>{certificate.name}</Text>
      <TouchableOpacity
        onPress={() => {
          handleLinkPress(certificate.link);
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "blue",
            textDecorationLine: "underline",
            paddingVertical: 10,
          }}
        >
          Click here to learn more.
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCollapsibleBar = (title, expanded, setExpanded, certificates) => (
    <View style={styles.collapsibleBar}>
      <TouchableOpacity
        style={styles.collapsibleBarHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.collapsibleBarTitle}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <ScrollView>
        {expanded && (
          <View style={styles.certificatesContainer}>
            {certificates.map((certificate) => renderCertificate(certificate))}
          </View>
        )}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.certificationDetailsContainer}>
        <Text style={styles.certificationTitle}>{certification.title}</Text>
        {renderCollapsibleBar(
          "Beginner",
          beginnerExpanded,
          setBeginnerExpanded,
          certification.Beginner
        )}
        {renderCollapsibleBar(
          "Intermediate",
          intermediateExpanded,
          setIntermediateExpanded,
          certification.Intermediate
        )}
        {renderCollapsibleBar(
          "Expert",
          advancedExpanded,
          setAdvancedExpanded,
          certification.Expert
        )}
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
  certificationDetailsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  certificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  collapsibleBar: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  collapsibleBarHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: "#3333",
  },
  collapsibleBarTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  certificatesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  certificateItem: {
    marginBottom: 10,
  },
  certificateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default CertificationDetailsPage;
