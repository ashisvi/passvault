import { Card, FilterBtn } from "@/components";
import { icons } from "@/constants";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
  return (
    <View className="flex-1">
      <View className="bg-primary/20 p-2 px-3 rounded-b-2xl">
        <View className="py-2 px-1">
          <Text className="text-lg text-textr/50 font-semibold">Manage</Text>
          <Text className="text-2xl font-bold">Your Passwords</Text>
        </View>
        <View className="flex flex-row justify-between items-center py-2">
          <Card icon={icons.people} type="Socials" passwords={10} />
          <Card icon={icons.menu} type="Apps" passwords={8} />
          <Card icon={icons.wallet} type="Wallets" passwords={6} />
        </View>
      </View>
      <View className="px-3 flex-1">
        <Text className="pt-2 pb-1 text-[22px] font-bold">My Passwords</Text>
        <ScrollView>
          <View className="flex flex-row my-2">
            <FilterBtn text="All" isActive={true} />
            <FilterBtn text="Favorites" isActive={false} />
            <FilterBtn text="Frequent" isActive={false} />
          </View>
          <View className="pb-2">{/* <PasswordsList /> */}</View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
