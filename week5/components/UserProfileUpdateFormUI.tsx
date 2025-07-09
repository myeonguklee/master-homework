import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { UpdateUserPayload } from "../schemas/userSchema";
import * as S from "./UserProfileUpdateForm.styles";

interface UserProfileFormUIProps {
  isEditing: boolean;
  isSubmitting: boolean;
  message: string;
  errors: FieldErrors<UpdateUserPayload>;
  register: UseFormRegister<UpdateUserPayload>;
  handleSubmit: UseFormHandleSubmit<UpdateUserPayload>;
  onSubmit: (data: UpdateUserPayload) => Promise<void>;
  handleEdit: () => void;
  handleCancel: () => void;
}

export const UserProfileFormUI = ({
  isEditing,
  isSubmitting,
  message,
  errors,
  register,
  handleSubmit,
  onSubmit,
  handleEdit,
  handleCancel,
}: UserProfileFormUIProps) => {
  return (
    <S.FormContainer role="main">
      <S.FormTitle>사용자 프로필</S.FormTitle>

      {message && <S.MessageContainer>{message}</S.MessageContainer>}

      <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormGroup>
          <S.Label htmlFor="username">사용자 이름</S.Label>
          <S.Input
            id="username"
            {...register("username")}
            disabled={!isEditing}
          />
          {errors.username && (
            <S.ErrorMessage>{errors.username.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.Input
            id="email"
            type="email"
            {...register("email")}
            disabled={!isEditing}
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        {isEditing && (
          <S.FormGroup>
            <S.Label htmlFor="password">새 비밀번호</S.Label>
            <S.Input id="password" type="password" {...register("password")} />
            {errors.password ? (
              <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
            ) : (
              <S.InfoText>비밀번호를 변경하지 않으려면 비워두세요.</S.InfoText>
            )}
          </S.FormGroup>
        )}

        <S.ButtonGroup>
          {!isEditing ? (
            <S.EditButton type="button" onClick={handleEdit}>
              수정하기
            </S.EditButton>
          ) : (
            <>
              <S.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </S.SubmitButton>
              <S.CancelButton
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                취소
              </S.CancelButton>
            </>
          )}
        </S.ButtonGroup>
      </S.StyledForm>
    </S.FormContainer>
  );
};
