import PasswordCard from "@/components/PasswordCard";
import Input from "@/components/UI/Input";
import usePasswordStore from "@/stores/usePasswordStores";
import { useVaultStore } from "@/stores/useVaultStore";
import { router } from "expo-router";
import { AddCircle, SearchNormal } from "iconsax-react-nativejs";
import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UnlockedPage = () => {
  const { lockVault } = useVaultStore();
  const { passwords, loadPasswords } = usePasswordStore();
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    loadPasswords();
  }, []);

  const filteredPasswords = passwords.filter(
    (p) =>
      p.site.toLowerCase().includes(search.toLowerCase()) ||
      p?.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 p-3">
      <FlatList
        contentContainerStyle={{
          gap: 12,
          margin: 15,
          height: "100%",
        }}
        data={filteredPasswords}
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
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center gap-5 -mt-44">
            <SearchNormal size={108} color="#6b7280e6" />
            <Text className="text-gray-400/75 text-xl">
              No passwords found.
            </Text>
          </View>
        )}
        renderItem={({ item }) => <PasswordCard password={item} />}
      />

      <Pressable
        className="absolute bottom-15 right-1/2 translate-x-1/2"
        onPress={() => router.push("/add-password")}
      >
        <AddCircle
          size={70}
          color="#ffffff"
          className="self-center"
          variant="Bold"
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default UnlockedPage;
