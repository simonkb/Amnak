import React, { useRef, useEffect } from "react";
import { View, PanResponder, Animated, StyleSheet } from "react-native";

const DraggableComponent = ({
  children,
  boxId,
  category,
  position,
  onDrop,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: () => {
        onDrop(boxId, category, {
          x: pan.x._value,
          y: pan.y._value,
        });
      },
    })
  ).current;
  return (
    <Animated.View
      style={[styles.container, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DraggableComponent;
