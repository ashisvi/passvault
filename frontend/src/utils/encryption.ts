const CryptoJS = require('react-native-crypto-js')

const secretKey = process.env.EXPO_PUBLIC_ENCRYPTION_SECRET_KEY;
console.log(secretKey)

const encryptPassword = (password: string) => {
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
  return encryptedPassword;
};

const decryptPassword = (encryptedPassword: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
};

export { encryptPassword, decryptPassword };