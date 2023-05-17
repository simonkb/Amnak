import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
} from "react-native";

import {
  collection,
  docs,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
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

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, []);

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItemContainer}>
      <Text style={styles.newsItemTitle}>{item.title}</Text>
      <Text style={styles.newsItemDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => handleNewsItemPress(item.url)}>
        <Text style={styles.newsItemReadMore}>Read More</Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  newsFeedContainer: {
    flexGrow: 1,
    paddingBottom: 300,
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
export default ReadDailyNews;
