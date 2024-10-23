import usePasswords from "@/hooks/usePasswords";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import PasswordCard from "./PasswordCard";
import SearchInput from "./SearchInput";

const PasswordsList = () => {
  const { passwords, loading, error } = usePasswords();
  const [search, setSearch] = useState("");

  const [filteredPasswords, setFilteredPasswords] = useState<Password[]>();

  useEffect(() => {
    setFilteredPasswords(
      passwords.filter(
        (password) =>
          password.username?.includes(search) ||
          password.websiteName?.includes(search) ||
          password.websiteUrl?.includes(search),
      ),
    );
  }, [search, passwords, error, loading]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-montserrat-semibold">Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-montserrat-semibold">{error}</Text>
      </View>
    );

  if (!passwords?.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-montserrat-semibold">
          No password yet
        </Text>
        <Link href={"/passwords/add-password"} asChild>
          <Text className="text-primary text-lg font-montserrat-semibold">
            Save your first password
          </Text>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="p-3">
        <SearchInput value={search} setValue={setSearch} />
      </View>
      {filteredPasswords?.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-montserrat-semibold">No results</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPasswords}
          renderItem={(password) => <PasswordCard password={password.item} />}
          className="px-3"
        />
      )}
    </View>
  );
};

export default PasswordsList;
