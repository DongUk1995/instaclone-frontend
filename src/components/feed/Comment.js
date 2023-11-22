import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../../shared";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;
const CommentContainer = styled.div`
  margin-bottom: 7px;
  button {
    background-color: transparent;
    font-size: 10px;
    border: none;
  }
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Commnet({ id, photoId, isMine, author, payload }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      }, // cache, result를 받고 result에서 data를 가져온다.
    } = result; // result안에서
    if (ok) {
      cache.evict({ id: `Comment:${id}` }); //프론트엔드 cache를 삭제한다.
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    }, // variables는 DELETE_COMMENT_MUTATION에 id를 전달하고 useMutation이 데이터를 변화하여 deleteCommentMutation 리스트에 준다.
    update: updateDeleteComment,
    // 여기서 DELETE_COMMENT_MUTATION는 백엔드에서 데이터를 삭제하는 것 그러므로 id를 전달하고 DELETE_COMMENT_MUTATION에서 삭제하는 훅
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  }; // onDeleteClick를 선언하고 출력 deleteCommentMutation
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload.split(" ").map((world, index) =>
          /#[\w]+/.test(world) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${world}`}>{world}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{world} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer> // 만약 isMin이 true이면 클릭을 입력하면 ondeletClick이 실행되니깐 const onDeleteClick 실행 그 후 deleteCommentMutation 실행
  );
}
Comment.prototypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Commnet;
