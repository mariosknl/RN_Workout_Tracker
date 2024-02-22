import { StyleSheet, Text, View } from "react-native";

export const ExerciseListItem = ({ item }) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Text style={styles.exerciseSubTitle}>
      <Text style={styles.subValue}>{item.muscle}</Text> |{" "}
      <Text style={styles.subValue}>{item.equipment}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    gap: 5,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubTitle: {
    color: "dimgray",
  },
  subValue: {
    textTransform: "capitalize",
  },
});
