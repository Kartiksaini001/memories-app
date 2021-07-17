import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment("");
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments.length === 0 ? (
            <Typography variant="subtitle1" color="textSecondary">
              No comments yet...
            </Typography>
          ) : (
            comments.map((c, i) => (
              <Typography
                key={i}
                className={classes.commentDisplay}
                variant="subtitle1"
                gutterBottom
              >
                <strong>{c.split(":")[0]}</strong>
                {c.slice(c.indexOf(":") + 1, c.length)}
              </Typography>
            ))
          )}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography variant="h6" gutterBottom>
              Write a comment
            </Typography>
            <TextField
              variant="outlined"
              label="Comment"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              color="primary"
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              Add Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
