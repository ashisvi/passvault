import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { usePasswordStore } from "@/stores/usePasswordStores";
import * as Clipboard from "expo-clipboard";
import { Copy, Eye, EyeSlash } from "iconsax-react-nativejs";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewPasswordModal = ({
  passwordId,
  isOpen,
}: {
  passwordId?: string;
  isOpen: any;
}) => {
  const passwords = usePasswordStore((s) => s.passwords);
  const updatePassword = usePasswordStore((s) => s.updatePassword);
  const deletePassword = usePasswordStore((s) => s.deletePassword);
  const decryptPassword = usePasswordStore((s) => s.decryptPassword);

  const entry = React.useMemo(() => {
    if (!passwordId) return null;
    return passwords.find((p) => String(p.id) === String(passwordId)) || null;
  }, [passwordId, passwords]);

  const [editMode, setEditMode] = React.useState(false);
  const [site, setSite] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (entry) {
      setSite(entry.site || "");
      setUsername(entry.username || "");
      setPassword(decryptPassword(entry.password));
      setUrl(entry.url || "");
      setNotes(entry.notes || "");
    }
  }, [entry]);

  const handleCopy = async () => {
    if (!password) return;
    await Clipboard.setStringAsync(password);
    Alert.alert("Copied", "Password copied to clipboard");
  };

  const handleSave = async () => {
    if (!entry) return;
    if (!site.trim()) {
      Alert.alert("Validation", "Site is required");
      return;
    }
    setSaving(true);
    try {
      await updatePassword(String(entry.id), {
        site: site.trim(),
        username,
        password,
        url,
        notes,
      });
      setEditMode(false);
    } catch (e) {
      Alert.alert("Error", "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!entry) return;
    Alert.alert("Delete", "Delete this password?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deletePassword(String(entry.id));
          isOpen.current?.close();
        },
      },
    ]);
  };

  if (!entry) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md bg-[#1e2939] rounded-2xl p-6 items-center">
          <Text className="text-xl text-white font-semibold mb-2">
            No password selected
          </Text>
          <Text className="text-gray-400 text-sm text-center">
            Select a password from the list to view details.
          </Text>
          <Button
            onPress={() => router.back()}
            btnText="Go back"
            className="mt-4"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="w-full max-w-md mx-auto bg-[#1e2939] h-full p-5 shadow-md z-10">
      <View className="flex-row items-start justify-between mb-2">
        <View>
          <Text className="text-2xl font-bold text-white">{entry.site}</Text>
          <Text className="text-sm text-gray-400">{entry.username}</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleCopy}
            className="px-3 py-1 rounded-md bg-gray-800"
          >
            <Copy size={18} color="#cbd5e1" />
          </TouchableOpacity>
        </View>
      </View>

      {editMode ? (
        <>
          <Input value={site} setValue={setSite} className="mb-3" />
          <Input value={username} setValue={setUsername} className="mb-3" />
          <Input
            value={password}
            setValue={setPassword}
            secureTextEntry={!showPassword}
            className="mb-3"
          />
          <View className="flex-row justify-between items-center mb-3">
            <TouchableOpacity
              onPress={() => setShowPassword((s) => !s)}
              className="px-3 py-1 rounded-md bg-gray-800"
            >
              {showPassword ? (
                <Eye size={16} color="#cbd5e1" />
              ) : (
                <EyeSlash size={16} color="#cbd5e1" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPassword(String(Math.random()).slice(2, 10));
              }}
              className="px-3 py-1 rounded-md bg-sky-600"
            >
              <Text className="text-sm text-white">Generate</Text>
            </TouchableOpacity>
          </View>
          <Input value={url} setValue={setUrl} className="mb-3" />
          <Input value={notes} setValue={setNotes} multiline className="mb-4" />

          <View className="flex-row justify-between">
            <Button
              onPress={() => setEditMode(false)}
              btnText="Cancel"
              className="bg-gray-600 px-6"
            />
            <Button
              onPress={handleSave}
              btnText={saving ? "Saving..." : "Save"}
              isDisabled={saving}
              className="px-6"
            />
          </View>
        </>
      ) : (
        <>
          <View className="mb-4">
            <Text className="text-sm text-gray-400">Password</Text>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-lg text-white">
                {showPassword ? password : "•".repeat(8)}
              </Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => setShowPassword((s) => !s)}
                  className="px-3 py-1 rounded-md bg-gray-800 mr-2"
                >
                  {showPassword ? (
                    <Eye size={16} color="#cbd5e1" />
                  ) : (
                    <EyeSlash size={16} color="#cbd5e1" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCopy}
                  className="px-3 py-1 rounded-md bg-gray-800"
                >
                  <Copy size={18} color="#cbd5e1" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {entry.url ? (
            <View className="mb-3">
              <Text className="text-sm text-gray-400">URL</Text>
              <Text className="text-white mt-1">{entry.url}</Text>
            </View>
          ) : null}

          {entry.notes ? (
            <View className="mb-3">
              <Text className="text-sm text-gray-400">Notes</Text>
              <Text className="text-white mt-1">{entry.notes}</Text>
            </View>
          ) : null}

          <View className="flex-row justify-between mt-4">
            <Button
              onPress={() => setEditMode(true)}
              btnText="Edit"
              className="px-6"
            />
            <Button
              onPress={handleDelete}
              btnText="Delete"
              className="bg-red-600 px-6"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ViewPasswordModal;
