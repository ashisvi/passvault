import { Tabs } from "expo-router";
import { AddCircle, Home3, Icon, Setting } from "iconsax-react-nativejs";
import React from "react";
import { View } from "react-native";

const PasswordsLayout = () => {
  return (
    <View className="flex-1 h-full">
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1e2939",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 30,
            padding: 10,
          },
          headerTitleAlign: "center",
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#007aff",
          sceneStyle: {
            backgroundColor: "#1e2939",
          },
          tabBarStyle: {
            backgroundColor: "#1e2939",
            borderColor: "#101828",
            minHeight: 70,
          },
          tabBarItemStyle: {
            padding: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "PassVault",
            tabBarIcon: (props) => (
              <TabBarIcon Icon={Home3} props={{ ...props, size: 38 }} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-password"
          options={{
            headerTitleAlign: "center",
            title: "Add New Password",
            tabBarIcon: (props) => (
              <View className="bg-gray-800 rounded-full mb-10">
                <TabBarIcon Icon={AddCircle} props={{ ...props, size: 80 }} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: (props) => (
              <TabBarIcon Icon={Setting} props={{ ...props, size: 42 }} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default PasswordsLayout;

const TabBarIcon: React.FC<{
  Icon: Icon;
  props: {
    focused?: boolean;
    color?: string;
    size?: number;
  };
}> = ({ Icon, props }) => (
  <Icon
    size={props.size || 38}
    color={props.color}
    variant={props.focused ? "Bold" : "Linear"}
  />
);
