import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { usePasswordStore } from "@/stores/usePasswordStores";
import { useVaultStore } from "@/stores/useVaultStore";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Modal, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Settings() {
  const { isUnlocked, isVaultCreated, lockVault, deleteVault } =
    useVaultStore();
  const { passwords, loadPasswords, deleteAllPasswords, addPassword } =
    usePasswordStore();

  const [importModalVisible, setImportModalVisible] = React.useState(false);
  const [importText, setImportText] = React.useState("");
  const [importing, setImporting] = React.useState(false);

  const handleExport = async () => {
    try {
      await loadPasswords();
      const data = usePasswordStore.getState().passwords;
      const json = JSON.stringify(data, null, 2);
      await Clipboard.setStringAsync(json);
      Alert.alert("Exported", "Passwords copied to clipboard as JSON.");
    } catch (e) {
      Alert.alert("Error", "Failed to export passwords.");
    }
  };

  const handleOpenImport = () => {
    setImportText("");
    setImportModalVisible(true);
  };

  const handleImport = async () => {
    try {
      const parsed = JSON.parse(importText);
      const list = Array.isArray(parsed) ? parsed : parsed.passwords || [];
      if (!Array.isArray(list) || list.length === 0) {
        Alert.alert("Error", "No valid passwords found in JSON.");
        return;
      }

      setImporting(true);
      for (const item of list) {
        // Expect site + password at minimum
        if (!item.site || !item.password) continue;
        // TODO: Add all password at once
        await addPassword({
          site: item.site,
          username: item.username || "",
          password: item.password,
          url: item.url || "",
          notes: item.notes || "",
        } as any);
      }

      await loadPasswords();
      setImportModalVisible(false);
      Alert.alert("Success", "Imported passwords from JSON.");
    } catch (e) {
      Alert.alert("Error", "Failed to import JSON. Make sure it is valid.");
    } finally {
      setImporting(false);
    }
  };

  return (
    <ScrollView className="flex-1 pb-6">
      <View className="w-full max-w-md mx-auto bg-gray-800">
        <View className="px-5 py-2">
          <Text className="text-lg text-gray-400 mb-4">
            Manage your vault and application settings
          </Text>

          <View className="mb-4">
            <Text className="text-lg text-gray-400">Passwords</Text>
            <View className="mt-3 space-x-3 gap-4">
              <Button btnText="Export as JSON" onPress={handleExport} />
              <Button btnText="Import JSON" onPress={handleOpenImport} />
              <Button
                btnText="Clear All"
                onPress={() => deleteAllPasswords()}
                className="bg-red-600"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-lg text-gray-400">Vault</Text>
            <Text className="text-white font-medium mt-1">
              {isVaultCreated
                ? isUnlocked
                  ? "Unlocked"
                  : "Locked"
                : "Not created"}
            </Text>
            <View className="mt-3 space-x-3 gap-4">
              {isUnlocked && (
                <Button btnText="Lock Vault" onPress={() => lockVault()} />
              )}
              <Button
                btnText="Delete Vault"
                onPress={() => deleteVault()}
                className="bg-red-600"
              />
            </View>
          </View>

          <View className="justify-center items-center mt-3 pt-3 mb-10 border-white/40 border-t">
            <Text className="text-sm text-gray-400">Application</Text>
            <Text className="text-white mt-1">
              PassVault • Local-only storage
            </Text>
            <Text className="text-sm text-gray-500 mt-2">Version 1.0.0</Text>
          </View>
        </View>
      </View>

      {/* TODO: Add feature to import/export through file */}
      <Modal visible={importModalVisible} animationType="slide" transparent>
        <View className="flex-1 items-center justify-center bg-black/50 px-4">
          <View className="w-full max-w-md bg-[#1e2939] rounded-2xl p-5">
            <Text className="text-xl text-white font-semibold mb-2">
              Import Passwords
            </Text>
            <Text className="text-sm text-gray-400 mb-3">
              Paste JSON exported from PassVault below and press Import.
            </Text>
            <Input
              multiline
              value={importText}
              setValue={setImportText}
              className="h-40 text-left mb-4"
            />
            <View className="flex-row justify-between">
              <Button
                btnText="Cancel"
                onPress={() => setImportModalVisible(false)}
                className="bg-gray-600 px-6"
              />
              <Button
                btnText={importing ? "Importing..." : "Import"}
                onPress={handleImport}
                isDisabled={importing || !importText.trim()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default Settings;
