import { useUserProfileForm } from "../hooks/useUserProfileForm";
import * as S from "./UserProfileForm.styles";

export const UserProfileForm = () => {
  const { isEditing, message, form, actions } = useUserProfileForm();

  return (
    <S.FormContainer>
      <S.FormTitle>사용자 프로필</S.FormTitle>

      {message && <S.MessageContainer>{message}</S.MessageContainer>}

      <S.StyledForm onSubmit={form.handleSubmit(actions.onSubmit)}>
        <S.FormGroup>
          <S.Label htmlFor="username">사용자 이름</S.Label>
          <S.Input
            id="username"
            {...form.register("username")}
            disabled={!isEditing}
          />
          {form.errors.username && (
            <S.ErrorMessage>{form.errors.username.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.Input
            id="email"
            type="email"
            {...form.register("email")}
            disabled={!isEditing}
          />
          {form.errors.email && (
            <S.ErrorMessage>{form.errors.email.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        {isEditing && (
          <S.FormGroup>
            <S.Label htmlFor="password">새 비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              {...form.register("password")}
            />
            {form.errors.password ? (
              <S.ErrorMessage>{form.errors.password.message}</S.ErrorMessage>
            ) : (
              <S.InfoText>비밀번호를 변경하지 않으려면 비워두세요.</S.InfoText>
            )}
          </S.FormGroup>
        )}

        <S.ButtonGroup>
          {!isEditing ? (
            <S.EditButton type="button" onClick={actions.handleEdit}>
              수정하기
            </S.EditButton>
          ) : (
            <>
              <S.SubmitButton type="submit" disabled={form.isSubmitting}>
                {form.isSubmitting ? "저장 중..." : "저장하기"}
              </S.SubmitButton>
              <S.CancelButton
                type="button"
                onClick={actions.handleCancel}
                disabled={form.isSubmitting}
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
