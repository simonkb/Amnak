import React, { useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video } from "expo-av";

const VideoPlayer = ({ videoUri }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleOnReadyForDisplay = () => {
    setIsVideoReady(true);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={[styles.container, { aspectRatio: 16 / 9 }]}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: videoUri }}
          useNativeControls={true}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
          onReadyForDisplay={handleOnReadyForDisplay}
        />
        {!isVideoReady && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default VideoPlayer;
