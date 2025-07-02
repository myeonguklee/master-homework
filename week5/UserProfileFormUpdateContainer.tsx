import { useState } from "react";
import { useUserProfileUpdateForm } from "./hooks/useUserProfileUpdateForm";
import type { UpdateUserPayload } from "./schemas/userSchema";
import { UserProfileFormUI } from "./components/UserProfileUpdateFormUI";

const initialUserData: UpdateUserPayload = {
  username: "홍길동",
  email: "hong@example.com",
  password: "",
};

export const UserProfileFormUpdateContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset, errors, isSubmitting } =
    useUserProfileUpdateForm(initialUserData);

  const onSubmit = (data: UpdateUserPayload) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("✅ API로 전송될 최종 데이터:", data);
        setMessage("사용자 정보가 성공적으로 업데이트되었습니다!");
        setIsEditing(false);
        resolve();

        setTimeout(() => setMessage(""), 3000);
      }, 1000);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(initialUserData);
    setIsEditing(false);
    setMessage("");
  };

  return (
    <UserProfileFormUI
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      message={message}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
    />
  );
};
