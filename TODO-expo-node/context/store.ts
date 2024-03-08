import { create } from "zustand";
import { Task } from "../../models/todo";

interface TodoState {
  todos: Task[];
  user: string;
  newTodoTitle: string;
  newTodoTags: string;
  newDate : Date;
  showDatePicker: boolean;
  setUser: (user : string) => void;
  setNewTodoTitle: (title :string ) => void;
  setNewTodoTags: (tags : string) => void;
  setNewDate: (date : Date) => void;
  setShowDatePicker: (show : boolean) => void;
  addTodo: (newTodo: Task) => void;
  removeTodo: (id: number) => void;
  toggleTodoCompletion: (id: number) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  user: "",
  newTodoTitle: "",
  newTodoDate: new Date(),
  newTodoTags: "",
  newDate : new Date(),
  showDatePicker: false,
  setUser: (user : string) => set({ user: user }),
  setNewTodoTitle: (title :string ) => set({ newTodoTitle: title }),
  setNewTodoTags: (tags : string) => set({ newTodoTags: tags }),
  setNewDate: (date : Date) => set({ newDate: date }),
  setShowDatePicker: (show : boolean) => set({ showDatePicker: show }),
  addTodo: (newTodo: Task) =>
  set((state) => ({
    todos: [...state.todos, newTodo],
  })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id)})),
  toggleTodoCompletion: (id : number) =>
    set((state) => ({
      //find the todo with id 
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
}));
