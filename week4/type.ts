// type.ts

import { FORM_FIELDS } from "./constants";

export interface UserInfo {
  [FORM_FIELDS.USERNAME]: string;
  [FORM_FIELDS.EMAIL]: string;
  [FORM_FIELDS.PASSWORD]?: string;
}

export type UserInfoErrors = {
  [K in keyof UserInfo]?: string[];
};

export interface FormState {
  status: "idle" | "success" | "error";
  message: string | null;
  errors?: UserInfoErrors;
  data?: UserInfo;
}
