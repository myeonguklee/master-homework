// validateUserInfo.ts

import { UserInfo, UserInfoErrors } from "./type";
import { validateField } from "./Validator";

export function validateUserInfo(data: UserInfo) {
  const errors: UserInfoErrors = {};
  let isValid = true;

  const usernameValidation = validateField(data.username, "사용자 이름")
    .string()
    .required()
    .min(2)
    .max(10)
    .validate();

  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.errors;
    isValid = false;
  }

  const emailValidation = validateField(data.email, "이메일")
    .string()
    .required()
    .email()
    .validate();

  if (!emailValidation.isValid) {
    errors.email = emailValidation.errors;
    isValid = false;
  }

  if (data.password) {
    const passwordValidation = validateField(data.password, "비밀번호")
      .string()
      .min(8)
      .max(20)
      .validate();

    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors;
      isValid = false;
    }
  }
  return {
    isValid,
    errors,
    data,
  };
}
