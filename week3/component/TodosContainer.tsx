import React, {useState} from "react";
import {TodosPresenter} from "./TodosPresenter";
import {ErrorBoundary} from "./ErrorBoundary";
import {Todo} from "../type";

export function TodosContainer() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);

  function clicked(e : React.ChangeEvent<HTMLInputElement>): void {
    setInputFocused(true);
    setTodoTitle(e.target.value);
  }

  function doSubmit() {
    if (todoTitle.length < 1) {
      alert("내용을 입력해 주세요.");
      return;
    }
    setTodoList([...todoList, { title: todoTitle, id: Math.random() * 10000, completed: false }]);
    setTodoTitle('');
    setInputFocused(false);
  }

  return (
    <ErrorBoundary>
      <TodosPresenter
        todoList={todoList}
        setTodoList={setTodoList}
        todoTitle={todoTitle}
        isInputFocused={isInputFocused}
        clicked={clicked}
        doSubmit={doSubmit}
      />
    </ErrorBoundary>
  )
}