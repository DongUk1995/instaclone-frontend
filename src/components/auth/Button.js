import styled from "styled-components";

const Button = styled.input`
  background-color: ${(props) => props.theme.accent};
  border-radius: 3px;
  border: none;
  color: white;
  text-align: center;
  padding: 8px 0px;
  width: 100%;
  margin-top: 15px;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

export default Button;
