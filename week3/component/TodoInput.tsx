import React, {Fragment} from "react";

interface TodoInputProps {
  todoTitle: string;
  clicked: (e:React.ChangeEvent<HTMLInputElement>) => void;
  doSubmit: () => void;
}

export function TodoInput({todoTitle, clicked, doSubmit}: TodoInputProps) {
  return(
    <Fragment>
      <input
        onChange={clicked}
        value={todoTitle}
        placeholder="예: 프레젠테이션 준비하기"
        style={{ padding: "4px", marginRight: "8px", width: "60%" }}
      />
      <button onClick={doSubmit}>할 일 추가</button>
    </Fragment>
  )
}