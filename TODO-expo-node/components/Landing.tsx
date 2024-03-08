import { View, Text, Button, StyleSheet } from "react-native";
import { styles } from "../styles/home_styles";
import { router } from "expo-router";
import { TodoApi } from "../hooks/query-hooks";
import { saveString, getValueFor } from "../context/secureStore";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../context/store";

export default function Home() {
  const { data, refetch } = useQuery({
    queryKey: ["newToken"],
    queryFn: () => TodoApi.fetchNewToken(),
    enabled: false, // Prevent the query from automatically running
  });
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const handleNewUser = async () => {
    refetch();
    router.navigate("/todo-list");
    data?.AnonUser && (await saveString("AnonUser", data.AnonUser));
    data?.token && (await saveString("token", data.token));
    if (data?.AnonUser !== undefined) {
      setUser(data?.AnonUser);
    }
  };

  const handleGetCurrentUser = async () => {
    getValueFor("AnonUser");
    router.navigate("/todo-list");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <Button title="New User" onPress={() => handleNewUser()} />
        <Button
          title="Import User"
          onPress={() => router.navigate("/import-user")}
        />
        <Button
          title="Use Current User"
          onPress={() => handleGetCurrentUser()}
        />
      </View>
    </View>
  );
}
