import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ActivityLogItem = ({ log }) => {
  const getStatusColor = () => {
    switch (log.pointsEarned) {
      case 30:
        return "green";
      case 10:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <View style={styles.logItemContainer}>
      <View
        style={[styles.logItemStatus, { backgroundColor: getStatusColor() }]}
      />
      <View style={styles.logItemContent}>
        <Text style={styles.logItemName}>{log.taskName}</Text>
        <Text style={styles.logItemDate}>
          {new Date(log.dateCompleted).toLocaleDateString()}
        </Text>
        <Text style={styles.logItemPoints}>{log.pointsEarned} Points</Text>
      </View>
    </View>
  );
};

const ActivityLog = (props) => {
  return (
    <FlatList
      data={props.logs}
      keyExtractor={(log) => log.taskName}
      renderItem={({ item }) => <ActivityLogItem log={item} />}
      style={styles.logList}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logList: {
    marginTop: 20,
  },
  logItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  logItemStatus: {
    width: 10,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  logItemContent: {
    flex: 1,
  },
  logItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logItemDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  logItemPoints: {
    fontSize: 16,
  },
});

export default ActivityLog;
