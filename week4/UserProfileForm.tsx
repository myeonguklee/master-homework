import React, { useState } from "react";

// 파일은 일반적인 사용자 정보 수정 페이지의 폼 구성입니다.
// 오늘 배운 **useActionState**를 사용하여 코드를 개선해주세요.

// **참고사항**

// 1. 상태 접근, 검증 로직, 비동기 요청, 에러 캐칭이 과도하게 submit 함수에 다 들어가지 않고 적절한 순수함수로 빼서 관리되도록 해주세요.,
// 2. 검증 로직을 단순히 if문을 이용하기보다는 더 나은게 없을지 고민해서 자신만의 검증 방법을 구현해보세요.(검증과 관련한 클래스나 타입을 잡아주는 모듈을 적극적으로 활용해보면 좋습니다),
// 3. 백엔드 호출이 발생한다고 가정할 때 로딩에 따른 Suspense fallback을 구현해보세요.

interface UserInfo {
  username: string;
  email: string;
  password: string;
}

const UserProfileForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "홍길동",
    email: "hong@example.com",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!userInfo.username.trim()) {
      setMessage("사용자 이름을 입력해주세요.");
      return;
    }

    if (!userInfo.email.trim() || !userInfo.email.includes("@")) {
      setMessage("올바른 이메일을 입력해주세요.");
      return;
    }

    if (userInfo.password.length > 0 && userInfo.password.length < 6) {
      setMessage("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // 실제로는 여기서 API 호출을 하게 됩니다
    console.log("업데이트된 사용자 정보:", userInfo);
    setMessage("사용자 정보가 성공적으로 업데이트되었습니다!");
    setIsEditing(false);

    // 메시지 3초 후 자동 제거
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setUserInfo({
      username: "홍길동",
      email: "hong@example.com",
      password: "",
    });
    setIsEditing(false);
    setMessage("");
  };

  return (
    <div>
      <h2>사용자 프로필</h2>

      {message && <div>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="사용자 이름을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="password">새 비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder={isEditing ? "새 비밀번호를 입력하세요 (선택사항)" : ""}
          />
          {isEditing && <p>비밀번호를 변경하지 않으려면 비워두세요</p>}
        </div>

        <div>
          {!isEditing ? (
            <button type="button" onClick={() => setIsEditing(true)}>
              수정하기
            </button>
          ) : (
            <>
              <button type="submit">저장하기</button>
              <button type="button" onClick={handleCancel}>
                취소
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
