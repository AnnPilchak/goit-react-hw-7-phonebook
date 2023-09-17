import { styled } from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button`
margin-left: 10px;
`

export { List, Item, Button };