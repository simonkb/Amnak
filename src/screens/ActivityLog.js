import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ActivityLogItem = ({ log }) => {
  const getStatusColor = () => {
    const totalPoints = log.selectedAnswers.length * 10;
    let percent = (log.pointsEarned / totalPoints) * 100;
    if (percent >= 80) {
      return "green";
    } else if (percent < 60) {
      return "red";
    } else {
      return "yellow";
    }
  };

  return (
    <View style={[styles.logItemContainer, { backgroundColor: "white" }]}>
      <View
        style={[styles.logItemStatus, { backgroundColor: getStatusColor() }]}
      />
      <View style={styles.logItemContent}>
        <Text style={styles.logItemName}>Activity: {log.taskName}</Text>
        <Text style={styles.logItemDate}>
          Date: {new Date(log.dateCompleted).toDateString()}
        </Text>
        <Text style={styles.logItemPoints}>
          Grade: {log.pointsEarned} out of {log.selectedAnswers.length * 10} Points.
        </Text>
      </View>
    </View>
  );
};

const ActivityLog = (props) => {
  return (
    <FlatList
      data={props.logs}
      keyExtractor={(log) => log.taskName + log.dateCompleted}
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
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logList: {
    marginTop: 0,
  },
  logItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,

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
