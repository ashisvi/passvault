import useThemeColor from "@/hooks/useThemeColor";
import { RelativePathString, router } from "expo-router";
import { ArrowRight2 } from "iconsax-react-native";
import { Pressable, StyleSheet, Switch } from "react-native";
import { Text, View } from "./Themed";

interface LinkButtonProps {
  label: string;
  href?: RelativePathString;
  switchBtn?: boolean;
  switchValue?: boolean;
  setSwitchValue?: (value: boolean) => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  href,
  switchBtn,
  switchValue,
  setSwitchValue,
}) => {
  const themeColor = useThemeColor();

  return (
    <Pressable onPress={() => !switchBtn && href && router.push(href)}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        {switchBtn ? (
          <Switch
            thumbColor={themeColor.tint}
            trackColor={{
              true: themeColor.tint,
              false: themeColor.borderColor,
            }}
            value={switchValue}
            onValueChange={setSwitchValue}
          />
        ) : (
          <ArrowRight2 color={themeColor.text} style={styles.icon} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  icon: {
    marginRight: 7,
  },
});

export default LinkButton;
