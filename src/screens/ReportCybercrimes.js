import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  ImageBackground,
} from "react-native";

const organizations = [
  {
    name: "UAE Cyber Security Council",
    link: "https://www.csc.gov.ae/en",
    logoUrl:
      "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2FUAE%20Cyber%20Security%20Council%20%20.png?alt=media&token=579c043f-ab0b-478b-b21e-7b2c43241db6",
    description:
      "The National Cyber Security Council is responsible for coordinating and overseeing cybersecurity efforts in the UAE.",
  },
  {
    name: "Telecommunications and Digital Government Regulatory Authority (TDRA)",
    link: "https://tdra.gov.ae/ar/About/tdra-sectors/information-and-digital-government/policy-and-programs-department/internet-guidelines#report",
    logoUrl:
      "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2FTDRA.png?alt=media&token=7b4484bf-2d61-4d22-86ba-3acf7ccbd4e9",
    description:
      "The TDRA plays a critical role in regulating and securing the telecommunications and information technology sectors in the UAE.",
  },
  {
    name: "Dubai Police",
    link: "https://www.dubaipolice.gov.ae/wps/portal/home/services/individualservicescontent/cybercrime?lang=en",
    logoUrl:
      "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2FDubai%20Police.png?alt=media&token=7896fd08-6b56-47b3-afbd-708f28a2f64c",
    description:
      "Dubai Police has a dedicated e-Crime platform where individuals can report cybercrimes online.",
  },
  {
    name: "Abu Dhabi Police",
    link: "https://srv.adpolice.gov.ae/ar/aman/pages/default.aspx",
    logoUrl:
      "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2FAD%20Police.png?alt=media&token=d8360f22-e8f2-45fc-a48f-e0d5677934fb",
    description:
      "Abu Dhabi Police provide “AMAN service” that handles different kinds of crimes, including cybercrime. Users can contact them through their official website.",
  },
  {
    name: "Federal Public Prosecution",
    link: "https://apps.apple.com/ae/app/my-safe-society-%D9%85%D8%AC%D8%AA%D9%85%D8%B9%D9%8A%D8%A2%D9%85%D9%86/id1380618945",
    logoUrl:
      "https://firebasestorage.googleapis.com/v0/b/amnak-uae.appspot.com/o/images%2FPublic%20Prosecution.png?alt=media&token=25f87f4f-a2d5-49a4-a6b7-3a90838b641b",
    description:
      'The UAE Public Prosecution provides an app called "My Safe Society" to report crimes or suspicious activities that may threaten national security, social security, and general order or negatively impact public opinion.',
  },
];

const ReportCyberCrimes = () => {
  const openOrganizationLink = (link) => {
    Linking.openURL(link);
  };

  const renderOrganizationCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => openOrganizationLink(item.link)}
      >
        <Image resizeMode="contain" source={{ uri: item.logoUrl }} style={styles.logo} />

        <View style={styles.textContainer}>
          <Text style={styles.organizationName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.link}>(Click to visit website)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <FlatList
          data={organizations}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={renderOrganizationCard}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    padding: 16,
    width: "100%",
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent:'center', alignItems:"center"
  },
  logo: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
    alignSelf:'center',
  },
  textContainer: {
    alignItems: "center",
  },
  organizationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReportCyberCrimes;
