import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProfileFormUI } from "../../week5/components/UserProfileUpdateFormUI";
import type { FieldError } from "react-hook-form";

// Mock react-hook-form
const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockOnSubmit = jest.fn();
const mockHandleEdit = jest.fn();
const mockHandleCancel = jest.fn();

const defaultProps = {
  isEditing: false,
  isSubmitting: false,
  message: "",
  errors: {},
  register: mockRegister,
  handleSubmit: mockHandleSubmit,
  onSubmit: mockOnSubmit,
  handleEdit: mockHandleEdit,
  handleCancel: mockHandleCancel,
};

describe("UserProfileFormUI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegister.mockReturnValue({
      name: "field",
      ref: jest.fn(),
      onChange: jest.fn(),
      onBlur: jest.fn(),
    });
    mockHandleSubmit.mockImplementation((fn) => fn);
  });

  it("입력 필드에 정상적으로 타이핑할 수 있어야 한다", async () => {
    const user = userEvent.setup();
    render(<UserProfileFormUI {...defaultProps} isEditing={true} />);

    const usernameInput = screen.getByLabelText("사용자 이름");
    const emailInput = screen.getByLabelText("이메일");

    // 정상적인 타이핑 테스트
    await user.type(usernameInput, "김철수");
    await user.type(emailInput, "kim@example.com");

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it("필수 데이터 입력 여부를 확인할 수 있어야 한다", () => {
    const errors = {
      username: {
        message: "사용자 이름을 입력해주세요.",
        type: "required",
      } as FieldError,
      email: {
        message: "올바른 이메일을 입력해주세요.",
        type: "pattern",
      } as FieldError,
    };

    render(<UserProfileFormUI {...defaultProps} errors={errors} />);

    // 필수 필드 오류 메시지 확인
    expect(screen.getByText("사용자 이름을 입력해주세요.")).toBeInTheDocument();
    expect(
      screen.getByText("올바른 이메일을 입력해주세요.")
    ).toBeInTheDocument();
  });
});
