import styled from "styled-components";

export const Tiny = styled.p`
  font-size: 12px;
`;

export const Title = styled.h1`
  font-size: 48px;
`;

export const SectionTitle = styled(Title)`
  margin-top: 10px;
`;

export const SubTitle = styled(Title).attrs({
  as: "h2",
})`
  font-size: 32px;
`;