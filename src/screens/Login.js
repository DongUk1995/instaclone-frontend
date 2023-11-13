import styled from "styled-components";
import { darkModeVar } from "./apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const Container = styled.div``;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>To dark </button>
      <button onClick={() => darkModeVar(false)}>To light </button>
    </Container>
  );
}
export default Login;
