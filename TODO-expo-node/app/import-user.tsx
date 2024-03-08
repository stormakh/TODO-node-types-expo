import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { setItemAsync } from "expo-secure-store";
import { router } from "expo-router";

export default function ImportUserWrapper() {
  const [user, setUser] = useState<string>("");

  const handleInputUser = async () => {
    await setItemAsync("AnonUser", user);
    router.navigate("/todo-list");
  }
  return (
    <View>
      <Text>Enter your name</Text>
      <TextInput value={user} onChangeText={setUser} placeholder="Anonymous" />
      <Button
        title="Submit"
        onPress={async () => {
          handleInputUser();
        }}
      />
    </View>
  );
}
