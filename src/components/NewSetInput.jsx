import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../graphqlClient";

const mutationDocument = gql`
  mutation InsertSet($newSet: NewSet!) {
    insertSet(
      document: $newSet
      collection: "sets"
      dataSource: "Cluster0"
      database: "workouts"
    ) {
      insertedId
    }
  }
`;

const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newSet) => client.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps("");
      setWeight("");
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] });
    },
  });

  const newSet = {
    exercise: exerciseName,
    reps: Number.parseInt(reps),
  };
  if (Number.parseFloat(weight)) {
    newSet.weight = Number.parseFloat(weight);
  }

  const addSet = () => {
    mutate(newSet);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={reps}
          onChangeText={setReps}
          placeholder="Reps"
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title={isPending ? "Adding..." : "Add"} onPress={addSet} />
      </View>
      {isError && <Text style={{ color: "red" }}>Failed to add set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    // flexDirection: "row",
    gap: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});

export default NewSetInput;
