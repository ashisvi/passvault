import { TouchableOpacity, Text, Image } from "react-native";
import { icons } from "../constants";

const HeaderRightBtn = () => {
  return (
    <TouchableOpacity className="mr-6">
      <Image source={icons.notification} className="h-6 w-6" />
    </TouchableOpacity>
  );
};

export default HeaderRightBtn;
