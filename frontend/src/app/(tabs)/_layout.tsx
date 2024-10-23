import { HeaderRightBtn } from "@/components";
import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  name,
  icon,
  color,
  focused,
}: {
  name: string;
  icon: any;
  color: string;
  focused: boolean;
}) => {
  return (
    <View className="flex justify-center items-center">
      <Image
        source={icon}
        className="h-6 w-6"
        resizeMode="contain"
        style={{ tintColor: color }}
      />
      <Text
        className={`${focused ? "font-bold" : "font-semibold"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#9046CF",
        tabBarInactiveTintColor: "#A6A6A6",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FEFEFE",
          borderTopWidth: 1,
          borderTopColor: "#FEFEFE",
          height: 60,
        },
        headerStyle: {
          height: 100,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "rgba(144, 70, 207, 0.2)",
          },
          headerTitle: () => (
            <View
              className="px-3 py-1 rounded-full"
              style={{
                borderColor: "rgba(144, 70, 207, 0.2)",
                borderWidth: 1,
              }}
            >
              <Text className="text-[18px] font-bold text-textr">
                PassVault
              </Text>
            </View>
          ),
          headerRight: () => <HeaderRightBtn />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="passwords"
        options={{
          title: "Home",
          headerTitle: "Passwords",
          headerShown: false,
          headerRight: () => <HeaderRightBtn />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.shield}
              name="Passwords"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Home",
          headerTitle: "Profile",
          headerRight: () => <HeaderRightBtn />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.user}
              name="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
