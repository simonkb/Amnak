import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const VideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isFullScreen) {
          setIsFullScreen(false);
          videoRef.current.dismissFullscreenPlayer();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [isFullScreen]);

  const handleBackward = () => {
    videoRef.current.setPositionAsync(status.positionMillis - 5000);
  };

  const handleForward = () => {
    videoRef.current.setPositionAsync(status.positionMillis + 5000);
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      videoRef.current.presentFullscreenPlayer();
    } else {
      videoRef.current.dismissFullscreenPlayer();
    }
  };

  const width = isFullScreen ? Dimensions.get("window").width : "100%";
  const height = isFullScreen ? Dimensions.get("window").height : "60%";

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={[styles.container, { width, height, aspectRatio: 16 / 9 }]}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={handleBackward}>
            <MaterialIcons name="replay-10" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <MaterialIcons
              name={status.isPlaying ? "pause" : "play-arrow"}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForward}>
            <MaterialIcons name="forward-10" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFullScreen}>
            <MaterialIcons
              name={isFullScreen ? "fullscreen-exit" : "fullscreen"}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    opacity: 0.9,
    borderRadius: 15,
    alignSelf: "stretch",
    //aspectRatio: 16 / 9,
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
    aspectRatio: 16 / 9,
    resizeMode: "contain",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
});

export default VideoPlayer;
