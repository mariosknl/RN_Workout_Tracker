import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { gql } from "graphql-request";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import client from "../graphqlClient";
import NewSetInput from "../components/NewSetInput";
import SetsList from "../components/SetsList";
import ProgressGraph from "../components/ProgressGraph";

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      instructions
      equipment
    }
  }
`;

export default function ExerciseDetailsScreen() {
  const { name } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", name],
    queryFn: () => client.request(exerciseQuery, { name }),
  });
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }

  const exercise = data?.exercises[0];

  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }
  console.log(exercise.muscle);

  return (
    <View contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <SetsList
        exerciseName={exercise.name}
        ListHeaderComponent={() => (
          <View style={{ gap: 10 }}>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>

              <Text style={styles.exerciseSubTitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
                <Text style={styles.subValue}>{exercise.equipment}</Text>
              </Text>
            </View>

            <View style={styles.panel}>
              <Text style={styles.instructions} numberOfLines={isOpen ? 0 : 3}>
                {exercise.instructions}
              </Text>
              <Text onPress={() => setIsOpen(!isOpen)} style={styles.seeMore}>
                {isOpen ? "See less" : "See more"}
              </Text>
            </View>

            <NewSetInput exerciseName={exercise.name} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
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
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: "600",
    color: "gray",
  },
});
