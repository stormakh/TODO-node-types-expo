import express, { Express, Request, Response } from "express";
import { Task } from "../models/todo";
import { expressjwt } from "express-jwt";
import { generateAnonUserId } from "./auth/generateAnonUser";
import { connectToSupabase } from "./db/connectToSupabase";
import {
  deleteTaskById,
  getAllTasksByUser,
  getTaskBeforeDate,
  getTaskById,
  getTasksWithTags,
  insertNewTask,
  toggleTaskById,
} from "./db/interactWithSupabase";
import jwt from "jsonwebtoken";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // Middleware to parse JSON bodies

//Se supone que esto siempre tiene que estar declarado en .env
const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

// Middleware to authenticate jwt
app.use("/api",
  expressjwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
  })
);

// GET /token : returns a new token and a new user
app.get("/token", (req: Request, res: Response) => {
  const AnonUser = generateAnonUserId();
  console.log("AnonUser", AnonUser);
  const token = jwt.sign({ anonUser: AnonUser }, JWT_SECRET);
  console.log("token", token);
  res.status(200).send({ token: token, AnonUser: AnonUser });
});

// GET /token/:user : returns a new token for an existing user
app.get("/token/:user", (req: Request, res: Response) => {
  const { user } = req.params;
  const token = jwt.sign({ anonUser: user }, JWT_SECRET);
  res.status(200).send({ token: token });
});

// creating pg db to save tasks
const supaClient = connectToSupabase();

// POST /task/ : create a task, returns ID
app.post("api/task", (req: Request, res: Response) => {
  const { title, date, tag, completed, AnonUser } = req.body;

  if (!title || !date || !tag || !completed) {
    insertNewTask(supaClient, {
      title,
      date,
      tag,
      completed,
      AnonUser,
    })
      .then((id) => {
        console.log("Task added successfully id:", id);
        res.status(201).send({ id });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Adding New Task : ", err });
      });
  }
});

//Toggle a Tasks completion status
app.post("api/task/toggle/:taskid"),
  (req: Request, res: Response) => {
    const { taskid } = req.params;
    if (taskid !== undefined) {
      toggleTaskById(supaClient, taskid)
        .then(() => {
          console.log("Task updated successfully  id:", taskid);
          res.status(204).send("Task updated successfully");
        })
        .catch((err) => {
          console.log("Error updating task", err);
          res.status(500).send("Error updating task");
        });
    }
  };

// GET /task/<taskid> : returns a single task by ID
app.get("api/task/:taskid", (req: Request, res: Response) => {
  const { taskid } = req.params;
  getTaskById(supaClient, taskid)
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(404).send({ message: "Task not found" });
    });
});

// GET /task/ : returns all tasks
app.get("api/tasks", (req: Request, res: Response) => {
  if (req.headers.authorization !== undefined) {
    getAllTasksByUser(supaClient, req.headers.authorization)
      .then((tasks) => {
        res.status(201).send(tasks);
      })
      .catch((err) => {
        res.status(500).send("Error fetching tasks:" + err);
      });
  }
});

// DELETE /task/<taskid> : delete a task by ID
app.delete("api/task/:taskid", (req: Request, res: Response) => {
  const { taskid } = req.params;
  if (taskid !== undefined) {
    deleteTaskById(supaClient, taskid)
      .then(() => {
        console.log("Task deleted successfully id:", taskid);
        res.status(204).send("Task deleted successfully");
      })
      .catch((err) => {
        res.status(500).send("Error deleting task");
      });
  }
});

// GET /tag/<tagname> : returns list of tasks with this tag
app.get("api/tag/:tagname", async (req: Request, res: Response) => {
  const { tagname } = req.params;
  const tasks = await getTasksWithTags(supaClient, tagname);
  if (typeof tasks !== undefined && tasks && tasks.length === 0) {
    res.status(404).send("No tasks found with this tag");
  }
  res.status(200).send(tasks);
});

// GET /due/<yy>/<mm>/<dd> : returns list of tasks due by this date
app.get("api/due/:yy/:mm/:dd", async (req: Request, res: Response) => {
  const { yy, mm, dd } = req.params;
  const date = `${yy}-${mm}-${dd}`;

  const tasks: Task[] | null = await getTaskBeforeDate(supaClient, date);
  if (typeof tasks !== undefined && tasks && tasks.length === 0) {
    res.status(404).send("No tasks found with this due date");
  }
  res.send(tasks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
