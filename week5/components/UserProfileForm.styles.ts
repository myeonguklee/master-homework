import styled from "@emotion/styled";

export const FormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 3rem auto;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #34495e;
`;

export const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }

  &:disabled {
    background-color: #ecf0f1;
    cursor: not-allowed;
  }
`;

export const InfoText = styled.p`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0;
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin: 0;
`;

export const MessageContainer = styled.div`
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const BaseButton = styled.button`
  flex: 1;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(BaseButton)`
  background-color: #3498db;
  color: white;
  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

export const CancelButton = styled(BaseButton)`
  background-color: #95a5a6;
  color: white;
  &:hover:not(:disabled) {
    background-color: #7f8c8d;
  }
`;

export const EditButton = styled(BaseButton)`
  background-color: #2ecc71;
  color: white;
  &:hover:not(:disabled) {
    background-color: #27ae60;
  }
`;