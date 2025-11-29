import Toast, { ToastType } from "react-native-toast-message";

function showToast(type: ToastType, message1: string, message2?: string) {
  Toast.show({
    type: type,
    text1: message1,
    text2: message2,
    visibilityTime: 2000,
  });
}

export default showToast;
