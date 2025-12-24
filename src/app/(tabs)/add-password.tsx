import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { usePasswordStore } from "@/stores/usePasswordStores";
import { router } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

function generatePassword(length = 16) {
  let ret = "";
  for (let i = 0; i < length; i++) {
    ret += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return ret;
}

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;

  const labels = ["Very Weak", "Weak", "Ok", "Good", "Strong", "Excellent"];
  return { score, label: labels[score] };
}

const StrengthBar = ({ score }: { score: number }) => {
  const width = `${(score / 5) * 100}%`;
  const bg =
    score <= 1 ? "bg-red-500" : score <= 3 ? "bg-yellow-400" : "bg-green-500";
  return (
    <View className="w-full h-2 bg-gray-700 rounded-md overflow-hidden mb-3">
      <View className={`${bg} h-2`} style={{ width }} />
    </View>
  );
};

const AddPassword = () => {
  const addPassword = usePasswordStore((s) => s.addPassword);
  const [formData, setFormData] = React.useState({
    site: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const strength = passwordStrength(formData.password);

  const handleGenerate = () => {
    const pw = generatePassword(16);
    setFormData({ ...formData, password: pw });
  };

  const handleSubmit = async () => {
    if (!formData.site.trim() || !formData.password) {
      Alert.alert("Validation", "Site and password are required.");
      return;
    }

    setSubmitting(true);
    try {
      await addPassword({ ...formData, site: formData.site.trim() });
      // navigate back to the previous screen (password list)
      router.back();

      setFormData({ site: "", username: "", password: "", url: "", notes: "" });
    } catch (e) {
      Alert.alert("Error", "Failed to save password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-800">
      <Text className="text-sm text-gray-400 mb-4 px-5">
        Store credentials securely in your PassVault
      </Text>
      <View className="w-full max-w-md mx-auto bg-gray-800 rounded-b-2xl p-5">
        <Input
          placeholder="Site (e.g. Gmail)"
          value={formData.site}
          setValue={(site) => setFormData({ ...formData, site })}
          className="mb-3"
        />
        <Input
          placeholder="Username (optional)"
          value={formData.username}
          setValue={(username) => setFormData({ ...formData, username })}
          className="mb-3"
        />
        <View className="mb-1 w-full">
          <Input
            secureTextEntry={!showPassword}
            placeholder="Password"
            value={formData.password}
            setValue={(password) => setFormData({ ...formData, password })}
            className="mb-2"
          />
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row space-x-2 gap-2">
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                className="px-3 py-1 rounded-md bg-gray-800"
              >
                <Text className="text-sm text-gray-200">
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGenerate}
                className="px-3 py-1 rounded-md bg-sky-600"
              >
                <Text className="text-sm text-white">Generate</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-400">{strength.label}</Text>
          </View>
          <StrengthBar score={strength.score} />
        </View>
        <Input
          placeholder="URL (optional)"
          value={formData.url}
          setValue={(url) => setFormData({ ...formData, url })}
          className="mb-3"
        />
        <Input
          placeholder="Notes (optional)"
          value={formData.notes}
          setValue={(notes) => setFormData({ ...formData, notes })}
          className="mb-6"
          multiline
        />
        <Button
          onPress={handleSubmit}
          btnText={submitting ? "Saving..." : "Save Password"}
          isDisabled={submitting || !formData.site.trim() || !formData.password}
        />
      </View>
    </View>
  );
};

export default AddPassword;
