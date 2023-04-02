import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";

const LessonScreen = ({ navigation, route }) => {
  const { topic } = route.params;
  const [expanded, setExpanded] = useState(null);
  const lessons = [
    {
      title: "Lesson 1",
      content: {
        topic: "Topic 1",
        body: [
          "This is the first paragraph\n\n",
          "This is the second paragraph",
        ],
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

        image: "",
      },
      id: 1,
    },
    {
      title: "Lesson 2",
      content: {
        topic: "Topic 2",
        body: [
          "This is the first paragraph\n\n",
          "This is the second paragraph",
        ],
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        image:
          "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
      },
      id: 2,
    },
    {
      title: "Lesson 3",
      content: {
        topic: "Topic 3",
        body: [
          "This is the first paragraph \n",
          "This is the second paragraph",
        ],
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        image:
          "https://www.researchgate.net/publication/346192126/figure/fig1/AS:961506053197825@1606252315731/The-Confidentiality-Integrity-Availability-CIA-triad_Q640.jpg",
      },
      id: 3,
    },
  ];
  const toggleExpanded = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  const handleQuizPressed = (title) => {
    navigation.navigate("Quiz", { quizTitle: title });
  };
  const [playing, setPlaying] = useState(false);

  // const handlePlayPause = () => {
  //   setPlaying(!playing);
  // };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // const handlePlayPause = async () => {
  //   if (isPlaying) {
  //     await videoRef.current.pauseAsync();
  //   } else {
  //     await videoRef.current.playAsync();
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
      />
      <ScrollView>
        <Text style={styles.topic}>{topic}</Text>
        {lessons.map((lesson, index) => (
          <View key={lesson.id}>
            <TouchableOpacity
              style={{
                width: "96%",
                backgroundColor: "blue",
                left: "2%",
                marginTop: 10,
                borderRadius: 15,
              }}
              onPress={() => toggleExpanded(index)}
            >
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
            </TouchableOpacity>
            {expanded === index && (
              <ScrollView style={styles.lessonContentContainer}>
                <Text style={styles.lessonContent}>{lesson.content.topic}</Text>
                <Text style={styles.lessonContent}>{lesson.content.body}</Text>
                {/* <TouchableOpacity
                  onPress={toggleFullScreen}
                  style={styles.fullScreenButton}
                >
                  <Text style={styles.buttonText}>
                    {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  </Text>
                </TouchableOpacity> */}

                <View style={styles.videoContainer}>
                  <Video
                    ref={videoRef}
                    source={{ uri: lesson.content.video }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={isFullScreen ? "contain" : "cover"}
                    shouldPlay={isPlaying}
                    style={[
                      styles.video,
                      isFullScreen && styles.fullScreenVideo,
                    ]}
                  />
                  <TouchableOpacity
                    onPress={togglePlayPause}
                    style={styles.playPauseButton}
                  >
                    <Text style={styles.buttonText}>
                      {isPlaying ? "Pause" : "Play"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                  onPress={handlePlayPause}
                  style={{
                    width: "96%",
                    left: "2%",
                    height: "100%",
                  }}
                > */}
                {/* <Video
                  source={{
                    uri: lesson.content.video,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={playing}
                  style={styles.video}
                /> */}
                {/* </TouchableOpacity> */}
                {/* <View
                  style={{
                    padding: 20,
                  }}
                >
                  <Image
                    source={{ uri: lesson.content.image }}
                    style={{ width: "96%", left: "2%", height: 200 }}
                  />
                </View> */}
                <Button
                  title={lesson.title + " Quiz"}
                  onPress={() => {
                    handleQuizPressed(topic + "\n" + lesson.title + " Quiz");
                  }}
                ></Button>
              </ScrollView>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  topic: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    color: "white",
    backgroundColor: "transparent",
  },
  lessonTitle: {
    fontSize: 18,
    margin: 16,
    color: "white",
    backgroundColor: "transparent",
  },
  lessonContent: {
    fontSize: 14,
    margin: 16,
    color: "black",
    backgroundColor: "transparent",
  },
  lessonContentContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
    //width: "96%",
    //left: "2%",

    borderRadius: 15,
  },
  videoContainer: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
    with: "100%",
    height: 500,
  },
  fullScreenVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    with: "100%",
    height: "100%",
  },
  fullScreenButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  playPauseButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
};

export default LessonScreen;
