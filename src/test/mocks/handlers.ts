import { http, HttpResponse } from "msw";

export const handlers = [
  // 회원 정보 수정 API
  http.post("/api/user/update", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      message: "사용자 정보가 성공적으로 업데이트되었습니다!",
      data: body,
    });
  }),
];
