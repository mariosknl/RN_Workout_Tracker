import { View, Text } from "react-native";
import { formatDistanceToNow } from "date-fns";

const SetListItem = ({ set }) => {
  const timestamp = parseInt(set._id.substring(0, 8), 16) * 1000;
  const createdAt = new Date(timestamp);

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        gap: 5,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>
        {set.reps} x {set.weight}
      </Text>
      <Text style={{ color: "gray" }}>{formatDistanceToNow(createdAt)}</Text>
    </View>
  );
};

export default SetListItem;
