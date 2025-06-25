// Validator.ts

class Validator {
  value: string;
  fieldName: string;
  errors: string[];
  isValid: boolean;

  constructor(value: string, fieldName: string) {
    this.value = value;
    this.fieldName = fieldName;
    this.errors = [];
    this.isValid = true;
  }

  string() {
    this.value = this.value?.trim() || "";
    return this;
  }

  required(message = `${this.fieldName}은(는) 필수입니다.`) {
    if (this.value === null || this.value === undefined || this.value === "") {
      this.errors.push(message);
      this.isValid = false;
    }
    return this;
  }

  min(
    minLength: number,
    message = `${this.fieldName}은(는) 최소 ${minLength}자 이상이어야 합니다`
  ) {
    if (this.isValid && this.value && this.value.length < minLength) {
      this.errors.push(message);
      this.isValid = false;
    }
    return this;
  }

  max(
    maxLength: number,
    message = `${this.fieldName}은(는) 최대 ${maxLength}자까지 입력 가능 합니다`
  ) {
    if (this.isValid && this.value && this.value.length > maxLength) {
      this.errors.push(message);
      this.isValid = false;
    }
    return this;
  }

  email(message = `${this.fieldName}은(는) 올바른 이메일 형식이어야 합니다.`) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.isValid && this.value && !emailRegex.test(this.value)) {
      this.errors.push(message);
      this.isValid = false;
    }
    return this;
  }

  password(message = `${this.fieldName}는 영문과 숫자를 포함해야 합니다.`) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
    if (this.isValid && this.value && !passwordRegex.test(this.value)) {
      this.errors.push(message);
      this.isValid = false;
    }
    return this;
  }

  validate() {
    return {
      isValid: this.isValid,
      errors: this.errors,
      value: this.value,
    };
  }

  getFirstError() {
    return this.errors.length > 0 ? this.errors[0] : null;
  }
}

export function validateField(value: string, fieldName = "") {
  return new Validator(value, fieldName);
}
