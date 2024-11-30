import { AnalysisPasswordItem, Text, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { Sort } from "iconsax-react-native";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

const AnalysisPage = () => {
  const { passwords } = usePasswords();
  const themeColor = useThemeColor();

  const [count, setCount] = useState({
    Safe: 0,
    Weak: 0,
    Risk: 0,
  });

  const safePercent = useMemo(() => {
    const total = passwords.length;
    const percent = (count.Safe / total) * 100;
    if (isNaN(percent)) return 0;
    return percent.toFixed(0);
  }, [count]);

  const Analysis = (
    <View style={styles.analysis}>
      <View style={[styles.circle, { borderColor: themeColor.borderColor }]}>
        <View style={styles.circleCenter}>
          <Text style={styles.circleText}>{safePercent}%</Text>
          <Text style={{ fontSize: 15, fontWeight: "semibold" }}>Safe</Text>
        </View>
        <View
          style={[styles.circleProgress, { height: `${safePercent}%` }]}
        ></View>
      </View>
      <View style={styles.countContainer}>
        <View style={[styles.count, { borderColor: themeColor.borderColor }]}>
          <Text style={styles.countText}>{count.Safe}</Text>
          <Text style={{ fontSize: 15, fontWeight: "semibold" }}>Safe</Text>
        </View>
        <View style={[styles.count, { borderColor: themeColor.borderColor }]}>
          <Text style={styles.countText}>{count.Risk}</Text>
          <Text style={{ fontSize: 15, fontWeight: "semibold" }}>Risk</Text>
        </View>
        <View style={[styles.count, { borderColor: themeColor.borderColor }]}>
          <Text style={styles.countText}>{count.Weak}</Text>
          <Text style={{ fontSize: 15, fontWeight: "semibold" }}>Weak</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Analysis */}

      {/* Password List */}
      <FlatList
        data={passwords}
        renderItem={({ item }) => (
          <Link key={item._id} href={`/${item._id}`}>
            <AnalysisPasswordItem password={item} setCount={setCount} />
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <>
            {Analysis}
            <View style={styles.header}>
              <Text style={styles.headerText}>Analysis</Text>
              {/* ToDo: make sort button working */}
              <Sort color={themeColor.text} size={28} />
            </View>
          </>
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
    paddingBottom: 20,
  },
  analysis: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  circle: {
    borderRadius: "50%",
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    overflow: "hidden",
    position: "relative",
  },
  circleCenter: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "transparent",
  },
  circleText: {
    fontSize: 35,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: "bold",
  },
  circleProgress: {
    width: "100%",
    backgroundColor: "#00FF00",
    position: "absolute",
    bottom: 0,
  },
  countContainer: {
    marginVertical: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  count: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  countText: {
    fontSize: 22,
    fontWeight: "bold",
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
