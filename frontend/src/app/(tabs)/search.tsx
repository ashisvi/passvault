import { Input, PasswordsList, View } from "@/components";
import { usePasswords } from "@/hooks/usePasswords";
import useThemeColor from "@/hooks/useThemeColor";
import { SearchNormal1 } from "iconsax-react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchPage = () => {
  const [searchedPassword, setSearchPassword] = useState("");

  const themeColors = useThemeColor();
  const { passwords } = usePasswords();

  const filteredPasswords = passwords.filter((password) => {
    return (
      password.websiteName
        .toLowerCase()
        .includes(searchedPassword.toLowerCase()) ||
      password.username.toLowerCase().includes(searchedPassword.toLowerCase())
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Search bar */}
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: themeColors.cardBackground,
            },
          ]}
        >
          <Input
            id="search"
            placeholder="Search here..."
            style={styles.input}
            value={searchedPassword}
            onChangeText={setSearchPassword}
          />
          <SearchNormal1 color={themeColors.text} />
        </View>

        {/* List of passwords */}
        <View style={styles.list}>
          <PasswordsList data={filteredPasswords} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    borderWidth: 0,
    marginBottom: 0,
    paddingLeft: 0,
    flex: 1,
    backgroundColor: "transparent",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
