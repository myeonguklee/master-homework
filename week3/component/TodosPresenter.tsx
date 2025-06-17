import React, {Suspense} from "react";
import {TodoInput} from "./TodoInput";
import {Todo} from "../type";
import {TodoList} from "./TodoList";
import {TodoListSkeleton} from "./TodoListSkeleton";

interface AppPresenterProps {
  todoList: Todo[];
  todoTitle: string;
  isInputFocused: boolean;
  setTodoList: (todoList:Todo[]) => void;
  clicked: (e:React.ChangeEvent<HTMLInputElement>) => void;
  doSubmit: () => void;
}

export function TodosPresenter({todoList, setTodoList, todoTitle, isInputFocused, clicked, doSubmit}: AppPresenterProps) {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ color: isInputFocused ? "red" : "blue" }}>할 일 목록 관리 애플리케이션</h1>
      <p>추가하고 싶은 할 일을 입력하신 후, 아래 버튼을 눌러주세요.</p>
      <TodoInput
        todoTitle={todoTitle}
        clicked={clicked}
        doSubmit={doSubmit}
      />
      <hr />

      <Suspense fallback={<TodoListSkeleton/>}>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </Suspense>

      <footer style={{ marginTop: "20px", fontSize: "12px", color: "#555" }}>
        <small>버전 0.1 - 실습용으로 간단히 구현된 예제입니다.</small>
      </footer>

    </div>
  )
}