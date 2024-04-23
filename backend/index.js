import express from "express";
import { createTodo, updateTodo } from "./zod/validationSchema";
import { Todo } from "./db/schema";

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  //get all todos in the db
  try {
    const allTodos = await Todo.find({});
    res.status(200).json({ allTodos });
  } catch (error) {
    res.status(404).json({
      message: "some Error occured or DB is down",
    });
  }
});

app.post("/todo", async (req, res) => {
  //post todos here
  const bodyObj = req.body;
  const zodObj = createTodo.safeParse(bodyObj);
  if (zodObj.success) {
    res.status(200).json({
      message: "Todo created successfully",
      created: true,
    });
    try {
      await Todo.create({
        title: bodyObj.title,
        description: bodyObj.description,
        completed: false,
      });
    } catch (error) {
      res.status(400).json({
        message: "some error occured or DB is down",
      });
    }
  } else {
    res.status(411).json({
      message: "wrong inputs passed in the body",
      created: false,
    });
    //put the data in mongodb
  }
});

app.put("/completed", async (req, res) => {
  //update existing todo with todoId
  //zod validation
  const bodyObj = req.body;
  const zodObj = updateTodo.safeParse(bodyObj);
  if (zodObj.success) {
    res.status(200).json({
      message: "Todo updated successfully",
      created: true,
    });
    // if the zod validation passes we update the todo in the db
    try {
      await Todo.findOneAndUpdate(
        {
          _id: bodyObj.id, //filter
        },
        {
          completed: true, //update
        }
      );
      res.status(200).json({
        message: "Todo marked as completed",
      });
    } catch (error) {
      res.status(404).json({
        message: "DB is down",
      });
    }
  } else {
    //if zod validation fails
    res.status(411).json({
      message: "wrong inputs passed in the body",
      created: false,
    });
    // put in mongodb
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
