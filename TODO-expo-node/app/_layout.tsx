import React from "react";
import { SafeAreaView } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { styles } from "../styles/todo_styles";
import { Slot } from "expo-router";
import BigTitle from "../components/BigTitle";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.layout}>
        <BigTitle />
        <Slot></Slot>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
