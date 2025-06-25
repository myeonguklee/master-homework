// SaveBtn.tsx

import React from "react";
import { useFormStatus } from "react-dom";

export const SaveBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "저장중..." : "저장하기"}
    </button>
  );
};
