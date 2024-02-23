import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
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
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search.trim(), 1000);

  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises", debouncedSearchTerm],
      queryFn: ({ pageParam }) =>
        client.request(exercisesQuery, {
          offset: pageParam,
          name: debouncedSearchTerm,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });
  const { username } = useAuth();

  const loadMore = () => {
    if (isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }

  if (!username) {
    return <Redirect href={"/auth"} />;
  }

  const exercises = data?.pages.flatMap((page) => page.exercises);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search...",
            onChangeText: (event) => setSearch(event.nativeEvent.text),
            hideWhenScrolling: false,
          },
        }}
      />
      <FlatList
        data={exercises}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
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
    paddingTop: 155,
  },
});
