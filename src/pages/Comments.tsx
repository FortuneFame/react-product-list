import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { CommentsState, fetchComments } from '../redux/slices/commentsSlice';

const Comments: React.FC = () => {
  const { id } = useParams();
  const postId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const commentsState = useSelector<RootState, CommentsState>((state) => state.comments);
  const navigate = useNavigate();

  useEffect(() => {
    if(postId !== undefined){
      dispatch(fetchComments(postId));
    }
  }, [postId, dispatch]);

  if (commentsState.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (commentsState.status === 'failed') {
    return <div>Error: {commentsState.error}</div>;
  }

  return (
    <div>
      {commentsState.comments.length === 0 ? (
        <p>No comments found for this post.</p>
      ) : (
        commentsState.comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p>{comment.body}</p>
            <a href={`/user/${comment.id}`}>View User Details</a>
          </div>
        ))
      )}

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Comments;
