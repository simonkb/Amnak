import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import { Video } from "expo-av";

const VideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const width = isFullScreen ? Dimensions.get("window").width : "100%";
  const height = isFullScreen ? Dimensions.get("window").height : "60%";

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={[styles.container, { width, height, aspectRatio: 16 / 9 }]}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls={true}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
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
