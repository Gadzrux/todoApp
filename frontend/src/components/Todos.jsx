import React from "react";

function Todos({ todos }) {
  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button
              onClick={async () => {
                const response = await fetch(
                  "http://localhost:4000/completed",
                  {
                    method: "PUT",
                    body: JSON.stringify({
                      id: todo._id,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const json = await response.json();
                console.log(json);
              }}
            >
              {todo.completed ? "Completed" : "Mark as completed"}
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Todos;
