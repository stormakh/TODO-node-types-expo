import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task, TokenResponse } from "../../models/todo";
import { getValueFor } from "../context/secureStore";

const ApiUrl = process.env.EXPO_PUBLIC_API_URL;



export const TodoApi = {

  //New token + Anon User in response
  fetchNewToken: async () => {
    console.log("fetching new");
    const response = await axios.get(`${ApiUrl}/token`);
    return Promise.resolve(response.data as TokenResponse);
  },
  //Already provides a User
  fetchExistingToken: async (user  :string ) => {
    console.log("fetching existing");
    const response = await axios.get(`${ApiUrl}/token/${user}`);
    return Promise.resolve(response.data as TokenResponse);
  },

  //Get all tasks
  fetchTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${ApiUrl}/api/tasks`, {
      headers: {
        Authorization: "Bearer " + (await getValueFor("token")),
      },
    });
    return response.data;
  },

  //Get a single task by ID
  fetchTask: async (id: string): Promise<Task> => {
    const response = await axios.get(`${ApiUrl}/api/task/${id}`, {
      headers: {
        Authorization: "Bearer " + (await getValueFor("token")),
      },
    });
    return response.data;
  },

  //Get tasks by tag
  fetchTasksByTag: async (tag: string): Promise<Task[]> => {
    const response = await axios.get(`${ApiUrl}/api/tag/${tag}`, {
      headers: {
        Authorization: await getValueFor("token"),
      },
    });
    return response.data;
  },

  //Get tasks by due date
  fetchTasksByDueDate: async (date: Date): Promise<Task[]> => {
    const response = await axios.get(
      `${ApiUrl}/api/due/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      {
        headers: {
          Authorization: await getValueFor("token"),
        },
      }
    );
    return response.data;
  },

  //Add a new task
  addTask: async (todo: Omit<Task, "id">): Promise<number> => {
    const token = await getValueFor("token");
    const response = await axios.post(`${ApiUrl}/api/task`, todo, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data.id;
  },

  //Remove a task
  removeTask: async (id: number) => {
    const token = await getValueFor("token");
    await axios.delete(`${ApiUrl}/api/task/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  //Toggle task completion
  toggleTaskCompletion: async (id: number) => {
    const token = await getValueFor("token");
    console.log("toggling task completion with token", token , "and id", id);
    const resposnse = await axios.post(`${ApiUrl}/api/task/toggle/${id}`,{}, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return resposnse.status;
  },
};

export const useGetAllTasks = () =>
  useQuery({ queryKey: ["todos", "fetchall"], queryFn: TodoApi.fetchTasks });

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: Omit<Task, "id">) => {
      return TodoApi.addTask(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "add"] });
    },
  });
};

export const useRemoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return TodoApi.removeTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "remove"] });
    },
  });
};

export const useToggleTaskCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return TodoApi.toggleTaskCompletion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "toggle"] });
    },
  });
};
