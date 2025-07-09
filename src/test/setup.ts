import "@testing-library/jest-dom";

// MSW 설정 (선택적)
try {
  // 동기식으로 MSW 설정
  const mswModule = require("./mocks/server.js");
  const { server } = mswModule;
  const { beforeAll, afterEach, afterAll } = require("@jest/globals");

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} catch (error) {
  // MSW가 설정되지 않은 경우 무시
  console.log("MSW not configured, skipping...");
}
