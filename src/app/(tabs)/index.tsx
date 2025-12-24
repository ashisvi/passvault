import PasswordCard from "@/components/PasswordCard";
import Input from "@/components/UI/Input";
import ViewPasswordModal from "@/components/ViewPassword";
import usePasswordStore from "@/stores/usePasswordStores";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SearchNormal } from "iconsax-react-nativejs";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

const UnlockedPage = () => {
  const { passwords, loadPasswords } = usePasswordStore();
  const [search, setSearch] = React.useState("");
  const [passwordId, setPasswordId] = React.useState<string>("");

  const passwordViewBottomSheet = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ["25%", "50%", "90%"], []);

  useEffect(() => {
    loadPasswords();
  }, []);

  const filteredPasswords = passwords.filter(
    (p) =>
      p.site.toLowerCase().includes(search.toLowerCase()) ||
      p?.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-800">
      <View className="flex-1">
        {/* Bottom Sheet for viewing password details */}
        <BottomSheet
          ref={passwordViewBottomSheet}
          index={-1} // Starts closed
          snapPoints={snapPoints}
          enablePanDownToClose
          containerStyle={{
            zIndex: 50,
          }}
          maxDynamicContentSize={10}
        >
          <BottomSheetView className="flex-1 z-50 h-full">
            <ViewPasswordModal
              passwordId={passwordId}
              isOpen={passwordViewBottomSheet}
            />
          </BottomSheetView>
        </BottomSheet>

        {/* FlatList for displaying passwords */}
        <FlatList
          contentContainerStyle={{
            gap: 12,
          }}
          className="p-3"
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
            <View className="flex-1 justify-center items-center gap-5 h-96">
              <SearchNormal size={108} color="#6b7280e6" />
              <Text className="text-gray-400/75 text-xl">
                No passwords found.
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <PasswordCard
              password={item}
              onPress={() => {
                setPasswordId(item.id);
                passwordViewBottomSheet.current?.expand();
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default UnlockedPage;
