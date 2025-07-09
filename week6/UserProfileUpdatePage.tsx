import { useState } from "react";
import { useUserProfileUpdateForm } from "../week5/hooks/useUserProfileUpdateForm";
import { UserProfileFormUI } from "../week5/components/UserProfileUpdateFormUI";
import type { UpdateUserPayload } from "../week5/schemas/userSchema";

const initialUserData: UpdateUserPayload = {
  username: "홍길동",
  email: "hong@example.com",
  password: "",
};

export default function UserProfileUpdatePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, errors } =
    useUserProfileUpdateForm(initialUserData);

  const onSubmit = async (data: UpdateUserPayload) => {
    setIsSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setMessage(
          result.message || "사용자 정보가 성공적으로 업데이트되었습니다!"
        );
        setIsEditing(false);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.message || "오류가 발생했습니다.");
      }
    } catch (e) {
      console.error(e);
      setMessage("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    reset(initialUserData);
    setIsEditing(false);
    setMessage("");
  };

  return (
    <main role="main">
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
    </main>
  );
}
