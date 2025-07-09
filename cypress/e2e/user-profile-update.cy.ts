/// <reference types="cypress" />

describe("사용자 프로필 수정 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("회원 정보 수정까지 전체 플로우를 테스트한다", () => {
    // 1. 초기 상태 확인
    cy.get('[role="main"]').should("be.visible");
    cy.get("h2").should("contain", "사용자 프로필");

    // 2. 수정하기 버튼 클릭
    cy.get("button").contains("수정하기").click();

    // 3. 입력 필드가 활성화되었는지 확인
    cy.get('input[name="username"]').should("not.be.disabled");
    cy.get('input[name="email"]').should("not.be.disabled");
    cy.get('input[name="password"]').should("not.be.disabled");

    // 4. 정상적인 타이핑 테스트
    cy.get('input[name="username"]').clear().type("김철수");
    cy.get('input[name="email"]').clear().type("kim@example.com");

    // 5. 필수 데이터 입력 여부 확인
    cy.get('input[name="username"]').should("have.value", "김철수");
    cy.get('input[name="email"]').should("have.value", "kim@example.com");

    // 6. 저장하기 버튼 클릭
    cy.get("button").contains("저장하기").click();

    // 7. 성공 메시지 확인
    cy.contains("사용자 정보가 성공적으로 업데이트되었습니다!", {
      timeout: 3000,
    }).should("be.visible");

    // 8. 폼이 다시 비활성화되었는지 확인
    cy.get('input[name="username"]').should("be.disabled");
    cy.get('input[name="email"]').should("be.disabled");
  });
});
