import { StyleSheet, Text, View } from "react-native";
import { LineGraph } from "react-native-graph";

const ProgressGraph = () => {
  const points = [
    {
      date: new Date("2021-01-01"),
      value: 10,
    },
    {
      date: new Date("2021-01-02"),
      value: 12,
    },
    {
      date: new Date("2021-01-03"),
      value: 17,
    },
    {
      date: new Date("2021-01-04"),
      value: 11,
    },
  ];
  return (
    <View style={styles.container}>
      <Text>ProgressGraph</Text>

      <LineGraph
        points={points}
        animated={false}
        color="#4484B2"
        style={styles.graph}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5,
  },
  graph: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});

export default ProgressGraph;
