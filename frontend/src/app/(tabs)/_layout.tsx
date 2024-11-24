import useThemeColor from "@/hooks/useThemeColor";
import { Link, Tabs } from "expo-router";
import {
  Add,
  Home3,
  SearchNormal1,
  Setting2,
  ShieldSearch,
  User,
} from "iconsax-react-native";
import React from "react";

const TabBarIcon = ({
  color,
  focused,
  icon: Icon,
}: {
  color: string;
  focused: boolean;
  icon: React.ElementType;
}) => {
  const { themeColors } = useThemeColor();
  return (
    <Icon
      color={focused ? color : themeColors.text}
      size={28}
      variant={focused ? "Bold" : "Linear"}
    />
  );
};

const TabsLayout = () => {
  const { themeColors } = useThemeColor();

  const screenOptions = {
    tabBarHideOnKeyboard: true,
    headerTintColor: themeColors.text,
    headerStyle: { backgroundColor: themeColors.background },
    tabBarStyle: {
      backgroundColor: themeColors.background,
      height: 65,
      borderTopColor: themeColors.borderColor,
      paddingTop: 4,
    },
    tabBarLabelStyle: { fontSize: 12, paddingTop: 4 },
    headerTitleAlign: "center" as "center",
    headerLeft: () => (
      <Link href="/setting/profile" style={{ marginLeft: 10 }}>
        <User size={28} color={themeColors.text} />
      </Link>
    ),
    headerRight: () => (
      <Link href="/new-password" style={{ marginRight: 10 }}>
        <Add size={36} color={themeColors.text} />
      </Link>
    ),
  };

  return (
    <Tabs initialRouteName="index" screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Passwords",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={Home3} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={SearchNormal1} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Security",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={ShieldSearch} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown: false,
          title: "Setting",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={Setting2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
