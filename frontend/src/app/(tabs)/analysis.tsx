import AnalysisPasswordItem from "@/components/AnalysisPasswordItem";
import { View } from "@/components/Themed";
import { usePasswords } from "@/hooks/usePasswords";
import { Link } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const AnalysisPage = () => {
  const { passwords } = usePasswords();

  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        renderItem={({ item }) => (
          <Link key={item._id} href={`/${item._id}`}>
            <AnalysisPasswordItem password={item} />
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </View>
  );
};

export default AnalysisPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
});
