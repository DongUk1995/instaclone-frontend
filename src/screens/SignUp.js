import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/SubmitButton";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FatLink } from "../shared";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;
function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  }); //useMutation 서버에 데이터 변경 작업을 요청 oncompleted는 usemutation이 가지고 있는 것이고 oncompleted는 우리에게 데이터를 보내주고 이 데이터는 뮤데이션을 통해 얻은 것
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: { ...data },
    });
  }; // 데이터를 받을 준비 완료
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          {/* 데이터에 이름, 이메일, 유저네임과 패스워드가 있다고 말하잖아 */}
          <Input
            {...register("firstName")}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName", { required: "LastnName is required" })}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", { required: "Email is required" })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", { required: "UserName is required" })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Passwrod"
          />
          <Button
            type="submit"
            value={loading ? "Loading...." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="have an account?" linkText="Log In" link={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;
