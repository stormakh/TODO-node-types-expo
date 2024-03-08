import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Task } from "../../models/todo";

export async function insertNewTask(
  supabase: SupabaseClient<any, "public", any>,
  task: Omit<Task, "id">
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .insert([
        { title: task.title , completed: task.completed, tag: task.tag, date: task.date, User: task.AnonUser },
      ])
      .select("id");
    if (error?.message) {
      console.error("Error executing supabase", error);
      return;
    }
    console.log("Query executed successfully", data);

    if (data) {
      const insertedTaskId = data[0].id;
      console.log("Inserted task id", insertedTaskId);
      return insertedTaskId;
    }
  } catch (err) {
    console.error("Error executing query", err);
  }
}

export async function getTaskById(
  supabase: SupabaseClient<any, "public", any>,
  taskId: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("id", taskId);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    if (data && data.length > 0) {
      return Promise.resolve(data[0] as Task);
    }
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getAllTasksByUser(
  supabase: SupabaseClient<any, "public", any>,
  User: string
) {
  try {
    const { data, error } = await supabase.from("Tasks").select("*");

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data as Task[]);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function deleteTaskById(
  supabase: SupabaseClient<any, "public", any>,
  taskId: string
) {
  try {
    const { error } = await supabase.from("Tasks").delete().eq("id", taskId);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Deleted successfully", taskId);

    return Promise.resolve("Delted successfully ".concat(taskId));
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getTasksWithTags(
  supabase: SupabaseClient<any, "public", any>,
  tag: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .contains("tag", tag);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getTaskBeforeDate(
  supabase: SupabaseClient<any, "public", any>,
  date: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .lt("date", date);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getTaskAfterDate(
  supabase: SupabaseClient<any, "public", any>,
  date: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .gt("date", date);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getTaskByDate(
  supabase: SupabaseClient<any, "public", any>,
  date: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("date", date);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function getTaskByDateRange(
  supabase: SupabaseClient<any, "public", any>,
  startDate: string,
  endDate: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function updateTask(
  supabase: SupabaseClient<any, "public", any>,
  taskId: string,
  task: Partial<Task>
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .update(task)
      .eq("id", taskId);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}

export async function toggleTaskById(
  supabase: SupabaseClient<any, "public", any>,
  taskId: string
) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .update({ completed: true })
      .eq("id", taskId);

    if (error?.message) {
      console.error("Error executing query", error);
      return Promise.reject(error);
    }

    console.log("Query executed successfully", data);

    return Promise.resolve(data);
  } catch (err) {
    console.error("Error executing query", err);
    return Promise.reject(err);
  }
}