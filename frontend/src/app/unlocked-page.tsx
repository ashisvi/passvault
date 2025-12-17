import PasswordCard from "@/components/PasswordCard";
import Input from "@/components/UI/Input";
import usePasswordStore from "@/stores/usePasswordStores";
import { useVaultStore } from "@/stores/useVaultStore";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UnlockedPage = () => {
  const { lockVault } = useVaultStore();
  const { passwords } = usePasswordStore();
  const [search, setSearch] = React.useState("");

  return (
    <SafeAreaView className="flex-1 p-3">
      <FlatList
        contentContainerStyle={{ gap: 12, margin: 15 }}
        data={passwords}
        ListHeaderComponent={() => (
          <View>
            <Input
              placeholder="Search passwords..."
              setValue={setSearch}
              value={search}
              className="text-left py-2 text-md rounded-xl bg-gray-700/20 text-white mb-3"
            />
          </View>
        )}
        renderItem={({ item }) => <PasswordCard password={item} />}
      />
    </SafeAreaView>
  );
};

export default UnlockedPage;
