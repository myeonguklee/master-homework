// UserProfileFormUI.tsx

import React, { Suspense, useRef } from "react";
import { FormState, UserInfo } from "../type";
import { SaveBtn } from "./SaveBtn";
import { FORM_FIELDS } from "../constants";


interface UserProfileFormUIProps {
  userInfo: UserInfo;
  isEditing: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  state: FormState;
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export function UserProfileFormUI({
  userInfo,
  isEditing,
  handleEdit,
  handleCancel,
  state,
  formAction,
  isPending,
}: UserProfileFormUIProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function onHandleCancel() {
    // 사용자가 수정중 취소를 누를 경우 되돌리기
    if (formRef.current) {
      formRef.current.reset();
    }
    handleCancel();
  }

  return (
    <div>
      <h2>사용자 프로필</h2>
      {state.message && <p>{state.message}</p>}
      <form ref={formRef} action={formAction}>
        <div>
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id={FORM_FIELDS.USERNAME}
            name={FORM_FIELDS.USERNAME}
            defaultValue={userInfo.username}
            disabled={!isEditing || isPending}
            placeholder="사용자 이름을 입력하세요"
          />
          {state.errors?.username &&
            state.errors.username.map((errror, index) => (
              <p key={index}>{errror}</p>
            ))}
          ;
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id={FORM_FIELDS.EMAIL}
            name={FORM_FIELDS.EMAIL}
            defaultValue={userInfo.email}
            disabled={!isEditing || isPending}
            placeholder="이메일을 입력하세요"
          />
          {state.errors?.email &&
            state.errors.email.map((errror) => <p>{errror}</p>)}
          ;
        </div>

        <div>
          <label htmlFor="password">새 비밀번호</label>
          <input
            type="password"
            id={FORM_FIELDS.PASSWORD}
            name={FORM_FIELDS.PASSWORD}
            defaultValue={userInfo.password}
            disabled={!isEditing || isPending}
            placeholder={isEditing ? "새 비밀번호를 입력하세요 (선택사항)" : ""}
          />
          {isEditing && <p>비밀번호를 변경하지 않으려면 비워두세요</p>}
          {state.errors?.password &&
            state.errors.password.map((errror) => <p>{errror}</p>)}
          ;
        </div>

        <div>
          {!isEditing ? (
            <button type="button" onClick={handleEdit}>
              수정하기
            </button>
          ) : (
            <>
              <SaveBtn />
              <button type="button" disabled={isPending} onClick={onHandleCancel}>
                취소
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
