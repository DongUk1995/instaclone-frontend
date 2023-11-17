import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useEffect } from "react";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken, // 토큰이 없으면 이 쿼리를 건너 뛸 것이다. useQuery (성공, 실패)
  });
  console.log(data);
  useEffect(() => {
    if (data?.me === null) {
      //"로컬스토리지에 토큰은 존재하지만 백엔드에서는 동작 하지 않습니다."
      logUserOut();
    }
  }, [data]); //data가 변경되면 useEffect가 실행 돼
  return { data };
}
export default useUser;
