import useThemeColor from "@/hooks/useThemeColor";
import { Password } from "@/types/password";
import passwordStrengthEstimator from "@/utils/passwordStrengthEstimator";
import { ArrowRight2 } from "iconsax-react-native";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

const AnalysisPasswordItem = ({ password }: { password: Password }) => {
  const themeColors = useThemeColor();
  const passwordStrength = passwordStrengthEstimator(password.password);

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          src={`https://${password.websiteUrl}/favicon.ico`}
          style={styles.image}
          crossOrigin="anonymous"
        />
        <Text>{passwordStrength.label}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.website}>{password.websiteName}</Text>
        <Text style={[styles.username, { color: themeColors.tabIconDefault }]}>
          {password.password}
        </Text>

        {/* Strength Bar */}
        <View
          style={[
            styles.strengthBarOuter,
            { backgroundColor: themeColors.borderColor },
          ]}
        >
          <View
            style={[
              styles.strengthBarInner,
              {
                backgroundColor: passwordStrength.color,
              },
            ]}
          ></View>
        </View>
      </View>
      <Pressable>
        <ArrowRight2 size={24} color={themeColors.tabIconDefault} />
      </Pressable>
    </View>
  );
};

export default AnalysisPasswordItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    width: 60,
  },
  image: {
    height: 45,
    width: 45,
  },
  body: {
    flex: 1,
    gap: 5,
    marginLeft: 10,
    height: "100%",
  },
  website: {
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    fontSize: 15,
  },

  // Strength Bar
  strengthBarOuter: {
    width: "100%",
    height: 10,
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  strengthBarInner: {
    width: "60%",
    height: "100%",
  },
});
