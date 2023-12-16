import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import VideoPlayer from "./VideoPlayer_Story";
import { db, auth } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { API_URL, API_KEY } from "../config/firebaseConfig";
import PdfViewer from "./PdfViewer";
import CollapsibleBar from "./CollabsibleBar";

const Stories = ({ navigation }) => {
  var route = useRoute();
  const userData = route.params.userData;
  const [storiesBeg, setStoriesBeg] = useState([]);
  const [storiesInt, setStoriesInt] = useState([]);
  const [storiesAdv, setStoriesAdv] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            "Beginners",
            "Stories"
          )
        );
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setStoriesBeg(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            "Intermediate",
            "Stories"
          )
        );
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setStoriesInt(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData3 = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            "Lessons",
            userData?.ageGroup,
            "Levels",
            "Advanced",
            "Stories"
          )
        );
        var list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setStoriesAdv(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userData) {
      fetchData();
      fetchData2();
      fetchData3();
    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.storyItem}>
        <TouchableOpacity
          style={styles.lessonButton}
          onPress={() => {
            navigation.navigate("Story", { data: item });
          }}
        >
          <Text style={styles.lessonButtonText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>All Stories</Text>

      {/* <Button
        title={"Submit once"}
        onPress={() => {
          onSubmit(stories[0]);
        }}
      ></Button> */}
      <CollapsibleBar title={"Beginner Stories"}>
        {storiesBeg.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Sorry, we don't have stories for this category yet.
          </Text>
        ) : (
          <FlatList
            data={storiesBeg}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.lessonsContainer}
          />
        )}
      </CollapsibleBar>
      <CollapsibleBar title={"Intermediate Stories"}>
        {storiesInt.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Sorry, we don't have stories for this category yet.
          </Text>
        ) : (
          <FlatList
            data={storiesInt}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.lessonsContainer}
          />
        )}
      </CollapsibleBar>
      <CollapsibleBar title={"Advanced Stories"}>
        {storiesAdv.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Sorry, we don't have stories for this category yet.
          </Text>
        ) : (
          <FlatList
            data={storiesAdv}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.lessonsContainer}
          />
        )}
      </CollapsibleBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
    alignSelf: "center",
  },
  storyItem: {
    width: "100%",
    //minHeight: "100%",
    alignSelf: "center",
    paddingVertical: 5,
  },
  storyText: {
    color: "white",
    alignSelf: "center",
  },
  emptyMessage: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 60,
    margin: 10,
    color: "white",
    justifyContent: "center",
    fontWeight: "500",
  },
  lessonButton: {
    width: "100%",
    height: 40,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  lessonButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  lessonsContainer: {
    width: "90%",
    left: "5%",
    right: "5%",
    flexGrow: 1,
  },
});

export default Stories;
