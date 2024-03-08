import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Platform,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import {
  useAddTask,
  useRemoveTask,
  useToggleTaskCompletion,
} from "../hooks/query-hooks";
import { Task } from "../../models/todo";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { styles } from "../styles/todo_styles";
import { getValueFor } from "../context/secureStore";
import { useStore } from "../context/store";
import { Link } from "expo-router";
import { setStringAsync } from "expo-clipboard";

const TodoList = () => {
  //store calls
  const newTodoTitle = useStore((state) => state.newTodoTitle);
  const setNewTodoTitle = useStore((state) => state.setNewTodoTitle);
  const newTodoTags = useStore((state) => state.newTodoTags);
  const setNewTodoTags = useStore((state) => state.setNewTodoTags);
  const newTodoDate = useStore((state) => state.newDate);
  const setNewTodoDate = useStore((state) => state.setNewDate);
  const showDatePicker = useStore((state) => state.showDatePicker);
  const setShowDatePicker = useStore((state) => state.setShowDatePicker);
  const todos = useStore((state) => state.todos);
  const addTodo = useStore((state) => state.addTodo);
  const removeTodo = useStore((state) => state.removeTodo);
  const toggleTodoCompletion = useStore((state) => state.toggleTodoCompletion);
  const user = useStore((state) => state.user);

  useEffect(() => {
    (async () => {
      const user = await getValueFor("AnonUser");
      if (user) {
        useStore.setState({ user: user });
      }
    })();
    
  }, []);

  //query hooks
  const addTodoMutation = useAddTask();
  const removeTodoMutation = useRemoveTask();
  const toggleTodoCompletionMutation = useToggleTaskCompletion();

  const handleAddTodo = async () => {
    if (newTodoTitle.trim()) {
      const tagsArray: string[] = newTodoTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const newTodo: Omit<Task, "id"> = {
        title: newTodoTitle,
        completed: false,
        tag: tagsArray,
        date: newTodoDate,
        AnonUser: (await getValueFor("AnonUser")) || "Anonymous",
      };
      const id = await addTodoMutation.mutateAsync(newTodo);
      console.log("recieved id", id);
      setNewTodoTitle("");
      setNewTodoTags("");
      const newTask: Task = {
        title: newTodoTitle,
        completed: false,
        tag: tagsArray,
        date: newTodoDate,
        AnonUser: (await getValueFor("AnonUser")) || "Anonymous",
        id: id,
      };
      addTodo(newTask);
    }
  };

  const handleRemoveTodo = (event: GestureResponderEvent, id: number) => {
    console.log("remove", id);
    removeTodoMutation.mutate(id);
    removeTodo(id);
  };

  const handleToggleCompletion = (id: number) => {
    console.log("toggle completion", id);
    toggleTodoCompletionMutation.mutate(id);
    toggleTodoCompletion(id);
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || newTodoDate;
    setShowDatePicker(Platform.OS === "ios");
    setNewTodoDate(currentDate);
  };

  const handleCopyToClipboard = async (text: string) => {
    setStringAsync(text);
  };
  return (
    <View style={styles.container}>
      <Link style={styles.homeButton} href="/">
        {" "}
        {"Home"}{" "}
      </Link>
      <Pressable onPress={() => handleCopyToClipboard(user)}>
        <Text style={styles.user}>User: {user} </Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={newTodoTitle}
        onChangeText={setNewTodoTitle}
        placeholder="Add new todo Task Title"
      />
      <TextInput
        style={styles.input}
        value={newTodoTags}
        onChangeText={setNewTodoTags}
        placeholder="Add tags separated by commas"
      />
      <Button title="Pick date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={newTodoDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Button
        title="Add Task"
        onPress={handleAddTodo}
        disabled={!newTodoTitle.trim()}
      />
      <FlatList
        data={todos.sort(
          (b, a) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
        keyExtractor={(item) => item.id.toString()} // Use the item's ID as the key
        renderItem={({ item }) => (
          // Render the filtered tasks here
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>
              {item.title} - {item.completed ? "Done" : "Pending"}
            </Text>
            <Text>Tags: {item.tag.join(", ")}</Text>
            <Text>Date: {item.date.toLocaleDateString()}</Text>
            <Text>Id: {item.id}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title={"Remove"}
                onPress={(event) => handleRemoveTodo(event, item.id)}
              ></Button>
              <Button
                title={item.completed ? "Undo" : "Done"}
                onPress={() => handleToggleCompletion(item.id)}
              ></Button>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
