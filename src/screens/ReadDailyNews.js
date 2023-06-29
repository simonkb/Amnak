import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  TextInput,
} from "react-native";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
const ReadDailyNews = () => {
  const [news, setNews] = useState([]);

  const colRef = collection(db, "DailyNews");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(colRef, orderBy("created_at", "desc")),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => doc.data());
        setNews(list);
      }
    );
    return () => unsubscribe();
  }, []);

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItemContainer}>
      <Text style={styles.newsItemTitle}>{item.title}</Text>
      <Text style={styles.newsItemDescription}>{item.description}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent:'space-between'
        }}
      >
        <TouchableOpacity onPress={() => handleNewsItemPress(item.url)}>
          <Text style={styles.newsItemReadMore}>Read More</Text>
        </TouchableOpacity>
        <Text style={{
          fontWeight:'bold', 
          fontStyle:'italic',
        }}>Source: {item.source}</Text>
      </View>
      <Text>{Date(item.created_at)}</Text>
    </View>
  );

  const handleNewsItemPress = (url) => {
    Linking.openURL(url)
      .then(() => {
        // URL opened successfully
      })
      .catch((error) => {
        console.error("Error opening URL: ", error);
      });
  };

  return (
    <FlatList
      data={news}
      renderItem={renderNewsItem}
      keyExtractor={(item) => item.title}
      contentContainerStyle={styles.newsFeedContainer}
    />
  );
};
const OnlyNews = () => {
  return (
    <View style={styles.blurBackground}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="ios-search"
            size={30}
            color="black"
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchText} placeholder="Search"></TextInput>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
          }}
        >
          <Ionicons name="ios-search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: 55,
        }}
      >
        <ReadDailyNews></ReadDailyNews>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  newsFeedContainer: {
    flexGrow: 1,
    paddingBottom: 300,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  blurBackground: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 16,
    color: "gray",
  },
  searchButton: {
    backgroundColor: "lightgray",
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
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
});
export default OnlyNews;
