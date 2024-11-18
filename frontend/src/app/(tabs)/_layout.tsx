import useThemeColor from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
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
  const themeColor = useThemeColor();
  return (
    <Icon
      color={focused ? color : themeColor.text}
      size={28}
      variant={focused ? "Bold" : "Linear"}
    />
  );
};

const TabsLayout = () => {
  const themeColor = useThemeColor();

  const screenOptions = {
    headerStyle: { backgroundColor: themeColor.background },
    headerTitleStyle: { color: themeColor.text },
    tabBarStyle: {
      backgroundColor: themeColor.background,
      height: 65,
      borderTopColor: themeColor.borderColor,
      paddingTop: 4,
    },
    tabBarLabelStyle: { fontSize: 12, paddingTop: 4 },
    headerTitleAlign: "center" as "center",
    headerLeft: () => (
      <User size={28} color={themeColor.text} style={{ marginLeft: 10 }} />
    ),
    headerRight: () => (
      <Add size={36} color={themeColor.text} style={{ marginRight: 10 }} />
    ),
  };

  return (
    <Tabs initialRouteName="index" screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={Home3} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={ShieldSearch} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} icon={SearchNormal1} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
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
