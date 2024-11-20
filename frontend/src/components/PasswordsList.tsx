import { Password } from "@/types/password";
import { FlatList, StyleSheet } from "react-native";
import PasswordsListItem from "./PasswordsListItem";
import { View } from "./Themed";

interface PasswordsListProps {
  data: Password[];
}

const PasswordsList: React.FC<PasswordsListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <PasswordsListItem password={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default PasswordsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
});
