import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

const FirewallDefense = () => {
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [firewall, setFirewall] = useState([]);
  const [incomingThreats, setIncomingThreats] = useState([
    { x: 100, y: 100 },
    { x: 150, y: 150 },
    { x: 200, y: 200 },
  ]);
  const [gameOver, setGameOver] = useState(false);

  const startDrawing = (event) => {
    setDrawing(true);
    setPosition({
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    });
  };

  const continueDrawing = (event) => {
    if (drawing) {
      setFirewall([
        ...firewall,
        {
          start: position,
          end: {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          },
        },
      ]);
      setPosition({
        x: event.nativeEvent.locationX,
        y: event.nativeEvent.locationY,
      });
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const checkCollisions = () => {
    incomingThreats.forEach((threat) => {
      firewall.forEach((segment) => {
        const x1 = segment.start.x;
        const y1 = segment.start.y;
        const x2 = segment.end.x;
        const y2 = segment.end.y;
        const x3 = threat.x;
        const y3 = threat.y;
        const distance =
          Math.abs((y2 - y1) * x3 - (x2 - x1) * y3 + x2 * y1 - y2 * x1) /
          Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
        if (distance < 10) {
          setIncomingThreats(incomingThreats.filter((t) => t !== threat));
        }
      });
    });
    if (incomingThreats.length === 0) {
      setGameOver(true);
    }
  };

  checkCollisions();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpeg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        {incomingThreats.map((threat) => (
          <View style={styles.threat} key={threat.x}>
            <View style={styles.circle} />
          </View>
        ))}
        {firewall.map((segment, index) => (
          <View
            style={{
              position: "absolute",
              backgroundColor: "red",
              width: Math.sqrt(
                Math.pow(segment.end.x - segment.start.x, 2) +
                  Math.pow(segment.end.y - segment.start.y, 2)
              ),

              height: 2,
              transform: [
                {
                  translateX: segment.start.x,
                },
                {
                  translateY: segment.start.y,
                },
                {
                  rotateZ: `${Math.atan2(
                    segment.end.y - segment.start.y,
                    segment.end.x - segment.start.x
                  )}rad`,
                },
              ],
            }}
            key={index}
          />
        ))}
        <TouchableOpacity
          style={styles.firewallContainer}
          onTouchStart={startDrawing}
          onTouchMove={continueDrawing}
          onTouchEnd={stopDrawing}
        >
          {gameOver && <View style={styles.gameOver} />}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  firewallContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  threat: {
    position: "absolute",
    zIndex: 1,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  gameOver: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    zIndex: 2,
  },
});

export default FirewallDefense;
