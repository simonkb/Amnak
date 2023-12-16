import React, { useState } from "react";
import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
import Pdf from "react-native-pdf";

export default function PdfViewer({ source }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <Pdf
        source={source}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  pdf: {
    flex: 1,
    width: "100%",
    //height:'100%'
    // width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
