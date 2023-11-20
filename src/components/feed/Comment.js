import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../../shared";
import { Link } from "react-router-dom";

const CommentContainer = styled.div``;
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

function Commnet({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
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
    </CommentContainer>
  );
}
Comment.prototypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Commnet;
