import { StyleSheet, Text, View } from "react-native";

export const ExerciseListItem = ({ item }) => (
  <View style={styles.exerciseContainer}>
    <Text style={styles.exerciseName}>{item.name}</Text>
    <Text style={styles.exerciseSubTitle}>
      {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
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
});
