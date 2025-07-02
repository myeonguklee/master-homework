import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserDTO, type UpdateUserPayload } from "../schemas/userSchema";

export const useUserProfileUpdateForm = (defaultValues: UpdateUserPayload) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(UpdateUserDTO),
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
  };
};
