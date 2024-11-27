import { AnalysisPasswordItem, Text, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { Sort } from "iconsax-react-native";
import { FlatList, StyleSheet } from "react-native";

const AnalysisPage = () => {
  const { passwords } = usePasswords();
  const themeColor = useThemeColor();

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
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Analysis</Text>
            {/* ToDo: make sort button working */}
            <Sort color={themeColor.text} size={28} />
          </View>
        )}
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

  // List Header Component
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
});
