// UserProfileFormContainer.tsx

import React, { useActionState, useEffect, useState } from "react";
import { UserProfileFormUI } from "./component/UserProfileFormUI";
import { UserInfo, FormState } from "./type";
import { validateUserInfo } from "./validateUserInfo";
import { HttpError, updateUserProfile } from "./api";
import { FORM_FIELDS } from "./constants";

const initialUserInfo: UserInfo = {
  [FORM_FIELDS.USERNAME]: "홍길동",
  [FORM_FIELDS.EMAIL]: "hong@example.com",
  [FORM_FIELDS.PASSWORD]: "",
};

const initialFormSate: FormState = {
  status: "idle",
  message: null,
  errors: {},
};

export function UserProfileFormContainer() {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialFormSate
  );

  // 업데이트 완료시 input defalutvalue 변경
  useEffect(() => {
    if (state.status === "success" && state.data) {
      setUserInfo(state.data);
      setIsEditing(false);
    }
  }, [state]);

  async function handleSubmit(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const username = formData.get(FORM_FIELDS.USERNAME) as string;
    const email = formData.get(FORM_FIELDS.EMAIL) as string;
    const password = formData.get(FORM_FIELDS.PASSWORD) as string;

    // 유효성 검증
    const validationResults = validateUserInfo({ username, email, password });

    if (!validationResults.isValid) {
      return {
        status: "error",
        message: "입력 정보를 확인해주세요.",
        errors: validationResults.errors,
      };
    }

    // API 요청
    try {
      const res = await updateUserProfile({ username, email, password });
      const updateUserInfo: UserInfo = { username, email, password };

      return {
        status: "success",
        message: "사용자 정보가 성공적으로 업데이트 되었습니다.",
        data: updateUserInfo,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        // 서버측 유효성 검사 실패
        if (error.status === 400 && error.body?.errors) {
          return {
            status: "error",
            message: error.message,
            errors: error.body.errors,
          };
        }
        return {
          status: "error",
          message: error.message,
        };
      }

      return {
        status: "error",
        message:
          "알 수 없는 오류가 발생했습니다. 네트워크 연결을 확인해주세요.",
      };
    }
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <UserProfileFormUI
      userInfo={userInfo}
      isEditing={isEditing}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      state={state}
      formAction={formAction}
      isPending={isPending}
      // form default value 변경
      key={JSON.stringify(userInfo)}
    />
  );
}
