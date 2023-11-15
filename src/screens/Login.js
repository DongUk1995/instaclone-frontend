import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/SubmitButton";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { useState } from "react";

const FaceBookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 600;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const onUsernameChange = (event) => {
    setUsernameError("");
    setUsername(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "") {
      setUsernameError("아이디를 입력해주세요.");
    }
    if (username.length < 10) {
      setUsernameError("아이디가 너무 짧습니다.");
    }
  };
  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            onChange={onUsernameChange}
            value={username}
            type="text"
            placeholder="username"
          />
          <Input type="password" placeholder="Passwrod" />
          <Button
            type="submit"
            value="Log In"
            disabled={(username === "") & (username.length < 10)}
          />
        </form>
        <Separator />
        <FaceBookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with FaceBook</span>
        </FaceBookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
