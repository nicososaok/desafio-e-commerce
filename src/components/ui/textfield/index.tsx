import styled from "styled-components";
import { Tiny } from "../texts";

export const Input = styled.input`
  font-size: 48px;
`;

export const Label = styled(Tiny)``;

export function TextField({ label = "Label", placeholder = "" }) {
  return (
    <Label>
      <Label>{label}</Label>
      <Input placeholder={placeholder} />
    </Label>
  );
}