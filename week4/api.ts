import { UserInfo } from "./type";

export class HttpError extends Error {
  status: number;
  body: any;
  constructor(status: number, message: string, body?: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export async function updateUserProfile(userInfo: UserInfo): Promise<any> {
  const response = await fetch("/api/user-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer AccessToken`,
    },
    body: JSON.stringify(userInfo),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.json();
    throw new HttpError(response.status, errorBody.message, errorBody);
  }
}
