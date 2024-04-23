import express from "express";
import { createTodo, updateTodo } from "./zod/validationSchema";

const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  //get all todos in the db
});

app.post("/todo", (req, res) => {
  //post todos here
  const bodyObj = req.body;
  const zodObj = createTodo.safeParse(bodyObj);
  if (zodObj.success) {
    res.status(200).json({
      message: "Todo created successfully",
      created: true,
    });
  } else {
    res.status(411).json({
      message: "wrong inputs passed in the body",
      created: false,
    });
    //put the data in mongodb
  }
});

app.put("/completed", (req, res) => {
  //update existing todo with todoId
  const bodyObj = req.body;
  const zodObj = updateTodo.safeParse(bodyObj);
  if (zodObj.success) {
    res.status(200).json({
      message: "Todo updated successfully",
      created: true,
    });
  } else {
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
