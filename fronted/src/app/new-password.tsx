import { Button, GeneratePassword, Input, Text, View } from '@/components';
import { type InputProps } from '@/components/Input';
import { usePasswords } from '@/hooks/usePasswords';
import useThemeColor from '@/hooks/useThemeColor';
import { encryptPassword } from '@/utils/encryption';
import showToast from '@/utils/showToast';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

const NewPassword = () => {
  const themeColors = useThemeColor();
  const { addPassword, status } = usePasswords();

  const [websiteName, setWebsiteName] = useState('');
  const [username, setUsername] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [password, setPassword] = useState('');

  const handleGeneratePassword = useCallback(
    (
      length: number,
      numbers: boolean,
      lowercase: boolean,
      uppercase: boolean,
      symbols: boolean
    ) => {
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

      // Create the character set based on the selected options
      let chars = '';
      if (lowercase) chars += lowercaseChars;
      if (uppercase) chars += uppercaseChars;
      if (numbers) chars += numberChars;
      if (symbols) chars += symbolChars;

      // Initialize the password
      let password = '';

      // Generate password
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomIndex);
      }

      setPassword(password);
    },
    [setPassword]
  );

  const handleSubmit = useCallback(async () => {
    if (!websiteName || !username || !websiteUrl || !password) {
      showToast('info', 'Please fill all the fields');

      return;
    }

    // Encrypt password
    const encryptedPassword = encryptPassword(password);

    // Handle form submission
    const passwordData = {
      websiteName,
      username,
      websiteUrl,
      password: encryptedPassword,
    };

    try {
      await addPassword(passwordData);

      showToast('success', 'Password added successfully');

      setTimeout(() => {
        router.push('/(tabs)');
      }, 3000);
    } catch (error) {
      console.log('~ new-password.tsx', error);

      showToast('error', 'Failed to add password', error?.message);
    }
  }, [websiteName, username, websiteUrl, password]);

  return (
    <View style={styles.container}>
      {/* Form fields */}
      <TextField
        id="websiteName"
        label="Website"
        placeholder="website or app name"
        value={websiteName}
        onChangeText={setWebsiteName}
      />
      <TextField
        id="username"
        label="User id"
        placeholder="username or email id"
        value={username}
        onChangeText={setUsername}
      />
      <TextField
        id="websiteUrl"
        label="Website url"
        placeholder="website url"
        value={websiteUrl}
        onChangeText={setWebsiteUrl}
      />

      {/* Separator */}
      <View
        style={[
          styles.separator,
          {
            backgroundColor: themeColors.borderColor,
          },
        ]}></View>

      {/* Password field */}
      <GeneratePassword
        password={password}
        setPassword={setPassword}
        handleGeneratePassword={handleGeneratePassword}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            // TODO: make this button functional
          }}
          title="Generate"
          variant="secondary"
        />
        <Button onPress={handleSubmit} title="Save" />
      </View>
    </View>
  );
};

interface TextFieldProps extends InputProps {
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  placeholder,
  isPassword,
  onChangeText,
  style,
  value,
}) => {
  const themeColors = useThemeColor();

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        isPassword={isPassword}
        style={[styles.textInput, style, { borderBottomColor: themeColors.borderColor }]}
      />
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  fieldGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 5,
    width: '65%',
    fontSize: 18,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 15,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
});
