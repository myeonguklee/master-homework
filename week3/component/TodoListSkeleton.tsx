import React from "react";
import Skeleton from "react-loading-skeleton";

export function TodoListSkeleton(){
  return (
    <ul>
      <Skeleton height={50} width={50} count={5} />
    </ul>
  )
}