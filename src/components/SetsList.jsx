import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";
import { useAuth } from "../providers/AuthContext";
import SetListItem from "./SetListItem";
import ProgressGraph from "./ProgressGraph";

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
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
  const { username } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets", exerciseName],
    queryFn: () =>
      client.request(setsQuery, { exercise: exerciseName, username }),
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
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
          <ProgressGraph sets={data.sets.documents} />
        </>
      )}
      showVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
    />
  );
};

export default SetsList;
