// src/pages/UserPage.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { fetchCommentUser } from '../redux/slices/commentUserSlice';

const UserPage: React.FC = () => {
  const { id } = useParams();
  const userId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.commentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchCommentUser(userId));
    }
  }, [userId, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || !user) {
    return <div>Error: {error || 'User not found'}</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UserPage;
