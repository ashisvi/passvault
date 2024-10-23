import { Redirect } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useAuth } from "./context/AuthContext";

const Page = () => {
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (authState?.authenticated) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
};

export default Page;
