import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { gql } from "graphql-request";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ExerciseListItem } from "../components/ExerciseListItem";
import client from "../graphqlClient";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthContext";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => client.request(exercisesQuery),
  });
  const { username } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
