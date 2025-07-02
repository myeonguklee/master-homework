import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  username: z.string({ required_error: "사용자 이름을 입력해주세요." }),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  age: z.number().min(1).optional(),
  address: z.string().optional(),
  createAt: z.date(),
  updateAt: z.date(),
});

export const UpdateUserDTO = UserSchema.pick({
  username: true,
  email: true,
}).extend({
  password: z.string().min(6).or(z.literal("")).optional(),
});

export type UpdateUserPayload = z.infer<typeof UpdateUserDTO>;
