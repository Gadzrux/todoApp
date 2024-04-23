import React from "react";
import { useState } from "react";

function Createtodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <br></br>
      <input
        type="text"
        placeholder="decription"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <br></br>
      <button
        onClick={() => {
          fetch("http://localhost:4000/todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              description: description,
            }),
          });
        }}
      >
        Add a todo
      </button>
    </>
  );
}

export default Createtodo;
