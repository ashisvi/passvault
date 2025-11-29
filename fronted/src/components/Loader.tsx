import { ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
  return (
    <ActivityIndicator
      size="large"
      color="black"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
