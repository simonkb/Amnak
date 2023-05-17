import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import VideoPlayer from "./VideoPlayer";
import { FontAwesome } from "@expo/vector-icons";

const LessonPage = (props) => {
  return (
    <ScrollView style={styles.container}>
      {props.contents.map((content, index) => (
        <View key={index}>
          {content.type === "topic" ? (
            <View style={styles.topicContainer}>
              <Text style={styles.topicText}>{content.body}</Text>
            </View>
          ) : content.type === "subtopic" ? (
            <View>
              <Text style={styles.subTopicText}>{content.body}</Text>
            </View>
          ) : content.type === "paragraph" ? (
            <View style={styles.paragraphContainer}>
              <Text style={styles.paragraphText}>{content.body}</Text>
            </View>
          ) : content.type === "bulletPoints" ? (
            <View style={{ paddingLeft: 29 }}>
              {content.body.map((point) => (
                <View style={styles.bulletContainer} key={point}>
                  <FontAwesome name="circle" style={styles.bulletIcon} />
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          ) : content.type === "image" ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: content.url }}
                style={styles.image}
                alt={content.description}
              />
              <Text style={[styles.paragraphText, { fontStyle: "italic" }]}>
                {content.description}
              </Text>
            </View>
          ) : content.type === "video" ? (
            <>
              <View style={styles.videoContainer}>
                <VideoPlayer videoUri={content.url}></VideoPlayer>
              </View>
              <Text style={[styles.paragraphText, { fontStyle: "italic" }]}>
                {content.description}
              </Text>
            </>
          ) : content.type === "link" ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(content.url)
                  .then(() => {
                    // URL opened successfully
                  })
                  .catch((error) => {
                    console.error("Error opening URL: ", error);
                  });
              }}
            >
              <View>
                <Text style={styles.link}>{content.url}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topicContainer: {
    marginTop: 24,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#6699CC",
  },
  topicText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  subTopicText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  paragraphContainer: {
    marginVertical: 16,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    marginBottom: 16,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletIcon: {
    marginRight: 5,
    fontSize: 10,
    color: "black",
  },
  bulletText: {
    fontSize: 16,
    color: "black",
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 2,
    overflow: "scroll",
    resizeMode: "contain",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
export default LessonPage;
