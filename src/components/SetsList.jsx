import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import client from "../graphqlClient";

const setsQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets"],
    queryFn: () => client.request(setsQuery),
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
