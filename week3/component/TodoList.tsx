import {isEmpty} from "es-toolkit/compat";
import {TodoItem} from "./TodoItem";
import React, {Fragment, useEffect} from "react";
import {Todo} from "../type";
import {useGetTodoList} from "../queries";

interface TodoListProps {
  todoList: Todo[];
  setTodoList: (todoList:Todo[]) => void;
}

export function TodoList({todoList, setTodoList}: TodoListProps) {

  const {data: getTodoList = []} = useGetTodoList();

  useEffect(() => {
    if(isEmpty(todoList)){
      setTodoList(getTodoList);
    } else {
      setTodoList([...todoList, ...getTodoList]);
    }
  },[getTodoList])

  return (
    <Fragment>
      {isEmpty(todoList) ? <p>등록된 할 일이 없습니다.</p> : (
        <ul>
          {todoList.map(todo => (
            <TodoItem todo={todo}/>
          ))}
        </ul>
      )}
    </Fragment>
  )
}