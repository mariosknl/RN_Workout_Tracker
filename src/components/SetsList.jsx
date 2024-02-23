import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";

const setsQuery = gql`
  query sets($exercise: String!) {
    sets(exercise: $exercise) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ ListHeaderComponent, exerciseName }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () => client.request(setsQuery, { exercise: exerciseName }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  console.log(data);

  if (error) {
    return <Text>Failed to fetch sets</Text>;
  }

  return (
    <FlatList
      data={data?.sets.documents}
      ListHeaderComponent={ListHeaderComponent}
      showVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Text
          style={{
            backgroundColor: "white",
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {item.reps} x {item.weight}{" "}
        </Text>
      )}
    />
  );
};

export default SetsList;