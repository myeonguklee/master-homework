import React from "react";
import {Todo} from "../type";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({todo} : TodoItemProps) {
  return(
    <li key={todo.id} style={{ background: todo.id % 2 === 0 ? "#eef" : "#fee", padding: "4px", marginBottom: "4px" }}>
      {todo.title || "제목 없음"} {todo.completed ? "✅ 완료됨" : ""}
    </li>
  )
}