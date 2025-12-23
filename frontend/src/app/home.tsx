import AddPassword from "@/components/AddPassword";
import PasswordCard from "@/components/PasswordCard";
import Input from "@/components/UI/Input";
import ViewPasswordModal from "@/components/ViewPassword";
import usePasswordStore from "@/stores/usePasswordStores";
import { useVaultStore } from "@/stores/useVaultStore";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { AddCircle, SearchNormal } from "iconsax-react-nativejs";
import React, { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UnlockedPage = () => {
  const { lockVault } = useVaultStore();
  const { passwords, loadPasswords } = usePasswordStore();
  const [search, setSearch] = React.useState("");
  const [passwordId, setPasswordId] = React.useState<string>("");

  const passwordViewBottomSheet = React.useRef<BottomSheet>(null);
  const addPasswordBottomSheet = React.useRef<BottomSheet>(null);

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
    <SafeAreaView className="flex-1 p-3">
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

      {/* Bottom Sheet for adding password */}
      <BottomSheet
        ref={addPasswordBottomSheet}
        index={-1} // Starts closed
        snapPoints={snapPoints}
        enablePanDownToClose
        containerStyle={{
          zIndex: 50,
        }}
        maxDynamicContentSize={10}
      >
        <BottomSheetView className="flex-1 z-50 h-full">
          <AddPassword isOpen={addPasswordBottomSheet} />
        </BottomSheetView>
      </BottomSheet>

      {/* FlatList for displaying passwords */}
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

      <Pressable
        className="absolute bottom-15 right-1/2 translate-x-1/2"
        onPress={() => addPasswordBottomSheet.current?.expand()}
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
