import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserDTO, type UpdateUserPayload } from "../schemas/userSchema";

const initialUserData: UpdateUserPayload = {
  username: "홍길동",
  email: "hong@example.com",
  password: "",
};

export const useUserProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserDTO),
    defaultValues: initialUserData,
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    reset(initialUserData);
    setIsEditing(false);
    setMessage("");
  };

  const onSubmit = (data: UpdateUserPayload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ 업데이트된 사용자 정보:", data);
        setMessage("사용자 정보가 성공적으로 업데이트되었습니다!");
        setIsEditing(false);
        resolve(data);

        setTimeout(() => setMessage(""), 3000);
      }, 1000);
    });
  };

  return {
    isEditing,
    message,
    form: {
      register,
      handleSubmit,
      errors,
      isSubmitting,
    },
    actions: {
      handleEdit,
      handleCancel,
      onSubmit,
    },
  };
};
